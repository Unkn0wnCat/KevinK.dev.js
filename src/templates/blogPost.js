/* eslint-disable react/prop-types */
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import React from "react";
import { useTranslation } from "react-i18next";
import Utterances from "utterances-react";

import Layout from "../layouts/default";

import * as styles from "./blogPost.module.scss";
import { Link } from "gatsby-plugin-react-i18next";

const BlogPost = ({ data }) => {
    const { t } = useTranslation();

    return (
        <Layout
            title={`${data.mdx.frontmatter.title}`}
            description={data.mdx.excerpt}
            seoAdditional={
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "NewsArticle",
                        headline: data.mdx.frontmatter.title,
                        datePublished: data.mdx.frontmatter.publishedIso,
                        dateModified: data.mdx.frontmatter.publishedIso,
                        author: [
                            {
                                "@type": "Person",
                                name: data.mdx.frontmatter.author.name,
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
                    content: data.mdx.frontmatter.publishedIso,
                },
                {
                    name: "article:section",
                    content: t(
                        `blog.section.${
                            data.mdx.frontmatter.section ?? "blog"
                        }.name`
                    ),
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
                        {t("blog.meta", {
                            date: data.mdx.frontmatter.published,
                            author: data.mdx.frontmatter.author.name,
                        })}

                        {data.mdx.frontmatter.section && (
                            <>
                                {" | "}
                                <Link
                                    to={`/blog/${data.mdx.frontmatter.section}`}
                                >
                                    {t(
                                        `blog.section.${data.mdx.frontmatter.section}.name`
                                    )}
                                </Link>
                            </>
                        )}
                    </span>

                    <MDXProvider components={{ Chat }}>
                        <MDXRenderer>{data.mdx.body}</MDXRenderer>
                    </MDXProvider>

                    <Utterances
                        repo="Unkn0wnCat/KevinK.dev.js"
                        issueTerm={`Blog-Comments: ${data.mdx.frontmatter.title}`}
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
                author {
                    name
                }
                section
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

export default BlogPost;
