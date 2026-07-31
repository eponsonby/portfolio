import { useState } from 'react';
import Card from '../../components/Card/Card.jsx';
import shared from '../../styles/shared.module.css';
import styles from './About.module.css';

const EMAIL = 'erinponsonby@gmail.com';

// Placeholder — LinkedIn/GitHub hrefs need your real profile URLs.
const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/erinponsonby/', newTab: true },
  { label: 'GitHub', href: 'https://github.com/eponsonby', newTab: true },
  { label: 'Resume', href: '/Erin-Ponsonby-Resume.pdf', newTab: true },
];

export default function About() {
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <div className={shared.pageHeader}>
        <p className={shared.eyebrow}>About</p>
        <h1 className={shared.title}>About</h1>
      </div>

      <section className={shared.section}>
        <div className={styles.layout}>
          <div className={styles.bio}>
            <p>
              Brooklyn based product manager. At work, I love to collaborate with kind, growth-minded folks to build software. Outside of it, you'll find me
              running around the city, ostensibly for exercise, attempting to knit something way above my paygrade, and general shenanigan-ing.
            </p>
          </div>

          <Card className={styles.sidebar}>
            <p className={styles.sidebarTitle}>Connect</p>
            <button type="button" onClick={handleCopyEmail} className={`${styles.linkRow} ${styles.linkButton}`}>
              {copied ? 'Copied!' : EMAIL}
              <span>{copied ? '✓' : '⧉'}</span>
            </button>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.linkRow}
                {...(link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
                <span>→</span>
              </a>
            ))}
          </Card>
        </div>
      </section>
    </>
  );
}
