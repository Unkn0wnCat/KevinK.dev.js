/* eslint-disable no-undef */
const path = require(`path`);
const { paginate } = require("gatsby-awesome-pagination");

const { modules: moduleConfig, languages } = require("./config.js");

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage, createRedirect } = actions;

    const activity = reporter.activityTimer(`Generate pages`);

    activity.start();
    activity.setStatus("Sourcing data for pages...");

    const projectTemplate = path.resolve(`src/templates/project.js`);

    const result = await graphql(`
        query AllPagesQuery {
            allProjectsJson {
                nodes {
                    lang
                    urlname
                }
            }

            blog: allFile(
                filter: {
                    sourceInstanceName: { eq: "blogContent" }
                    childMdx: { body: { ne: null } }
                }
            ) {
                nodes {
                    childMdx {
                        id
                        body
                        frontmatter {
                            platform
                            tags
                            title
                            url
                            section
                            language
                            published(formatString: "YYYY/MM")
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    if (moduleConfig.projects) {
        activity.setStatus("Generating project pages...");

        result.data.allProjectsJson.nodes.forEach((node) => {
            if (node.lang === "ignoreme") return;

            reporter.info(
                "Creating Page: " + `/${node.lang}/projects/${node.urlname}`
            );

            createPage({
                path: `/${node.lang}/projects/${node.urlname}`,
                component: projectTemplate,
                context: {
                    lang: node.lang,
                    urlname: node.urlname,
                },
            });
        });
    }

    if (moduleConfig.blog) {
        activity.setStatus("Generating blog pages...");

        const blogListingTemplate = path.resolve(
            `src/templates/blogListing.js`
        );
        const blogTemplate = path.resolve(`src/templates/blogPost.js`);

        reporter.info("Creating blog listings...");

        languages.forEach((lang) =>
            paginate({
                createPage,
                items: result.data.blog.nodes,
                itemsPerPage: 10,
                pathPrefix: `/${lang}/blog`,
                component: blogListingTemplate,
                context: {
                    lang,
                },
            })
        );

        let processedSections = [];

        result.data.blog.nodes.forEach((node) => {
            if (!node.childMdx) return;

            if (
                !processedSections.includes(
                    node.childMdx.frontmatter.section ?? "general"
                )
            ) {
                processedSections.push(node.childMdx.frontmatter.section);

                reporter.info(
                    "Creating section listing for " +
                        node.childMdx.frontmatter.section +
                        "..."
                );

                languages.forEach((lang) =>
                    paginate({
                        createPage,
                        items: result.data.blog.nodes.filter(
                            (e) =>
                                e.childMdx.frontmatter.section ===
                                node.childMdx.frontmatter.section
                        ),
                        itemsPerPage: 10,
                        pathPrefix: `/${lang}/blog/${node.childMdx.frontmatter.section}`,
                        component: blogListingTemplate,
                        context: {
                            lang,
                            section: node.childMdx.frontmatter.section,
                        },
                    })
                );
            }

            reporter.info(
                "Creating Page: " +
                    `/${node.childMdx.frontmatter.language}/blog/${
                        node.childMdx.frontmatter.section ?? "general"
                    }/${node.childMdx.frontmatter.url}`
            );

            createPage({
                path: `/${node.childMdx.frontmatter.language}/blog/${
                    node.childMdx.frontmatter.section ?? "general"
                }/${node.childMdx.frontmatter.published}/${
                    node.childMdx.frontmatter.url
                }`,
                component: blogTemplate,
                context: {
                    mdxId: node.childMdx.id,
                    lang: node.childMdx.frontmatter.language,
                },
            });

            languages.forEach((lang) => {
                if (lang === node.childMdx.frontmatter.language) return;

                createRedirect({
                    fromPath: `/${lang}/blog/${
                        node.childMdx.frontmatter.section ?? "general"
                    }/${node.childMdx.frontmatter.published}/${
                        node.childMdx.frontmatter.url
                    }`,
                    toPath: `/${node.childMdx.frontmatter.language}/blog/${
                        (node.childMdx.frontmatter.section ?? "general") + "/"
                    }${node.childMdx.frontmatter.published}/${
                        node.childMdx.frontmatter.url
                    }`,
                    redirectInBrowser: true,
                    permanent: true,
                });

                if (node.childMdx.frontmatter.section === "scambox") {
                    createRedirect({
                        fromPath: `/${lang}/scambox/${node.childMdx.frontmatter.url}`,
                        toPath: `/${node.childMdx.frontmatter.language}/blog/${
                            node.childMdx.frontmatter.section ?? "general"
                        }/${node.childMdx.frontmatter.published}/${
                            node.childMdx.frontmatter.url
                        }`,
                        redirectInBrowser: true,
                        permanent: true,
                    });
                }
            });
        });
    }

    activity.setStatus("Pages generated.");
    activity.end();
};

exports.onCreatePage = ({ page, actions: { deletePage } }) => {
    if (!moduleConfig.projects) {
        if (page.path.startsWith("/projects")) {
            deletePage(page);
            return;
        }

        languages.forEach((lng) => {
            if (page.path.startsWith(`/${lng}/projects`)) {
                deletePage(page);
            }
        });
    }

    if (!moduleConfig.donation) {
        if (page.path.startsWith("/donate")) {
            deletePage(page);
            return;
        }

        languages.forEach((lng) => {
            if (page.path.startsWith(`/${lng}/donate`)) {
                deletePage(page);
            }
        });
    }

    if (!moduleConfig.blog) {
        if (page.path.startsWith("/blog")) {
            deletePage(page);
            return;
        }

        languages.forEach((lng) => {
            if (page.path.startsWith(`/${lng}/blog`)) {
                deletePage(page);
            }
        });
    }
};

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
      type MultiLocaleString {
          en: String
          de: String
      }


      type CareerJson implements Node {
        type: String
        title: MultiLocaleString
        sortDate(difference: String
            formatString: String
            fromNow: Boolean
            locale: String): Date
        startDate: MultiLocaleString
        endDate: MultiLocaleString
        description: MultiLocaleString
        externalLink: String
      }

      type FriendsJson implements Node {
        profession: String
        name: String
        url: String
        imageURL: String
        localImage: File
      }

      type ProjectsJsonLinks {
        website: String
        github: String
      }

      type ProjectsJson implements Node {
        urlname: String
        lang: String
        name: String
        shortDescription: String
        links: ProjectsJsonLinks
        #image: File
        featured: Int
        date: String
      }

      type SocialsJson implements Node {
        platformName: String
        platformHandle: String
        url: String
        image: String
        localImage: File
      }

      type SkillsJson implements Node {
        name: String
        href: String
        type: String
      }

    `;
    createTypes(typeDefs);
};
