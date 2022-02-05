import React from "react";

import * as styles from "./Chatbox.module.scss"

const Chatnotice = (props: React.PropsWithChildren<{}>) => {
    return <div className={styles.chatnotice}>
        <span>{props.children}</span>
    </div>
}

export default Chatnotice