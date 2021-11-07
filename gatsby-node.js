/* eslint-disable no-undef */
const path = require(`path`);
const { paginate } = require("gatsby-awesome-pagination");

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
                filter: { sourceInstanceName: { eq: "blogContent" } }
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

    activity.setStatus("Generating blog pages...");

    const blogListingTemplate = path.resolve(`src/templates/blogListing.js`);
    const blogTemplate = path.resolve(`src/templates/blogPost.js`);

    reporter.info("Creating blog listings...");

    ["en", "de"].forEach((lang) =>
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

    let processedSections = ["blog"];

    result.data.blog.nodes.forEach((node) => {
        if (!node.childMdx) return;

        if (
            !processedSections.includes(
                node.childMdx.frontmatter.section ?? "blog"
            )
        ) {
            processedSections.push(node.childMdx.frontmatter.section);

            reporter.info(
                "Creating section listing for " +
                    node.childMdx.frontmatter.section +
                    "..."
            );

            ["en", "de"].forEach((lang) =>
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
                    node.childMdx.frontmatter.section ?? "blog"
                }/${node.childMdx.frontmatter.url}`
        );

        createPage({
            path: `/${node.childMdx.frontmatter.language}/blog/${
                node.childMdx.frontmatter.section
                    ? node.childMdx.frontmatter.section + "/"
                    : ""
            }${node.childMdx.frontmatter.published}/${
                node.childMdx.frontmatter.url
            }`,
            component: blogTemplate,
            context: {
                mdxId: node.childMdx.id,
                lang: node.childMdx.frontmatter.language,
            },
        });

        ["en", "de"].forEach((lang) => {
            if (lang === node.childMdx.frontmatter.language) return;

            createRedirect({
                fromPath: `/${lang}/blog/${
                    node.childMdx.frontmatter.section
                        ? node.childMdx.frontmatter.section + "/"
                        : ""
                }${node.childMdx.frontmatter.published}/${
                    node.childMdx.frontmatter.url
                }`,
                toPath: `/${node.childMdx.frontmatter.language}/blog/${
                    node.childMdx.frontmatter.section
                        ? node.childMdx.frontmatter.section + "/"
                        : ""
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
                        node.childMdx.frontmatter.section
                            ? node.childMdx.frontmatter.section + "/"
                            : ""
                    }${node.childMdx.frontmatter.published}/${
                        node.childMdx.frontmatter.url
                    }`,
                    redirectInBrowser: true,
                    permanent: true,
                });
            }
        });
    });

    activity.setStatus("Pages generated.");
    activity.end();
};
