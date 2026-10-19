import { PortableText, type PortableTextBlockComponent, type PortableTextComponents } from '@portabletext/react';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  blogDescription, blogImageSchema, blogIndexPath, getBlogReadingMinutes, getBlogSections, safeBlogLink, sizedImage,
  type BlogPageData, type BlogPost, type BlogSummary,
} from '../blog/schema';
import { siteUrl } from '../site';

// The blog: the list of stories and each article. Ported from the FoundryOps
// blog (src/am/BlogPage.tsx). Here the posts are built into each page at build
// time, so nothing is fetched in the browser.

const formatDate = (value: string) => new Intl.DateTimeFormat('en-MY', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kuala_Lumpur',
}).format(new Date(value));

type IconName = 'arrow-left' | 'arrow-right' | 'share' | 'link' | 'mail' | 'file-text';
const iconPaths: Record<IconName, ReactNode> = {
  'arrow-left': <path d="M19 12H5m6 6-6-6 6-6" />,
  'arrow-right': <path d="M5 12h14m-6-6 6 6-6 6" />,
  share: <><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" /><path d="m16 6-4-4-4 4M12 2v13" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  'file-text': <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></>,
};
const Icon = ({ name, size = 16 }: { name: IconName; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {iconPaths[name]}
  </svg>
);

type Sections = ReturnType<typeof getBlogSections>;
const SectionsContext = createContext<Sections>([]);
const BlogHeading: PortableTextBlockComponent = ({ value, children }) => {
  const sections = useContext(SectionsContext);
  const id = sections.find((section) => section.key === value._key)?.id;
  return value.style === 'h3' ? <h3 id={id}>{children}</h3> : <h2 id={id}>{children}</h2>;
};
const bodyComponents: PortableTextComponents = {
  block: { h2: BlogHeading, h3: BlogHeading },
  types: {
    image: ({ value }) => {
      const image = blogImageSchema.safeParse(value);
      if (!image.success) return null;
      return <figure><img src={sizedImage(image.data.url, 1440)} alt={image.data.alt} loading="lazy" />{image.data.caption && <figcaption>{image.data.caption}</figcaption>}</figure>;
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href = typeof value?.href === 'string' ? safeBlogLink(value.href) : undefined;
      return href ? <a href={href}>{children}</a> : <>{children}</>;
    },
  },
};

const PostMeta = ({ post }: { post: BlogSummary }) => (
  <time className="vp-blog-meta" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
);

/** The blog's pages; [data] comes from the build (or is missing in `npm run dev`). */
export function Blog({ data }: { data: BlogPageData | undefined }) {
  if (!data) {
    return (
      <div className="vp-blog"><div className="vp-journal-wrap">
        <BlogState title="Blog pages are built with the site." text="Run npm run build, then npm run preview, to see the published posts." />
      </div></div>
    );
  }
  return data.kind === 'index' ? <BlogIndex page={data.page} pages={data.pages} posts={data.posts} /> : <Article post={data.post} related={data.related} />;
}

const BlogState = ({ title, text }: { title: string; text: string }) => (
  <div className="vp-blog-state" role="status">
    <Icon name="file-text" size={32} />
    <h2>{title}</h2>
    <p>{text}</p>
  </div>
);

function BlogIndex({ page, pages, posts }: { page: number; pages: number; posts: BlogSummary[] }) {
  return (
    <div className="vp-blog vp-blog--index">
      <div className="vp-journal-wrap">
        <header className="vp-journal-masthead">
          <h1>Blog</h1>
          <p>{blogDescription}</p>
        </header>
        <section className="vp-blog-list" aria-labelledby="blog-heading">
          <div className="vp-journal-section-head"><h2 id="blog-heading">{page === 1 ? 'Latest stories' : 'From the archive'}</h2></div>
          {posts.length === 0 ? (
            <BlogState title="A new chapter is on its way." text="Guides, product news and notes from the team will appear here." />
          ) : (
            <div className="vp-blog-stories">{posts.map((post) => (
              <article key={post.id} className="vp-blog-story">
                <a className={`vp-blog-story__link ${post.coverImage ? 'has-cover' : ''}`} href={`/blog/${post.slug}/`}>
                  <div className="vp-blog-story__body">
                    <PostMeta post={post} />
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="vp-blog-story__end"><span>By {post.author}</span><span>Read story <Icon name="arrow-right" size={14} /></span></div>
                  </div>
                  {post.coverImage && <img className="vp-blog-story__cover" src={sizedImage(post.coverImage.url, 640)} alt={post.coverImage.alt} loading="lazy" />}
                </a>
              </article>
            ))}</div>
          )}
          {pages > 1 && (
            <nav className="vp-blog-pagination" aria-label="Blog pages">
              {page > 1 ? <a className="vp-blog-small-button" href={blogIndexPath(page - 1)}><Icon name="arrow-left" size={14} />Newer posts</a> : <span />}
              <span>Page {page} of {pages}</span>
              {page < pages ? <a className="vp-blog-small-button" href={blogIndexPath(page + 1)}>Older posts<Icon name="arrow-right" size={14} /></a> : <span />}
            </nav>
          )}
        </section>
      </div>
    </div>
  );
}

const AuthorIdentity = ({ author, closing }: { author: string; closing?: boolean }) => (
  <div className="vp-blog-author">
    <span className="vp-blog-avatar"><img src="/assets/img/icon-96.png" alt="" width={42} height={42} /></span>
    <div>
      {closing && <span className="vp-blog-author__label">Written by</span>}
      <span className="vp-blog-author__name">{closing ? author : `By ${author}`}</span>
      <span className="vp-blog-author__bio">Vehicle inspections and records for fleets and families.</span>
    </div>
  </div>
);

function ShareArticle({ title, url, compact }: { title: string; url: string; compact?: boolean }) {
  const [status, setStatus] = useState('');
  const [fallbackUrl, setFallbackUrl] = useState('');
  const share = async () => {
    setStatus(''); setFallbackUrl('');
    try {
      if (!compact && navigator.share) { await navigator.share({ title, url }); return; }
      await navigator.clipboard.writeText(url);
      setStatus('Link copied');
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      setFallbackUrl(url); setStatus('Copy the link below');
    }
  };
  return (
    <div className={`vp-blog-share ${compact ? 'vp-blog-share--compact' : ''}`}>
      <button type="button" onClick={() => void share()} aria-label={compact ? 'Copy article link' : 'Share article'}>
        <Icon name={compact ? 'link' : 'share'} size={16} />{!compact && 'Share'}
      </button>
      {compact && (
        <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`} aria-label="Share article by email">
          <Icon name="mail" size={16} />
        </a>
      )}
      <span role="status" className="vp-blog-share__status">{status}</span>
      {fallbackUrl && <input aria-label="Article link to copy" readOnly value={fallbackUrl} onFocus={(event) => event.currentTarget.select()} />}
    </div>
  );
}

function ArticleContents({ sections }: { sections: Sections }) {
  const [active, setActive] = useState('blog-introduction');
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = 'blog-introduction';
      for (const section of sections) {
        if ((document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity) <= 150) current = section.id;
      }
      const last = sections.at(-1);
      if (last && window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
        && (document.getElementById(last.id)?.getBoundingClientRect().top ?? Infinity) < window.innerHeight - 80) current = last.id;
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, [sections]);
  return (
    <nav className="vp-blog-toc" aria-label="On this page">
      <a href="#blog-introduction" className={active === 'blog-introduction' ? 'is-active' : ''} aria-current={active === 'blog-introduction' ? 'location' : undefined}>Introduction</a>
      {sections.map((section) => (
        <a key={section.id} href={`#${section.id}`} className={`${active === section.id ? 'is-active' : ''} ${section.level === 'h3' ? 'is-nested' : ''}`} aria-current={active === section.id ? 'location' : undefined}>{section.title}</a>
      ))}
    </nav>
  );
}

/** Open on wide screens, folded on phones (decided in the browser; the built page starts open). */
function ContentsPanel({ sections }: { sections: Sections }) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 820px)');
    const onChange = () => setOpen(!query.matches);
    onChange();
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return (
    <details className="vp-blog-contents" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>On this page</summary>
      <ArticleContents sections={sections} />
    </details>
  );
}

function RelatedPosts({ posts }: { posts: BlogSummary[] }) {
  if (!posts.length) return null;
  return (
    <section className="vp-blog-related" aria-labelledby="related-heading">
      <div className="vp-journal-section-head"><h2 id="related-heading">More from VehicleProof</h2><a href="/blog/">View all posts <Icon name="arrow-right" size={13} /></a></div>
      <div className="vp-blog-related__grid">{posts.map((post) => (
        <article key={post.id}>
          <a href={`/blog/${post.slug}/`}>
            {post.coverImage && <img src={sizedImage(post.coverImage.url, 480)} alt={post.coverImage.alt} loading="lazy" />}
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time><h3>{post.title}</h3><Icon name="arrow-right" size={14} />
          </a>
        </article>
      ))}</div>
    </section>
  );
}

function Article({ post, related }: { post: BlogPost; related: BlogSummary[] }) {
  const sections = useMemo(() => getBlogSections(post), [post]);
  // The address is known at build time, so the built page and the browser agree.
  const url = `${siteUrl}/blog/${post.slug}/`;
  return (
    <div className="vp-blog">
      <div className="vp-blog-layout">
        <aside className="vp-blog-sidebar">
          <a href="/blog/" className="vp-blog-back"><Icon name="arrow-left" size={14} />All posts</a>
          <ContentsPanel sections={sections} />
          <div className="vp-blog-sidebar__share"><span className="vp-blog-kicker">Share</span><ShareArticle title={post.title} url={url} compact /></div>
        </aside>
        <article className="vp-blog-article" aria-label={post.title}>
          <header className="vp-blog-article__header">
            <PostMeta post={post} />
            <h1>{post.title}</h1>
            <p className="vp-blog-deck">{post.excerpt}</p>
            <div className="vp-blog-byline"><AuthorIdentity author={post.author} /><span>{getBlogReadingMinutes(post)} min read</span></div>
          </header>
          {post.coverImage && (
            <figure className="vp-blog-article__cover">
              <img src={sizedImage(post.coverImage.url, 1440)} alt={post.coverImage.alt} />
              {post.coverImage.caption && <figcaption>{post.coverImage.caption}</figcaption>}
            </figure>
          )}
          <SectionsContext.Provider value={sections}>
            <div className="vp-blog-prose" id="blog-introduction"><PortableText value={post.body} components={bodyComponents} /></div>
          </SectionsContext.Provider>
          <div className="vp-blog-article__actions"><span>Thanks for reading.</span><ShareArticle title={post.title} url={url} /></div>
          <div className="vp-blog-author-card"><AuthorIdentity author={post.author} closing /><a href="/blog/" className="vp-blog-small-button">More stories</a></div>
          <RelatedPosts posts={related} />
        </article>
      </div>
    </div>
  );
}
