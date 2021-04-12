import React from "react";
import Layout from "../layouts/default";
import { Trans, Link, useI18next } from "gatsby-plugin-react-i18next";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import * as styles from "./social.module.scss";

export const query = graphql`
  query AllSocialsQuery($language: String!) {
    allSocialsJson {
      nodes {
        image
        platformHandle
        platformName
        url
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

const SocialPage = ({ data }) => {
  const { t } = useI18next();
  return (
    <Layout title={t("social")} description={t("socialDescription")}>
      <section>
        <article>
          <h1>
            <Trans>social</Trans>
          </h1>

          <p>
            <Trans i18nKey="socialDescriptionWithLink">
              socialDescriptionWith<Link to="/friends">Link</Link>
            </Trans>
          </p>

          <div className={styles.socialList}>
            {data.allSocialsJson.nodes.map((social) => {
              return (
                <a
                  className={styles.socialCard}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer me"
                  key={social.url}
                >
                  <div
                    className={styles.socialImage}
                    style={{ backgroundImage: "url(" + social.image + ")" }}
                  >
                    <span className={styles.socialName}>
                      {social.platformName}
                    </span>
                    <span className={styles.socialUsername}>
                      {social.platformHandle}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </article>
      </section>
    </Layout>
  );
};

SocialPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SocialPage;
