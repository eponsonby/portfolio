import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr className={styles.stitch} />
      <p>&copy; {new Date().getFullYear()} Erin Ponsonby</p>
    </footer>
  );
}
