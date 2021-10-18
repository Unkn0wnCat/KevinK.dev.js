/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";
import { Trans, Link } from "gatsby-plugin-react-i18next";
import { createPortal } from "react-dom";

import * as styles from "./navigation.module.scss";
import { X } from "lucide-react";

const OffScreenNav = ({ active, close }) => {
    if (typeof document === "undefined") return <></>;

    return createPortal(
        <div
            className={
                styles.offscreenNav + (active ? " " + styles.active : "")
            }
        >
            <div className={styles.inner}>
                <button className={styles.close} onClick={close}>
                    <X />
                </button>
                <span>
                    <Trans>menu</Trans>
                </span>
                <Link to="/" activeClassName={styles.active}>
                    <Trans>home</Trans>
                </Link>
                <Link
                    id="navBtnProjects"
                    to="/about"
                    activeClassName={styles.active}
                >
                    <Trans>about</Trans>
                </Link>
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
