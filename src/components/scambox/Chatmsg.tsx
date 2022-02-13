import React from "react";
import { useTranslation } from "react-i18next";

import * as styles from "./Chatbox.module.scss";

type ChatmsgProps = {
    name?: string;
    timestamp?: string;
    color?: string;
    dir: string;
};

const Chatmsg = (props: React.PropsWithChildren<ChatmsgProps>) => {
    const { t } = useTranslation();

    return (
        <div
            className={
                styles.chatmsg +
                (props.dir === "out" ? " " + styles.alignRight : "")
            }
        >
            {props.name && (
                <span className={styles.name}>
                    {props.name}
                    <span className={styles.screenReader}>
                        {" "}
                        {t("blog.scambox.chatbox.says")}
                    </span>
                </span>
            )}
            <div className={styles.chatbubble}>
                <div>{props.children}</div>
                {props.timestamp && <span>{props.timestamp}</span>}
            </div>
        </div>
    );
};

export default Chatmsg;
