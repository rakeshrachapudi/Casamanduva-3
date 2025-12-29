import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to CASAMANDUVA homepage."
      />

      <section style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--space-2xl)',
        background: 'var(--color-ivory)',
      }}>
        <div>
          <h1 style={{ fontSize: '8rem', fontWeight: '200', color: 'var(--color-gold)', marginBottom: '0' }}>404</h1>
          <h2 style={{ marginBottom: 'var(--space-md)' }}>Page Not Found</h2>
          <p style={{ marginBottom: 'var(--space-lg)', maxWidth: '400px', margin: '0 auto var(--space-lg)' }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">Go Home</Link>
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
