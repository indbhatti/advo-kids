'use client'
import SignInCard from '../signincard';
import Form from './form'
import { signIn } from 'next-auth/react';

export default async function Register() {

  async function submit(user: { username: string, password: string, nickname: string }) {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response)

      if (!response.ok) {

        throw new Error('Failed to submit user data');
      }

      const result = await response.json();
      if (result.status === 409) {
        alert('User already exists');
        throw new Error('User already exists', result)
      } else if (result.status === 200) {
        const status = await signIn('credentials', {
          redirect: true,
          email: user.username,
          password: user.password,
          callbackUrl: '/selection_menu'
        });
        console.log(status);

      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="container flex flex-col items-center bg-gray-200 my-14 rounded-xl p-14">
      <h1 className="text-5xl">Register</h1>
      <Form submit={submit} />
      <SignInCard auth="Google" />

    </div>
  );
}
