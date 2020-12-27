import React from "react"
import Layout from "../../layouts/default";
import { Trans, useI18next } from "gatsby-plugin-react-i18next"
import { useStaticQuery, graphql } from "gatsby";

export default function ImprintPage() {
  const { site } = useStaticQuery(
    graphql`
          query {
            site {
              siteMetadata {
                contactEmail
              }
            }
          }
        `
  )

  let contactEmail = site.siteMetadata.contactEmail;
  const { t } = useI18next();
  return (
    <Layout module="donate" title={t("donate")}>
      <section>
        <article>
          <h1><Trans>donateThanks</Trans></h1>

          <p><Trans contactEmail={contactEmail} i18nKey="donateThanksText">donateThanksText<a href={"mailto:" + contactEmail}>{{ contactEmail }}</a></Trans></p>
        </article>
      </section>
    </Layout>
  );
}