import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'

const OrderContext = createContext(null)

const OrderProvider = ({children}) => {
    const [order, setOrder] = useState(null);

    const changeOrder = (order) => {
        setOrder(order);
    }

    const value = {
        order,
        changeOrder
    }


    return (
        <OrderContext.Provider value={value}> 
            {children}
        </OrderContext.Provider>
    )
}

const useOrder = () => {
    const context = React.useContext(OrderContext);
    if (!context) {
      throw new Error('useJasa must be used within a JasaProvider');
    }
    return context;   
}


export {OrderProvider, useOrder}