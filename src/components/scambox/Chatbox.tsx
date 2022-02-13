import React from "react";
import { useTranslation } from "react-i18next";

import * as styles from "./Chatbox.module.scss";

type ChatboxProps = {
    open?: string;
};

const Chatbox = ({ children, open }: React.PropsWithChildren<ChatboxProps>) => {
    const { t } = useTranslation();

    return (
        <div
            className={
                styles.chatbox +
                (open === "top" ? " " + styles.openTop : "") +
                (open === "bottom" ? " " + styles.openBottom : "") +
                (open === "both" ? " " + styles.openBoth : "")
            }
        >
            <span className={styles.screenReader}>
                --{" "}
                {open === "top" || open === "both"
                    ? t("blog.scambox.chatbox.resume")
                    : t("blog.scambox.chatbox.begin")}{" "}
                --
            </span>
            {children}
            <span className={styles.screenReader}>
                --{" "}
                {open === "bottom" || open === "both"
                    ? t("blog.scambox.chatbox.interrupt")
                    : t("blog.scambox.chatbox.end")}{" "}
                --
            </span>
        </div>
    );
};

export default Chatbox;
