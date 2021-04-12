import React from "react";
import Layout from "../layouts/default";
import { Trans, Link, useI18next } from "gatsby-plugin-react-i18next";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import * as styles from "./projects.module.scss";

export const query = graphql`
  query GetProjects($language: String) {
    allProjectsJson(filter: { lang: { eq: $language } }) {
      nodes {
        lang
        urlname
        name
        image {
          childImageSharp {
            resize(width: 400, quality: 90) {
              src
            }
          }
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
  return (
    <Layout title={t("projects")} description={t("projectsDescription")}>
      <section>
        <article>
          <h1>
            <Trans>projects</Trans>
          </h1>

          <p>
            <Trans>projectsDescription</Trans>
          </p>

          <div className={styles.projectList}>
            {data.allProjectsJson.nodes.map((project) => {
              return (
                <Link
                  className={styles.projectCard}
                  key={project.lang + project.urlname}
                  to={"/projects/" + project.urlname}
                >
                  <div
                    className={styles.projectCardImage}
                    style={{
                      backgroundImage:
                        "url(" + project.image.childImageSharp.resize.src + ")",
                    }}
                  >
                    <div className={styles.projectCardMeta}>
                      <span className={styles.projectCardTitle}>
                        {project.name}
                      </span>
                      <span>{project.shortDescription}</span>
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
