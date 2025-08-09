'use client';

import Input from '@/common/input/Input';
import { Button } from '@/common/button/Button';
import styles from './Login.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleLogin = async () => {
    if (!userName || !password) {
      setErrorMessage('All fields are required');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/profile');
      } else {
        setErrorMessage(data.message || 'Invalid username or password');
      }
    } catch (error) {
      alert('All fields are required');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.formWrapper}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            if (!isLoading) handleLogin();
          }}
        >
          <h2>Login</h2>
          <Input
            label="Username"
            placeholder="Enter your Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Password"
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          <Button
            type="submit"
            buttonText="SUBMIT"
            className={styles.button}
            disabled={isLoading}
            aria-busy={isLoading}
          />
          <p className={styles.registerText}>
            Do not have account?{' '}
            <Link href="/register">
              <span>Register</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
