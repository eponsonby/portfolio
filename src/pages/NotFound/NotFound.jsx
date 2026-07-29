import { Link } from 'react-router-dom';
import shared from '../../styles/shared.module.css';
import Card from '../../components/Card/Card.jsx';

export default function NotFound() {
  return (
    <div className={shared.pageHeader}>
      <p className={shared.eyebrow}>404</p>
      <h1 className={shared.title}>Dropped a stitch.</h1>
      <p className={shared.desc}>That page doesn't exist. Let's get you back on track.</p>
      <Card as={Link} to="/" style={{ display: 'inline-block', textDecoration: 'none', marginTop: 'var(--space-6)' }}>
        Back home →
      </Card>
    </div>
  );
}
