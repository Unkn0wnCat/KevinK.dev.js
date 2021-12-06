/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Trans, Link, useTranslation } from "gatsby-plugin-react-i18next";
import { graphql, StaticQuery } from "gatsby";

import * as styles from "./navigation.module.scss";
import { Fade as Hamburger } from "hamburger-react";
import OffScreenNav from "./offscreenNav";

const Navigation = ({ isHome }) => {
    let [atTop, setAtTop] = useState(false);
    const [offscreenNavActive, setOffscreenNavActive] = useState(false);
    const { t } = useTranslation();

    const closeOffscreenNav = () => setOffscreenNavActive(false);

    const updateTransparency = () => {
        if (typeof window === "undefined") return;

        // eslint-disable-next-line no-undef
        if (window.scrollY < 15) {
            if (!atTop) setAtTop(true);
        } else {
            if (atTop) setAtTop(false);
        }
    };

    useEffect(() => {
        if (typeof window === "undefined") return;

        // eslint-disable-next-line no-undef
        window.addEventListener("scroll", updateTransparency);
        // eslint-disable-next-line no-undef
        window.addEventListener("navigate", updateTransparency);

        updateTransparency();

        // eslint-disable-next-line no-undef
        let int = window.setInterval(updateTransparency, 10000);

        return () => {
            // eslint-disable-next-line no-undef
            window.removeEventListener("scroll", updateTransparency);
            // eslint-disable-next-line no-undef
            window.removeEventListener("navigate", updateTransparency);

            // eslint-disable-next-line no-undef
            window.clearInterval(int);
        };
    });

    return (
        <div
            className={
                styles.topBar +
                (isHome ? " " + styles.homeBar : "") +
                (atTop ? " " + styles.homeBarTransparent : "")
            }
        >
            <OffScreenNav
                active={offscreenNavActive}
                close={closeOffscreenNav}
            />
            <nav className={styles.topBarInner}>
                <StaticQuery
                    query={graphql`
                        query {
                            site {
                                siteMetadata {
                                    title
                                }
                            }
                        }
                    `}
                    render={(data) => (
                        <Link
                            to="/"
                            activeClassName={styles.active}
                            className={styles.logo}
                        >
                            {data.site.siteMetadata.title}
                        </Link>
                    )}
                />
                <div className="flexSpacer"></div>
                <Link to="/about" activeClassName={styles.active}>
                    <Trans>about.title</Trans>
                </Link>
                <Link to="/projects" activeClassName={styles.active}>
                    <Trans>project.plural</Trans>
                </Link>
                <Link to="/social" activeClassName={styles.active}>
                    <Trans>social.title</Trans>
                </Link>
                <Link to="/blog" activeClassName={styles.active}>
                    <Trans>blog.title</Trans>
                </Link>
                <div className={styles.hamburger}>
                    <Hamburger
                        toggle={setOffscreenNavActive}
                        toggled={offscreenNavActive}
                        rounded
                        size={30}
                        label={t("openMenu")}
                    />
                </div>
            </nav>
        </div>
    );
};

Navigation.propTypes = {
    isHome: PropTypes.bool.isRequired,
};

export default Navigation;
