
import styles from '@/components/modal/modal.module.css';

interface ModalProps {
    id: string;
    setOpen: (open: boolean) => void;
    children: React.ReactNode;
}

export default function Modal({ id, setOpen, children }: ModalProps) {
    return (
        <dialog className={styles.container} onClose={() => setOpen(false)} id={id}>
            <div className={styles.top}>
                <button onClick={() => (document.getElementById(id) as HTMLDialogElement).close()} className={styles.closeButton}>
                    X
                </button>
            </div>
            <div className={styles.content}>    
                {children}
            </div>
        </dialog>
    );
}