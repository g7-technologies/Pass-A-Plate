import React,{Component} from 'react';
import {Text,Image, View, KeyboardAvoidingView,ActivityIndicator } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import {BasePath} from '../config/path'
import Toast from 'react-native-tiny-toast'
import Font from '../constants/Font'
import Color from '../constants/Color'
export default class ForgotPasswordSponsar extends Component{
  constructor(props){
    super(props);
    this.state={
      email: '',
      show_error: false,
      error_message: '',
      status: false,
      isLoading:false
    }
  }
  state={
    fontLoaded: false,
  }


  async componentDidMount() {
    await Expo.Font.loadAsync({
      'ArchitectsDaughter-regular': require('../assets/fonts/ArchitectsDaughter.ttf'),
      'FrederickatheGreat': require('../assets/fonts/FrederickatheGreat-Regular.ttf'),
      'Agency': require('../assets/fonts/Agency.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  reset_password = () =>{
    
    const formData = new FormData()
    formData.append('email', this.state.email);

    try{
      fetch(`${BasePath}recepient_forgot_password.php`, {
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
         
          this.setState({error_message: 'Please Check Your Email Address'})
          //this.props.navigation.navigate('Login')
        }
      })
      .catch((error) =>{});
    }catch(e){}
  }


  show_error_message = () =>{
    if(this.state.show_error){
      return(
        <View>
          <Text style={{color: 'red',textAlign: 'center'}}>{this.state.error_message}</Text>
        </View>
      )
    }
  }




  
  form_validation = () => {
    if(this.state.email === ''){
     
      this.setState({error_message: 'Email Field is required'})
      this.setState({isLoading:false})
     
    }else{
      
      this.setState({error_message: ''})
      this.setState({isLoading:true})
      this.reset_password()
      
    }
  }


  login = () =>{
    this.setState({isLoading : true})
    this.form_validation()
  }



  show_error_message = () =>{
    if(this.state.show_error){
      if(this.state.status){
        return(
          <Text style={{color: 'green'}}>{this.state.error_message}</Text>
        )
        }else{
        return(
          <Text style={{color: 'red'}}>{this.state.error_message}</Text>
        )
      }
    }
  }

  



  render(){
    const {navigate} = this.props.navigation;
    if(this.state.fontLoaded){
      return(
      <View style={{flex:1,padding:20,backgroundColor:'#fff'}}> 
        <View style={{flex:0.1}}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
            <AntDesign name="arrowleft" size={32}  />
          </TouchableOpacity>
        </View>
        
        <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
          <Image style={{width:120,height:120}} source={require('../assets/logo.jpg')}/> 
        </View>
        
        <Text style={{fontFamily: Font.Agency,marginBottom:10,fontSize:Font.normalText,textAlign:'center',justifyContent:'center',alignItems:'center'}}> Forgot Password</Text>

        <KeyboardAvoidingView style={{flex:1,}} behavior='padding' enabled>
          <TextInput placeholder='Email' placeholderTextColor={Color.PlaceholderColor} onChangeText={value=>this.setState({email:value})} value={this.state.email} style={{width:'100%',fontFamily:Font.AgencyBold,fontSize:Font.normalText,marginTop:5,borderWidth:1,borderRadius:5,borderColor:Color.bordercolor,padding:5,paddingHorizontal:15,marginBottom:10,}} />
          { this.state.isLoading ?
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <ActivityIndicator />
                </View>
                :
                <TouchableOpacity  onPress={() => this.login()} style={{borderWidth:1,borderColor:Color.bordercolor,borderRadius:10,padding:5,margin:10}} >
                  <Text style={{fontFamily:Font.Agency,textAlign:'center',color:Color.textcolor,fontSize:Font.normalText}}>Send</Text>
                </TouchableOpacity>
            }
          <Text style={{textAlign:'center',color:'red',marginVertical:5}}>{this.state.error_message}</Text> 
        </KeyboardAvoidingView>
      </View>
      );
      }else{
      return(
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <ActivityIndicator/>
      </View>
      ); 
    }
  }
}