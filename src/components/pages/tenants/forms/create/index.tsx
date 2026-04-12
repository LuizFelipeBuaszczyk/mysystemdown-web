"use client"

import { useState } from 'react';

import styles from '@/components/pages/tenants/forms/create/create.module.css';

import Form from "@/components/form"
import Modal from "@/components/modal"
import { CreateTenantRequestBody, ClientTenantBody } from '@/schemas/tenant.schema';

export default function CreateTenantForm() {
    const [clientData, setClientData] = useState<ClientTenantBody>({
        name: '',
        schema_name: ''
    })
    const [formData, setFormData] = useState<CreateTenantRequestBody>({
        client: clientData
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
        <Modal id='modal-tenants-create' setOpen={setOpenCreateModal}>
            <div className={styles.container}>
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
            </div>
        </Modal>
    );
}