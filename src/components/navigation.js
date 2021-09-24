import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Trans, Link } from "gatsby-plugin-react-i18next";
import { graphql, StaticQuery } from "gatsby";

import * as styles from "./navigation.module.scss";

const Navigation = ({ isHome }) => {
    let [atTop, setAtTop] = useState(false);

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
                        <Link to="/" activeClassName={styles.active}>
                            {data.site.siteMetadata.title}
                        </Link>
                    )}
                />
                <div className="flexSpacer"></div>
                <Link
                    id="navBtnProjects"
                    to="/projects"
                    activeClassName={styles.active}
                >
                    <Trans>projects</Trans>
                </Link>
                <Link
                    id="navBtnSocial"
                    to="/social"
                    activeClassName={styles.active}
                >
                    <Trans>social</Trans>
                </Link>
            </nav>
        </div>
    );
};

Navigation.propTypes = {
    isHome: PropTypes.bool.isRequired,
};

export default Navigation;
