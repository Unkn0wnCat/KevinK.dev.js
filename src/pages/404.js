import * as React from "react";
import { Link, useTranslation, Trans } from "gatsby-plugin-react-i18next";
import Layout from "../layouts/default";
import { graphql } from "gatsby";

const NotFoundPage = () => {
    const { t } = useTranslation();

    return (
        <Layout title={t("not_found.title")}>
            <section>
                <article>
                    <h1>{t("not_found.titleExt")}</h1>
                    <p>
                        <Trans
                            i18nKey="not_found.text"
                            components={{ 1: <Link to="/" /> }}
                        />
                    </p>
                </article>
            </section>
        </Layout>
    );
};

export const query = graphql`
    query ($language: String) {
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

export default NotFoundPage;
