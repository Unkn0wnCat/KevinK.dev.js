import * as React from "react";
import Layout from "../layouts/default";
import PropTypes from "prop-types";

import * as styles from "./index.module.scss";
import * as projectStyles from "./projects.module.scss";

import { Trans, Link } from "gatsby-plugin-react-i18next";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { StaticImage, GatsbyImage } from "gatsby-plugin-image";

import anime from "animejs";

import { ArrowRight, AtSign, Camera, Github, Mail, MapPin, Phone } from "lucide-react";

export const query = graphql`
    query GetMetaAndProjects($language: String) {
        site {
            siteMetadata {
                contactEmail
                contactPhone
                mapsLink
                contactTwitter
                contactGitHub
                contactMastodon
                contactMastodonHref
            }
        }
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
                        gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
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
    }
`;

const IndexPage = (props) => {
    React.useEffect(() => {
        if (typeof window === "undefined") return;

        anime({
            targets: [
                "." + styles.profileCard + " > span",
                "." + styles.profileCard + " a",
            ],
            opacity: [0, 1],
            translateX: [100, 0],
            duration: 250,
            delay: anime.stagger(20),
            easing: "easeInOutCirc",
        });
        anime({
            targets: ["." + styles.profileImageDummy],
            translateX: [0, -3],
            translateY: [0, 3],
            duration: 250,
            easing: "easeInOutCirc",
        });
        anime({
            targets: ["." + styles.profileImage],
            translateX: [0, 4],
            translateY: [0, -4],
            duration: 250,
            easing: "easeInOutCirc",
        });
    }, []);

    let meta = props.data.site.siteMetadata;
    let file = props.data.file;

    return (
        <Layout title="Kevin Kandlbinder" transparentTopbar={true}>
            <section className={styles.heroSection}>
                <div
                    className={styles.heroSectionBg}
                    id="particle-container"
                ></div>
                <div className={styles.heroSectionBgOver}></div>
                <div className={styles.profile + " profile"}>
                    <div
                        className={styles.profileImage}
                    >
                        <StaticImage src={"../../content/images/kevin-kandlbinder-04.jpg"} width={250} height={350} placeholder="blurred"></StaticImage>
                    </div>
                    <div className={styles.profileImageDummy}></div>
                    <div className={styles.profileCard}>
                        <span className={styles.hello}>
                            <Trans>homeHello</Trans>
                        </span>
                        <span className={styles.name}>Kevin Kandlbinder</span>
                        <span className={styles.description}>
                            <Trans>homeMe</Trans>{" "}
                            <span id="descriptionType">
                                <Trans>homeWebDeveloper</Trans>
                            </span>
                            .
                        </span>

                        <div className={styles.contactLinks}>
                            <a
                                className={styles.contactLink}
                                href={"tel:" + meta.contactPhone}
                                rel="me"
                            >
                                <Phone width={20} />
                                {meta.contactPhone}
                            </a>
                            <a
                                className={styles.contactLink}
                                href={"mailto:" + meta.contactEmail}
                                rel="me"
                            >
                                <Mail width={20}/>
                                {meta.contactEmail}
                            </a>
                            <a
                                className={styles.contactLink}
                                href={meta.mapsLink}
                                rel="noreferrer "
                                target="_blank"
                            >
                                <MapPin width={20} />
                                <Trans>homeMyLocation</Trans>
                            </a>
                            <a
                                className={styles.contactLink}
                                href={meta.contactMastodonHref}
                                rel="noreferrer me"
                                target="_blank"
                            >
                                <AtSign width={20}/>
                                {meta.contactMastodon}
                            </a>
                            <a
                                className={styles.contactLink}
                                href={
                                    "https://github.com/" + meta.contactGitHub
                                }
                                rel="noreferrer me"
                                target="_blank"
                            >
                                <Github width={20}/>
                                {meta.contactGitHub}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.aboutSection}>
                <article>
                    <div className={styles.aboutText}>
                        <MDXRenderer>{file.childMdx.body}</MDXRenderer>
                    </div>
                    <div className={styles.skills}>
                        <h2>
                            <Trans>mySkills</Trans>
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
            <a
                className={styles.creditSection}
                href="https://unsplash.com/@jannikkiel"
                target="_blank"
                rel="noreferrer"
            >
                <div>
                    <span>
                        <Camera/>{" "}
                        <Trans>homeImageCredit</Trans>
                    </span>
                    <ArrowRight/>
                </div>
            </a>
            <section className="featuredSection">
                <article>
                    <h1>
                        <Trans>featuredProjects</Trans>
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
                                        <div className={
                                            projectStyles.projectCardBg
                                        }>
                                            <GatsbyImage image={project.image.childImageSharp.gatsbyImageData} objectFit="cover" style={{height: "100%"}}></GatsbyImage>
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
                        <Trans>seeMore</Trans>{" "}
                        <ArrowRight/>
                    </Link>
                </article>
            </section>
            <Link className={styles.donationSection} to="/donate">
                <div>
                    <span>
                        <Trans>donationCatchphrase</Trans>
                    </span>
                    <ArrowRight/>
                </div>
            </Link>
        </Layout>
    );
};

IndexPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default IndexPage;
