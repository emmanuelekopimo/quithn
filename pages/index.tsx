/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from "next/head";

function Home() {
  // dynamic year for footer
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
        <title>Quithn - Your book. Your quiz. Your way</title>
        <meta
          name="description"
          content="Create Google Forms Quizzes from PDFs in one click"
        />

        <meta property="og:url" content="https://quithn.acadeva.xyz/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Quithn − Your book. Your quiz. Your way"
        />
        <meta
          property="og:description"
          content="Create Google Forms Quizzes from PDFs in one click"
        />
        <meta
          property="og:image"
          content="https://quithn.acadeva.xyz/assets/logo.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="quithn.acadeva.xyz" />
        <meta property="twitter:url" content="https://quithn.acadeva.xyz/" />
        <meta
          name="twitter:title"
          content="Quithn − Your book. Your quiz. Your way"
        />
        <meta
          name="twitter:description"
          content="Create Google Forms Quizzes from PDFs in one click"
        />
        <meta
          name="twitter:image"
          content="https://quithn.acadeva.xyz/assets/logo.jpg"
        />
      </Head>
      <div className="app-container">
        <img src="/assets/quithn.png" alt="Quithn" className="cover" />
        <h2>Create Google Forms Quizzes from PDFs in one click</h2>
        <div className="card">
          <h2 className="inside">
            Born as a prototype.<br></br>
            Crowned in a hackathon.<br></br>
            Now, Quithn is part of <b>ACADEVA</b>.
          </h2>
          <div className="button-grid">
            <a
              href="https://play.google.com/store/apps/details?id=com.acadeva.myapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
            >
              <img src="/assets/playstore.png" alt="Get it on Google Play" />
            </a>
            <a
              href="https://acadeva.xyz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Learn more about Acadeva"
            >
              <img
                src="/assets/learn-more.png"
                alt="Learn more about Acadeva"
              />
            </a>
          </div>
        </div>

        <footer className="footer">© Acadeva L.P {currentYear}</footer>
      </div>
    </>
  );
}

export default Home;
