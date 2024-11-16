export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'fr',
  messages: {
    fr: {
      welcome: 'Bienvenue sur ProjectHub',
      search: {
        label: 'Rechercher des projets',
        placeholder: 'Rechercher par nom, client, technologie...'
      },
      status: {
        label: 'Statut',
        in_development: 'En développement',
        in_maintenance: 'En maintenance',
        in_production: 'En production',
        upcoming: 'À venir',
        archived: 'Archivé'
      },
      sort: {
        label: 'Trier par',
        status: 'Statut',
        created_at: 'Date de création',
        name: 'Nom du projet',
        client: 'Nom du client',
        asc: 'Croissant',
        desc: 'Décroissant'
      },
      filters: {
        active: 'Filtres actifs',
        clear: 'Effacer tout',
        search: 'Recherche'
      },
      project: {
        new: 'Nouveau projet',
        edit: 'Modifier',
        delete: 'Supprimer',
        name: 'Nom du projet',
        description: 'Description',
        client: 'Client',
        thumbnail: 'Image',
        tech_stack: 'Technologies',
        environments: {
          title: 'Environnements',
          development: 'Développement',
          staging: 'Pré-production',
          production: 'Production',
          figma: 'Design',
          frontend: 'Frontend',
          backend: 'Backoffice',
          figma_discovery: 'Figma Discovery'
        }
      },
      auth: {
        login: 'Connexion admin',
        logout: 'Déconnexion',
        email: 'Adresse email',
        password: 'Mot de passe',
        submit: 'Se connecter'
      },
      empty: {
        title: 'Aucun projet trouvé',
        description: 'Créez votre premier projet pour commencer !',
        filtered: 'Aucun projet ne correspond à vos filtres actuels.'
      }
    },
    en: {
      welcome: 'Welcome to ProjectHub',
      search: {
        label: 'Search Projects',
        placeholder: 'Search by name, client, technology...'
      },
      status: {
        label: 'Status',
        in_development: 'In Development',
        in_maintenance: 'In Maintenance',
        in_production: 'In Production',
        upcoming: 'Upcoming',
        archived: 'Archived'
      },
      sort: {
        label: 'Sort by',
        status: 'Status',
        created_at: 'Creation Date',
        name: 'Project Name',
        client: 'Client Name',
        asc: 'Ascending',
        desc: 'Descending'
      },
      filters: {
        active: 'Active Filters',
        clear: 'Clear all',
        search: 'Search'
      },
      project: {
        new: 'New Project',
        edit: 'Edit',
        delete: 'Delete',
        name: 'Project Name',
        description: 'Description',
        client: 'Client',
        thumbnail: 'Thumbnail',
        tech_stack: 'Tech Stack',
        environments: {
          title: 'Environments',
          development: 'Development',
          staging: 'Pre-production',
          production: 'Production',
          figma: 'Design',
          frontend: 'Frontend',
          backend: 'Backoffice',
          figma_discovery: 'Figma Discovery'
        }
      },
      auth: {
        login: 'Admin Login',
        logout: 'Logout',
        email: 'Email address',
        password: 'Password',
        submit: 'Sign in'
      },
      empty: {
        title: 'No projects found',
        description: 'Create your first project to get started!',
        filtered: 'No projects match your current filters.'
      }
    }
  }
}))