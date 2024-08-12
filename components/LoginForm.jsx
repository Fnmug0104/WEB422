"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Form, Alert, Container, Card } from 'react-bootstrap';


export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const res = await signIn("credentials", {
        username,
        password,
        callbackUrl: '/',
        redirect: false,
      });

      console.log('Sign-In Response:', res); // Log response to check the result

      
      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }
      
      router.replace("/");
      console.log(res);

     
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Login
            </Button>

            {successMessage && (
              <Alert variant="success" className="mt-3">
                {successMessage}
              </Alert>
            )}

            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}

            <div className="mt-3 text-end">
              <Link href="/register" passHref>
                <Button variant="link" className="text-decoration-none">
                  Don&rsquo;t have an account? <u>Register</u>
                </Button>
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
