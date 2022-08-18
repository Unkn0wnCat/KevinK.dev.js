import React from "react";
import { graphql } from "gatsby";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../layouts/default";
import PropTypes from "prop-types";

import * as styles from "./project.module.scss";
import { GatsbyImage } from "gatsby-plugin-image";
import { ExternalLink, Github } from "lucide-react";

export const query = graphql`
    query GetProject($urlname: String!, $lang: String!, $language: String!) {
        allProjectsJson(
            filter: { urlname: { eq: $urlname }, lang: { eq: $lang } }
        ) {
            nodes {
                lang
                urlname
                name
                links {
                    github
                    website
                }
                image {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            layout: FULL_WIDTH
                        )
                    }
                    publicURL
                }
                shortDescription
            }
        }
        locales: allLocale(filter: { language: { eq: $language } }) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
        file(
            sourceInstanceName: { eq: "projectTextblocks" }
            relativeDirectory: { eq: $urlname }
            name: { eq: $language }
        ) {
            id
            childMdx {
                body
            }
            name
        }
    }
`;

const ProjectTemplate = ({ data }) => {
    const { t, i18n } = useTranslation();
    let project = data.allProjectsJson.nodes[0];
    let projectName = project.name;
    let file = data.file;
    const lang = i18n.language;

    return (
        <Layout
            description={project.shortDescription}
            title={t("project.title") + ": " + projectName}
            transparentTopbar={true}
            image={project.image.publicURL}
        >
            <section className={styles.projectHeader}>
                <div style={{ paddingTop: 0 }}>
                    <div className={styles.headerBackground}>
                        <GatsbyImage
                            image={
                                project.image.childImageSharp.gatsbyImageData
                            }
                            style={{ width: "100%", height: "100%" }}
                            objectFit="cover"
                            alt={projectName}
                        ></GatsbyImage>
                    </div>
                    <header>
                        <div className={styles.headerInner}>
                            <h1>
                                <Trans>project.title</Trans>: {projectName}
                            </h1>
                            <span>{project.shortDescription}</span>
                        </div>
                    </header>
                    <div className={styles.headerPlaceholder}></div>
                </div>
            </section>
            {file != null && file.childMdx != null
                ? (() => {
                      // TODO: This.
                  })()
                : null}
            {project.links !== null ? (
                <section className={styles.projectLinks}>
                    <div>
                        <h1>Links</h1>
                        <div className={styles.linkList}>
                            {project.links.github !== null ? (
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Github height={15} />{" "}
                                    <Trans>project.viewGitHub</Trans>
                                </a>
                            ) : null}
                            {project.links.website !== null ? (
                                <a
                                    href={project.links.website}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <ExternalLink height={15} />{" "}
                                    <Trans>project.viewWebsite</Trans>
                                </a>
                            ) : null}
                        </div>
                    </div>
                </section>
            ) : null}
        </Layout>
    );
};

ProjectTemplate.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ProjectTemplate;
