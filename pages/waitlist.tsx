/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Head from 'next/head';

function WaitList() {
    const [successText, setSuccessText] = useState('')
    const [email, setEmail] = useState('')

    return (
        <>
            <Head>
                <link rel="icon" type="image/svg+xml" href="/favicon.png" />
                <title>Quithn − Your book. Your quiz. Your way</title>
                <meta name="description" content="It could get even better. We're building something even bigger" />

                <meta property="og:url" content="https://quithn.acadeva.xyz/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Join waitlist − The next big thing" />
                <meta property="og:description" content="It could get even better. We're building something even bigger" />
                <meta property="og:image" content="https://quithn.acadeva.xyz/assets/go.jpg" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="quithn.acadeva.xyz" />
                <meta property="twitter:url" content="https://quithn.acadeva.xyz/" />
                <meta name="twitter:title" content="Join waitlist − The next big thing" />
                <meta name="twitter:description" content="It could get even better. We're building something even bigger" />
                <meta name="twitter:image" content="https://quithn.acadeva.xyz/assets/go.jpg" />
            </Head>
            <div className="modal-container">
                <div className="m-card">
                    <div className={`success`}>
                        <p>w
                            {successText}
                        </p>
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
                        <span>
                            Want to know when we launch?
                        </span>
                        <hr></hr>
                    </div>
                    <input title="email" className="email-field" placeholder="e.g. helloworld@gmail.com"
                        value={email}
                        onInput={(e: any) => setEmail(e.target.value)}
                    />
                    <label className="upload-label no-margin">
                        <div className="btn">Join waitlist</div>
                    </label>
                    <label className="upload-label no-margin">
                        <div className="btn">Use Quithn</div>
                    </label>
                </div>
            </div >
        </>
    );
}

export default WaitList;
