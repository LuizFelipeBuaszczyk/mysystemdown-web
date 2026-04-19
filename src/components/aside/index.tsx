
import styles from '@/components/aside/aside.module.css';

import Link from 'next/link';

export default function Aside() {
    return (
        <aside className={styles.container}>
            <h2>MySystemDown</h2>
            <nav className={styles.navBar}>
                <ul className={styles.navList}>
                    <section className={styles.navSection}>
                        <Link href="/dashboard">Dashboard</Link>
                        <hr />
                    </section>
                </ul>
                <ul className={styles.navList}>
                    <section className={styles.navSection}>
                        <Link href="/systems">Systems</Link>
                        <hr />
                    </section>
                </ul>
            </nav>
        </aside>
    );
}