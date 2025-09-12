import CryptoPayButton from './components/CryptoPayButton/CryptoPayButton'
import './App.css'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    const handleMessage = async (event) => {

     
      let response =  event.data;
     

      if (response) {
        response = String(response);
        console.log("event success")
       /*  try {
          response = JSON.parse(response);
          console.log(response)
          
         
          if (response.message == "Receipt added successfully") {
            console.log("Listener worked!")
          }
         
          
            
        } catch (err) {}
         */
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

useEffect(() => {
  console.log('making sure it logs')
}, [])
  

  const doSomething = () => {
    console.log('did something')
  }
  

  return (
   <>
      
     <CryptoPayButton
     apiKey={'pk_Ud0YAvIkIEpuPCAPdDVEQvGnsNdZyIeY'}
     label='Buy Credits'
     style={null}
     amount={5}
     
     
     
     />
    
      
     
     </>
    
    
  )
}

export default App
