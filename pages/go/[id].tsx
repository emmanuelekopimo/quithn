import Head from 'next/head';
import { useRouter } from 'next/router';

const RedirectToGoogleForm = () => {
  const router = useRouter();
  const { id } = router.query;
  if (id) {
    window.location.href = `https://docs.google.com/forms/d/${id}/viewform`;
  }
  return <><Head>
    <link rel="icon" type="image/svg+xml" href="/favicon.png" />
    <title>Quithn − A Google Forms quiz</title>
    <meta name="description" content="Create Google Forms Quizzes from PDFs in one click" />

    <meta property="og:url" content="https://quithn.acadeva.xyz/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Quithn − A Google Forms quiz" />
    <meta property="og:description" content="Create Google Forms Quizzes from PDFs in one click" />
    <meta property="og:image" content="https://quithn.acadeva.xyz/assets/p.jpg" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content="quithn.acadeva.xyz" />
    <meta property="twitter:url" content="https://quithn.acadeva.xyz/" />
    <meta name="twitter:description" content="Create Google Forms Quizzes from PDFs in one click" />
    <meta name="twitter:image" content="https://quithn.acadeva.xyz/assets/p.jpg" />
  </Head>
    <p>Redirecting to Google Forms ...</p></>
};

export default RedirectToGoogleForm;
