import { useState, useEffect, useRef } from "react";
import cadetLogo from "../../assets/cryptocadetlogo_white.png";
import metamaskLogo from "../../assets/MetaMask_Fox.png";
import coinbaseLogo from "../../assets/coinbase_icon.png";
import phantomLogo from "../../assets/phantom-logo.png";
import trustwalletLogo from "../../assets/trustwallet-logo.png"; // Add Trust Wallet logo
import "./../../index.css";
import { ButtonProps, User } from "../../types/types";

const CryptoPayMiniButton: React.FC<ButtonProps> = ({apiKey, label, style, amount, refId, method, dev }) => {
  
  
  const [showModal, setShowModal] = useState(false);

  const [user, setUser] = useState<User | null>(null)
  

  const endPoint = "https://api.cryptocadet.app";
  //const endPoint = "http://localhost:3004";
  //const portal = "http://localhost:5174"
  //const portal = "https://portal.cryptocadet.app"
  const portal = "https://mini.cryptocadet.app"

  const wrapperRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setShowModal(false);
            console.log("Modal closed");
        }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [wrapperRef]);

  




  function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent!.toLowerCase()
    );
  }


  const handleDevice = async () => {

   
    if (typeof window !== "undefined") {
      
      
    }

    if (isMobileDevice()) {
      console.log("You are using a mobile device.");
      await getUser()
      setShowModal(true)
     
  
    } else {
      console.log("You are not using a mobile device.");
      openPortal(refId || "");
      
      
     
    }

  }


  const getUser = async () => {
console.log(apiKey)

    const apiUrl = `${endPoint}/api/user/checkout`;
    const payload = {
      apiKey,
    };
   
    try {
      
     
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errText}`);
  }

 
  const data = await response.json();
  setUser(data);

     
    } catch (error) {
     
      console.log("could not get user");
    }
  };


  const openPortal = async (refCode : string) => {

   
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
    width=400,height=500,left=${window.screen.width},top=0`;
    const newWindow = window.open("", "_blank", params);


    // Define your API URL and the data you want to send
    const apiUrl = `${endPoint}/api/user/checkout`;
    const data = {
      apiKey,
    };

    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      });
      //console.log(`${portal}?pubKey=${apiKey}&prod=${productId}&referrer=${refCode}&email=${email}&shippingAddress=${shippingAddress}&lang=${lang}`)
      

      if (response.ok) {
          const newUrl = `${portal}?pubKey=${apiKey}&amount=${amount}&refId=${refCode}&method=${method}&dev=${dev}`;
          console.log('Navigating to:', newUrl);

       
  
          newWindow!.location = newUrl;

      

      } else {
          console.log('Closing window due to unsuccessful response');
         newWindow!.close();
      }
  } catch (error) {
      console.error('Error:', error);
      console.log('Closing window due to error');
      newWindow!.close();
  
  
};
  };

             // Listener setup
   

  const phantomConnect = async () => {
 
    
    const queryParams = new URLSearchParams({
      pubKey: apiKey,
      refId: refId || "",
      amount: amount?.toString() || "0",
      method: method || "",
      walletApp: String(true), // or walletApp.toString() if it's a variable
      ref: "https://cryptocadet.io"
  
    });
    
   
    const encodedUrl = encodeURIComponent(`https://mini.cryptocadet.app?${queryParams.toString()}`);
  
    const url = `https://phantom.app/ul/browse/${encodedUrl}`;
   window.location.href = url;
  };


  const goToCoinbase = async () => {
    const url = `https://go.cb-w.com/dapp?cb_url=https%3A%2F%2Fmini.cryptocadet.app%3FpubKey%3D${apiKey}%26refId%3D${refId}%26amount%3D${amount}%26method%3D${method}%26walletApp%3D${true}`;
   
    window.location.href = url;
  }

  const goToMetamask = async () => {
    const url = `https://metamask.app.link/dapp/mini.cryptocadet.app?pubKey=${apiKey}&refId=${refId}&amount=${amount}&method=${method}&walletApp=true`;
   
    window.location.href = url;
  }

  const goToTrustWallet = async () => {
    // Build the full dapp URL with all parameters first
    const dappUrl = `https://mini.cryptocadet.app?pubKey=${apiKey}&refId=${refId || ''}&amount=${amount || ''}&method=${method || ''}&walletApp=true`;
    
    // Encode the entire URL for Trust Wallet's url parameter
    const encodedDappUrl = encodeURIComponent(dappUrl);
    
    // Trust Wallet deep link - coin_id=60 is for Ethereum/EVM chains
    const trustWalletUrl = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodedDappUrl}`;
    
    console.log('Trust Wallet URL:', trustWalletUrl);
    console.log('Decoded dapp URL:', dappUrl);
    
    window.location.href = trustWalletUrl;
  }

  

  

 


  const defaultButtonStyle = {
    // Define default styles here
    padding: "10px 20px",
    backgroundColor: "#0c0a09",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };
  
  
  // Default styles for the modal and buttons
  const defaultStyle = {
    modalContainer: {
      display: "block",
      ...style,
    },
    modalContent: {
      background: "#1c1917",
      borderRadius: "8px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      color: "#fff",
    },
    button: {
      display: "block",
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      backgroundColor: "#0c0a09",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      
    },
    inputField: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      backgroundColor: "#0c0a09",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      textAlign: "center" as const,
    },
  };

  return (
    <>
       {!showModal ? ( 
        <div style={{display: "flex", flexDirection: "column"}}>
       
      <button
        onClick={handleDevice}
        style={{ ...defaultButtonStyle, ...style }} 
      >
        {label}
      </button>
    
     

       </div>
       ) : (
        <div ref={wrapperRef} style={defaultStyle.modalContainer} data-testid="modal">
          <div style={defaultStyle.modalContent}>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={user && user.logo ? user.logo : cadetLogo} style={{ height: "48px" }} alt="Logo" />
             
            </span>
            
            <button onClick={goToMetamask} style={defaultStyle.button} >
              <span style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent:"center"
              }}>
                <img src={metamaskLogo} style={{ height: "24px", marginRight: "10px" }} alt="MetaMask" />
                Open MetaMask
              </span>
            </button>

            <button onClick={goToTrustWallet} style={defaultStyle.button}>
              <span style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent:"center"
              }}>
                <img src={trustwalletLogo} style={{ height: "24px", marginRight: "10px" }} alt="Trust Wallet" />
                Open Trust Wallet
              </span>
            </button>

            <button onClick={goToCoinbase} style={defaultStyle.button}>
              <span style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent:"center"
              }}>
                <img src={coinbaseLogo} style={{ height: "24px", marginRight: "10px" }} alt="Coinbase" />
                Open Coinbase
              </span>
            </button>

            <button onClick={phantomConnect} style={defaultStyle.button}>
              <span style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent:"center"
              }}>
                <img src={phantomLogo} style={{ height: "24px", marginRight: "10px" }} alt="Phantom" />
                Open Phantom
              </span>
            </button>
                       
          </div>
        </div>
                )} 
    </>
  );
};

export default CryptoPayMiniButton;