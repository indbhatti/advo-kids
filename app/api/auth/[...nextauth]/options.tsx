import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import connectMongo from '../../../../middleware/mongooseconnect'
import User from '../../../../models/user'
import { UserType } from '../../../../models/user'
import { compare } from 'bcryptjs'

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    CredentialsProvider({
      authorize: async (credentials: { email: string, password: string }): Promise<{ email: string } | null> => {
        try {
          const db = await connectMongo(); // Make sure connectMongo returns a database connection
          const user = await User.findOne({ username: credentials.email }); // Use findOne instead of find

          if (!user) {
            return null
          }

          const checkPassword = await compare(credentials.password, user.password); // Correct the typo "passowrd" to "password"

          console.log(checkPassword)
          if (!checkPassword) {
            return null
          }

          return user;
        } catch (error) {
          return null
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {

    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        console.log(account)
        try {
          //check if user is in your database
          console.log("connecting to mongo database")
          const connect = await connectMongo()
          if (connect) {
            console.log("connected to mongo database")
            const user: UserType | null = await User.findOne({ googleId: account.providerAccountId })
            if (!user) {
              // add your user in DB here with profile data (profile.email, profile.name)
              var newUser = new User({
                username: profile.email,
                googleId: account.providerAccountId,
                progress: {
                  completed_questions: [0, 0, 0],
                  current_question: [1, 1, 1]
                },
              })

              newUser.save();
            }
            else {
              console.log(user)
            }
            return true

          }
          return true

        } catch (error) {
          console.log(error)
        }
      }
    }

  },
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/register' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
}

