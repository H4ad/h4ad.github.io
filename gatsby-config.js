module.exports = {
  siteMetadata: {
    name: `Vinícius Lourenço`,
    description: `Bem-vindo ao meu portfólio :)`,
    keywords: [`h4ad`, `vinicius`, `vinicius lourenço`, `developer`, `blog`],
    siteUrl: `https://viniciusl.com.br`,
    siteImage: `images/h4ad.jpg`,
    profileImage: `images/h4ad.jpg`,
    lang: `pt`,
    config: {
      sidebarWidth: 280,
    },
  },
  plugins: [
    {
      resolve: `@pauliescanlon/gatsby-theme-terminal`,
      options: {
        source: [`posts`, `projects`],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-MMKNPDE0CK',
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `viniciusl-com-br`
      }
    },
    'gatsby-plugin-root-import',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
  ],
}
