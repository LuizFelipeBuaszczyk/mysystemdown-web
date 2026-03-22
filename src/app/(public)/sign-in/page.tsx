"use client"

import { SyntheticEvent } from 'react';

export default function SignIn() {

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={() => {}}>
                <label htmlFor="">Email</label>
                <input type="email" name="email" id="emailInput" />

                <label htmlFor="">Password</label>
                <input type="password" name="password" id="passwordInput" />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}