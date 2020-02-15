export const environment = {
  production: true,
  isMockupEnabled: false,
  api: {
    baseUrl: 'https://api-h4ad.herokuapp.com/prod',
    getProjects: '/projects?join=badges',
    getBadges: '/badges',
  },
};
