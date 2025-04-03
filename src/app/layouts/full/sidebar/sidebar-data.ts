import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Admin Dashboard',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/admin/dashboard',
  },
  {
    displayName: 'Utilisateurs',
    iconName: 'user',
    route: '/admin/users', // Updated route
  },
  {
    displayName: 'Devis',
    iconName: 'file-text',
    route: '/admin/devis', // Updated route
  },
  {
    displayName: 'Paiements',
    iconName: 'credit-card',
    route: '/admin/paiement',
  },
{
    displayName: 'Reponses',
    iconName: 'message-circle',
    route: '/admin/reponse', 
  },
  {
    displayName: 'Clusters',
    iconName: 'circle-dot',
    route: '/admin/cluster',
  },
  {
    displayName: 'Sinistres',
    iconName: 'circle-dot',
    route: '/admin/admin-sinistre-list',
  }
 
];
