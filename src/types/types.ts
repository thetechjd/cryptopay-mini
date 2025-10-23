export interface ButtonProps {
    apiKey : string,
  style? : any,
  label? : string,
  amount? : string,
  refId? : string,
  method?: string,
  dev?: boolean
}

export interface User {
    walletAddress?: string,
    logo?: string,
    chain?: string,
}