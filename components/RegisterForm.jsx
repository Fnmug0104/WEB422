"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Alert, Container, Card } from 'react-bootstrap';

export default function RegisterForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
        setError("All fields are required.");
        return;
    }

    try {

      const resUserExists = await fetch("/api/userExists", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({ username}),
      }
      );

      const {user} = await resUserExists.json();

      if (user){
        setError("Username is taken!");
        return;
      }


        // Register the new user
         const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (res.ok) {
            const form = e.target;
            setSuccessMessage("Account Registration Successful! Redirecting you to Login Page...");
            setTimeout(() => {
                form.reset();
                router.push('/login');
            }, 3000);

        } else {
            setError("User registration failed.");
        }
    } catch (error) {
        setError("Error during registration: " + error.message);
    }
};

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Create Account</Card.Title>

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
              Register
            </Button>

            {successMessage && (
            <div className="alert alert-success mt-3">
                {successMessage}
            </div>
        )}

            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}

            <div className="mt-3 text-end">
              <Link href="/login" passHref>
                <Button variant="link" className="text-decoration-none">
                  Already have an account? <u>Login</u>
                </Button>
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
