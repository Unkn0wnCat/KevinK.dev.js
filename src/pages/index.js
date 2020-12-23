import * as React from "react"
import Layout from "../layouts/default"

import styles from "./index.module.scss"

import { Trans, Link } from "gatsby-plugin-react-i18next"

// markup
class IndexPage extends React.Component {
  render() {
    return (
      <Layout title="Kevin Kandlbinder" module="home">
        <section className={styles.heroSection}>
          <div className={styles.profile + " profile"}>
            <div data-bg="url(https://cdn.kevink.dev/images/kevin/kevin-kandlbinder-03.jpg)" style={{backgroundImage: "url(https://cdn.kevink.dev/images/kevin/kevin-kandlbinder-03.jpg)"}} className={styles.profileImage + " lazy"}></div>
            <div className={styles.profileImageDummy}></div>
            <div className={styles.profileCard}>
              <span className={styles.hello}><Trans>homeHello</Trans></span>
              <span className={styles.name}>Kevin Kandlbinder</span>
              <span className={styles.description}><Trans>homeMe</Trans> <span id="descriptionType"><Trans>homeWebDeveloper</Trans></span>.</span>
  
              <div className={styles.contactLinks}>
                <a className={styles.contactLink} href="tel:+4941068068004"><i className="fas fa-fw fa-phone"></i>+49 4106 8068004</a>
                <a className={styles.contactLink} href="mailto:kevin@kevink.dev?subject=%5Bkevink.dev%5D%20"><i className="far fa-fw fa-envelope"></i>kevin@kevink.dev</a>
                <a className={styles.contactLink} href="https://goo.gl/maps/KVq9z1PVaVP2" rel="noopener" target="_blank"><i className="fas fa-fw fa-map-marker-alt"></i><Trans>homeMyLocation</Trans></a>
                <a className={styles.contactLink} href="https://twitter.com/unkn0wnkevin" rel="noopener" target="_blank"><i className="fab fa-fw fa-twitter"></i>@Unkn0wnKevin</a>
                <a className={styles.contactLink} href="https://github.com/unkn0wncat" rel="noopener" target="_blank"><i className="fab fa-fw fa-github"></i>Unkn0wnCat</a>
              </div>
            </div>
          </div>
        </section>
        <section className="aboutSection">
          <article>
            <h1><Trans>homeAboutMe</Trans></h1>
            <p><Trans>homeAboutMeHello</Trans><br/><Trans>homeAboutMeText</Trans></p>
          </article>
        </section>
        <a className={styles.section + " " + styles.creditSection} href="https://unsplash.com/@jannikkiel" target="_blank" rel="noopener">
          <div>
            <span><i className="fas fa-fw fa-camera"></i> <Trans>homeImageCredit</Trans></span>
            <i className="fas fa-fw fa-chevron-right"></i>
          </div>
        </a>
        <Link className={styles.section + " " + styles.donationSection} to="/donate">
          <div>
            <span><Trans>donationCatchphrase</Trans></span>
            <i className="fas fa-fw fa-chevron-right"></i>
          </div>
        </Link>
      </Layout>
    )
  }
}

export default IndexPage
