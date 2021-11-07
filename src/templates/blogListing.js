/* eslint-disable react/prop-types */
import { graphql, Link as Link2 } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby-plugin-react-i18next";
import React from "react";
import { useTranslation } from "react-i18next";

import Layout from "../layouts/default";

import * as styles from "./blogListing.module.scss";

const BlogListing = ({ data, pageContext }) => {
    const { t } = useTranslation();

    const title = t(`blog.section.${pageContext.section ?? "blog"}.name`);
    const description = t(
        `blog.section.${pageContext.section ?? "blog"}.description`
    );

    const hasSection = typeof pageContext.section !== "undefined";

    return (
        <Layout title={title} description={description}>
            <section>
                <article>
                    {hasSection && (
                        <Link to={"/blog"} className={styles.sectionBacklink}>
                            {t("blog.title")} /
                        </Link>
                    )}
                    <h1>{title}</h1>

                    <p>{description}</p>

                    {!hasSection && (
                        <>
                            <h2>{t("blog.sections")}</h2>

                            <div className={styles.sectionList}>
                                <Link
                                    className={styles.sectionCard}
                                    to={"/blog/scambox"}
                                >
                                    <div className={styles.sectionImage}>
                                        <div className={styles.sectionBg}>
                                            <StaticImage src="https://source.unsplash.com/gf8e6XvG_3E/300x150"></StaticImage>
                                        </div>
                                        <span className={styles.sectionName}>
                                            {t("blog.section.scambox.name")}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </>
                    )}

                    <h2>{t("blog.posts")}</h2>

                    <div className={styles.list}>
                        {data.posts.nodes.map((post) => {
                            return (
                                <Link2
                                    to={`/${
                                        post.childMdx.frontmatter.language
                                    }/blog/${
                                        post.childMdx.frontmatter.section
                                            ? post.childMdx.frontmatter
                                                  .section + "/"
                                            : ""
                                    }${
                                        post.childMdx.frontmatter.urlPublished
                                    }/${post.childMdx.frontmatter.url}`}
                                    key={post.childMdx.slug}
                                    className={styles.post}
                                >
                                    <span className={styles.title}>
                                        {post.childMdx.frontmatter.title}
                                    </span>
                                    <span className={styles.meta}>
                                        {t("blog.meta", {
                                            date: post.childMdx.frontmatter
                                                .published,
                                            author: post.childMdx.frontmatter
                                                .author.name,
                                        })}

                                        {post.childMdx.frontmatter.section &&
                                            !hasSection && (
                                                <>
                                                    {" | "}
                                                    <Link
                                                        to={`/blog/${post.childMdx.frontmatter.section}`}
                                                    >
                                                        {t(
                                                            `blog.section.${post.childMdx.frontmatter.section}.name`
                                                        )}
                                                    </Link>
                                                </>
                                            )}

                                        {" | "}
                                        {t(
                                            `language.${post.childMdx.frontmatter.language}.name`
                                        )}
                                    </span>

                                    <span className={styles.excerpt}>
                                        {post.childMdx.excerpt}{" "}
                                        <span>{t("blog.readFull")}</span>
                                    </span>
                                </Link2>
                            );
                        })}
                    </div>

                    <div className={styles.pageSwitcher}>
                        {pageContext.pageNumber > 0 ? (
                            <Link to={pageContext.previousPagePath}>
                                {t("blog.previous")}
                            </Link>
                        ) : (
                            <span></span>
                        )}
                        <span>
                            {t("blog.page", {
                                page: pageContext.humanPageNumber,
                                maxPage: pageContext.numberOfPages,
                            })}
                        </span>
                        {pageContext.humanPageNumber <
                        pageContext.numberOfPages ? (
                            <Link to={pageContext.nextPagePath}>
                                {t("blog.next")}
                            </Link>
                        ) : (
                            <span></span>
                        )}
                    </div>
                </article>
            </section>
        </Layout>
    );
};

export const query = graphql`
    query ($language: String!, $skip: Int!, $limit: Int!, $section: String) {
        posts: allFile(
            filter: {
                sourceInstanceName: { eq: "blogContent" }
                childMdx: { frontmatter: { section: { eq: $section } } }
            }
            sort: { fields: childMdx___frontmatter___published, order: DESC }
            limit: $limit
            skip: $skip
        ) {
            nodes {
                childMdx {
                    frontmatter {
                        platform
                        tags
                        title
                        url
                        published(formatString: "DD.MM.YYYY")
                        urlPublished: published(formatString: "YYYY/MM")
                        section
                        language
                        author {
                            name
                        }
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

export default BlogListing;
