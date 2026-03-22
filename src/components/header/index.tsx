import styles from '@/components/header/header.module.css';

import Link from 'next/link';

export default function Header(){
    return (
        <header className={styles.container}>
            <Link href='/'> 
                <h1>MySystemDown</h1>
            </Link>
            <nav>
                <ul>
                    <li className={styles.linkItem}>
                        <Link href='/sign-in'>Sign-IN</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}