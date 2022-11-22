import React, { Component } from 'react';
import { StyleSheet,Text, View,ScrollView,TouchableOpacity} from 'react-native';
import { AntDesign,MaterialCommunityIcons } from '@expo/vector-icons'; 
export default class MealsPending extends Component {
  render() {
    return (
        <View style={ styles.container }>
            <View style={{backgroundColor:'#044355',height:'20%',borderBottomStartRadius:20,borderBottomEndRadius:20}}>
                <View style={{height:'40%',justifyContent:'center',alignItems:'flex-start',marginLeft:12}}>
                    <TouchableOpacity style={{alignItems:'flex-start'}} onPress={()=>this.props.navigation.goBack()}>
                        <AntDesign name="arrowleft" size={25} color={'#fff'}  />
                    </TouchableOpacity>
                </View>
                
                <Text style={{color:'#fff',justifyContent:'center',textAlign:'center',fontSize:25,fontFamily:'Agency',fontWeight:'bold'}}>Meals Pending</Text>
            </View>
            
                {/* Row 1 Start Here*/}
            <View style={{flex:1,justifyContent:'center',alignItems:'center',marginVertical:10}}>
                <ScrollView style={{flex:1}}>
                    <View style={{flexDirection:'row',margin:5,}}>
                        <View style={{width:'80%',backgroundColor:'#fff',padding:10,borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
                            <Text style={{fontFamily:'Agency',fontSize:20,}}>No of Meals order 22</Text>
                            <Text style={{fontFamily:'Agency',fontSize:20,}}>Total Amount Paid</Text>
                            <Text style={{fontFamily:'Agency',fontSize:20,}}>Date : 23/3/2019</Text>
                        </View>
                        <View style={{width:'20%',backgroundColor:'#fff',justifyContent:'center',padding:10,borderBottomRightRadius:10,borderTopRightRadius:10,}}>
                            <MaterialCommunityIcons name='progress-clock' color='yellow' size={25}/>
                        </View>
                    </View> 
                
                    <View style={{flexDirection:'row',margin:5,}}>
                        <View style={{width:'80%',backgroundColor:'#fff',padding:10,borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
                            <Text style={{fontFamily:'Agency',fontSize:20,}}>No of Meals order 22</Text>
                            <Text style={{fontFamily:'Agency',fontSize:20,}}>Total Amount Paid</Text>
                            <Text style={{fontFamily:'Agency',fontSize:20,}}>Date : 23/3/2019</Text>
                        </View>
                        <View style={{width:'20%',backgroundColor:'#fff',justifyContent:'center',padding:10,borderBottomRightRadius:10,borderTopRightRadius:10,}}>
                            <MaterialCommunityIcons name='progress-clock' color='yellow' size={25}/>
                        </View>
                    </View> 
                    
                    <View style={{flexDirection:'row',margin:5,}}>
                        <View style={{width:'80%',backgroundColor:'#fff',padding:10,borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
                            <Text style={{fontFamily:'Agency',fontSize:20,}}>No of Meals order 22</Text>
                            <Text style={{fontFamily:'Agency',fontSize:20,}}>Total Amount Paid</Text>
                            <Text style={{fontFamily:'Agency',fontSize:20,}}>Date : 23/3/2019</Text>
                        </View>
                        <View style={{width:'20%',backgroundColor:'#fff',justifyContent:'center',padding:10,borderBottomRightRadius:10,borderTopRightRadius:10,}}>
                            <MaterialCommunityIcons name='progress-clock' color='yellow' size={25}/>
                        </View>
                    </View> 

                    <View style={{flexDirection:'row',margin:5,}}>
                        <View style={{width:'80%',backgroundColor:'#fff',padding:10,borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
                            <Text style={{fontFamily:'Agency',fontSize:20,}}>No of Meals order 22</Text>
                            <Text style={{fontFamily:'Agency',fontSize:20,}}>Total Amount Paid</Text>
                            <Text style={{fontFamily:'Agency',fontSize:20,}}>Date : 23/3/2019</Text>
                        </View>
                        <View style={{width:'20%',backgroundColor:'#fff',justifyContent:'center',padding:10,borderBottomRightRadius:10,borderTopRightRadius:10,}}>
                            <MaterialCommunityIcons name='progress-clock' color='yellow' size={25}/>
                        </View>
                    </View> 
                </ScrollView>
            </View>
        </View>
    );
  }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6ea',

    },
});