import React from "react";
import PropTypes from "prop-types";
import Navigation from "../components/navigation";
import SEO from "../components/seo";

import "./default.scss";
import { Link, Trans } from "gatsby-plugin-react-i18next";
import LanguageSwitcher from "../components/languageSwitcher";

class Layout extends React.Component {
    render() {
        return (
            <>
                <SEO
                    description={this.props.description}
                    lang={this.props.lang}
                    meta={this.props.meta}
                    title={this.props.title}
                    image={this.props.image}
                    speakable={this.props.speakable}
                >
                    {this.props.seoAdditional ?? null}
                </SEO>
                <Navigation isHome={this.props.transparentTopbar} />
                <div id="content" role="main">
                    {this.props.children}
                </div>
                <footer role="contentinfo">
                    CC-BY 4.0 Kevin Kandlbinder,{" "}
                    <Link to="/legal/about" className="spf-link">
                        <Trans i18nKey="layout.imprint">Imprint</Trans>
                    </Link>{" "}
                    |{" "}
                    <Link to="/legal/datasec" className="spf-link">
                        <Trans i18nKey="layout.datasec">Data Protection</Trans>
                    </Link>{" "}
                    |{" "}
                    <Link to="/legal/disclaimer" className="spf-link">
                        <Trans i18nKey="layout.disclaimer">Disclaimer</Trans>
                    </Link>{" "}
                    | <a href="#languageChooser">Language</a>
                </footer>

                <LanguageSwitcher />
            </>
        );
    }
}

Layout.defaultProps = {
    module: `none`,
    meta: [],
    description: ``,
    transparentTopbar: false,
};

Layout.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
    transparentTopbar: PropTypes.bool,
    children: PropTypes.any.isRequired,
    seoAdditional: PropTypes.any,
    image: PropTypes.string,
    speakable: PropTypes.any,
};

export default Layout;
