import React from "react"
import Layout from "../../layouts/default";
import { Trans, Link, useI18next } from "gatsby-plugin-react-i18next"

export default function ImprintPage() {
    
    const {t} = useI18next();
    return (
        <Layout module="donate" title={t("donate")}>
            <section>
                <article>
                    <h1><Trans>donateThanks</Trans></h1>

                    <p></p>
                </article>
            </section>
        </Layout>
    );
}