/* eslint-disable no-undef */
const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions

    const projectTemplate = path.resolve(`src/templates/project.js`)

    const result = await graphql(`
        query AllPagesQuery {
            allProjectsJson {
                nodes {
                    lang
                    urlname
                }
            }
        }

    `)

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    result.data.allProjectsJson.nodes.forEach((node) => {
        // eslint-disable-next-line no-undef
        console.log("Creating Page: ", `/${node.lang}/projects/${node.urlname}`);

        if (node.lang !== "ignoreme") createPage({
            path: `/${node.lang}/projects/${node.urlname}`,
            component: projectTemplate,
            context: {
                lang: node.lang,
                urlname: node.urlname
            }
        })
    });

}