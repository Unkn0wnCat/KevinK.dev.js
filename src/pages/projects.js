import React from "react"
import Layout from "../layouts/default";
import { Trans, Link, useI18next } from "gatsby-plugin-react-i18next"

export default function ProjectsPage() {
    
    const {t} = useI18next();
    return (
        <Layout module="projects" title={t("projects")}>
            <section>
                <div>
                    <h1><Trans>projects</Trans></h1>

                </div>
            </section>
        </Layout>
    );
}