import React from "react"
import Layout from "../layouts/default";
import { Trans, Link, useI18next } from "gatsby-plugin-react-i18next"

export default function SocialPage() {
    
    const {t} = useI18next();
    return (
        <Layout module="social" title={t("social")}>
            <section>
                <div>
                    <h1><Trans>social</Trans></h1>

                </div>
            </section>
        </Layout>
    );
}