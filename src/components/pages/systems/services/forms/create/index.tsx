"use client";

import { useState } from 'react';

import Modal from '@/components/modal';
import Form from '@/components/form';

interface CreateServiceFormProps {
    systemPk: string;
}

export default function CreateServiceForm({ systemPk }: CreateServiceFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        description: '',
        health_check_interval: 10,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    return (
        <Modal id={`modal-services-create-${systemPk}`}>
            <h1>Create Service</h1>
            <Form endpoint={`systems/${systemPk}/services`} formData={formData}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" required onChange={handleChange} />

                <label htmlFor="url">URL:</label>
                <input type="url" id="url" name="url" required onChange={handleChange} />

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" onChange={handleChange}></textarea>

                <label htmlFor="health_check_interval">Health Check Interval (minutes):</label>
                <input type="number" id="health_check_interval" name="health_check_interval" min={10} onChange={handleChange} />

                <button type="submit">Create</button>
            </Form>
        </Modal>
    );
}
