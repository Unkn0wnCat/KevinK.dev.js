import { useStaticQuery, graphql } from "gatsby";

const useSiteMetadata = () => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        keywords
                        author
                        siteUrl
                        payPalMail
                        contactEmail
                        contactPhone
                        mapsLink
                        contactTwitter
                        contactGitHub
                        contactMastodon
                        contactMastodonHref
                        givenName
                        familyName
                        birthDate
                        address
                        gender
                        height
                        nationality
                        sameAs
                    }
                }
            }
        `
    );
    return site.siteMetadata;
};

export default useSiteMetadata;
