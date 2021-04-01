import React from 'react'

export const GlobalSearch = ({input,setInput}) => {
    return (
        <span>
            Search : {''}
            <input value={input || ''}
            onChange={(val)=> setInput(val.target.value)}
            />
        </span>
    )
}
