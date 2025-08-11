'use client';

import { useEffect, useState } from 'react';
import styles from './ContactForm.module.scss';
import { Button } from '@/common/button/Button';
import Spinner from '../Spinner';

export const runtime = 'nodejs';

const ContacForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.firstName || !form.email || !form.message) {
      setError('Please, fill out all fields');
      return;
    }

    setError('');
    setIsLoading(true);

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    setIsLoading(false);

    if (res.ok) {
      setSuccessMessage(true);
      setForm({ firstName: '', lastName: '', email: '', message: '' });

      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    } else {
      alert('Ошибка при отправке');
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <h2>Contact Me</h2>

        <div className={styles.row}>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.column}>
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Write a message"
            rows={4}
            value={form.message}
            onChange={handleChange}
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>

        <div className={styles.buttonContainer}>
          <Button
            buttonText={isLoading ? <Spinner /> : 'SUBMIT'}
            className={styles.button}
            disabled={isLoading}
          />
        </div>
      </form>
      {successMessage && (
        <div className={styles.modalMessage}>
          <span>Your message has been sent.</span>
          <span>Thank you!</span>
        </div>
      )}
    </div>
  );
};

export default ContacForm;
