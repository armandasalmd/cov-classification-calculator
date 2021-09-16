import Head from "next/head";
import styles from "../styles/Home.module.css";

import CONSTANTS from "/src/utils/constants";
import { templateConfig } from "/src/utils/templates";

function CourseCard({displayName, description}) {
    return (
        <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>{displayName} &rarr;</h2>
            <p>{description}</p>
        </a>
    );
}

export default function Home() {
    const courseTemplates = templateConfig.templates.map(function (template) {
      return <CourseCard {...template} />
    })

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

                <div className={styles.grid}>
                    {courseTemplates}
                </div>
            </main>

            <footer className={styles.footer}>
                Disclaimer! This calculator app is just a helper but not a
                guarantee.
            </footer>
        </div>
    );
}
