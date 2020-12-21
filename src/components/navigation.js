import React from "react"
import { Trans, Link } from "gatsby-plugin-react-i18next"

export default class Navigation extends React.Component {
    render() {
        return (
            <div className={"topBar" + (this.props.isHome ? " homeBar" : "")}>
                <nav className="topBarInner">
                    <Link to="/" className={"logo" + (this.props.module == "home" ? " active" : "")}>KevinK.dev</Link>
                    <div className="flexSpacer"></div>
                    <Link id="navBtnProjects" to="/projects" className={(this.props.module == "projects" ? "active" : "")}><Trans>projects</Trans></Link>
                    <Link id="navBtnSocial" to="/social" className={(this.props.module == "social" ? "active" : "")}><Trans>social</Trans></Link>
                </nav>
            </div>
        );
    }
}