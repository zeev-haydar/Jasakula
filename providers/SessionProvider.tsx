import { View, Text } from 'react-native'
import React, {createContext, useContext} from 'react'

const SessionContext = createContext(null);

export const useSession = () => useContext(SessionContext);

const SessionProvider = ({children}) => {
  return (
    <View>
      <Text>SessionProvider</Text>
    </View>
  )
}

export default SessionProvider