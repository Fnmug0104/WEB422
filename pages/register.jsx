import RegisterForm from '@/components/RegisterForm'
import React from 'react'
import { Container } from 'react-bootstrap';


export default function register() {
  return (
    <main>


    <div className='header'>
        <h1> Welcome to TheDogSite!</h1>
    </div>

        <RegisterForm/>

        </main>
  )
}
