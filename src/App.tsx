import CryptoPayMiniButton from './components/CryptoPayMiniButton/CryptoPayMiniButton'
import './App.css'


function App() {



  

  return (
   <>
      
     <CryptoPayMiniButton
     apiKey={'YOUR API_KEY'}
     label='Buy Credits'
     style={null}
     amount={'5.00'}
     refId={'REFERRER ID'}
     method={'place_bet'}
     dev={false}
     
     
     
     />
    
      
     
     </>
    
    
  )
}

export default App
