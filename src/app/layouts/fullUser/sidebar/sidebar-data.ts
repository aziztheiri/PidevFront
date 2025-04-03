import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Espace Client',
  },
  {
    displayName: 'Accueil',
    iconName: 'home', // 🏠 Home icon for the dashboard
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
    iconName: 'message-circle', // 💬 Represents user feedback or complaints
    route: '/user/reclamations',
  },
  {
    displayName: 'Mes Sinistres',
    iconName: 'alert-triangle', // ⚠️ Represents incidents/claims
    route: '/user/sinistre-list',
  },

  {
    displayName: 'Mes Paiements',
    iconName: 'file-text', //
    route: '/user/payments',
  },
  {
    displayName: 'Postes',
    iconName: 'file-text', //
    route: '/user/posts',
  },
  {
    displayName: 'Mes Postes',
    iconName: 'file-text', //
    route: '/user/myposts',
  },
  

];


