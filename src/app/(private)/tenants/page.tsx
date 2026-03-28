"use client"

import { useState } from 'react';

import { useForm } from '@/hooks/useForm';
import styles from '@/app/(private)/tenants/tenant.module.css';

interface TenantSchema {
    name: string;
}

export default function Tenants() {
    const {submit, loading, error, success, response} = useForm("/tenants/");
    const [formData, setFormData] = useState<TenantSchema>({
        name: ''
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

    return (
        <div className={styles.container}>
            <h1>My Tenants</h1>

            <form onSubmit={handleSubmit}>
                <section className={styles.input}>
                    <label htmlFor="nameInput">Name</label>
                    <input type="text" name="name" id="nameInput" onChange={handleChange}/>
                </section>

                <button type='submit'>Create</button>
                {error && <p style={{color: "red"}}>{error}</p>}
                {success && <p style={{color: "green"}}>Tenant created</p>}
            </form>
        </div>
    );
}
