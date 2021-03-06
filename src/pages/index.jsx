import Head from "next/head";
import styles from "../styles/Home.module.css";

import CONSTANTS from "/src/utils/constants";
import { templateConfig } from "/src/utils/templates";

function CourseCard({ displayName, description, id }) {
  return (
    <a href={`/calculate/${id}`} className={styles.card}>
      <h2>{displayName} &rarr;</h2>
      <p>{description}</p>
    </a>
  );
}

export default function Home() {
  const courseTemplates = templateConfig.templates.map(function (template) {
    return <CourseCard key={template.key} {...template} id={template.key} />;
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>{CONSTANTS.appName}</title>
        <meta name="description" content={CONSTANTS.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>degree classification app 🎓</span>
        </h1>

        <p className={styles.description}>
          Get started by choosing your course template
        </p>

        <div className={styles.grid}>{courseTemplates}</div>
      </main>

      <footer className={styles.footer}>
        <p>Disclaimer! This calculator has not been officially verified as accurate against Coventry University&apos;s internal systems. However, it does follow the algorithms correctly (to the best of our knowledge).</p>
        <p>by Armandas Barkauskas</p>
      </footer>
    </div>
  );
}
