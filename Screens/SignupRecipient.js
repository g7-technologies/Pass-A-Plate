import React,{Component} from 'react';
import {StyleSheet,ActivityIndicator,Image,AsyncStorage ,Text, View,KeyboardAvoidingView,TextInput } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { AntDesign } from '@expo/vector-icons';
import {BasePath} from '../config/path'
import Toast from 'react-native-tiny-toast'
import Font  from '../constants/Font'
import Color from '../constants/Color'
export default class SignupSponsor extends Component{
  constructor(props){
    super(props);
    this.state={
      name:'tesxs',
      phone:'1243544534',
      email:'',
      password:'1234',
      zipcode:'3234',
      city:'BMW',
      state:'BMW',
      Image:'',
      image: null,
      img_str: null,
      value:1,
      show_error: false,
      error_message: '',
      isLoading: false,
    }
    //this.set_token()
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
    //this.getPermissionAsync();
}

  set_token = async() =>{
    var tokken = await AsyncStorage.getItem('id')
    await this.setState({token: tokken})
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
    }catch(e){}
  }

  Signuprequest = () =>{
    this.setState({isLoading : true})
    const formData = new FormData()
    formData.append('name',this.state.name );
    formData.append('phone',this.state.phone );
    formData.append('email',this.state.email ); 
    formData.append('password',this.state.password ); 
    formData.append('zipcode',this.state.zipcode );
    formData.append('city',this.state.city );
    formData.append('state',this.state.state );
    formData.append('image',this.state.img_str );
   
    try{
        fetch(`${BasePath}recipient_signup.php`, {
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
          Toast.show(responseJson.success_msg)
          this.storedate(responseJson)
        }
      }).catch((error) =>{});
    }catch(e){}
  }

  checkSignup=()=>{
    
    if(this.state.img_str===null||this.state.name===''||this.state.phone==='' ||this.state.email === '' || this.state.password === ''||this.state.zipcode===''||this.state.city===''||this.state.state===''){
      
      this.setState({error_message: 'All Fields are required',isLoading:false})
      
    }else if(!this.ValidateEmail(this.state.email)){
      this.setState({error_message: 'Invalid Email',isLoading:false})
    }else if(!this.ValidateUSPhoneNumber(this.state.phone)){
      if(!this.ValidateUSPhoneNumber(this.state.phone)){
      this.setState({error_message: 'Invalid Phone Number',isLoading:false})
      }else{
        this.setState({error_message: '',isLoading:true})
      }
    }else{
      this.setState({error_message: ''})
      this.Signuprequest()
    }
  }


  // getPermissionAsync = async () => {
  //   if (Constants.platform.ios) {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     if (status !== 'granted') {
  //       alert('Sorry, we need camera roll permissions to make this work!');
  //     }
  //   }
  // }

  getPermissionAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  _pickImage = async () => {
    await this.getPermissionAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      base64:true
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      
      //  console.log(result.base64)
      this.setState({ img_str:`data:image/jpg;base64,${result.base64}` });
   
 
      }
  };

  ValidateUSPhoneNumber=(phoneNumber)=> {
    var regExp = /^\d{10}$/;
    var phone = phoneNumber.match(regExp);
    if (phone) {
      
      return true;
    }
    
    return false;
  }

  ValidateEmail=(mail)=> 
  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      {
        return (true)
      }
      
        return (false)
  }




  render(){
    const {navigate} = this.props.navigation;
    let { image } = this.state;
    if(this.state.fontLoaded){
      return(
        <View style={{flex:1,padding:20,backgroundColor:'#fff'}}> 
          <View style={{flex:0.1}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
              <AntDesign name="arrowleft" size={32}  />
            </TouchableOpacity>
          </View>
          <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
            <Image style={{width:120,height:120}} source={require('../assets/logo.jpg')}/> 
          </View>

          <KeyboardAvoidingView style={{flex:1}} behavior='padding' enabled> 
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
              <Text style={styles.headingtext}>Sign Up</Text>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',margin:10 }}>
                <TouchableOpacity onPress={this._pickImage}>
                  <View style={{alignItems:'center',justifyContent:'center',width:105,height:105,borderRadius:100,backgroundColor:Color.backgroundcolor}}>
                    <View style={{alignItems:'center',justifyContent:'center',width:100,height:100,borderRadius:100,backgroundColor:'#fff'}}>
                      {this.state.image != null?
                        <Image source={{ uri: image }} style={{width: 100, height: 100,borderRadius:100 }} />
                      :
                        <AntDesign name='user'size={55} color={Color.bordercolor}/>
                      }
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <TextInput placeholder='Name'  placeholderTextColor={Color.PlaceholderColor}   onChangeText={value => this.setState({name: value})}                                 value={this.state.name} style={styles.InputFieldsStyle} />
              <TextInput placeholder='Phone' placeholderTextColor={Color.PlaceholderColor}   onChangeText={value => this.setState({phone: value})} keyboardType={'phone-pad'}     value={this.state.phone} style={styles.InputFieldsStyle} />
              <TextInput placeholder='Email' placeholderTextColor={Color.PlaceholderColor}   onChangeText={value => this.setState({email: value})} keyboardType={'email-address'} value={this.state.email} style={styles.InputFieldsStyle} />
              <TextInput placeholder='Password' placeholderTextColor={Color.PlaceholderColor} onChangeText={value => this.setState({password: value})}  value={this.state.password} secureTextEntry={true} style={styles.InputFieldsStyle} />
              <TextInput placeholder='ZipCode' placeholderTextColor={Color.PlaceholderColor}  onChangeText={value => this.setState({zipcode: value})} keyboardType={'number-pad'}  value={this.state.zipcode}style={styles.InputFieldsStyle} />
              <TextInput placeholder='City' placeholderTextColor={Color.PlaceholderColor}    onChangeText={value => this.setState({city: value})}                                 value={this.state.city} style={styles.InputFieldsStyle} />
              <TextInput placeholder='State' placeholderTextColor={Color.PlaceholderColor}   onChangeText={value => this.setState({state: value})}                                value={this.state.state} style={styles.InputFieldsStyle} />
              <Text style={{textAlign:'center' ,color:'red'}}>{this.state.error_message}</Text>
              { this.state.isLoading ?
                  <View style={{justifyContent: 'center',alignItems: 'center'}}>
                    <ActivityIndicator />
                  </View>
                  :
                  <TouchableOpacity  onPress={() => this.checkSignup()} style={{borderWidth:1,borderColor:Color.bordercolor,borderRadius:10,padding:5,margin:10}} >
                    <Text style={{fontFamily:Font.Agency,textAlign:'center',color:Color.textcolor,fontSize:Font.headingText}}>Sign Up</Text>
                  </TouchableOpacity>
              }
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      );
    }
    else{
      return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator/>
      </View>);
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  ButtonsTextStyle:{
    fontFamily: Font.Agency,
    textAlign:'center',
    color:Color.textcolor,
    fontSize:Font.normalText
  },
  headingtext:{
    fontFamily: Font.AgencyBold,
    marginTop:15,
    fontSize:Font.headingText,
    textAlign:'center'
  }
});
