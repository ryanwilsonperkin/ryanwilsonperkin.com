import React from "react";
import Layout from "../layouts/main";

const Home = () => {
  return (
    <Layout title="Ryan Wilson-Perkin">
      <section id="title">
        <h1>Ryan</h1>
        <h2>Wilson-Perkin</h2>
      </section>
      <section id="introduction">
        <p>
          Hey! My name's Ryan, I'm a full-stack developer living in beautiful
          Toronto, Ontario.
        </p>
        <p>
          I graduated from the University of Guelph where I helped run the{" "}
          <a href="http://socis.ca">
            Society of Computing and Information Science
          </a>
          .
        </p>
        <p>
          You can reach me by{" "}
          <a href="mailto:ryanwilsonperkin@gmail.com">email</a>, follow me on{" "}
          <a href="https://twitter.com/rwilsonperkin">Twitter</a>, or check out
          my code on <a href="https://github.com/ryanwilsonperkin">GitHub</a>.
        </p>
      </section>
    </Layout>
  );
};

export default Home;
