/* eslint-disable no-undef */
const path = require(`path`);
const fs = require("fs");

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    const projectTemplate = path.resolve(`src/templates/project.js`);
    const scamboxTemplate = path.resolve(`src/templates/scamboxPost.js`);

    const result = await graphql(`
        query AllPagesQuery {
            allProjectsJson {
                nodes {
                    lang
                    urlname
                }
            }

            scambox: allFile(
                filter: { sourceInstanceName: { eq: "scamboxContent" } }
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

    result.data.scambox.nodes.forEach((node) => {
        if (!node.childMdx) return;

        // eslint-disable-next-line no-undef
        console.log(
            "Creating Page: ",
            `/*/scambox/${node.childMdx.frontmatter.url}`
        );

        //["en", "de"].forEach((lang) => {
        createPage({
            path: `/scambox/${node.childMdx.frontmatter.url}`,
            component: scamboxTemplate,
            context: {
                mdxId: node.childMdx.id,
            },
        });
        //})
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
