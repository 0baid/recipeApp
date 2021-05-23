import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { FlatList, StyleSheet, Text, View,Dimensions,Image,Animated,TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import {mealsData,region} from './data.js'
import NetInfo from '@react-native-community/netinfo'


const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height

const SPACING = 10
const ITEM_SIZE = WIDTH * 0.72
const SPACER_ITEM_SIZE = (WIDTH-ITEM_SIZE) / 2;

export default function MealList({navigation,route}) {

  
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [meals,setMeals] = useState()
  const [open,setOpen] = useState(false)
  const [value,setValue] = useState(null)
  const [items,setItems] = useState([])
  const [connected,setConnected] =  useState(false)
  const [url,setUrl] = useState("https://www.themealdb.com/api/json/v1/1/random.php")


  

  const _getRegions = async () => {
    try {
      let response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
      )
      let json = await response.json();
      //console.log(json)
      setItems(json.meals)
    } catch (error) {
      console.log(error)
    }
  }

  const _getMeals = async () => {
    try {
      let response = await fetch(
        url,
      );
      let json = await response.json();
      setMeals([{key:'left-spacer'},...json.meals,{key:'right-spacer'}])
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      //console.log("is connected " + state.isConnected)
      if(state.isConnected){
        _getRegions();
        _getMeals();
        setConnected(true)
      }else{
        alert("Device is not connected using dummy data")
        setItems(region.meals)
        setMeals([{key:'left-spacer'},...mealsData.meals,{key:'right-spacer'}])
      }
    })
  },[url])

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        items={items}
        setItems={setItems}
        value={value}
        setValue={setValue}
        onChangeValue={(value) => {
          setUrl("https://www.themealdb.com/api/json/v1/1/filter.php?a="+value)
        }}
        schema={{
          label:"strArea",
          value:"strArea"
        }}
      />
      <Animated.FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        horizontal
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{
          alignItems:'center'
        }}
        renderItem={({item,index}) => {
          if(!item.strMealThumb){
            return(
              <View style={{width:SPACER_ITEM_SIZE}}></View>
            )
          }
          const inputRange = [
            (index-2) * ITEM_SIZE,
            (index-1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ]
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange:[0,-50,0]
          })
          return(
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                const id = item.idMeal
                navigation.navigate('ItemDetail',{id})
              }}
            >
              <View style={{ width:ITEM_SIZE}}>
                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 34,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,

                    elevation: 24,


                    transform:[{translateY}]
                  }}
                >
                  <Image
                    source={connected ? {uri:item.strMealThumb} : item.strMealThumb}
                    style={styles.posterImage}
                  />
                  <Text style={{ fontSize: 24,}} numberOfLines={1}>
                    {item.strMeal}
                  </Text>
                  
                </Animated.View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBD532',
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});