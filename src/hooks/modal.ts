
interface ModalProps {
    id: string;
}

function openModal({ id }: ModalProps) {
    (document.getElementById(id) as HTMLDialogElement).showModal();
}

export { openModal };