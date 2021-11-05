/* eslint-disable react/prop-types */
import { graphql } from "gatsby";
import { Link } from "gatsby-plugin-react-i18next";
import React from "react";
import { useTranslation } from "react-i18next";

import Layout from "../layouts/default";

import * as styles from "./scambox.module.scss";

const ScamBox = ({ data }) => {
    const { t } = useTranslation();

    return (
        <Layout title={t("scambox")} description={t("scamboxDescription")}>
            <section>
                <article>
                    <h1>{t("scambox")}</h1>

                    <p>{t("scamboxDescription")}</p>

                    <div className={styles.list}>
                        {data.scambox.nodes.map((post) => {
                            return (
                                <Link
                                    to={`/scambox/${post.childMdx.frontmatter.url}`}
                                    key={post.childMdx.slug}
                                    className={styles.post}
                                >
                                    <span className={styles.title}>
                                        {post.childMdx.frontmatter.title}
                                    </span>
                                    <span className={styles.meta}>
                                        {t("scamboxPosted", {
                                            date: post.childMdx.frontmatter
                                                .published,
                                        })}
                                    </span>

                                    <span className={styles.excerpt}>
                                        {post.childMdx.excerpt}{" "}
                                        <span>{t("scamboxReadFull")}</span>
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    <span className={styles.moreSoon}>{t("moreSoon")}</span>
                </article>
            </section>
        </Layout>
    );
};

export const query = graphql`
    query ($language: String!) {
        scambox: allFile(
            filter: { sourceInstanceName: { eq: "scamboxContent" } }
            sort: { fields: childMdx___frontmatter___published, order: DESC }
        ) {
            nodes {
                childMdx {
                    frontmatter {
                        platform
                        tags
                        title
                        url
                        published(formatString: "DD.MM.YYYY")
                    }
                    excerpt
                }
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

export default ScamBox;
