/* eslint-disable no-undef */
const path = require(`path`);
const fs = require("fs");
const { paginate } = require("gatsby-awesome-pagination");

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage, createRedirect } = actions;

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

    result.data.allProjectsJson.nodes.forEach((node) => {
        // eslint-disable-next-line no-undef
        console.log(
            "Creating Page: ",
            `/${node.lang}/projects/${node.urlname}`
        );

        if (node.lang !== "ignoreme")
            createPage({
                path: `/${node.lang}/projects/${node.urlname}`,
                component: projectTemplate,
                context: {
                    lang: node.lang,
                    urlname: node.urlname,
                },
            });
    });

    const blogListingTemplate = path.resolve(`src/templates/blogListing.js`);
    const blogTemplate = path.resolve(`src/templates/blogPost.js`);

    console.log("Creating blog listing...");

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

            console.log(
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

        // eslint-disable-next-line no-undef
        console.log(
            "Creating Page: ",
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
};

const config = require("./config.js");

exports.onPostBuild = async ({ graphql, reporter }) => {
    console.log("Building static api...");

    const apiPrefix = "./public/api";

    if (!fs.existsSync(apiPrefix)) fs.mkdirSync(apiPrefix);

    fs.writeFileSync(
        `${apiPrefix}.json`,
        JSON.stringify({
            success: true,
            endpoints: {
                projects: [
                    {
                        name: "Projects Overview",
                        description:
                            "Returns overview of all available projects",
                        path: "/api/projects.json",
                    },
                    {
                        name: "Projects Overview for Language",
                        description:
                            "Returns overview of all available projects in a specified language",
                        path: "/api/projects/:lang.json",
                    },
                    {
                        name: "Get specific Project",
                        description:
                            "Returns specific project in specified language",
                        path: "/api/projects/:lang/:slug.json",
                    },
                ],
            },
        })
    );

    const projectsPrefix = apiPrefix + "/projects";

    if (!fs.existsSync(projectsPrefix)) fs.mkdirSync(projectsPrefix);

    await graphql(`
        query {
            allProjectsJson {
                nodes {
                    urlname
                    shortDescription
                    name
                    links {
                        github
                        website
                    }
                    lang
                    image {
                        publicURL
                    }
                    featured
                }
            }
        }
    `).then((res) => {
        if (res.errors) {
            reporter.panicOnBuild(`Error while running GraphQL query.`);
            return;
        }

        let projects = res.data.allProjectsJson.nodes.filter((project) => {
            return project.lang !== "ignoreme";
        });

        fs.writeFileSync(
            `${projectsPrefix}.json`,
            JSON.stringify({
                success: true,
                projects: projects.map((project) => {
                    return {
                        slug: project.urlname,
                        lang: project.lang,
                        api: `/api/projects/${project.lang}/${project.urlname}.json`,
                    };
                }),
            })
        );

        config.languages.forEach((lang) => {
            if (!fs.existsSync(`${projectsPrefix}/${lang}`))
                fs.mkdirSync(`${projectsPrefix}/${lang}`);

            fs.writeFileSync(
                `${projectsPrefix}/${lang}.json`,
                JSON.stringify({
                    success: true,
                    projects: projects
                        .filter((project) => {
                            return project.lang == lang;
                        })
                        .map((project) => {
                            return {
                                slug: project.urlname,
                                lang: project.lang,
                                api: `/api/projects/${project.lang}/${project.urlname}.json`,
                            };
                        }),
                })
            );
        });

        projects.forEach((project) => {
            fs.writeFileSync(
                `${projectsPrefix}/${project.lang}/${project.urlname}.json`,
                JSON.stringify({
                    success: true,
                    project: {
                        slug: project.urlname,
                        lang: project.lang,
                        name: project.name,
                        shortDescription: project.shortDescription,
                        longDescription: project.longDescription,
                        links:
                            project.links !== null
                                ? {
                                      github: project.links.github,
                                      website: project.links.website,
                                  }
                                : null,
                        image: project.image.publicURL,
                        featured: project.featured,
                        frontend: `/${project.lang}/projects/${project.urlname}`,
                    },
                })
            );
        });
    });
};
