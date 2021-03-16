import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { base64ToHex, hexToBase64 } from "../utils/typeConversion";

type ConversionTypes = "hex" | "base64";

export default function Home() {
  const [fromValue, setFromValue] = useState<string>();
  const [fromType, setFromType] = useState<ConversionTypes>("base64");
  const [toValue, setToValue] = useState<string>("");
  const [toType, setToType] = useState<ConversionTypes>("hex");

  const handleFromTypeChange = (event) => {
    const { value } = event.target;
    setFromType(value);
    if(value === "hex") {
      setToType("base64")
    }else {
      setToType("hex")
    }
  };

  const handleToTypeChange = (event) => {
    return
    const { value } = event.target;
    setToType(value);
  };

  const handleConvert = () => {
    switch (fromType) {
      case "hex": {
        let value=fromValue
        if(fromValue.toLowerCase().startsWith("0x")){
          value = fromValue.substring(2)
        }
        console.log("value", value)
        const result = hexToBase64(value);
        console.log("result", result)
        setToValue(result);
        return;
      }
      case "base64": {
        const result = base64ToHex(fromValue);
        console.log("result", result)
        setToValue(`0x${result}`);
        return;
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Snet Conversion Util</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>SingularityNet </h1>
        <h1 className={styles.title}> Conversion Util</h1>

        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p> */}

        {/* <div className={styles.grid}> */}
        <div className={styles.card}>
          <h3>
            <select name="from-type" value={fromType} onChange={handleFromTypeChange}>
              <option value="base64">base64</option>
              <option value="hex">hex</option>
            </select>
          </h3>
          {/* <p>Find in-depth information about Next.js features and API.</p> */}
          <textarea name="from-value" value={fromValue} onChange={(e) => setFromValue(e.target.value)} rows={5} />
        </div>
        <div>
          <button onClick={handleConvert}>Convert</button>
        </div>
        <div className={styles.card}>
          <h3>
            <select value={toType} name="to-type" onChange={handleToTypeChange}>
              <option value={"base64"}>base64</option>
              <option value="hex">hex</option>
            </select>
          </h3>
          <textarea name="to-value" value={toValue} onChange={(e) => setToValue(e.target.value)} rows={5} />
        </div>

        {/* <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a> */}
        {/* </div> */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
