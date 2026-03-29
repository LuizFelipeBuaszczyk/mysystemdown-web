"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Form from '@/components/form';

import styles from '@/app/(public)/sign-in/signin.module.css';
import { useForm } from '@/hooks/useForm';

interface LoginSchema {
    email: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

export default function SignIn() {
    const [response, setResponse] = useState<LoginResponse | null>(null);
    const router = useRouter();
    const [formData, setFormData] = useState<LoginSchema>({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (response){
            cookieStore.set('auth_token', response.access_token);
            cookieStore.set('refresh_token', response.refresh_token); 
            
            router.push('/dashboard');
        }
    }, [response])

    // TODO: Tratar mensagem de error e succes melhor
    return (
        <div className={styles.container}>
            <h1>Login</h1>

            <Form endpoint="/auth/login" formData={formData} setResponse={setResponse}>
                <section className={styles.input}>
                    <label htmlFor="emailInput">Email</label>
                    <input type="email" name="email" id="emailInput" onChange={handleChange}/>
                </section>
                <section className={styles.input}>
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" name="password" id="passwordInput" onChange={handleChange}/>
                </section>                
                <button type="submit">Login</button>
            </Form>

            <Link href='/sign-up'>Crie uma conta</Link>
        </div>
    );
}