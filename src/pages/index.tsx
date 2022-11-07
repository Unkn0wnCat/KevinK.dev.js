import * as React from "react";
import Layout from "../layouts/default";
import PropTypes from "prop-types";

import * as styles from "./index.module.scss";

import { Trans, Link } from "gatsby-plugin-react-i18next";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import anime from "animejs";

import {
    ArrowRight,
    AtSign,
    Camera,
    Github,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@react-hook/media-query";
//import * as particleConfig from "./index.particles.json";

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

/*const loadTsParticles = async () => {
    import("tsparticles").then(({ tsParticles }) => {
        tsParticles.load("particle-container", particleConfig).then(() => {
            anime({
                targets: ["#particle-container > canvas"],
                opacity: [0, 1],
                duration: 10000,
                easing: "easeInOutCirc",
            });
        });
    });
};*/

const IndexPage = (props) => {
    const { t } = useTranslation();
    const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

    React.useEffect(() => {
        if (typeof window === "undefined") return;
        if (reduceMotion) return;

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

        /*if (typeof window !== "undefined")
            // eslint-disable-next-line no-undef
            window.setTimeout(loadTsParticles, 1000);*/
    }, [reduceMotion]);

    let meta = props.data.site.siteMetadata;

    return (
        <Layout
            title="Kevin Kandlbinder"
            transparentTopbar={true}
            description={t("site.description")}
            image={"/owner.jpg"}
            speakable={{
                "@type": "SpeakableSpecification",
                xPath: ["article"],
            }}
        >
            <section className={styles.heroSection}>
                <div
                    className={styles.heroSectionBg}
                    id="particle-container"
                ></div>
                <div className={styles.profile + " profile h-card"}>
                    <div className={styles.profileImage}>
                        <StaticImage
                            src={
                                "../../content/images/kevin-kandlbinder-04.jpg"
                            }
                            width={250}
                            height={350}
                            placeholder="blurred"
                            alt="Kevin Kandlbinder"
                            className={"u-photo"}
                        ></StaticImage>
                    </div>
                    <div className={styles.profileImageDummy}></div>
                    <div className={styles.profileCard}>
                        <span className={styles.hello}>
                            <Trans>home.hello</Trans>
                        </span>
                        <span className={styles.name + " p-name"}>
                            Kevin Kandlbinder
                        </span>
                        <span className={styles.description}>
                            <Trans>home.me</Trans>{" "}
                            <span id="descriptionType" className="p-job-title">
                                <Trans>home.webDeveloper</Trans>
                            </span>
                            .
                        </span>

                        <div className={styles.contactLinks}>
                            <a
                                className={styles.contactLink + " p-tel"}
                                href={"tel:" + meta.contactPhone}
                                rel="me"
                            >
                                <Phone width={20} />
                                {meta.contactPhone}
                            </a>
                            <a
                                className={styles.contactLink + " u-email"}
                                href={"mailto:" + meta.contactEmail}
                                rel="me"
                            >
                                <Mail width={20} />
                                {meta.contactEmail}
                            </a>
                            <a
                                className={styles.contactLink + " p-adr"}
                                href={meta.mapsLink}
                                rel="noreferrer "
                                target="_blank"
                            >
                                <MapPin width={20} />
                                <Trans>home.myLocation</Trans>
                            </a>
                            <a
                                className={styles.contactLink}
                                href={meta.contactMastodonHref}
                                rel="noreferrer me"
                                target="_blank"
                            >
                                <AtSign width={20} />
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
                                <Github width={20} />
                                {meta.contactGitHub}
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.spacer}></div>
                <div className={styles.landingCta}>
                    <Link to={"/projects/"}>
                        <div>
                            <span className={styles.ctaAccent}>
                                {t("home.explore")}
                            </span>{" "}
                            <span>{t("home.myProjects")}</span>
                        </div>
                        <ArrowRight />
                    </Link>
                    <Link to={"/social/"}>
                        <div>
                            <span className={styles.ctaAccent}>
                                {t("home.discover")}
                            </span>{" "}
                            <span>{t("home.mySocials")}</span>
                        </div>
                        <ArrowRight />
                    </Link>
                    <Link to={"/about/"}>
                        <div>
                            <span className={styles.ctaAccent}>
                                {t("home.learn")}
                            </span>{" "}
                            <span>{t("home.moreAboutMe")}</span>
                        </div>
                        <ArrowRight />
                    </Link>
                </div>
            </section>
            <a
                className={styles.creditSection}
                href="https://unsplash.com/@jannikk"
                target="_blank"
                rel="noreferrer"
            >
                <div>
                    <span>
                        <Camera /> <Trans>home.imageCredit</Trans>
                    </span>
                    <ArrowRight />
                </div>
            </a>
        </Layout>
    );
};

IndexPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default IndexPage;
