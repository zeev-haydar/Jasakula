import { View, Text } from 'react-native'
import React from 'react'
import UpgradeScreen from '@/screens/UpgradeScreen'
import { UpgradeProvider } from '@/providers/UpgradeProvider';

const index = () => {
  return (
    <UpgradeProvider>
      <UpgradeScreen/>
    </UpgradeProvider>
    
  )
}

export default index