import React, { useState } from "react";
import Layout from "../layouts/default";
import { graphql } from "gatsby";
import { Trans, useI18next, I18nextContext } from "gatsby-plugin-react-i18next";
import PropTypes from "prop-types";
import GitHubButton from "react-github-btn";

import * as styles from "./donate.module.scss";
import { ArrowRight } from "lucide-react";

export const query = graphql`
    query ($language: String!) {
        site {
            siteMetadata {
                title
                siteUrl
                payPalMail
                contactGitHub
            }
        }
        file(relativePath: { eq: "images/pplogo.png" }) {
            childImageSharp {
                resize(width: 240, height: 240, fit: CONTAIN) {
                    src
                }
            }
        }
        locales: allLocale(filter: { language: { eq: $language } }) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
    }
`;

const DonatePage = (props) => {
    const [amount, setAmount] = useState(5);
    const { t } = useI18next();
    const { path } = React.useContext(I18nextContext);

    const { site, file } = props.data;

    return (
        <Layout title={t("donate")} description={t("donationCatchphrase")}>
            <section>
                <article>
                    <h1>
                        <Trans>donate</Trans>
                    </h1>

                    <p>
                        <Trans>donateDescription</Trans>
                    </p>

                    <p>
                        <Trans>donateGitHub</Trans>
                    </p>

                    <p style={{ display: "block", textAlign: "center" }}>
                        <GitHubButton
                            href={
                                "https://github.com/sponsors/" +
                                site.siteMetadata.contactGitHub
                            }
                            data-color-scheme="no-preference: light; light: dark; dark: dark;"
                            data-icon="octicon-heart"
                            data-size="large"
                            aria-label="Sponsor @Unkn0wnCat on GitHub"
                        >
                            <Trans>sponsorGitHub</Trans>
                        </GitHubButton>
                    </p>

                    <p>
                        <Trans>donatePayPal</Trans>
                    </p>

                    <div className={styles.priceAmount}>
                        <label htmlFor="priceInput" className={styles.sronly}>
                            Amount
                        </label>
                        <input
                            type="number"
                            min="1"
                            placeholder="10.00"
                            step="1"
                            value={amount}
                            onChange={(ev) => {
                                setAmount(ev.target.value);
                            }}
                            name="priceInput"
                            id="priceInput"
                        />
                        <div>€</div>
                    </div>

                    <a
                        className={styles.donateButton}
                        rel="noopener"
                        id="payPalBtn"
                        href={
                            "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=" +
                            encodeURIComponent(site.siteMetadata.payPalMail) +
                            "&item_name=" +
                            encodeURIComponent(site.siteMetadata.title) +
                            "&currency_code=EUR&image_url=" +
                            encodeURIComponent(
                                site.siteMetadata.siteUrl +
                                    file.childImageSharp.resize.src
                            ) +
                            "&return=" +
                            encodeURIComponent(
                                site.siteMetadata.siteUrl +
                                    "/" +
                                    path +
                                    "thank-you/"
                            ) +
                            "&rm=0&cancel_return=" +
                            encodeURIComponent(
                                site.siteMetadata.siteUrl + "/" + path
                            ) +
                            "&amount=" +
                            amount
                        }
                    >
                        <span>Donate using PayPal</span>
                        <ArrowRight />
                    </a>
                </article>
            </section>
        </Layout>
    );
};

DonatePage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default DonatePage;
