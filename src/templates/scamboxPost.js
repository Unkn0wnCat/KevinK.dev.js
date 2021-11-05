/* eslint-disable react/prop-types */
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import React from "react";
import { useTranslation } from "react-i18next";
import Utterances from "utterances-react";

import Layout from "../layouts/default";

import * as styles from "./scamboxPost.module.scss";

const ScamBoxPost = ({ data }) => {
    const { t, i18n } = useTranslation();

    return (
        <Layout
            title={`${data.mdx.frontmatter.title} | ${t("scambox")}`}
            description={data.mdx.excerpt}
        >
            <section className={styles.scamboxSection}>
                <article>
                    <h1>{data.mdx.frontmatter.title}</h1>
                    <span className={styles.meta}>
                        {t("scamboxPosted", {
                            date: data.mdx.frontmatter.published,
                        })}
                    </span>

                    {i18n.language !== "en" && (
                        <div className={styles.noticeBox}>
                            <b>{t("scamboxNotice")}</b>
                            <p>{t("scamboxLanguage")}</p>
                        </div>
                    )}

                    <MDXProvider components={{ Chat }}>
                        <MDXRenderer>{data.mdx.body}</MDXRenderer>
                    </MDXProvider>

                    <Utterances
                        repo="Unkn0wnCat/KevinK.dev.js"
                        issueTerm={`Scambox-Comments: ${data.mdx.frontmatter.title}`}
                        theme="preferred-color-scheme"
                        label="comments"
                        style={{
                            marginTop: "50px",
                        }}
                    />
                </article>
            </section>
        </Layout>
    );
};

const Chat = ({ src, type }) => {
    return (
        <div className={styles.chatBox}>
            {type == "telegram" && <span>Telegram-Chat</span>}
            <iframe src={src} />
        </div>
    );
};

export const query = graphql`
    query ($language: String!, $mdxId: String!) {
        mdx(id: { eq: $mdxId }) {
            body
            excerpt
            frontmatter {
                platform
                tags
                title
                published(formatString: "DD.MM.YYYY")
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

export default ScamBoxPost;
