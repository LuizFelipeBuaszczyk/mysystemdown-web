"use client"

import { useState } from 'react';
import Form from '@/components/form';
import Modal from '@/components/modal';

import styles from '@/app/(private)/tenants/tenant.module.css';

interface ClientSchema {
    name: string;
    schema_name: string;
}

interface TenantSchema {
    client: ClientSchema | null;
}

export default function Tenants() {
    const [clientData, setClientData] = useState<ClientSchema>({
        name: '',
        schema_name: ''
    })
    const [formData, setFormData] = useState<TenantSchema>({
        client: null
    })

    const [openCreateModal, setOpenCreateModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientData({
            ...clientData,
            [e.target.name]: e.target.value
        });

        setFormData({
            client: clientData
        })
    }


    return (
        <div className={styles.container}>
            <h1>My Tenants</h1>

            <Modal id='modal-tenants-create' setOpen={setOpenCreateModal}>
                <h1>Create Tenant</h1>
                <Form endpoint='/tenants' formData={formData}>
                    <section className={styles.input}>
                        <label htmlFor="nameInput">Name</label>
                        <input type="text" name="name" id="nameInput" onChange={handleChange}/>
                    </section>

                    <section className={styles.input}>
                        <label htmlFor="schemaNameInput">Schema Name</label>
                        <input type="text" name="schema_name" id="schemaNameInput" onChange={handleChange}/>
                    </section>

                    <button type='submit'>Create</button>
                </Form>
            </Modal>


            <button onClick={() => (document.getElementById('modal-tenants-create') as HTMLDialogElement).showModal()}>Create Tenant</button>
        </div>
    );
}
