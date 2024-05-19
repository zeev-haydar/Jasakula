import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'
import Jasa from '@/models/Jasa';

const jasaContext = createContext(null);

const JasaProvider = ({children}) => {
    const [jasa, setJasa] = useState(null);

    const changeJasa = (jasa: Jasa) => {
        setJasa(jasa);
    }

    const value = {
        jasa,
        changeJasa,
    };

    return (
        <jasaContext.Provider value={value}>
            {children}
        </jasaContext.Provider>
    )
}

const useJasa = () => {
    const context = React.useContext(jasaContext);
    if (!context) {
      throw new Error('useJasa must be used within a JasaProvider');
    }
    return context;   
}

export {JasaProvider, useJasa}