import * as React from "react";
import Layout from "../layouts/default";
import PropTypes from "prop-types";

import * as styles from "./index.module.scss";
import * as projectStyles from "./projects.module.scss";

import { Trans, Link } from "gatsby-plugin-react-i18next";
import { graphql } from "gatsby";

import anime from "animejs";

export const query = graphql`
  query GetMetaAndProjects($language: String) {
    site {
      siteMetadata {
        contactEmail
        contactPhone
        mapsLink
        contactTwitter
        contactGitHub
        contactMastodon
        contactMastodonHref
      }
    }
    allProjectsJson(
      filter: { lang: { eq: $language }, featured: { gte: 0 } }
      sort: { fields: featured, order: ASC }
    ) {
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
        featured
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

class IndexPage extends React.Component {
  componentDidMount() {
    anime({
      targets: [
        "." + styles.profileCard + " > span",
        "." + styles.profileCard + " a",
      ],
      opacity: [0, 1],
      translateX: [100, 0],
      duration: 250,
      delay: anime.stagger(20),
      easing: "easeInOutCirc",
    });
    anime({
      targets: ["." + styles.profileImageDummy],
      translateX: [0, -3],
      translateY: [0, 3],
      duration: 250,
      easing: "easeInOutCirc",
    });
    anime({
      targets: ["." + styles.profileImage],
      translateX: [0, 4],
      translateY: [0, -4],
      duration: 250,
      easing: "easeInOutCirc",
    });
  }

  render() {
    let meta = this.props.data.site.siteMetadata;

    return (
      <Layout title="Kevin Kandlbinder" transparentTopbar={true}>
        <section className={styles.heroSection}>
          <div className={styles.profile + " profile"}>
            <div
              data-bg="url(https://cdn.kevink.dev/images/kevin/kevin-kandlbinder-03.jpg)"
              style={{
                backgroundImage:
                  "url(https://cdn.kevink.dev/images/kevin/kevin-kandlbinder-03.jpg)",
              }}
              className={styles.profileImage + " lazy"}
            ></div>
            <div className={styles.profileImageDummy}></div>
            <div className={styles.profileCard}>
              <span className={styles.hello}>
                <Trans>homeHello</Trans>
              </span>
              <span className={styles.name}>Kevin Kandlbinder</span>
              <span className={styles.description}>
                <Trans>homeMe</Trans>{" "}
                <span id="descriptionType">
                  <Trans>homeWebDeveloper</Trans>
                </span>
                .
              </span>

              <div className={styles.contactLinks}>
                <a
                  className={styles.contactLink}
                  href={"tel:" + meta.contactPhone}
                  rel="me"
                >
                  <i className="fas fa-fw fa-phone"></i>
                  {meta.contactPhone}
                </a>
                <a
                  className={styles.contactLink}
                  href={"mailto:" + meta.contactEmail}
                  rel="me"
                >
                  <i className="far fa-fw fa-envelope"></i>
                  {meta.contactEmail}
                </a>
                <a
                  className={styles.contactLink}
                  href={meta.mapsLink}
                  rel="noreferrer "
                  target="_blank"
                >
                  <i className="fas fa-fw fa-map-marker-alt"></i>
                  <Trans>homeMyLocation</Trans>
                </a>
                <a
                  className={styles.contactLink}
                  href={meta.contactMastodonHref}
                  rel="noreferrer me"
                  target="_blank"
                >
                  <i className="fab fa-fw fa-mastodon"></i>
                  {meta.contactMastodon}
                </a>
                <a
                  className={styles.contactLink}
                  href={"https://github.com/" + meta.contactGitHub}
                  rel="noreferrer me"
                  target="_blank"
                >
                  <i className="fab fa-fw fa-github"></i>
                  {meta.contactGitHub}
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="aboutSection">
          <article>
            <h1>
              <Trans>homeAboutMe</Trans>
            </h1>
            <p>
              <Trans>homeAboutMeHello</Trans>
              <br />
              <Trans>homeAboutMeText</Trans>
            </p>
          </article>
        </section>
        <a
          className={styles.creditSection}
          href="https://unsplash.com/@jannikkiel"
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <span>
              <i className="fas fa-fw fa-camera"></i>{" "}
              <Trans>homeImageCredit</Trans>
            </span>
            <i className="fas fa-fw fa-chevron-right"></i>
          </div>
        </a>
        <section className="featuredSection">
          <article>
            <h1>
              <Trans>featuredProjects</Trans>
            </h1>
            <div className={projectStyles.projectList}>
              {this.props.data.allProjectsJson.nodes.map((project) => {
                return (
                  <Link
                    className={projectStyles.projectCard}
                    key={project.lang + "/" + project.urlname}
                    to={"/projects/" + project.urlname}
                  >
                    <div
                      className={projectStyles.projectCardImage}
                      style={{
                        backgroundImage:
                          "url(" +
                          project.image.childImageSharp.resize.src +
                          ")",
                      }}
                    >
                      <div className={projectStyles.projectCardMeta}>
                        <span className={projectStyles.projectCardTitle}>
                          {project.name}
                        </span>
                        <span>{project.shortDescription}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Link to="/projects" className={styles.seeMoreButton}>
              <Trans>seeMore</Trans>{" "}
              <i className="fas fa-fw fa-chevron-right"></i>
            </Link>
          </article>
        </section>
        <Link className={styles.donationSection} to="/donate">
          <div>
            <span>
              <Trans>donationCatchphrase</Trans>
            </span>
            <i className="fas fa-fw fa-chevron-right"></i>
          </div>
        </Link>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IndexPage;
