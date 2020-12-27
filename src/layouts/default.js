import React from "react"
import PropTypes from "prop-types"
import Navigation from "../components/navigation"
import SEO from "../components/seo";

import "./default.scss";
import {Link, Trans} from 'gatsby-plugin-react-i18next';
import LanguageSwitcher from "../components/languageSwitcher";

class Layout extends React.Component {
    render() {
        return (
            <>
                <SEO description={this.props.description} lang={this.props.lang} meta={this.props.meta} title={this.props.title} />
                <Navigation isHome={this.props.transparentTopbar} module={this.props.module} />
                <div id="content" role="main">
                    {this.props.children}
                </div>
                <footer role="contentinfo">CC-BY 4.0 Kevin Kandlbinder, <Link to="/legal/about" class="spf-link"><Trans i18nKey="imprint">Imprint</Trans></Link> | <Link to="/legal/datasec" class="spf-link"><Trans i18nKey="datasec">Data Protection</Trans></Link> | <Link to="/legal/disclaimer" class="spf-link"><Trans i18nKey="disclaimer">Disclaimer</Trans></Link> | <a href="#languageChooser">Language</a></footer>
                <div className="languageModal" id="languageChooser">
                    <LanguageSwitcher />
                </div>
            </>
        );
    }
}

Layout.defaultProps = {
    module: `none`,
    meta: [],
    description: ``,
    transparentTopbar: false
}

Layout.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
    module: PropTypes.string.isRequired,
    transparentTopbar: PropTypes.bool,
    children: PropTypes.object.isRequired
}

export default Layout;