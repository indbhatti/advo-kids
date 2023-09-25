import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { GoogleProfile } from 'next-auth/providers/google'
import connectMongo from '../../../../middleware/mongooseconnect'
import UserMongo from '../../../../models/user'
import { UserType } from '../../../../models/user'
import { compare } from 'bcryptjs'
import { Account, TokenSet, User } from 'next-auth'



export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),

    CredentialsProvider({
      authorize: async (credentials: { email: string, password: string }) => {
        try {
          const db = await connectMongo(); // Make sure connectMongo returns a database connection
          const user: UserType | null = await UserMongo.findOne({ username: credentials.email }); // Use findOne instead of find

          if (!user) {
            return null
          }

          const checkPassword = await compare(credentials.password, user.password); // Correct the typo "passowrd" to "password"

          if (!checkPassword) {
            return null
          }

          const userToSubmit: User = {
            id: user._id,
            name: user.nickname,
            email: user.username,
            image: user.image,
          }

          return userToSubmit;
        } catch (error) {
          console.log(error)
          return null
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt(
      { token, account, user, profile }
        : { token: TokenSet, account: Account, user: User, profile: GoogleProfile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        // console.log(account)
        // console.log(user)
        token.accessToken = account.access_token
        token.name = "user"
        token.email = user.email
        // token.picture = user.image
        token.picture = ""
        token.userId = user.id
      }
      if (profile) {
        // console.log(account)
        // console.log(profile)
        try {
          const db = await connectMongo(); // Make sure connectMongo returns a database connection
          const user: UserType | null = await UserMongo.findOne({ username: profile.email }); // Use findOne instead of find
          if (user) {
            token.userId = user._id
          }
        } catch (error) {
          console.log(error)
        }
        token.accessToken = account.access_token
        token.name = profile.name
        token.email = profile.email
        token.picture = profile.picture
      }
      // console.log(account)
      // console.log(profile)
      // console.log(user)
      // console.log(token)
      return token
    },
    // That token store in session
    async session({ session, token }: { token: TokenSet }) { // this token return above jwt()
      session.accessToken = token.accessToken;
      session.user.userId = token.userId
      //if you want to add user details info
      // console.log(session)
      return session;
    },
    async redirect() {
      return 'http://localhost:3000/'
    },

    async signIn({ account, profile }: { account: Account, profile: GoogleProfile }) {
      if (account.provider === 'google') {
        // console.log(account)
        try {
          // console.log("connecting to mongo database")
          const connect = await connectMongo()

          if (connect) {
            // console.log("connected to mongo database")
            const user: UserType | null = await UserMongo.findOne({ googleId: account.providerAccountId })
            if (!user) {
              // add your user in DB here with profile data (profile.email, profile.name)
              var newUser = new UserMongo({
                username: profile.email,
                googleId: account.providerAccountId,
                language: "English",
                progress: {
                  completed_questions: [0, 0, 0],
                  current_question: [1, 1, 1]
                },
              })

              newUser.save();
            }

            else {
              // console.log(user)
            }
            return true

          }
          return true

        } catch (error) {
          console.log(error)
        }
      } else if (account.provider === "credentials") {
        return true
      }
    }

  },

  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/register' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
}

