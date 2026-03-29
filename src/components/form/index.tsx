"use client";

import styles from '@/components/form/form.module.css';

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (event: React.SubmitEvent) => void; 
}

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      {children}
    </form>
  );
}