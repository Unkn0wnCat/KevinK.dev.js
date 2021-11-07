import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "gatsby-plugin-react-i18next";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";
import { useTranslation } from "gatsby-plugin-react-i18next";
import useSiteMetadata from "../helpers/useSiteMetadata";

function SEO({ description, meta, title, speakable, image, children }) {
    const { t } = useTranslation();
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        author
                        keywords
                    }
                }
            }
        `
    );

    const metaDescription = description || t("site.description");

    const siteMeta = useSiteMetadata();
    const location = useLocation();

    return (
        <Helmet title={title} titleTemplate={`%s | ${site.siteMetadata.title}`}>
            <meta
                name="battery-savings"
                content="allow-reduced-framerate"
            ></meta>
            {[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                {
                    name: "keywords",
                    content: site.siteMetadata.keywords,
                },
            ]
                .concat(meta)
                .map((m) => {
                    return (
                        <meta
                            key={m.name}
                            name={m.name}
                            content={m.content}
                        ></meta>
                    );
                })}
            <script
                async
                defer
                data-domain="kevink.dev"
                src="https://analytics.kevink.dev/js/plausible.js"
            ></script>

            {image && [
                <meta
                    name="twitter:image"
                    content={siteMeta.siteUrl + image}
                    key="twimg"
                />,
                <meta
                    name="og:image"
                    content={siteMeta.siteUrl + image}
                    key="ogimg"
                />,
            ]}

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org/",
                    "@type": "WebPage",
                    name: title,
                    url: siteMeta.siteUrl + location.pathname,
                    speakable: speakable,
                    image: siteMeta.siteUrl + image,
                    about: {
                        "@type": "Person",
                        name: siteMeta.givenName + " " + siteMeta.familyName,
                        givenName: siteMeta.givenName,
                        familyName: siteMeta.familyName,
                        birthDate: siteMeta.birthDate,
                        address: siteMeta.address,
                        email: siteMeta.contactEmail,
                        telephone: siteMeta.contactPhone,
                        gender: siteMeta.gender,
                        height: siteMeta.height,
                        nationality: {
                            "@type": "Country",
                            name: siteMeta.nationality,
                        },
                        image: siteMeta.siteUrl + "/owner.jpg",
                        sameAs: siteMeta.sameAs,
                    },
                })}
            </script>

            {children}
        </Helmet>
    );
}

SEO.defaultProps = {
    meta: [],
    description: ``,
};

SEO.propTypes = {
    description: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
    speakable: PropTypes.any,
    image: PropTypes.string,
    children: PropTypes.any,
};

export default SEO;
