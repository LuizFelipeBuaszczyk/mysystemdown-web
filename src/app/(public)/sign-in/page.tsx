"use client"

import { SyntheticEvent } from 'react';

import styles from '@/app/(public)/sign-in/signin.module.css';

export default function SignIn() {

    return (
        <div className={styles.container}>
            <h1>Login</h1>

            <form onSubmit={() => {}}>
                <section className={styles.input}>
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" id="emailInput" />
                </section>
                <section className={styles.input}>
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" id="passwordInput" />
                </section>                
                <button type="submit">Login</button>
            </form>
        </div>
    );
}