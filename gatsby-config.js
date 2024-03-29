/* eslint-disable no-undef */
const extConfig = require("./config");

const dynamicPlugins = [];

if (extConfig.modules.blog) {
    dynamicPlugins.push({
        resolve: `gatsby-plugin-feed`,
        options: {
            query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
            feeds: [
                {
                    serialize: ({ query: { site, blog } }) => {
                        return blog.nodes.map((node) => {
                            if (!node.childMdx) return null;

                            return {
                                title: node.childMdx.frontmatter.title,
                                description: node.childMdx.excerpt,
                                date: node.childMdx.frontmatter.date,
                                url:
                                    site.siteMetadata.siteUrl +
                                    `/${
                                        node.childMdx.frontmatter.language
                                    }/blog/${
                                        node.childMdx.frontmatter.section
                                            ? node.childMdx.frontmatter
                                                  .section + "/"
                                            : ""
                                    }${node.childMdx.frontmatter.published}/${
                                        node.childMdx.frontmatter.url
                                    }`,
                                guid:
                                    site.siteMetadata.siteUrl +
                                    `/${
                                        node.childMdx.frontmatter.language
                                    }/blog/${
                                        node.childMdx.frontmatter.section
                                            ? node.childMdx.frontmatter
                                                  .section + "/"
                                            : ""
                                    }${node.childMdx.frontmatter.published}/${
                                        node.childMdx.frontmatter.url
                                    }`,
                                category: node.childMdx.frontmatter.section,
                            };
                        });
                    },
                    query: `
                {
                    blog: allFile(
                        filter: { sourceInstanceName: { eq: "blogContent" } }
                    ) {
                        nodes {
                            childMdx {
                                id
                                body
                                excerpt
                                frontmatter {
                                    platform
                                    tags
                                    title
                                    url
                                    section
                                    language
                                    published(formatString: "YYYY/MM")
                                    date: published
                                }
                            }
                        }
                    }
                }
              `,
                    output: "/blog/feed.rss",
                    title: extConfig.siteName + " Blog",
                },
            ],
        },
    });
}

module.exports = {
    siteMetadata: {
        title: extConfig.siteName,
        author: extConfig.siteAuthor,
        siteUrl: extConfig.siteURL,
        modules: extConfig.modules,
        keywords: extConfig.siteKeywords,
        payPalMail: extConfig.payPalMail,
        contactEmail: extConfig.contactEmail,
        contactPhone: extConfig.contactPhone,
        mapsLink: extConfig.mapsLink,
        address: extConfig.address,
        contactTwitter: extConfig.contactTwitter,
        contactGitHub: extConfig.contactGitHub,
        contactMastodon: extConfig.contactMastodon,
        contactMastodonHref: extConfig.contactMastodonHref,
        givenName: extConfig.givenName,
        familyName: extConfig.familyName,
        birthDate: extConfig.birthDate,
        gender: extConfig.gender,
        height: extConfig.height,
        nationality: extConfig.nationality,
        personImage: extConfig.personImage,
        sameAs: extConfig.sameAs,
    },
    plugins: [
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true,
                allExtensions: true,
            },
        },
        `gatsby-plugin-remove-serviceworker`,
        `gatsby-plugin-eslint`,
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-plugin-remote-images`,
            options: {
                nodeType: "FriendsJson",
                imagePath: "imageURL",
            },
        },
        {
            resolve: `gatsby-plugin-remote-images`,
            options: {
                nodeType: "SocialsJson",
                imagePath: "image",
            },
        },
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-remark-images`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-portal`,
            options: {
                key: "osnav",
                id: "osnav",
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
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blogContent`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/career`,
                name: `careerContent`,
            },
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                gatsbyRemarkPlugins: [
                    {
                        resolve: "gatsby-remark-copy-linked-files",
                        options: {
                            destinationDir: "mdassets",
                        },
                    },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1200,
                            showCaptions: true,
                            markdownCaptions: false,
                            withWebp: true,
                        },
                    },
                ],
            },
        },
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
                    keySeparator: ".",
                    nsSeparator: ":",
                },
                pages: [
                    {
                        matchPath: "/:lang/projects/:urlname",
                        getLanguageFromPath: true,
                        excludeLanguages: extConfig.languages,
                    },
                    {
                        matchPath: "/:lang/blog/:urlname*",
                        getLanguageFromPath: true,
                        excludeLanguages: extConfig.languages,
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-netlify`,
            options: {
                generateMatchPathRewrites: false,
            },
        },
        ...dynamicPlugins,
    ],
};
