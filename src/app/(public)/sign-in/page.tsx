"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

import styles from '@/app/(public)/sign-in/signin.module.css';
import { useForm } from '@/hooks/useForm';

interface LoginSchema {
    email: string;
    password: string;
}

export default function SignIn() {
    const router = useRouter();
    const { submit, loading, error, success, response } = useForm("/auth/login/");
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

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        await submit(formData);
    }

    useEffect(() => {
        if (success){
            cookieStore.set('auth_token', response.access_token);
            //cookieStore.set('refresh_token', response.refresh_token);  TODO: Depois salvar o refresh token, att da api
            
            router.push('/dashboard');
        }
    }, [success])

    // TODO: Tratar mensagem de error e succes melhor
    return (
        <div className={styles.container}>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <section className={styles.input}>
                    <label htmlFor="emailInput">Email</label>
                    <input type="email" name="email" id="emailInput" onChange={handleChange}/>
                </section>
                <section className={styles.input}>
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" name="password" id="passwordInput" onChange={handleChange}/>
                </section>                
                <button type="submit">Login</button>

                {error && <p style={{ color: "red" }}>{error}</p>} 
                {success && <p style={{ color: "green" }}>Enviado com sucesso!</p>}
            </form>

            <Link href='/sign-up'>Crie uma conta</Link>
        </div>
    );
}