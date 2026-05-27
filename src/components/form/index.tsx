"use client";

import styles from '@/components/form/form.module.css';
import { useForm } from '@/hooks/useForm';
import { useEffect } from 'react';

interface FormProps {
  children: React.ReactNode;
  endpoint: string;
  formData: any;
  method?: string;
  setResponse?: React.Dispatch<React.SetStateAction<any>>;
}

export default function Form({ children, endpoint, formData, method, setResponse }: FormProps) {
    const {submit, loading, error, success, response} = useForm(endpoint, method);
    
    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        submit(formData);
    }

    useEffect(() => {
        if (setResponse) {
            setResponse(response);
        }
    }, [response]);


    return (
    <form className={styles.container} onSubmit={handleSubmit}>
        {children}
        {error && <p style={{color: "red"}}>{error}</p>}
        {success && <p style={{color: "green"}}>Success</p>}
    </form>
  );
}