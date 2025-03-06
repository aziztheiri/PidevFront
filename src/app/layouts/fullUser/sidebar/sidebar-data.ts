import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Espace Client',
  },
  {
    displayName: 'Accueil',
    iconName: 'home',
    route: '/user/home',
  },
  {
    displayName: 'Mes Devis',
    iconName: 'file',
    expanded: false,
    children: [
      {
        displayName: 'Demander un devis',
        iconName: 'file-plus',
        route: '/user/demander-devis',
      },
      {
        displayName: 'Consulter les devis',
        iconName: 'file-text',
        route: '/user/consulter-devis',
      },
    ],
  },
  {
    displayName: 'Mes Réclamations',
    iconName: 'message-circle',
    route: '/user/reclamations',
  },
  {
    displayName: 'Mes Sinistres',
    iconName: 'alert-triangle',
    route: '/user/sinistres',
  },
];