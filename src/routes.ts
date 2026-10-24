import type { ComponentType } from 'react';
import DeleteAccount from './pages/DeleteAccount';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Personal from './pages/Personal';
import Privacy from './pages/Privacy';
import Support from './pages/Support';
import Terms from './pages/Terms';

export type Route = {
  /** The address, with a trailing slash. "/404" becomes 404.html. */
  path: string;
  title: string;
  description: string;
  page: ComponentType;
  /** Legal and help pages use the narrow reading layout. */
  document: boolean;
  noindex?: boolean;
};

export const routes: Route[] = [
  {
    path: '/', page: Home, document: false,
    title: 'VehicleProve: vehicle inspection software for rental, fleets, dealers, leasing and insurance',
    description: 'Guided photo inspections, sealed condition reports and renewal reminders for car rental companies, fleets, used car dealers, leasing companies and insurers. Staff inspect on their phones; managers see everything in the web app.',
  },
  {
    path: '/personal/', page: Personal, document: false,
    title: 'VehicleProve for your car: inspections, service history and reminders',
    description: 'Photo inspections, service history, documents and renewal reminders for your own car. Free for one car; Pro covers the whole family.',
  },
  {
    path: '/privacy/', page: Privacy, document: true,
    title: 'Privacy Policy · VehicleProve',
    description: 'How VehicleProve collects, uses, stores and protects your personal data.',
  },
  {
    path: '/terms/', page: Terms, document: true,
    title: 'Terms of Service · VehicleProve',
    description: 'The terms for using the VehicleProve app and website.',
  },
  {
    path: '/delete-account/', page: DeleteAccount, document: true,
    title: 'Delete your account · VehicleProve',
    description: 'How to delete your VehicleProve account and data, in the app or by email.',
  },
  {
    path: '/support/', page: Support, document: true,
    title: 'Support · VehicleProve',
    description: 'Get help with VehicleProve.',
  },
  {
    path: '/404', page: NotFound, document: true, noindex: true,
    title: 'Page not found · VehicleProve',
    description: "That page doesn't exist.",
  },
];

/** The blog's pages are made from its posts at build time (src/blog/schema.ts). */
export const isBlogPath = (pathname: string) => pathname === '/blog' || pathname.startsWith('/blog/');

/** The route for an address; unknown addresses get the not-found page. */
export function findRoute(pathname: string): Route {
  const path = pathname.endsWith('/') || pathname === '/404' ? pathname : `${pathname}/`;
  return routes.find((route) => route.path === path) ?? routes[routes.length - 1];
}
