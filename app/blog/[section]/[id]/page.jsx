import Link from 'next/link';
import { fetchPost, getImageUrl, STRAPI_URL } from '@/lib/strapi';
import PostAnimations from './PostAnimations';

export async function generateMetadata({ params }) {
  const { section, id } = await params;
  const post = await fetchPost(section, id);
  if (!post) return { title: 'YORREN | Post Not Found' };
  const attrs = post.attributes || post;
  return {
    title: `YORREN | ${attrs.Title || 'Post'}`,
    description: (attrs.Blog || '').substring(0, 160) || 'Read the latest dispatch from the frontier.',
  };
}

export default async function PostPage({ params }) {
  const { section, id } = await params;
  const post = await fetchPost(section, id);

  if (!post) {
    return (
      <main className="post-main">
        <section className="post-hero">
          <div className="container narrow">
            <Link href="/blog" className="back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              BACK TO FEED
            </Link>
            <h1>Post not found</h1>
          </div>
        </section>
      </main>
    );
  }

  const attrs = post.attributes || post;
  const title = attrs.Title || 'Untitled';
  const author = attrs.Author || 'Yorren';
  const date = attrs.Date ? new Date(attrs.Date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const blog = attrs.Blog || '';
  const imageUrl = getImageUrl(post);

  return (
    <main className="post-main">
      <section className="post-hero">
        <div className="container narrow">
          <Link href="/blog" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            BACK TO FEED
          </Link>
          <div className="post-header">
            <div className="post-meta">
              <span className="post-category">{section.replace('-', ' ').toUpperCase()}</span>
              <span className="modal-dot">·</span>
              <span>{date}</span>
            </div>
            <h1>{title}</h1>
            <div className="post-author-info">
              <span className="author-avatar">{author.charAt(0).toUpperCase()}</span>
              <span className="author-name">{author}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="post-content-section">
        <div className="container narrow">
          {imageUrl && (
            <div className="post-main-image">
              <img src={imageUrl} alt={title} />
            </div>
          )}
          <div className="post-article-body" dangerouslySetInnerHTML={{ __html: blog }} />
        </div>
      </section>

      <PostAnimations />
    </main>
  );
}
