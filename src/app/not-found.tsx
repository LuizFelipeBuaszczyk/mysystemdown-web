import Link from 'next/link'
 
import styles from '@/styles/not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>Not Found</h1>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}