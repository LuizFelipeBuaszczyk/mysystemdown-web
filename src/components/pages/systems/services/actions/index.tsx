"use client";

interface ServiceFormButtonsProps {
    systemPk: string;
}

export default function ServiceFormButtons({ systemPk }: ServiceFormButtonsProps) {
    return (
        <button onClick={() => (document.getElementById(`modal-services-create-${systemPk}`) as HTMLDialogElement).showModal()}>
            Create Service
        </button>
    );
}
