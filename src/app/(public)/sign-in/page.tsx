"use client"

import { useState } from 'react';

import styles from '@/app/(public)/sign-in/signin.module.css';
import { useForm } from '@/hooks/useForm';

interface LoginSchema {
    email: string;
    password: string;
}

export default function SignIn() {
    const { submit, loading, error, success } = useForm("/auth/login/");
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
        submit(formData);
    }

    // TODO: Tratar mensagem de error e succes melhor
    return (
        <div className={styles.container}>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <section className={styles.input}>
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" id="emailInput" onChange={handleChange}/>
                </section>
                <section className={styles.input}>
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" id="passwordInput" onChange={handleChange}/>
                </section>                
                <button type="submit">Login</button>

                {error && <p style={{ color: "red" }}>{error}</p>} 
                {success && <p style={{ color: "green" }}>Enviado com sucesso!</p>}
            </form>
        </div>
    );
}