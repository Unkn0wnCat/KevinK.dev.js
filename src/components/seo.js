import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "gatsby-plugin-react-i18next"
import { useStaticQuery, graphql } from "gatsby"
import {useTranslation} from 'gatsby-plugin-react-i18next';

function SEO({ description, meta, title }) {
  const {t} = useTranslation();
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `
  )

  const metaDescription = description || t("siteDescription");

  return (
    <Helmet
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
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
            content: "Kevin Kandlbinder, Kevin, Kandlbinder, Web, Web Developer, Developer, JavaScript, PHP, Java, Photos, Fotos"
        }
      ].concat(meta)} 
    >
        <script src="https://kit.fontawesome.com/1377f925e0.js" crossorigin="anonymous"></script>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&family=Roboto&display=swap" rel="stylesheet"/> 
    </Helmet>
  )
}

SEO.defaultProps = {
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO