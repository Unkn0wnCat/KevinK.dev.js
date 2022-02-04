import React from "react";
import Navigation from "../components/navigation";
import SEO from "../components/seo";
import "./default.scss";
import { Link, Trans } from "gatsby-plugin-react-i18next";
import LanguageSwitcher from "../components/languageSwitcher";

type LayoutProps = {
    description?: string,
    meta?: any[],
    title: string,
    transparentTopbar?: boolean,
    seoAdditional?: any,
    image?: string,
    speakable?: any
}

const Layout = ({description, meta, title, image, speakable, seoAdditional, transparentTopbar, children}: React.PropsWithChildren<LayoutProps>) => {
    return (
        <>
            <SEO
                description={description}
                meta={meta}
                title={title}
                image={image}
                speakable={speakable}
            >
                {seoAdditional ?? null}
            </SEO>
            <Navigation isHome={transparentTopbar} />
            <div id="content" role="main">
                {children}
            </div>
            <footer role="contentinfo">
                CC-BY 4.0 Kevin Kandlbinder,{" "}
                <Link to="/legal/about/" className="spf-link">
                    <Trans i18nKey="layout.imprint">Imprint</Trans>
                </Link>{" "}
                |{" "}
                <Link to="/legal/datasec/" className="spf-link">
                    <Trans i18nKey="layout.datasec">Data Protection</Trans>
                </Link>{" "}
                |{" "}
                <Link to="/legal/disclaimer/" className="spf-link">
                    <Trans i18nKey="layout.disclaimer">Disclaimer</Trans>
                </Link>{" "}
                | <a href="#languageChooser">Language</a>
            </footer>

            <LanguageSwitcher />
        </>
    );
}

Layout.defaultProps = {
    module: `none`,
    meta: [],
    description: ``,
    transparentTopbar: false,
};

export default Layout;
