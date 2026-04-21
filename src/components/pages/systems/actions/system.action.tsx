"use client";

import Button from "@/components/button/button";

export default function SystemFormButtons() {
    return (
        <Button selectFunction="openModal" functionParameters={{ id: 'modal-systems-create' }}>
            Create System
        </Button>
    );
}