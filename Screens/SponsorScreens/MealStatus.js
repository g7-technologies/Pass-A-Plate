import React from 'react';
import { StyleSheet,TouchableWithoutFeedback, Text,Alert, View,AsyncStorage, ActivityIndicator} from 'react-native';

import { TouchableOpacity,FlatList} from 'react-native-gesture-handler';
import { AntDesign,FontAwesome,MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons'; 
import { NavigationEvents } from 'react-navigation';
import Toast from 'react-native-tiny-toast'
import {BasePath} from '../../config/path'
import Color from '../../constants/Color'
import Font from '../../constants/Font'


export default class Dashboard extends React.Component {
    static navigationOptions = {
      title: 'Meal Status',
        drawerIcon: ({ tintColor }) => (
          <AntDesign name="checkcircle" size={20} style={{color:tintColor}} />
        )
    };

    constructor(props){
      super(props);
      this.state={
        value:1,
        show_error: false,
        error_message: '',
        isLoading: true,
        meals_donated:'',
        meals_consumed:'',
      
      }
     
      this.set_token()
    }
    set_token = async() =>{
      var tokken = await AsyncStorage.getItem('id')
      await this.setState({token: tokken})
      await this.gethistory()
     
    }
    
    
    gethistory=()=>{
      const formData = new FormData()
      formData.append('sponsor_id',this.state.token);
  
      try{
      fetch(`${BasePath}sponsor-history`, {
          
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
          }else{
            this.setState({dataSource: responseJson.donations})
            this.setState({meals_donated: responseJson.remaning_meals})
            this.setState({meals_consumed: responseJson.consumed_meals})
          }
      })
      .catch((error) =>{});
      }catch(e){}
    }


  render() {
    const {navigate} = this.props.navigation;
    if(this.state.isLoading){
      return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator/></View>
    }else{
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.set_token()}/>
        {/*-----------Meal Status-------------*/}
        <View style={{backgroundColor:'#044355',height:'30%',borderBottomStartRadius:20,borderBottomEndRadius:20}}>
          <View style={{height:'25%',justifyContent:'center',alignItems:'flex-start',marginLeft:12}}>
            <TouchableOpacity  style={{alignItems:'flex-start'}} onPress={()=>this.props.navigation.goBack()}>
              <AntDesign name="arrowleft" size={25} color={'#fff'}  />
            </TouchableOpacity>
          </View>
            <Text style={{color:Color.HeadingColor,justifyContent:'center',textAlign:'center',fontSize:Font.headingText,fontFamily:Font.AgencyBold}}>Meal Status</Text>
        </View>
        {/*-----------Meal Status Buttons-------------*/}
        <View style={{height:'10%',flexDirection:'row',padding:10,marginTop:'-20%',justifyContent:'space-evenly',}}>
          <TouchableWithoutFeedback onPress={()=>navigate('MealsAccepted')}>
            <View style={{width:150,height:150,elevation:3,justifyContent:'center',backgroundColor:'#fff',borderRadius:15}}>
              <Text style={{fontSize:Font.normalText,padding:10,textAlign:'center',fontFamily:Font.AgencyBold}}>Consumed Meals</Text>
              <Text style={{fontSize:Font.normalText,padding:10,textAlign:'center',fontFamily:Font.AgencyBold}}>{this.state.isLoading?<ActivityIndicator/>: this.state.meals_consumed}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback  onPress={()=>navigate('MealsPending')}>
            <View style={{width:150,height:150,elevation:3,justifyContent:'center',backgroundColor:'#fff',marginLeft:10,borderRadius:15}}>
              <Text style={{fontSize:Font.normalText,padding:10,textAlign:'center',fontFamily:Font.AgencyBold}}>Remaining Meals</Text>
              <Text style={{fontSize:Font.normalText,padding:10,textAlign:'center',fontFamily:Font.AgencyBold}}>{this.state.isLoading?<ActivityIndicator/>:this.state.meals_donated}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/*-----------Meal Status List -------------*/}
        <View style={{height:'60%',marginTop:110,alignItems:'center',justifyContent:'center',padding:10}}>
          <Text style={{fontFamily:Font.Agency,fontSize:Font.normalText,textAlign:'center',marginVertical:10}}>Previous Orders</Text>
          {this.state.isLoading?<View style={{marginTop:'20%',justifyContent:'center',alignItems:'center'}}><ActivityIndicator/></View>:
          <FlatList
            keyExtractor={(item, index) => item.id}
            data={this.state.dataSource}
            renderItem={({item}) =>  <View style={{flexDirection:'row',margin:5,}}>
              <View style={{width:'80%',backgroundColor:'#fff',padding:10,borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
                <Text style={{fontFamily:Font.Agency,fontSize:Font.normalText,}}>Meals Donated {item.total_meals}</Text>
                <Text style={{fontFamily:Font.Agency,fontSize:Font.normalText,}}>Meals Consumed {item.consumed_meals}</Text>
                <Text style={{fontFamily:Font.Agency,fontSize:Font.normalText,}}>Date : {item.date}</Text>
                <Text style={{fontFamily:Font.Agency,fontSize:Font.normalText,}}>Amount : {item.price}</Text>
              </View>
              <View style={{width:'20%',backgroundColor:'#fff',justifyContent:'center',padding:10,borderBottomRightRadius:10,borderTopRightRadius:10,}}>
                  {item.complete ?<MaterialIcons name='cloud-done' color='#3E991C' size={25}/>:
                  <MaterialCommunityIcons name='progress-clock' color='#ffc107' size={25}/>}    
              </View>
            </View>  }
                            
          />
            }
            
        </View>
      </View>
    );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#e6e6ea',

  },
});



