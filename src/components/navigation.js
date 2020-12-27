import React from "react"
import PropTypes from "prop-types"
import { Trans, Link } from "gatsby-plugin-react-i18next"
import { graphql, StaticQuery } from 'gatsby'

const Navigation = ({ isHome, module }) => {
    return (
        <div className={"topBar" + (isHome ? " homeBar" : "")}>
            <nav className="topBarInner">
                <StaticQuery query={graphql`
                    query {
                        site {
                            siteMetadata {
                                title
                            }
                        }
                    }
                `} render={data => (
                        <Link to="/" className={"logo" + (module === "home" ? " active" : "")}>{data.site.siteMetadata.title}</Link>
                    )} />
                <div className="flexSpacer"></div>
                <Link id="navBtnProjects" to="/projects" className={(module === "projects" ? "active" : "")}><Trans>projects</Trans></Link>
                <Link id="navBtnSocial" to="/social" className={(module === "social" ? "active" : "")}><Trans>social</Trans></Link>
            </nav>
        </div>
    );
}

Navigation.propTypes = {
    isHome: PropTypes.bool.isRequired,
    module: PropTypes.string.isRequired
}

export default Navigation;