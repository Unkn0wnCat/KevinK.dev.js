module.exports = {
    siteMetadata: {
        title: `KevinK.dev`,
        author: `@Unkn0wnKevin`,
        siteUrl: `https://kevink.dev`,
      },
    plugins: [
        `gatsby-plugin-sharp`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `KevinK.dev`,
                short_name: `KevinK.dev`,
                start_url: `/`,
                background_color: `#000710`,
                theme_color: `#000710`,
                display: `minimal-ui`,
                icon: `src/images/fullbglogo@10x.png`, // This path is relative to the root of the site.
                cache_busting_mode: 'none',
            },
        },
        `gatsby-plugin-robots-txt`,
        {
            resolve: `gatsby-plugin-offline`,
            options: {
                precachePages: ["/en", "/de"],
                workboxConfig: {
                globPatterns: ['**/*']
                }
            },
        },
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-react-i18next`,
            options: {
              path: `${__dirname}/locales`,
              languages: [`en`, `de`],
              defaultLanguage: null,
              siteURL: "https://kevink.dev",
              i18nextOptions: {
                interpolation: {
                  escapeValue: false // not needed for react as it escapes by default
                },
                keySeparator: false,
                nsSeparator: false
              }
            }
          }
    ]
}