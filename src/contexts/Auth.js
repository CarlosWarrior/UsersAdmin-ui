import React from 'react'
import config from '../config.json'

const _source = () => {return window.localStorage.getItem(config.tokenName)}

export 
    const Context =  React.createContext({
        auth:null,
        loading:true
    })

export 
    function Provider({source, ...rest}){
        const [auth, setAuth] = React.useState(false)
        const [loading, setLoading] = React.useState(true)
        React.useEffect(() => setAuth(source?source(auth):_source()), [])
        React.useEffect(() => setLoading(false), [auth])
        
        return (
            <Context.Provider value={{auth, loading}}>
                {rest.children}
            </Context.Provider>
        )
    }