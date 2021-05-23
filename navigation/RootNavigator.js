import * as React from 'react'
import {SafeAreaView} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createSharedElementStackNavigator} from 'react-navigation-shared-element'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import MealList from '../MealList'
import ItemDetail from '../ItemDetail'

const Stack = createSharedElementStackNavigator();


export default RootNavigator = () => {
    return(
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator headerMode='none' initialRouteName='MealList'>
                    <Stack.Screen name='MealList' component={MealList} />
                    <Stack.Screen name='ItemDetail' component={ItemDetail} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}