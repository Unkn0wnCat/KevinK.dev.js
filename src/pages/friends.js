import React from "react";
import Layout from "../layouts/default";
import { Trans, useI18next } from "gatsby-plugin-react-i18next";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import * as styles from "./friends.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Globe2 } from "lucide-react";

export const query = graphql`
    query AllFriendsQuery($language: String!) {
        allFriendsJson {
            nodes {
                name
                profession
                url
                localImage {
                    childImageSharp {
                        gatsbyImageData(
                            height: 300
                            width: 300
                            placeholder: BLURRED
                        )
                    }
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

const FriendsPage = ({ data }) => {
    const { t } = useI18next();

    return (
        <Layout
            title={t("friends.title")}
            description={t("friends.description")}
        >
            <section>
                <article>
                    <h1>
                        <Trans>friends.title</Trans>
                    </h1>

                    <p>
                        <Trans>friends.description</Trans>
                    </p>

                    <div className={styles.friendsList}>
                        {data.allFriendsJson.nodes.map((friend) => {
                            return (
                                <div
                                    className={styles.friendProfile}
                                    key={friend.url + "#" + friend.name}
                                >
                                    <div
                                        className={styles.friendImage}
                                        key={
                                            friend.url +
                                            "#" +
                                            friend.name +
                                            "#image"
                                        }
                                    >
                                        <div className={styles.friendBg}>
                                            <GatsbyImage
                                                image={getImage(
                                                    friend.localImage
                                                )}
                                            ></GatsbyImage>
                                        </div>
                                        <span
                                            className={styles.friendName}
                                            key={
                                                friend.url +
                                                "#" +
                                                friend.name +
                                                "#name"
                                            }
                                        >
                                            {friend.name}
                                        </span>
                                        <span
                                            className={styles.friendTitle}
                                            key={
                                                friend.url +
                                                "#" +
                                                friend.name +
                                                "#profession"
                                            }
                                        >
                                            {friend.profession}
                                        </span>
                                    </div>

                                    <div
                                        className={styles.contactLinks}
                                        key={
                                            friend.url +
                                            "#" +
                                            friend.name +
                                            "#links"
                                        }
                                    >
                                        <a
                                            className={styles.contactLink}
                                            href={friend.url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <Globe2 height={20} /> {friend.url}
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </article>
            </section>
        </Layout>
    );
};

FriendsPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default FriendsPage;
