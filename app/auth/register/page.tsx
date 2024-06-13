'use client'
import { register } from '@/server-actions/serveractions';
import SignInCard from '../signincard';
import Form from './form'
import { signIn } from 'next-auth/react';

export default async function Register() {

  async function submit(user: { username: string, password: string, nickname: string }) {
    try {
      const response = await register(user.username, user.password, user.nickname);

      if (!response) {
        throw new Error('User already exists', response)
      }
      if (response.status === 409) {
        alert('User already exists');
        throw new Error('User already exists')
      } else if (response.status === 200) {
        const status = await signIn('credentials', {
          redirect: true,
          email: user.username,
          password: user.password,
          callbackUrl: '/quiz'
        });
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
