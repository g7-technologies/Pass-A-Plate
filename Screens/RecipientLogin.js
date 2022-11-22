import React from 'react';
import { StyleSheet, Text,AsyncStorage, View,ActivityIndicator,ScrollView, KeyboardAvoidingView, Image ,TextInput,TouchableOpacity} from 'react-native';
import {BasePath} from '../config/path'
import {Ionicons,AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-tiny-toast'
import Font from '../constants/Font'
import Color from '../constants/Color'
export default class SponserLogin extends React.Component {
  static navigationOptions = {
    title: 'Recipient',
    tabBarIcon: ({}) => (
      <AntDesign
      name="home" size={20}
      style={{ color:'#044355'}}
      />
    )
  };

  constructor(props){
    super(props);
    
    this.state={
      email: 'umarmughal6899@gmail.com',
      password: 'okAm3XN1T3',
      show_error: false,
      error_message: '',
      hidePassword: true,
      isLoading:false,
      disableView:false
    }
  }
  state={
    fontLoaded: false,
  }
  managePasswordVisibility = () =>
  {
    this.setState({ hidePassword: !this.state.hidePassword });
  }
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'ArchitectsDaughter-regular': require('../assets/fonts/ArchitectsDaughter.ttf'),
      'FrederickatheGreat': require('../assets/fonts/FrederickatheGreat-Regular.ttf'),
      'Agency': require('../assets/fonts/Agency.ttf'),
      'AgencyBold': require('../assets/fonts/AgencyBold.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  storedate = async (response) =>{
    const { navigate } = this.props.navigation;
    try{
      await AsyncStorage.setItem('isLogedIn','2');
      await AsyncStorage.setItem('id', response.user_id);
      await AsyncStorage.setItem('full_name', response.name);
      await AsyncStorage.setItem('email', response.email);
      await AsyncStorage.setItem('phone', response.phone);  
      await AsyncStorage.setItem('zipcode', response.zipcode);
      await AsyncStorage.setItem('city', response.city);  
      await AsyncStorage.setItem('state', response.state); 
      await AsyncStorage.setItem('image', response.image);   
      await AsyncStorage.setItem('total_meals', response.total_meals);
      this.props.navigation.navigate('RecipientDashboard')
      this.setState({disableView : false})
      this.setState({isLoading: false})
      this.setState({email:''})
      this.setState({password:''})


    }catch(e){}
  }

  login_request = () =>{
    const formData = new FormData()
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    try{
      fetch(`${BasePath}login`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body:formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
        
        if(responseJson.error == true){
          Toast.show(responseJson.error_msg)
          this.setState({isLoading: false})
          this.setState({disableView : false})
        }else{
          this.storedate(responseJson)
          console.log(responseJson.error)
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
    if(this.state.email === '' || this.state.password === ''){
      this.setState({error_message: 'All Fields are required',isLoading:false})
    }else{
      this.setState({error_message: ''})
      this.login_request()
    }
  }

  login = () =>{
    this.setState({isLoading : true})
    this.setState({disableView : true})
    this.form_validation()
  }


  render() {
    const {navigate} = this.props.navigation;
    if(this.state.fontLoaded){
      return (
        <View pointerEvents={(this.state.disableView) ? 'none' : 'auto'} style={{flex:1,padding:20,backgroundColor:'#fff'}}>
        <View style={{flex:0.4,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
          <Image style={{width:120,height:120}} source={require('../assets/logo.jpg')}/>
        </View>

        <KeyboardAvoidingView style={{flex:1}} behavior='padding' enabled> 
          <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
             
                <Text style={{ fontFamily:Font.AgencyBold,textAlign:'center', fontSize: Font.headingText }}>
                  Login
                </Text>
                
              
            <TextInput
              onChangeText={value => this.setState({email: value})}
              value={this.state.email}
              underlineColorAndroid='transparent'
              placeholder='Email'
              placeholderTextColor={Color.PlaceholderColor}
              style={{...styles.InputFieldsStyle,marginTop:20}}/>
           


           <View style = { styles.textBoxBtnHolder }>
          <TextInput placeholder='Password' placeholderTextColor={Color.PlaceholderColor} onChangeText={value=>this.setState({password:value})} value={this.state.password} underlineColorAndroid = "transparent" secureTextEntry = { this.state.hidePassword } style = { styles.textBox }/>
          <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
            { ( this.state.hidePassword ) ? <Ionicons name='md-eye' size={25}/> : <Ionicons name='md-eye-off' size={25}/> }
          </TouchableOpacity>
        </View>
            
            
              <Text style={{textAlign:'center' ,color:'red'}}>{this.state.error_message}</Text>
            { this.state.isLoading ?
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <ActivityIndicator />
                </View>
                :
                <TouchableOpacity  onPress={() => this.login()} style={{borderWidth:1,borderColor:Color.bordercolor,borderRadius:10,padding:5,margin:10}} >
                <Text style={{fontFamily:Font.Agency,textAlign:'center',color:Color.textcolor,fontSize:Font.headingText}}>Login</Text>
              </TouchableOpacity>
            }
            <TouchableOpacity style={{alignSelf:'center',margin:5}} onPress={()=>navigate('ForgotPasswordRecipient')}>
              <Text style={{fontFamily:Font.Agency,color:Color.textcolor,marginTop:30,fontSize:Font.normalText}}  >Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('SignupRecipient')} style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
              <Text style={{ fontFamily: Font.Agency,color:Color.textcolor,textAlign:'center', fontSize: Font.normalText }}>
                Become a Recipient
              </Text>
            </TouchableOpacity>
          </ScrollView>
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

const styles = StyleSheet.create({
  header:{
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection : 'row'
  },
  InputFieldsStyle:{
    fontFamily: Font.AgencyBold,
    fontSize:Font.normalText,
     marginTop:5,
     borderWidth:1,
     borderRadius:5,
     borderColor:Color.bordercolor,
     padding:5,
     paddingHorizontal:15,
     marginBottom:10,
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
    fontFamily: Font.AgencyBold,
    fontSize:Font.normalText,
    marginTop:5,
    borderWidth:1,
    borderRadius:5,
    borderColor:Color.bordercolor,
    padding:5,
    paddingHorizontal:15,
    marginBottom:10,
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