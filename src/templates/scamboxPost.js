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
            seoAdditional={
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "NewsArticle",
                        headline: data.mdx.frontmatter.title,
                        /*"image": [
                        "https://example.com/photos/1x1/photo.jpg",
                        "https://example.com/photos/4x3/photo.jpg",
                        "https://example.com/photos/16x9/photo.jpg"
                    ],*/
                        datePublished: data.mdx.publishedIso,
                        dateModified: data.mdx.publishedIso,
                        author: [
                            {
                                "@type": "Person",
                                name: "Kevin Kandlbinder",
                                url: "https://kevink.dev",
                            },
                        ],
                    })}
                </script>
            }
            meta={[
                {
                    name: "og:type",
                    content: "article",
                },
                {
                    name: "article:published_time",
                    content: data.mdx.publishedIso,
                },
                {
                    name: "article:section",
                    content: "Scambox",
                },
                {
                    name: "keywords",
                    content: data.mdx.frontmatter.tags.join(", "),
                },
            ]}
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
                publishedIso: published(formatString: "")
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
