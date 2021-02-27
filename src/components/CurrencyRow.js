import React from 'react'

export default function CurrencyRow({currencykeys,selectedcurrency,onchangecurrency,amount,onchangeamounts}) {
    return (
        <div>
            <input value={amount} onChange={onchangeamounts} type="number"/>
            <select value={selectedcurrency}  onChange={onchangecurrency}>
               {currencykeys.map(option=>
                   <option value={option} key={option}>{option}</option>
               )} 
            </select>
        </div>
    )
}
