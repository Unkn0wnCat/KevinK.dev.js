import React from "react"
import { graphql } from "gatsby"
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import Layout from "../layouts/default";
import PropTypes from "prop-types"

import styles from "./project.module.scss";

export const query = graphql`
query GetProject($urlname: String!, $lang: String!) {
  allProjectsJson(filter: {urlname: {eq: $urlname}, lang: {eq: $lang}}) {
    nodes {
      lang
      urlname
      name
      links {
        github
        website
      }
      image {
        publicURL
      }
      longDescription
      shortDescription
    }
  }
}
`

const ProjectTemplate = ({ data }) => {
  const { t } = useTranslation();
  let project = data.allProjectsJson.nodes[0];
  let projectName = project.name;

  return (
    <Layout description={project.shortDescription} title={t("project") + ": " + projectName} transparentTopbar={true}>
      <section className={styles.projectHeader}>
        <div style={{ paddingTop: 0 }}>
          <div className={styles.headerBackground} style={{ backgroundImage: "url(" + project.image.publicURL + ")" }}></div>
          <header>
            <div className={styles.headerInner}>
              <h1><Trans>project</Trans>: {projectName}</h1>
              <span className={styles.postMeta}>{project.shortDescription}</span>
            </div>
          </header>
          <div className={styles.headerPlaceholder}></div>
        </div>
      </section>
      {project.longDescription != null ?
        <section className={styles.projectAbout}>
          <article>
            <h1><Trans projectName={projectName} i18nKey="projectAboutHeader">projectAboutHeader{{ projectName }}</Trans></h1>
            <p>{project.longDescription}</p>
          </article>
        </section>
        : null}
      {project.links.github !== null || project.links.website !== null ?
        <section className={styles.projectLinks}>
          <div>
            <h1>Links</h1>
            <div className={styles.linkList}>
              {project.links.github !== null ? <a href={project.links.github} target="_blank" rel="noreferrer"><i className="fab fa-github" aria-hidden="true"></i> <Trans>projectViewGitHub</Trans></a> : null}
              {project.links.website !== null ? <a href={project.links.website} target="_blank" rel="noreferrer"><i className="fas fa-external-link-alt" aria-hidden="true"></i> <Trans>projectViewWebsite</Trans></a> : null}

            </div>
          </div>
        </section>
        : null}
      {/*<section>
            <div>

              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          </section>*/}
    </Layout>
  );
}

ProjectTemplate.propTypes = {
  data: PropTypes.object.isRequired
}

export default ProjectTemplate;