import React from "react"
import Layout from "../layouts/default";
import { Trans, Link, useI18next } from "gatsby-plugin-react-i18next"
import { graphql } from 'gatsby'

import styles from "./projects.module.scss";

export const query = graphql`
query GetProjects($language: String) {
  allProjectsJson(filter: {lang: {eq: $language}}) {
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
}
`

export default function ProjectsPage({data}) {
    
    const {t} = useI18next();
    return (
        <Layout module="projects" title={t("projects")} description={t("projectsDescription")}>
            <section>
                <article>
                    <h1><Trans>projects</Trans></h1>

                    <p><Trans>projectsDescription</Trans></p>

                    <div className={styles.projectList}>
                        {data.allProjectsJson.nodes.map((project) => {
                            return (
                                <div className={styles.projectCard}>
                                    {/*<div className="projectCardActivityIndicator activityIndicatorBlue">Live</div>*/}
                                    <div className={styles.projectCardImage} style={{ backgroundImage: "url("+project.image.childImageSharp.resize.src+")" }}>
                                      <div className={styles.projectCardMeta}>
                                          <span className={styles.projectCardTitle}>{project.name}</span>
                                          <span className={styles.projectCardTeaser}>{project.shortDescription}</span>
                                      </div>
                                    </div>
                                    
                                    <div className={styles.projectCardCTAContainer}>
                                        <div className={styles.projectCardCTA}><Link to={"/projects/"+project.urlname}><Trans>projectView</Trans></Link></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
                </article>
            </section>
        </Layout>
    );
}