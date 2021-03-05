import React from "react"
import Layout from "../layouts/default";
import { Trans, useI18next } from "gatsby-plugin-react-i18next"
import { graphql } from 'gatsby'
import PropTypes from "prop-types"

import * as styles from "./friends.module.scss";

export const query = graphql`
query AllFriendsQuery($language: String!) {
    allFriendsJson {
      nodes {
        name
        profession
        url
        imageURL
      }
    }
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
  
`

const FriendsPage = ({ data }) => {

    const { t } = useI18next();

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    return (
        <Layout module="social" title={t("friends")} description={t("friendsDescription")}>
            <section>
                <article>
                    <h1><Trans>social</Trans></h1>

                    <p><Trans>friendsDescription</Trans></p>

                    <div className={styles.friendsList}>
                        {
                            shuffle(data.allFriendsJson.nodes).map((friend) => {
                                return (
                                    <div className={styles.friendProfile} key={friend.url + "#" + friend.name}>
                                        <div className={styles.friendImage} style={{ backgroundImage: "url(" + friend.imageURL + ")" }}>
                                            <span className={styles.friendName}>{friend.name}</span>
                                            <span className={styles.friendTitle}>{friend.profession}</span>
                                        </div>

                                        {/*<span class="friendBio"></span>*/}
                                        <div className={styles.contactLinks}>
                                            <a className={styles.contactLink} href={friend.url} target="_blank" rel="noreferrer"><i className="fas fa-globe-europe" aria-hidden="true"></i> {friend.url}</a>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>

                    {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
                </article>
            </section>
        </Layout>
    );
}

FriendsPage.propTypes = {
    data: PropTypes.object.isRequired
};

export default FriendsPage;