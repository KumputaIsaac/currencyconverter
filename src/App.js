import React,{useEffect,useState} from 'react'
import CurrencyRow from './components/CurrencyRow'

export default function App() {
  
  const [currencykeys, setcurrencykeys] = useState([])
  const [fromcurrency, setfromcurrency] = useState()
  const [tocurrency, settocurrency] = useState()
  const [amount, setamount] = useState(1)
  const [exchangeRate, setexchangeRate] = useState()
  const [amountinfromcurrency, setamountinfromcurrency] = useState(true)

  


  let fromamount,toamount
  if(amountinfromcurrency){
    fromamount = amount
    toamount = amount * exchangeRate
  }
  else{
    toamount = amount
    fromamount = amount / exchangeRate
  }

  const handlefromchangeamount =(e)=>{
    setamountinfromcurrency(true)
    setamount(e.target.value)
  }
  const handletochangeamount =(e)=>{
    setamountinfromcurrency(false)
    setamount(e.target.value)
  }


  useEffect(()=>{
    fetch('https://api.exchangeratesapi.io/latest')
    .then(resp=> resp.json())
    .then( data=>{
      const firstcurrency = Object.keys(data.rates)[0]
      setfromcurrency(data.base)
      settocurrency(firstcurrency)
      setcurrencykeys([data.base, ...Object.keys(data.rates)])
      setexchangeRate(data.rates[firstcurrency])
    }
      )
  },[])

  useEffect(()=>{
    if(fromcurrency!=null &&tocurrency!=null){
      fetch(`https://api.exchangeratesapi.io/latest?base=${fromcurrency}&symbol=${tocurrency}`)
      .then(resp=>resp.json())
      .then(data=> setexchangeRate(data.rates[tocurrency]))
    }
    
  },[fromcurrency,tocurrency])
  return (
    <div>
      <h1>Convert</h1>
        <CurrencyRow
         currencykeys={currencykeys}
          selectedcurrency={fromcurrency}
           onchangecurrency={(e)=>setfromcurrency(e.target.value)}
           amount={fromamount}
           onchangeamounts={handlefromchangeamount}
        />
      <div>
        =
      </div>
        <CurrencyRow
         currencykeys={currencykeys}
          selectedcurrency={tocurrency}
           onchangecurrency={(e)=> settocurrency(e.target.value)}
           amount={toamount}
           onchangeamounts={handletochangeamount}
        />
    </div>
  )
}
