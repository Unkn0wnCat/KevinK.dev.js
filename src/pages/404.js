import * as React from "react";
import { Link } from "gatsby-plugin-react-i18next";
import Layout from "../layouts/default";

const NotFoundPage = () => {
  return (
    <Layout title="Not found">
      <section>
        <article>
          <h1>Page not found</h1>
          <p>
            Whoops... That page doesn&apos;t exist, so you may as well{" "}
            <Link to="/">go home</Link>.
          </p>
        </article>
      </section>
    </Layout>
  );
};

export default NotFoundPage;
