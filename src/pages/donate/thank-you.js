import React from "react"
import Layout from "../../layouts/default";
import { Trans, useI18next } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby";
import PropTypes from "prop-types"

export const query = graphql`
  query GetThankYouPage($language: String!) {
    site {
      siteMetadata {
        contactEmail
      }
    }
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`

function ThankYouPage(props) {
  const { site } = props.data

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

ThankYouPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default ThankYouPage;