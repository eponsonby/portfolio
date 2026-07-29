import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card.jsx';
import shared from '../../styles/shared.module.css';
import styles from './BlogList.module.css';
import { blogPosts } from '../../data/blogPosts.js';

export default function BlogList() {
  return (
    <>
      <div className={shared.pageHeader}>
        <p className={shared.eyebrow}>Work / Blog</p>
        <h1 className={shared.title}>Blog</h1>
        <p className={shared.desc}>Random things I've learned and googled lately.</p>
      </div>

      <section className={shared.sectionNarrow}>
        <div className={styles.postList}>
          {blogPosts.map((post) => (
            <Card key={post.slug} as={Link} to={`/work/blog/${post.slug}`} viewTransition className={styles.postCard}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postMeta}>{post.date}</p>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
