import React from "react";
import Layout from "../layouts/default";
import { Trans, Link, useI18next } from "gatsby-plugin-react-i18next";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import * as styles from "./projects.module.scss";
import { GatsbyImage } from "gatsby-plugin-image";
import useSiteMetadata from "../helpers/useSiteMetadata";

export const query = graphql`
    query GetProjects($language: String) {
        allProjectsJson(
            filter: { lang: { eq: $language } }
            sort: { fields: date, order: DESC }
        ) {
            nodes {
                lang
                urlname
                name
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
    }
`;

const ProjectsPage = ({ data }) => {
    const { t } = useI18next();
    const meta = useSiteMetadata();
    return (
        <Layout
            title={t("project.plural")}
            description={t("project.description")}
            seoAdditional={
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        itemListElement: data.allProjectsJson.nodes.map(
                            (project, i) => {
                                return {
                                    "@type": "ListItem",
                                    position: i,
                                    url:
                                        meta.siteUrl +
                                        "/projects/" +
                                        project.urlname,
                                    image: project.image.publicURL,
                                    name: project.name,
                                    description: project.shortDescription,
                                };
                            }
                        ),
                    })}
                </script>
            }
        >
            <section>
                <article>
                    <h1>
                        <Trans>project.plural</Trans>
                    </h1>

                    <p>
                        <Trans>project.description</Trans>
                    </p>

                    <div className={styles.projectList}>
                        {data.allProjectsJson.nodes.map((project) => {
                            return (
                                <Link
                                    className={styles.projectCard}
                                    key={project.lang + project.urlname}
                                    to={"/projects/" + project.urlname}
                                >
                                    <div className={styles.projectCardImage}>
                                        <div className={styles.projectCardBg}>
                                            <GatsbyImage
                                                image={
                                                    project.image
                                                        .childImageSharp
                                                        .gatsbyImageData
                                                }
                                                objectFit="cover"
                                                style={{ height: "100%" }}
                                            ></GatsbyImage>
                                        </div>
                                        <div className={styles.projectCardMeta}>
                                            <span
                                                className={
                                                    styles.projectCardTitle
                                                }
                                            >
                                                {project.name}
                                            </span>
                                            <span>
                                                {project.shortDescription}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </article>
            </section>
        </Layout>
    );
};

ProjectsPage.propTypes = {
    data: PropTypes.object,
};

export default ProjectsPage;
