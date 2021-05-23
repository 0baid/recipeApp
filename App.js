import React from 'react'
import { View, Text,SafeAreaView } from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import RootNavigator from './navigation/RootNavigator'


const App = () => {
  return (
    <RootNavigator/>
  )
}

export default App
