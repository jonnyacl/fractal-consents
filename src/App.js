import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import config from "./config"

function App() {

  const [codeValid, setCodeValid] = useState(true);
  const [tokenValid, setTokenValid] = useState(true);
  const [stateValid, setStateValid] = useState(true);
  const [sent, setSent] = useState(false)
  const [auth, setAuth] = useState("")
  const [error, setError] = useState("")
  const [resp, setResp] = useState("")
  const [signin, setSignin] = useState("")
  const [bank, setBank] = useState("")

  const sendConsent = () => {
    const code = getPart("code=");
    if (!code) {
      setCodeValid(false)
    }
    const idToken = getPart("id_token=");
    if (!idToken) {
      setTokenValid(false)
    }
    const state = getPart("state=");
    if(!state) {
      setStateValid(false)
    }
    if (code && state && idToken && auth && auth.length) {
      axios.post(`${config.api}/banking/${bank}/consents`, {
          code,
          "id_token": idToken,
          state
        }, {
          headers: {
            Authorization: `Bearer ${auth}`,
            'X-Api-Key': config.key,
            "X-Partner-Id": config.partner,
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        }
      ).then(r => {
        setSent(true)
        setResp(r.data.consent_id)
        console.log(r)
      }).catch(err => {
        setError(err)
        console.log(err)
      })
    }
  }

  const getUrl = () => {
    axios.post(`${config.api}/banking/${bank}/auth`, {
        redirect: "http://localhost:3000",
        companyId: config.companyId
      }, {
        headers: {
          Authorization: `Bearer ${auth}`,
          'X-Api-Key': config.key,
          "X-Partner-Id": config.partner,
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      }
    ).then(r => {
      setSignin(r.data.auth_url)
      console.log(r.data.auth_url)
    }).catch(err => {
      setError(err)
      console.log(err)
    })
    
  }

  const reset = () => {
    setSent(false)
    setStateValid(true)
    setTokenValid(true)
    setCodeValid(true)
  }
  
  const getConsentParts = () => {
    return window.location.search.split("&")
  }

  const getPart = (part) => {
    const parts = getConsentParts();
    const code = parts.filter(c => c.includes(part))[0];
    if (code) {
      const p = code.split(part)[1]
      console.log(`${part}${p}`);
      return p;
    }
    return null
  }

  const getToken = () => {
    const code = getPart("code=");
    return (
      <div>
        {code ? <code>Code to exchange: {code}<br/></code> : null}
        {(code && auth && bank) ? (!sent && codeValid && tokenValid && stateValid) ? <p><code>EXCHANGE CODE FOR TOKEN</code>
          <br /><button onClick={() => sendConsent()}>EXCHANGE</button></p> : 
        <button onClick={() => reset()}>RESET</button>: null}
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        {(sent && codeValid && tokenValid && stateValid) ? <div><code>Code sent to consents API</code></div> : <img src={logo} className="App-logo" alt="logo" />}
        <p>
          <code>Consents API</code>
        </p>
        <div><code>Set Auth Header:</code><br />
          <input value={auth} onChange={(evt) => {setAuth(evt.target.value)}}></input>
        </div>
        <div><code>Set Bank:</code><br />
          <input value={bank} onChange={(evt) => {setBank(evt.target.value)}}></input>
        </div>
        {getToken()}
        {(auth && bank) ?
        <p>
          <code>Get Auth URL</code>
          <br />
          <button onClick={() => getUrl()}>GENERATE BANK SIGNIN URL</button>
        </p> : null}
        {(signin && signin.length) ? <div><a href={signin}><code>GO TO BANK {bank} SIGNIN PAGE</code></a></div> : null}
        <br />
        {(resp && resp.length) ? <div><code>Consent: {resp}</code></div> : null}
        {(error && error.length) ? <div><code>Error: {error}</code></div> : null}
      </header>
    </div>
  );
}

export default App;
