# CryptoPay-Mini


CryptoPay-Mini is minimal payment router for accepting payments on EVM and Solana.


## Features

- Accept payments across multiple EVM networks and Solana
- Accept any token you want
- Integrates with Web3Modal
- Create affiliate codes for your own referral program

## Installation

CryptoPay-Mini requires [Node.js](https://nodejs.org/) v18+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm install @cryptocadet/crypto-pay-mini 
```

## NextJS

In order to install for NextJS, the CryptoPay Modal must be imported dynamically:

```sh
npm install @cryptocadet/crypto-pay-mini 
```

Create a components folder within your app or src folder, and create a new file.

```sh
import {CryptoPayModal} from 'crypto-pay-mini'
const ComponentName = () => {

    return (

         <CryptoPayButton
     apiKey={'YOUR_API_KEY'}
     label='BUTTON TITLE'
     style={null}
     amount={number}
     refId={'REFERRER ID'}
     
      /> 

    )
}


export default ComponentName;
```



In your page or index file, dynamically import the created component:

```sh
export default function Home() {

  const ComponentName = dynamic(() => import("./../components/ComponentName"), { ssr: false });

  return (
    <ComponentName />
  )
```

## Styles

React Crypto Pay Button style can be customized by targeting the cryptopaymodal and cryptopaybutton classes and the style tag in JSX. Web3Modal styles can be imported by adding the following in the component file:

```sh
import 'crypto-pay-mini/dist/style.css'
```


## License 

MIT

## Contributions

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer



