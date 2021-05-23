import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { View, Text,ImageBackground,StyleSheet,TouchableOpacity,Linking,ScrollView,Dimensions,FlatList} from 'react-native'
import {mealRecipe} from './data.js'

const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height

const SPACING = 10


const ItemDetail = ({navigation,route}) => {

    const [recipe,setRecipe] = useState([])
    const [ingredients,setIngredients] = useState([])
    const [measure,setMeasure] = useState([])

    const getMeal = () => {
        try {
            axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+route.params.id).then((res) => {
                setRecipe(res.data.meals[0])
                let ingResult = []
                for (const [key, value] of Object.entries(res.data.meals[0])) {
                if (key.includes('strIngredient')) {
                    ingResult.push(value)
                }
                }
                setIngredients(ingResult)

                let measureResult = []
                for (const [key, value] of Object.entries(res.data.meals[0])) {
                if (key.includes('strMeasure')) {
                    measureResult.push(value)
                }
                }
                setMeasure(measureResult)
                
                
            })
        } catch (err) {
            console.log(err)
        }

        
    };
    
    useEffect(() =>{
        getMeal();
        console.log(route.params.id)
    },[])

    


    return (
        <View style={styles.container}>
            <ImageBackground source={{uri:recipe.strMealThumb}} style={{flex:1,width:'100%',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity>
                    <View style={{}}>

                    </View>
                </TouchableOpacity>
                <View style={{
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
                    width:WIDTH*0.9
                    }}>
                        <ScrollView style={{
                            marginHorizontal: SPACING,
                            padding: SPACING * 2,
                            paddingHorizontal:SPACING * 3,
                            height:HEIGHT*0.45
                        }}>
                            <Text style={{ fontSize: 32, color:'#000'}} numberOfLines={1}>
                                {recipe.strMeal}
                            </Text>
                            <Text style={{fontSize:24}}>Ingredients</Text>
                            <Text></Text>
                            {
                                ingredients.map((item,index) => {
                                    if(item != null && item != ""){
                                        return(
                                            // <Text>{item}....................{measure[index]}</Text>

                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{}}>{item}</Text>
                                                <Text>...................................</Text>
                                                <Text>{measure[index]}</Text>
                                            </View>
                                        )
                                    }
                                })
                            }
                            <Text></Text>
                            <Text style = {{fontSize:16,}}>
                                {recipe.strInstructions}
                            </Text>
                            <Text>
                            </Text>
                        </ScrollView>
                        
                         
                        <TouchableOpacity style={{
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'#FBD532',
                            width:'100%',
                            height:70,
                            borderBottomLeftRadius:34,
                            borderBottomRightRadius:34
                            }}
                            onPress={() => {
                                try {
                                    Linking.openURL(recipe.strYoutube)
                                } catch (error) {
                                    console.log(error)
                                    alert(error)
                                }
                            }}
                            >
                            <Text style={{fontSize:24}}>Start Cooking</Text>
                        </TouchableOpacity>
                </View>
            </ImageBackground>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ItemDetail
