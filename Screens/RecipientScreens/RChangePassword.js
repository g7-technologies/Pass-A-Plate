import React,{Component} from 'react'
import { TextInput, Text, View,ActivityIndicator, AsyncStorage,TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {Ionicons,AntDesign} from '@expo/vector-icons';
import Toast from 'react-native-tiny-toast'
import {BasePath} from '../../config/path'
import Color from '../../constants/Color'
import Font from '../../constants/Font'

export default class App extends Component
{
  constructor()
  {
    super();
    this.state = {oldpassword:'1234',newpassword:'1234',confirmpassword:'1234', hidePassword: true,hidePassword2: true,hidePassword3: true ,isLoading:false,error_message:''}
    this.set_token();
  }
 
  managePasswordVisibility = () =>
  {
    this.setState({ hidePassword: !this.state.hidePassword });
  }
  managePasswordVisibility2 = () =>
  {
    this.setState({ hidePassword2: !this.state.hidePassword2 });
  }
  managePasswordVisibility3 = () =>
  {
    this.setState({ hidePassword3: !this.state.hidePassword3 });
  }

  set_token = async() =>{
    var tokken = await AsyncStorage.getItem('id')
    await this.setState({token: tokken})
  }

  login_request = () =>{
    const formData = new FormData()
    formData.append('user_id', this.state.token);
    formData.append('old_password', this.state.oldpassword);
    formData.append('new_password', this.state.newpassword);
    formData.append('confirm_password', this.state.confirmpassword);

    try{
      fetch(`${BasePath}sponsor_change_password.php`, {
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
          Toast.show(responseJson.success_msg)
          this.props.navigation.navigate('SponsorDashboard')
        }
      })
      .catch((error) =>{});
    }catch(e){}
  }





  form_validation = () => {
    if(this.state.oldpassword === '' || this.state.newpassword === '' || this.state.confirmpassword === ''){
      this.setState({error_message: 'All Fields are required',isLoading:false})
    }else{
      if(this.state.newpassword!==this.state.confirmpassword){
        this.setState({error_message: 'Password and Confirm Does Not Matches',isLoading:false})
      }else{
        this.setState({error_message: '',isLoading:true})
        this.login_request()
      }
    }
  }

  submit = () =>{
    this.setState({isLoading : true})
    this.form_validation() 
  }



  render()
  {
    return(
      <View style = { styles.container }>
        <View style={{backgroundColor:Color.backgroundcolor,height:'20%',borderBottomStartRadius:20,borderBottomEndRadius:20}}>
          <View style={{height:'40%',justifyContent:'center',alignItems:'flex-start',marginLeft:12}}>
            <TouchableOpacity style={{alignItems:'flex-start'}} onPress={()=>this.props.navigation.goBack()}>
              <AntDesign name="arrowleft" size={25} color={Color.defaultIconColor}   />
            </TouchableOpacity>
          </View>
          <Text style={{color:Color.HeadingColor,justifyContent:'center',textAlign:'center',fontSize:Font.headingText,fontFamily:Font.AgencyBold,}}>Change Password</Text>
        </View>

        <View style={{padding:10}}>
          <View style = { {...styles.textBoxBtnHolder,marginTop:40} }>
            <TextInput placeholder='Old Password' placeholderTextColor={Color.PlaceholderColor} onChangeText={(value)=>this.setState({oldpassword:value})} value={this.state.oldpassword} underlineColorAndroid = "transparent" secureTextEntry = { this.state.hidePassword } style = { styles.textBox }/>
            <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
              { ( this.state.hidePassword ) ? 
              <Ionicons name='md-eye' size={25}/> : 
              <Ionicons name='md-eye-off' size={25}/> 
              }
            </TouchableOpacity>
          </View>

          <View style = { styles.textBoxBtnHolder }>
            <TextInput placeholder='New Password' placeholderTextColor={Color.PlaceholderColor} onChangeText={(value)=>this.setState({newpassword:value})} value={this.state.newpassword} underlineColorAndroid = "transparent" secureTextEntry = { this.state.hidePassword2 } style = { styles.textBox }/>
            <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility2 }>
              { ( this.state.hidePassword2 ) ? 
              <Ionicons name='md-eye' size={25}/> :
              <Ionicons name='md-eye-off' size={25}/>
              }
            </TouchableOpacity>
          </View>

          <View style = { styles.textBoxBtnHolder }>
            <TextInput placeholder='Confirm Password' placeholderTextColor={Color.PlaceholderColor} onChangeText={(value)=>this.setState({confirmpassword:value})} value={this.state.confirmpassword} underlineColorAndroid = "transparent" secureTextEntry = { this.state.hidePassword3 } style = { styles.textBox }/>
            <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility3 }>
            { ( this.state.hidePassword3 ) ? 
            <Ionicons name='md-eye' size={25}/> :
            <Ionicons name='md-eye-off' size={25}/>
            }
            </TouchableOpacity>
          </View>
        </View>
        
        <View>
          { this.state.isLoading ?
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <ActivityIndicator />
            </View>
            :
            <TouchableOpacity  onPress={()=>this.submit()}  style={{borderWidth:1,borderColor:'#044355',borderRadius:10,padding:5,margin:10}} >
               <Text style={{fontFamily:Font.Agency,textAlign:'center',color:Color.textcolor,fontSize:Font.headingText}}>Change Password</Text>
            </TouchableOpacity>
          }
         <Text style={{textAlign:'center',color:'red',fontFamily:Font.Agency,fontSize:Font.normalText}}>{this.state.error_message}</Text>
        </View> 
      </View>
    );
  }
}
 
const styles = StyleSheet.create(
{
  container:
  {
    flex: 1,
  
    
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },
 
  textBoxBtnHolder:
  {
      marginVertical:10,
      
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
 
  textBox:
  {
    fontSize: Font.normalText,
    alignSelf: 'stretch',
    fontFamily:Font.AgencyBold,
    height: 45,
    paddingRight: 45,
    paddingLeft: 8,
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: Color.bordercolor,
    borderRadius: 5
  },
 
  visibilityBtn:
  {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5
  },
 
  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  }
});