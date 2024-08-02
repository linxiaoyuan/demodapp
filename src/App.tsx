import './App.scss';
import './trackers';
import { useState, useEffect } from 'react';
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { TxForm } from "./components/TxForm/TxForm";

function isValidURL(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [storedValue, setStoredValue] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const savedValue = localStorage.getItem('bridgeUrl');
    if (savedValue) {
      setInputValue(savedValue);
      if (isValidURL(savedValue)) {
        setStoredValue(savedValue);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (isValidURL(inputValue)) {
      setStoredValue(inputValue);
    }
    setShow(true)
    localStorage.setItem('bridgeUrl', inputValue);
    console.log('Saved OKX bridge URL:', inputValue);
  };
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const inputStyle: React.CSSProperties = {
    padding: '10px',
    margin: '10px',
    fontSize: '16px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    margin: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <div className="app">
      {!show ? (
        <div style={containerStyle}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="Enter OKX Bridge URL"
          />
          <button onClick={handleButtonClick} style={buttonStyle}>Save OKX Bridge URL</button>
        </div>
      ) : (
        <TonConnectUIProvider
          manifestUrl="https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json"
          uiPreferences={{ theme: THEME.DARK }}
          walletsListConfiguration={{
            includeWallets: [
              {
                appName: "okxTonWallet2",
                name: "New OKX Wallet",
                imageUrl: "https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png",
                aboutUrl: "https://www.okx.com/web3",
                universalLink: "https://www.okx.com/download?appendQuery=true&deeplink=okx://web3/wallet/tonconnect",
                bridgeUrl: "https://www.okx.com/tonbridge2/discover/rpc/bridge",
                jsBridgeKey: "okxTonWallet",
                platforms: [
                  "chrome",
                  "safari",
                  "firefox",
                  "ios",
                  "android"
                ]
              }
            ]
          }}
          actionsConfiguration={{
            twaReturnUrl: 'https://t.me/tc_twa_demo_bot/start'
          }}
        >
          <div className="app">
            <TxForm />
            {/* <TonProofDemo /> */}
          </div>
        </TonConnectUIProvider>
      )}
    </div>
  );
}

export default App;
