import { View, Text } from 'react-native'
import React, { createContext, useContext, useState } from 'react'

const ChatContext = createContext(null);
const ChatProvider = ({children}) => {
    const [otherPeoplesName, setOtherPeoplesName] = useState('')

    const changeName = (name) =>{
        setOtherPeoplesName(name);
    } 
    const value = {
        otherPeoplesName,
        changeName
    }
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context
}

export  {ChatProvider, useChatContext}