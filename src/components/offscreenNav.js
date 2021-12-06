/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";
import { Trans, Link, useTranslation } from "gatsby-plugin-react-i18next";
import { createPortal } from "react-dom";

import * as styles from "./navigation.module.scss";
import { X } from "lucide-react";

const OffScreenNav = ({ active, close }) => {
    const { t } = useTranslation();
    if (typeof document === "undefined") return <></>;

    return createPortal(
        <div
            className={
                styles.offscreenNav + (active ? " " + styles.active : "")
            }
        >
            <div className={styles.inner}>
                <button
                    className={styles.close}
                    onClick={close}
                    aria-label={t("closeMenu")}
                >
                    <X />
                </button>
                <span>
                    <Trans>menu</Trans>
                </span>
                <Link to="/" activeClassName={styles.active}>
                    <Trans>home.title</Trans>
                </Link>
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
            </div>
        </div>,
        document.getElementById("osnav")
    );
};

OffScreenNav.propTypes = {
    close: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
};

export default OffScreenNav;
