import React from 'react';
import { StyleSheet, Text, View,AsyncStorage,ActivityIndicator, ColorPropType } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons,AntDesign } from '@expo/vector-icons';
import NumericInput from 'react-native-numeric-input';
import InputSpinner from "react-native-input-spinner";
import Color from '../../constants/Color'
import Font from '../../constants/Font'
import Toast from 'react-native-tiny-toast'
import {BasePath} from '../../config/path'

export default class SponsorMeal extends React.Component {
  static navigationOptions = {
    title: 'Sponsor Meal',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="restaurant" size={25} style={{color:tintColor}} />
      )
  };
  constructor(props){
    super(props);
    this.state={
      value:1,
      show_error: false,
      error_message: '',
      isLoading: false,
    }
    this.set_token()
  }

  set_token = async() =>{
    var tokken = await AsyncStorage.getItem('id')
    await this.setState({token: tokken})
  }

  //Totals_meal to update
  // storedate = async (response) =>{
  //   const { navigate } = this.props.navigation;
  //   try{  
  //     await AsyncStorage.setItem('total_meals', response.total_meals);
  //   }catch(e){}
  // }

  
 
  Coupon_request = () =>{
    
    const formData = new FormData()
    formData.append('user_id',this.state.token );
    formData.append('quantity',this.state.value );
    
    
    try{
      fetch(`${BasePath}recepient_get_meal.php`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body:formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({isLoading: false})
        if(responseJson.error == true){
          Toast.show(responseJson.error_msg)
        }
        else{
         // this.storedate(responseJson)
          Toast.show(responseJson.success_msg)
        }
      }).catch((error) =>{});
    }catch(e){}
  }
  send_request=()=>{
    this.setState({isLoading : true})
    this.Coupon_request()
  }
  
  incressnumber=(text)=>{
    
      
    if(text<10){this.setState({error_message:''})
    this.setState({value:text+1})
    }else{
      this.setState({error_message:'Maximum Meals can be Taken  10'})
    }
  }
  checknumber=(text)=>{
    
    if(text>1){
      this.setState({error_message:''})
      this.setState({value:text-1})
      console.log(text)
    }else{
      return this.setState({error_message:'Minimum Meals can be Taken  1'})
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
          <View style={{backgroundColor:Color.backgroundcolor,height:'60%',borderBottomStartRadius:20,borderBottomEndRadius:20}}>
            <View style={{height:'40%',justifyContent:'center',alignItems:'flex-start',marginLeft:12}}>
                <TouchableOpacity style={{alignItems:'flex-start'}} onPress={()=>this.props.navigation.goBack()}>
                  <AntDesign name="arrowleft" size={25} color={Color.defaultIconColor}  />
                </TouchableOpacity>
            </View>
              <Text style={{color:'#fff',justifyContent:'center',alignSelf:'center',fontSize:Font.headingText,fontFamily:Font.AgencyBold}}>Get Meal</Text>
          </View>
        </View>  
        
        <View style={{justifyContent:'center',alignItems:'center',flex:1,margin:2}}>
          <Text style={{ fontSize:Font.headingText,fontFamily:Font.Agency,margin:10,marginTop:30}}>How you can Get Meal</Text>
          <Text style={{ fontSize:Font.normalText,fontFamily:Font.Agency,padding:10,marginBottom:50}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sollicitudin ornare ullamcorper. Nunc sit amet ipsum lectus. Vestibulum laoreet ipsum neque, sed varius ex ultricies ut. </Text>
        </View>
        <Text style={{color:'red',fontFamily:Font.Agency,textAlign:'center'}}>{this.state.error_message}</Text>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>this.incressnumber(this.state.value)}><Text style={{borderBottomLeftRadius:10,borderTopLeftRadius:10,color:'#fff',padding:10,paddingHorizontal:20,borderWidth:1,backgroundColor:'#044355',fontSize:Font.normalText}}>+</Text></TouchableOpacity>
          <Text style={{padding:10,borderWidth:1,width:'30%',textAlign:'center',fontSize:20,}}>{this.state.value}</Text>
          <TouchableOpacity onPress={()=>this.checknumber(this.state.value)}><Text style={{borderTopRightRadius:10,borderBottomRightRadius:10,color:'#fff',padding:10,paddingHorizontal:20,borderWidth:1,backgroundColor:'#ff0000',fontSize:Font.normalText}}>-</Text></TouchableOpacity>
        </View>
        
        <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:15}}>
          
          
          

          <View style={{flex:1,width:'100%',marginTop:15}}>
            { this.state.isLoading ?
              <View style={{justifyContent: 'center',alignItems: 'center'}}>
                <ActivityIndicator />
              </View>
              :
              <TouchableOpacity onPress={()=>this.send_request()}   style={{borderWidth:1,borderColor:Color.bordercolor,borderRadius:10,padding:10,margin:10}} >
                <Text style={{textAlign:'center',fontFamily:Font.Agency,color:Color.textcolor,fontSize:20}}>Get Coupon</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});