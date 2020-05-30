import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';

const fetchVoice = async () => {
  const response = await fetch('/api/voice');
  const json = await response.json();
  return json.voice;
};

export default function Home() {
  const [voice, setVoice] = useState('');

  useEffect(() => {
    const getVoice = async () => {
      setVoice(await fetchVoice());
    };
    getVoice();
  }, []);

  const keyDownHandler = useCallback(async (event) => {
    if (event.repeat) {
      return;
    }
    const addedVoice = await fetchVoice();
    setVoice((prevVoice) => `${prevVoice} ${addedVoice}`);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
  }, []);

  return (
    <div className="container">
      <Head>
        <title>The Voice of God</title>
        <link rel="icon" href="https://templeos.org/favicon.ico" />
      </Head>
      <h1>The Voice of God</h1>
      <div id="voice-container">
        <textarea readOnly value={voice} />
      </div>
      <p>Press spacebar for more words from God.</p>
      <style global jsx>{`
        body {
          margin: 0;
        }
        .container {
          background-color: #55ffff;
          border-style: solid;
          border-width: 8px;
          border-color: #0000aa;
          font-family: courier;
          min-height: calc(100vh - 16px);
          padding: 0 1rem;
        }
        #voice-container {
          display: flex;
          justify-content: center;
        }
        h1 {
          color: #aa00aa;
          text-align: center;
        }
        p {
          text-align: center;
        }
        textarea {
          height: 150px;
          padding: 8px;
          width: 500px;
        }
      `}</style>
    </div>
  );
}
