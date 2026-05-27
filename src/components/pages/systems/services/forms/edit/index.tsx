"use client";

import { useState } from 'react';

import Modal from '@/components/modal';
import Form from '@/components/form';

interface EditServiceFormProps {
    service: {
        id: string;
        title: string;
        url: string;
        description: string | null;
        is_active: boolean;
        health_check_interval: number;
    };
}

export default function EditServiceForm({ service }: EditServiceFormProps) {
    const [formData, setFormData] = useState({
        title: service.title,
        url: service.url,
        description: service.description || '',
        is_active: service.is_active,
        health_check_interval: service.health_check_interval,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked,
        });
    };

    return (
        <Modal id={`modal-services-edit-${service.id}`}>
            <h1>Edit Service</h1>
            <Form endpoint={`services/${service.id}`} formData={formData} method="PATCH">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formData.title} required onChange={handleChange} />

                <label htmlFor="url">URL:</label>
                <input type="url" id="url" name="url" value={formData.url} required onChange={handleChange} />

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={formData.description || ''} onChange={handleChange}></textarea>

                <label htmlFor="is_active">Active:</label>
                <input type="checkbox" id="is_active" name="is_active" checked={formData.is_active} onChange={handleCheckboxChange} />

                <label htmlFor="health_check_interval">Health Check Interval (minutes):</label>
                <input type="number" id="health_check_interval" name="health_check_interval" value={formData.health_check_interval} min={10} onChange={handleChange} />

                <button type="submit">Save</button>
            </Form>
        </Modal>
    );
}
