// Structured data (schema.org, as JSON-LD) that tells search engines and AI
// tools what VehicleProve is, who makes it, what it costs and what each post
// is. It describes only what the page itself shows.
import type { BlogPost } from './blog/schema';
import { faqs } from './content';
import { PRICES } from './market';
import { siteUrl, supportEmail } from './site';

const organizationId = `${siteUrl}/#organization`;
const appId = `${siteUrl}/#app`;

const organization = {
  '@type': 'Organization',
  '@id': organizationId,
  name: 'VehicleProve',
  url: `${siteUrl}/`,
  logo: `${siteUrl}/assets/img/apple-touch-icon.png`,
  email: supportEmail,
  foundingLocation: { '@type': 'Place', name: 'Malaysia' },
  parentOrganization: { '@type': 'Organization', name: 'FoundryOps' },
};

const website = {
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: 'VehicleProve',
  url: `${siteUrl}/`,
  publisher: { '@id': organizationId },
};

/** A monthly price, in ringgit and in US dollars, as the plans section shows them. */
const monthly = (name: string, ringgit: string, dollars: string, description: string) =>
  [['MYR', ringgit], ['USD', dollars]].map(([currency, price]) => ({
    '@type': 'Offer',
    name,
    description,
    price: price.replace(/[^0-9.]/g, ''),
    priceCurrency: currency,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: price.replace(/[^0-9.]/g, ''),
      priceCurrency: currency,
      unitText: 'MONTH',
    },
  }));

const app = {
  '@type': 'SoftwareApplication',
  '@id': appId,
  name: 'VehicleProve',
  url: `${siteUrl}/`,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Web',
  description: 'Vehicle inspection app for car rental companies, used car dealers, workshops, fleets, leasing companies and insurers: guided photo inspections, AI damage comparison, sealed PDF condition reports, customer sign-off and renewal reminders.',
  publisher: { '@id': organizationId },
  offers: [
    { '@type': 'Offer', name: 'Free', description: 'One vehicle on one device.', price: '0', priceCurrency: 'USD' },
    ...monthly('Pro (family plan)', PRICES.MY.pro, PRICES.INTL.pro, 'Up to 6 vehicles for a household.'),
    ...monthly('Enterprise', PRICES.MY.tiers[20], PRICES.INTL.tiers[20], 'From 20 vehicles, the whole team included; priced per vehicle.'),
  ],
};

/** The home page's questions, in the words the pre-rendered page shows. */
const faqPage = {
  '@type': 'FAQPage',
  '@id': `${siteUrl}/#faq`,
  mainEntity: faqs('INTL').map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

/** One post: what it is, who wrote it, when, and where it sits on the site. */
function article(post: BlogPost, url: string) {
  return [
    {
      '@type': 'BlogPosting',
      '@id': `${url}#post`,
      headline: post.title,
      description: post.excerpt,
      url,
      mainEntityOfPage: url,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      author: post.author === 'VehicleProve'
        ? { '@id': organizationId }
        : { '@type': 'Person', name: post.author },
      publisher: { '@id': organizationId },
      ...(post.coverImage ? { image: `${post.coverImage.url}?w=1200&auto=format&fit=max` } : {}),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog/` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ];
}

export type StructuredPage = { path: string; post?: BlogPost };

/** The JSON-LD for a page: who we are on every page, the app and its FAQ on the home page, the post on an article. */
export function structuredData({ path, post }: StructuredPage): string {
  const graph: object[] = [organization, website];
  if (path === '/') graph.push(app, faqPage);
  if (post) graph.push(...article(post, siteUrl + path));
  // "<" is written as < so no text can close the script tag.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}
