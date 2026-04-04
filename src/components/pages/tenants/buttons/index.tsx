"use client"

export default function TenantFormButtons() {
    return (
        <button onClick={() => (document.getElementById('modal-tenants-create') as HTMLDialogElement).showModal()}>Create Tenant</button>
    );
}