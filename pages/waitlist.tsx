/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";

function WaitList() {
  const [successText, setSuccessText] = useState("");
  const [email, setEmail] = useState("");

  const joinWaitlist = async () => {
    // Send email here then wait a while to let user know
    Cookies.set("acadeva_waitlist", "usr_accept", { expires: Infinity });
    await fetch("https://api.acadeva.xyz/waitlist/add", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Email success");
    setSuccessText("Thank you for joining our waitlist 🚀");
    setTimeout(() => {
      setSuccessText("");
      window.location.href = "https://quithn.acadeva.xyz/";
    }, 3500);
  };

  const closeWaitList = () => {
    window.location.href = "https://quithn.acadeva.xyz/";
  };

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
        <title>Join waitlist − The next big thing</title>
        <meta
          name="description"
          content="It could get even better. We're building something even bigger"
        />

        <meta property="og:url" content="https://quithn.acadeva.xyz/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Join waitlist − The next big thing"
        />
        <meta
          property="og:description"
          content="It could get even better. We're building something even bigger"
        />
        <meta
          property="og:image"
          content="https://quithn.acadeva.xyz/assets/go.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="quithn.acadeva.xyz" />
        <meta property="twitter:url" content="https://quithn.acadeva.xyz/" />
        <meta
          name="twitter:title"
          content="Join waitlist − The next big thing"
        />
        <meta
          name="twitter:description"
          content="It could get even better. We're building something even bigger"
        />
        <meta
          name="twitter:image"
          content="https://quithn.acadeva.xyz/assets/go.jpg"
        />
      </Head>
      <div className="modal-container">
        <div className="m-card">
          <div className={`success`}>
            <p>{successText}</p>
          </div>

          <img src="/assets/l.png" className="small-img" />
          <div className="all-left">
            <b> Acadeva is the next big thing for students</b>
            <ul>
              <li>📚 Creating quizzes from textbooks</li>
            </ul>
            <ul>
              <li>🤝 Collaborate on answering questions</li>
            </ul>
            <ul>
              <li>🤖 Get AI-powered summary of textbooks</li>
            </ul>
            <ul>
              <li>🗓️ Create and share your lecture schedule</li>
            </ul>
            <ul>
              <li>🌦️ Real-time weather forecast for lectures</li>
            </ul>
            <ul>
              <li>📰 News and updates from your fellow student creators</li>
            </ul>
          </div>
          <div className="divider" id="middle">
            <hr></hr>
            <span>Want to know when we launch?</span>
            <hr></hr>
          </div>
          <input
            title="email"
            className="email-field"
            placeholder="e.g. johndoe@gmail.com"
            value={email}
            onInput={(e: any) => setEmail(e.target.value)}
          />
          <button className="generate-button" onClick={joinWaitlist}>
            Join Waitlist
          </button>
          <label className="upload-label no-margin" onClick={closeWaitList}>
            <div className="btn">Use Quithn</div>
          </label>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default WaitList;
