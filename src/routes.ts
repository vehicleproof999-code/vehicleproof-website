import type { ComponentType } from 'react';
import DeleteAccount from './pages/DeleteAccount';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
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
    title: "VehicleProof: your vehicle's history, with proof",
    description: 'Photo-proof inspections, service history, documents and renewal reminders for every vehicle you own, rent out or manage.',
  },
  {
    path: '/privacy/', page: Privacy, document: true,
    title: 'Privacy Policy · VehicleProof',
    description: 'How VehicleProof collects, uses, stores and protects your personal data.',
  },
  {
    path: '/terms/', page: Terms, document: true,
    title: 'Terms of Service · VehicleProof',
    description: 'The terms for using the VehicleProof app and website.',
  },
  {
    path: '/delete-account/', page: DeleteAccount, document: true,
    title: 'Delete your account · VehicleProof',
    description: 'How to delete your VehicleProof account and data, in the app or by email.',
  },
  {
    path: '/support/', page: Support, document: true,
    title: 'Support · VehicleProof',
    description: 'Get help with VehicleProof.',
  },
  {
    path: '/404', page: NotFound, document: true, noindex: true,
    title: 'Page not found · VehicleProof',
    description: "That page doesn't exist.",
  },
];

/** The route for an address; unknown addresses get the not-found page. */
export function findRoute(pathname: string): Route {
  const path = pathname.endsWith('/') || pathname === '/404' ? pathname : `${pathname}/`;
  return routes.find((route) => route.path === path) ?? routes[routes.length - 1];
}
