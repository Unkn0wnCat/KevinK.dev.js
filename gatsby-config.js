/* eslint-disable no-undef */
const extConfig = require("./config");

module.exports = {
    siteMetadata: {
        title: extConfig.siteName,
        author: extConfig.siteAuthor,
        siteUrl: extConfig.siteURL,
        keywords: extConfig.siteKeywords,
        payPalMail: extConfig.payPalMail,
        contactEmail: extConfig.contactEmail,
        contactPhone: extConfig.contactPhone,
        mapsLink: extConfig.mapsLink,
        contactTwitter: extConfig.contactTwitter,
        contactGitHub: extConfig.contactGitHub,
        contactMastodon: extConfig.contactMastodon,
        contactMastodonHref: extConfig.contactMastodonHref,
    },
    plugins: [
        `gatsby-plugin-eslint`,
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-plugin-remote-images`,
            options: {
                nodeType: 'SocialsJson',
                imagePath: 'image',
            },
        },
        {
            resolve: `gatsby-plugin-remote-images`,
            options: {
                nodeType: 'FriendsJson',
                imagePath: 'imageURL',
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/textblocks`,
                name: `textblocks`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/projectTextblocks`,
                name: `projectTextblocks`,
            },
        },
        "gatsby-plugin-mdx",
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./content/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/locales`,
                name: `locale`,
            },
        },
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: extConfig.siteName,
                short_name: extConfig.siteName,
                start_url: `/`,
                background_color: `#000710`,
                theme_color: `#e52b3e`,
                display: `minimal-ui`,
                icon: extConfig.iconPath, // This path is relative to the root of the site.
                cache_busting_mode: "none",
            },
        },
        `gatsby-plugin-robots-txt`,
        /*{
            resolve: `gatsby-plugin-offline`,
            options: {
                precachePages: [
                    "/",
                    "/en",
                    "/en/projects",
                    "/de",
                    "/de/projects",
                ],
            },
        },*/
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-react-i18next`,
            options: {
                localeJsonSourceName: `locale`,
                languages: extConfig.languages,
                defaultLanguage: `en`,
                generateDefaultLanguagePage: true,
                siteUrl: extConfig.siteURL,
                i18nextOptions: {
                    interpolation: {
                        escapeValue: false, // not needed for react as it escapes by default
                    },
                    keySeparator: false,
                    nsSeparator: false,
                },
                pages: [
                    {
                        matchPath: "/:lang/projects/:urlname",
                        getLanguageFromPath: true,
                        excludeLanguages: extConfig.languages,
                    },
                ],
            },
        },
    ],
};
