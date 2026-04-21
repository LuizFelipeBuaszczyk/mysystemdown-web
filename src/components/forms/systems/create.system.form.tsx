"use client";

import { useState, useEffect } from 'react';

import Modal from '@/components/modal';
import Form from '@/components/form';

export default function CreateSystemForm() {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Modal id='modal-systems-create'>
                <h1>Create System</h1>
                <Form endpoint={'/systems'} formData={formData}>

                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required onChange={handleChange} />

                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" required onChange={handleChange}></textarea>

                    <button type="submit">Create</button>
                </Form>
        </Modal>
    );
}