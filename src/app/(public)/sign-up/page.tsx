"use client"

import styles from '@/app/(public)/sign-in/signin.module.css';

import { useState } from 'react';
import { useForm } from '@/hooks/useForm';

import Form from '@/components/form';

interface UserSchema {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}


export default function SignUp() {
    const [formData, setFormData] = useState<UserSchema>({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // TODO: Tratar mensagem de error e succes melhor
    return (
        <div className={styles.container}>
            <h1>Sign Up</h1>

            <Form endpoint="/signup" formData={formData}>
                <section className={styles.input}>
                    <label htmlFor="firstNameInput">First Name</label>
                    <input type="text" name="first_name" id="firstNameInput" onChange={handleChange}/>
                </section>

                <section className={styles.input}>
                    <label htmlFor="lastNameInput">Last Name</label>
                    <input type="text" name="last_name" id="lastNameInput" onChange={handleChange}/>
                </section>

                <section className={styles.input}>
                    <label htmlFor="emailInput">Email</label>
                    <input type="email" name="email" id="emailInput" onChange={handleChange}/>
                </section>

                <section className={styles.input}>
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" name="password" id="passwordInput" onChange={handleChange}/>
                </section>

                <button type="submit">Sign Up</button>
            </Form>
        </div>
    )
}