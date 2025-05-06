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
    displayName: 'Policy Insights & Actions',
    iconName: 'trending-up',
    route: '/admin/cluster',
  },
  {
    displayName: 'Sinistres',
    iconName: 'alert-triangle',
    route: '/admin/admin-sinistre-list',
  } , {
    displayName: 'Agences',
    iconName: 'building',
    route: '/admin/agences',
  },
  {
    displayName: 'Performances',
    iconName: 'chart-bar',
    route: '/admin/performances',
  },
 
];
