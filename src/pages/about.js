import * as React from "react";
import Layout from "../layouts/default";
import PropTypes from "prop-types";

import * as styles from "./index.module.scss";
import * as projectStyles from "./projects.module.scss";

import { Trans, Link } from "gatsby-plugin-react-i18next";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage } from "gatsby-plugin-image";

import {
    ArrowRight,
    Briefcase,
    ExternalLink,
    GraduationCap,
    Loader,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export const query = graphql`
    query GetProjectsAndSkills($language: String) {
        allSkillsJson(sort: { fields: type, order: ASC }) {
            nodes {
                name
                type
                href
            }
        }
        allProjectsJson(
            filter: { lang: { eq: $language }, featured: { gte: 0 } }
            sort: { fields: featured, order: ASC }
        ) {
            nodes {
                lang
                urlname
                name
                image {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            layout: FULL_WIDTH
                        )
                    }
                }
                shortDescription
                featured
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
        file(
            sourceInstanceName: { eq: "textblocks" }
            relativeDirectory: { eq: "home/about" }
            name: { eq: $language }
        ) {
            id
            childMdx {
                body
            }
            name
        }

        career: allCareerJson(sort: { order: DESC, fields: sortDate }) {
            nodes {
                id
                type
                sortDate
                title {
                    de
                    en
                }
                startDate {
                    de
                    en
                }
                endDate {
                    de
                    en
                }
                description {
                    de
                    en
                }
                externalLink
            }
        }
    }
`;

const AboutPage = (props) => {
    const { t, i18n } = useTranslation();

    let file = props.data.file;

    const career = props.data.career.nodes;
    const lang = i18n.language;

    return (
        <Layout
            title={t("about.title")}
            description={t("site.description")}
            image={"/owner.jpg"}
            speakable={{
                "@type": "SpeakableSpecification",
                xPath: ["article"],
            }}
        >
            <section className={styles.aboutSection}>
                <article>
                    <div className={styles.aboutText}>
                        <MDXRenderer>{file.childMdx.body}</MDXRenderer>
                    </div>
                    <div className={styles.skills}>
                        <h2>
                            <Trans>about.mySkills</Trans>
                        </h2>
                        <div className={styles.skillList}>
                            {props.data.allSkillsJson.nodes.map((skill) => {
                                return skill.href ? (
                                    <a
                                        className={
                                            styles.skill +
                                            " " +
                                            styles["skill_" + skill.type]
                                        }
                                        href={skill.href}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {skill.name}
                                    </a>
                                ) : (
                                    <span
                                        className={
                                            styles.skill +
                                            " " +
                                            styles["skill_" + skill.type]
                                        }
                                    >
                                        {skill.name}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </article>
            </section>
            <section>
                <article>
                    <h1>
                        <Trans>about.featuredProjects</Trans>
                    </h1>
                    <div className={projectStyles.projectList}>
                        {props.data.allProjectsJson.nodes.map((project) => {
                            return (
                                <Link
                                    className={projectStyles.projectCard}
                                    key={project.lang + "/" + project.urlname}
                                    to={"/projects/" + project.urlname}
                                >
                                    <div
                                        className={
                                            projectStyles.projectCardImage
                                        }
                                    >
                                        <div
                                            className={
                                                projectStyles.projectCardBg
                                            }
                                        >
                                            <GatsbyImage
                                                image={
                                                    project.image
                                                        .childImageSharp
                                                        .gatsbyImageData
                                                }
                                                objectFit="cover"
                                                style={{ height: "100%" }}
                                            ></GatsbyImage>
                                        </div>
                                        <div
                                            className={
                                                projectStyles.projectCardMeta
                                            }
                                        >
                                            <span
                                                className={
                                                    projectStyles.projectCardTitle
                                                }
                                            >
                                                {project.name}
                                            </span>
                                            <span>
                                                {project.shortDescription}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <Link to="/projects" className={styles.seeMoreButton}>
                        <Trans>about.moreProjects</Trans> <ArrowRight />
                    </Link>
                </article>
            </section>
            <section>
                <div>
                    <h1>
                        <Trans>about.myCareer</Trans>
                    </h1>

                    <div className={styles.careerContainer}>
                        <div className={styles.birth}>
                            <Loader /> <Trans>about.birth</Trans>
                        </div>
                        <div className={styles.mainline}></div>

                        {career.map((careerEntry) => {
                            return (
                                <div
                                    className={
                                        styles.entry +
                                        " " +
                                        styles["entryType" + careerEntry.type]
                                    }
                                    key={careerEntry.id}
                                >
                                    <div className={styles.entryContent}>
                                        <span className={styles.date}>
                                            {careerEntry.startDate &&
                                            careerEntry.startDate[lang]
                                                ? careerEntry.startDate[lang]
                                                : ""}
                                            {careerEntry.endDate &&
                                            careerEntry.endDate[lang]
                                                ? " - " +
                                                  careerEntry.endDate[lang]
                                                : ""}
                                        </span>
                                        <span className={styles.title}>
                                            {careerEntry.type ==
                                                "education" && (
                                                <GraduationCap />
                                            )}
                                            {careerEntry.type ==
                                                "job-experience" && (
                                                <Briefcase />
                                            )}
                                            {careerEntry.title[lang]}
                                        </span>
                                        {careerEntry.description &&
                                            careerEntry.description[lang] && (
                                                <p>
                                                    {
                                                        careerEntry.description[
                                                            lang
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        {careerEntry.externalLink && (
                                            <a
                                                href={careerEntry.externalLink}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <ExternalLink />
                                                {(() => {
                                                    // eslint-disable-next-line no-undef
                                                    let url = new URL(
                                                        careerEntry.externalLink
                                                    );
                                                    return url.hostname;
                                                })()}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <Link className={styles.donationSection} to="/donate">
                <div>
                    <span>
                        <Trans>about.donationCatchphrase</Trans>
                    </span>
                    <ArrowRight />
                </div>
            </Link>
        </Layout>
    );
};

AboutPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AboutPage;
