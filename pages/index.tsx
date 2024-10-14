/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useEffect, useRef, useState } from "react";
import Head from 'next/head';
import Cookies from 'js-cookie';

function Home() {
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)
    const [showExample, setShowExample] = useState(false)
    const [fileName, setFileName] = useState('No file Selected');
    const [prompt, setPrompt] = useState('')
    const [errorText, setErrorText] = useState('')
    const [successText, setSuccessText] = useState('')
    const [gifSources, setGifSources] = useState(['', '']);
    const [pdf, setPdf] = useState(null)
    const [abortCount, setAbortCount] = useState(0)
    const ignoreRequestRef = useRef(abortCount);
    const [link, setLink] = useState('')
    const [id, setId] = useState('')
    const [email, setEmail] = useState('')
    const [emailWaitList, setEmailWaitList] = useState('')
    const [numberOfQuestions, setNumberOfQuestions] = useState('5')
    const [showPopUp, setShowPopUp] = useState(false)

    const start = async () => {
        if (!pdf) {
            setErrorText('Please select a file first');
            setTimeout(() => { setErrorText('') }, 3500)
            return;
        }
        const formData = new FormData();
        formData.append('file', pdf);
        console.log(ignoreRequestRef.current, abortCount);
        setLoading(true)
        let retryCount = 0;
        const maxRetries = 3;
        let success = false;
        let cleanedPrompt = prompt.replace(/\n/g, ". ");
        while (retryCount < maxRetries && !success) {
            try {
                const response = await fetch('https://quithn.onrender.com/upload', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'prompt': cleanedPrompt + `. Keep it simple. Make it ${numberOfQuestions} questions in total`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }

                const data = await response.json();
                console.log(ignoreRequestRef.current, abortCount);
                if (ignoreRequestRef.current === abortCount) {
                    console.log('File successfully uploaded:', data);
                    ready();
                    setLink(`https://quithn.acadeva.xyz/go/${data.id}`);
                    setId(data.id);
                    success = true;  // exit loop if upload is successful
                } else {
                    console.log('Response ignored as it was cancelled by the user');
                    break;
                }
            } catch (error) {
                if (error instanceof TypeError) {
                    // Network-related error (like lost internet connection)
                    console.error('Internet connection error, stopping retries:', error);
                    break;
                } else {
                    console.error(`Error uploading file (attempt ${retryCount + 1}):`, error);
                }
                retryCount++;
                if (retryCount === maxRetries) {
                    console.error('Maximum retry attempts reached, stopping.');
                }
            }
        }
        setLoading(false)
        if (!success) {
            setErrorText('An error occured');
            setTimeout(() => { setErrorText('') }, 3500)
        }
    };


    const cancel = async () => {
        setLoading(false)
        console.log('Request cancelled by the user')
        setAbortCount(prevCount => prevCount + 1)
    }

    useEffect(() => {
        console.log('Abort Count Updated:', abortCount);
        ignoreRequestRef.current = abortCount;
    }, [abortCount]);

    const ready = async () => {
        setDone(true)
        setLoading(false)
        setGifSources(['/assets/4.gif', '/assets/5.gif'])
        setTimeout(() => { setGifSources(['', '']) }, 1400)
    }

    const restart = async () => {
        const cookieValue = Cookies.get('acadeva_waitlist');
        if (!cookieValue) {
            setShowPopUp(true)
        }
        setDone(false)

    }

    const joinWaitlist = async () => {
        // Send email here then wait a while to let user know 
        Cookies.set('acadeva_waitlist', 'usr_accept', { expires: Infinity });
        await fetch('https://api.acadeva.xyz/waitlist/add', {
            method: 'POST',
            body: JSON.stringify({ email: emailWaitList }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Email success');
        setSuccessText('Thank you for joining our waitlist 🚀');
        setTimeout(() => {
            setSuccessText('')
            setDone(false)
            setShowPopUp(false)
        }, 3500)

    }

    const closeWaitList = () => {
        Cookies.set('acadeva_waitlist', 'usr_reject', { expires: 2 });
        setDone(false)
        setShowPopUp(false)
    }

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        const maxSize = 50 * 1024 * 1024; // 50MB in bytes

        if (file && file.type !== "application/pdf") {
            setErrorText('Please select a valid PDF file');
            setTimeout(() => { setErrorText('') }, 3500)
            return;
        }
        if (file && file.size > maxSize) {
            setErrorText('File size exceeds the 10MB limit');
            setTimeout(() => { setErrorText('') }, 3500)
            return;
        }
        if (file) {
            setFileName(file.name);
            setPdf(file)
        } else {
            setFileName('No file Selected');
        }
        console.log(prompt)
    };

    const clickLink = () => {
        window.open(link, '_blank');
    }

    const copyLink = () => {
        navigator.clipboard.writeText(link).then(() => {
            setSuccessText('Link copied to clipboard!');
            setTimeout(() => { setSuccessText('') }, 3500)
        }).catch(err => {
            setErrorText('Failed to copy');
            setTimeout(() => { setErrorText('') }, 3500)
            console.error('Failed to copy: ', err);
        });
    }

    const share = async () => {
        try {
            await fetch('https://quithn.onrender.com/share', {
                method: 'POST',
                body: JSON.stringify({ email, id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Shared success');
            setSuccessText('Sharing successful');
            setTimeout(() => { setSuccessText('') }, 3500)
        } catch (error) {
            console.error('Error sharing', error);
            setErrorText('Failed to share. Check email');
            setTimeout(() => { setErrorText('') }, 3500)
        }
    }

    return (
        <>
            <Head>
                <link rel="icon" type="image/svg+xml" href="/favicon.png" />
                <title>Quithn − Your book. Your quiz. Your way</title>
                <meta name="description" content="Create Google Forms Quizzes from PDFs in one click" />

                <meta property="og:url" content="https://quithn.acadeva.xyz/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Quithn − Your book. Your quiz. Your way" />
                <meta property="og:description" content="Create Google Forms Quizzes from PDFs in one click" />
                <meta property="og:image" content="https://quithn.acadeva.xyz/assets/logo.jpg" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="quithn.acadeva.xyz" />
                <meta property="twitter:url" content="https://quithn.acadeva.xyz/" />
                <meta name="twitter:title" content="Quithn − Your book. Your quiz. Your way" />
                <meta name="twitter:description" content="Create Google Forms Quizzes from PDFs in one click" />
                <meta name="twitter:image" content="https://quithn.acadeva.xyz/assets/logo.jpg" />
            </Head>{showPopUp &&
                <div className="modal-container">
                    <div className="m-card">
                        <div className={`success`}>
                            <p>
                                {successText}
                            </p>
                        </div>
                        <span className="all-left">Hey Quithner, it could get even better. We're building something even bigger.</span>
                        <hr />
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
                            value={emailWaitList}
                            onInput={(e: any) => setEmailWaitList(e.target.value)}
                        />
                        <button className="generate-button" onClick={joinWaitlist}>Join Waitlist</button>
                        <label className="upload-label no-margin" onClick={closeWaitList}>
                            <div className="btn">No. Thanks</div>
                        </label>
                    </div>
                </div >}
            <div className="app-container">
                <img src="/assets/quithn.png" alt="Quithn" className="cover" />
                <div className="card">
                    <div className={`error`}>
                        <p>
                            {errorText}
                        </p>
                    </div>
                    <div className={`success`}>
                        <p>
                            {successText}
                        </p>
                    </div>
                    {!loading && !done && (
                        <>
                            <div className="toggle-buttons">
                                <button className={`toggle-button ${showExample ? '' : 'active'}`} onClick={() => setShowExample(false)}>Book</button>
                                <button className={`toggle-button ${showExample ? 'active' : ''}`} onClick={() => setShowExample(true)}>Examples</button>
                            </div>
                            {!showExample &&
                                <div className="from-right">
                                    <div className="file-upload-section">
                                        <p>{fileName}</p>
                                        <label className="upload-label">
                                            <input
                                                type="file"
                                                style={{ display: "none" }}
                                                onChange={handleFileChange}
                                                accept="application/pdf"
                                            />
                                            <span>📄 Choose a file</span>
                                        </label>
                                    </div>
                                    <label className="select-label">
                                        <span>Number of questions</span>
                                        <select
                                            className="sel"
                                            value={numberOfQuestions}
                                            onChange={(e) => setNumberOfQuestions(e.target.value)}
                                        >
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="25">25</option>
                                            <option value="30">30</option>
                                        </select>
                                    </label>

                                    <div className="prompt-section">
                                        <p>Additional Prompt</p>
                                        <textarea
                                            placeholder="e.g. Keep it simple and easy"
                                            rows={2}
                                            value={prompt}
                                            onInput={(e: any) => setPrompt(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <button className="generate-button" onClick={start}>Generate Quiz</button>
                                </div>}
                            {
                                showExample &&
                                <div className="from-left">
                                    <a href="https://quithn.acadeva.xyz/l/1g_guL1FW3AKufzPnmskGzixFjRK53NmuJLgmDxqFTy4" target="_blank" rel="noopener">
                                        <label className="upload-label item">
                                            <img src="/assets/form.png" alt="Form" className="google-logo icon" />
                                            <span>Practical Physics Quiz</span>
                                        </label>
                                    </a>
                                    <a href="https://quithn.acadeva.xyz/l/1oB9oPq1NAk67fI1KMzMzKUU1-Z-Ufl5ooR4dLH1froo" target="_blank" rel="noopener">
                                        <label className="upload-label item">
                                            <img src="/assets/form.png" alt="Form" className="google-logo icon" />
                                            <span>Programming Languages Quiz</span>
                                        </label>
                                    </a>
                                    <a href="https://quithn.acadeva.xyz/l/1o_mVbl2LhDzXd4YfK1rFsTEpzek_vsyJxr-GHTBRc-g" target="_blank" rel="noopener">
                                        <label className="upload-label item">
                                            <img src="/assets/form.png" alt="Form" className="google-logo icon" />
                                            <span>Brain Injury Care Quiz</span>
                                        </label>
                                    </a>
                                    <a href="https://quithn.acadeva.xyz/l/1HY-peTm5qkCf8_kRxmQBdxPGAtJRYW6WGslLcm3GHTQ" target="_blank" rel="noopener">
                                        <label className="upload-label item">
                                            <img src="/assets/form.png" alt="Form" className="google-logo icon" />
                                            <span>ESP32 C3 SuperMini Quiz</span>
                                        </label>
                                    </a>

                                </div>
                            }
                        </>
                    )}

                    {loading && (
                        <>
                            <p>Your quiz is cooking. Hang on</p>
                            <img src="/assets/load.gif" alt="Quithn" className="cover" />

                            <label className="upload-label" onClick={cancel}>
                                <span>Cancel Generation</span>
                            </label>
                        </>
                    )}
                    {done && (
                        <>
                            <p className="topic">Your quiz is all set and waiting for you</p>
                            <img src="/assets/3.gif" alt="Quithn" className="cover-done" />
                            <div className="link-area">
                                <label className="upload-label copy">
                                    <input type="text" title="link" className="nothing" readOnly value={link} onClick={clickLink} />
                                </label>
                                <span className="high-button" onClick={copyLink}>Copy</span>
                            </div>
                            <div className="divider">
                                <hr></hr>
                                <span>
                                    Want to edit?
                                </span>
                                <hr></hr>
                            </div>
                            <input title="email" className="email-field" placeholder="e.g. helloworld@gmail.com"
                                value={email}
                                onInput={(e: any) => setEmail(e.target.value)}
                            />
                            <label className="upload-label no-margin" onClick={share}>
                                <div className="btn"><img src="/assets/g.png" alt="Google" className="google-logo" />Share with Google Account</div>
                            </label>
                            <label className="upload-label no-margin" onClick={restart}>
                                <span>Generate another quiz</span>
                            </label>
                        </>
                    )}

                </div>

                <footer className="footer">
                    © Quithn team (GDGOC University of Uyo Hackathon 2024)
                </footer>
            </div>
            {
                done && <div>
                    <img src={gifSources[0]} alt="Yay!" className="flakes-left flakes" />
                    <img src={gifSources[1]} alt="Yay!" className="flakes-right flakes" />
                </div>
            }
        </>
    );
}

export default Home;
