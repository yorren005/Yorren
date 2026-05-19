import Link from 'next/link';
import { fetchPost, fetchPosts, getImageUrl } from '@/lib/strapi';
import PostAnimations from './PostAnimations';

export async function generateMetadata({ params }) {
  const { section, id } = await params;
  const post = await fetchPost(section, id);
  if (!post) return { title: 'YORREN | Post Not Found' };
  const attrs = post.attributes || post;
  return {
    title: `YORREN | ${attrs.Title || 'Post'}`,
    description: (attrs.Blog || '').substring(0, 160).replace(/<[^>]*>/g, '') || 'Read the latest dispatch from the frontier.',
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

  // Fetch sibling posts for Next / Prev links
  let prevPost = null;
  let nextPost = null;
  try {
    const allPosts = await fetchPosts(section);
    const currentIndex = allPosts.findIndex(p => String(p.documentId || p.id) === String(id));
    if (currentIndex !== -1) {
      if (currentIndex > 0) {
        nextPost = allPosts[currentIndex - 1]; // Newer post
      }
      if (currentIndex < allPosts.length - 1) {
        prevPost = allPosts[currentIndex + 1]; // Older post
      }
    }
  } catch (e) {
    console.error('Error fetching sibling posts:', e);
  }

  return (
    <main className="post-main">
      {/* Scroll indicator bar */}
      <div className="reading-progress-container">
        <div className="reading-progress-bar" id="readingProgressBar" />
      </div>

      <section className="post-hero">
        <div className="container narrow">
          <Link href="/blog" className="back-link-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Feed
          </Link>
          <div className="post-header">
            <div className="post-meta">
              <span className="post-category">{section.replace('-', ' ').toUpperCase()}</span>
              <span className="meta-separator">/</span>
              <span className="post-date">{date}</span>
            </div>
            <h1 className="post-title">{title}</h1>
            <div className="post-author-info">
              <span className="author-avatar">{author.charAt(0).toUpperCase()}</span>
              <div className="author-details">
                <span className="author-name">{author}</span>
                <span className="author-title">Architecture Contributor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="post-content-section">
        <div className="container narrow">
          {imageUrl && (
            <div className="post-main-image">
              <img src={imageUrl} alt={title} />
              <div className="image-aspect-glow" style={{ backgroundImage: `url(${imageUrl})` }} />
            </div>
          )}
          <div className="post-article-body markdown-content" dangerouslySetInnerHTML={{ __html: blog }} />
        </div>
      </section>

      {/* Sibling navigation footer */}
      <section className="post-navigation-section">
        <div className="container narrow">
          <div className="post-nav-divider" />
          <div className="post-nav-grid">
            {prevPost ? (
              <Link href={`/blog/${section}/${prevPost.documentId || prevPost.id}`} className="post-nav-card prev-nav">
                <span className="nav-label">← PREVIOUS ARTICLE</span>
                <span className="nav-title">{prevPost.attributes?.Title || prevPost.Title}</span>
              </Link>
            ) : (
              <div className="post-nav-card empty-nav" />
            )}

            {nextPost ? (
              <Link href={`/blog/${section}/${nextPost.documentId || nextPost.id}`} className="post-nav-card next-nav">
                <span className="nav-label">NEXT ARTICLE →</span>
                <span className="nav-title">{nextPost.attributes?.Title || nextPost.Title}</span>
              </Link>
            ) : (
              <div className="post-nav-card empty-nav" />
            )}
          </div>
        </div>
      </section>

      <PostAnimations />
    </main>
  );
}
