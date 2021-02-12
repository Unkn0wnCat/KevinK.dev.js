import React from "react"
import Layout from "../../layouts/default";
import { Trans, useI18next } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby";

export const query = graphql`
  query ($language: String!) {
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

export default function ImprintPage() {

    const { t } = useI18next();
    return (
        <Layout module="legal" title={t("imprint")}>
            <section>
                <article>
                    <h1><Trans>imprint</Trans></h1>

                    <p>Angaben gemäß § 5 TMG</p><p>Kevin Kandlbinder<br />
                    Eichenweg 48<br />
                    25451 Quickborn <br />
                    </p><p> <strong>Vertreten durch: </strong><br />
                    Kevin Kandlbinder<br />
                    </p><p><strong>Kontakt:</strong> <br />
                    Telefon: +49 4106 8068004<br />
                    E-Mail: <a href='mailto:contact@kevink.dev'>contact@kevink.dev</a><br /></p>
                </article>
            </section>
        </Layout>
    );
}