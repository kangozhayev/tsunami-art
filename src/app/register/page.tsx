'use client';

import styles from './Register.module.scss';
import Input from '@/common/input/Input';
import { Button } from '@/common/button/Button';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from '@/components/Spinner';

const Register = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [userName, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [birthDate, setBirthDate] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName || !name || !password || !confirmPassword || !birthDate) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ userName, name, password, birthDate }),
      });

      const data = await res.json().catch(() => ({}));
      setLoading(false);

      if (res.ok) {
        console.log('Registration successful');
        localStorage.setItem('token', data.token);
        router.push('/login');
      } else {
        if (res.status === 409) {
          setError('This username is already taken. Try another one.');
        } else {
          setError(data.message || 'Something went wrong');
        }
      }
    } catch (err) {
      setLoading(false);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerWrapper}>
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <Input
            label="Username"
            placeholder="Enter your Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Name"
            placeholder="Enter your Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="password"
            value={password}
            label="Password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            value={confirmPassword}
            label="Confirm Password"
            placeholder="Enter your password again"
            className={styles.input}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Input
            label="Date of Birth"
            type="date"
            name="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button
            buttonText={loading ? <Spinner /> : 'REGISTER'}
            className={clsx(styles.button)}
            disabled={loading}
          />
          <p className={styles.loginText}>
            Already have an account?{' '}
            <Link href="/login">
              <span>Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
