import { View, Text } from 'react-native'
import React, { createContext } from 'react'

const transactionContext = createContext(null);

const TransactionProvider = () => {
    
  return (
    <View>
      <Text>TransactionProvider</Text>
    </View>
  )
}

export default TransactionProvider