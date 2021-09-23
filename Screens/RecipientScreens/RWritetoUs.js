import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView,Platform,Linking,ActivityIndicator} from 'react-native';
import { Ionicons,AntDesign,Entypo } from '@expo/vector-icons';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-tiny-toast'
import {BasePath} from '../../config/path'
import Color from '../../constants/Color'
import Font from '../../constants/Font'

export default class WritetoUs extends React.Component {
  static navigationOptions = {
    title: 'Write to Us',
    drawerIcon: ({ tintColor }) => (
      <Entypo
      name="mail-with-circle" size={20}
      style={{ color: tintColor }}
      />
    )
  };
  constructor(props){
    super(props);
    this.state={
      email:'',
      title:'',
      message:'',
      error_message:'',
      isLoading:false
    }
  }
  message_Request = () =>{
    const { navigate } = this.props.navigation;
    const formData = new FormData()
    formData.append('email', 'alijutt64672@gmail.com');
    formData.append('title', this.state.title);
    formData.append('message', this.state.message);
    try{
      fetch(`${BasePath}sponsor_write_to_us.php`, {
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
          this.setState({isLoading:false})
          Toast.show(responseJson.success_msg)
          console.log('success')
          this.setState({title: ' '})
          this.setState({message:' '})
          this.props.navigation.navigate('Dashboard')
          
        }
      })
      .catch((error) =>{});
    }catch(e){}
  }


  // getEmail = async() =>{
  //   var email=await AsyncStorage.getItem('email')
  //   await this.setState({email: email})
  // }

  send_message=()=>{
    if(this.state.title===''||this.state.message==''){
    this.setState({error_message:'Please Enter Message Detail'})
    }else{
    this.setState({isLoading:true})
      this.message_Request();
    }
  }


  dialCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
    phoneNumber = 'tel:${1234567890}';
    }
    else {
    phoneNumber = 'telprompt:${1234567890}';
    }
    Linking.openURL(phoneNumber);
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
       {/*---------------Head Section---------------*/}
        <View style={{height:'20%',backgroundColor:Color.backgroundcolor,flexDirection:'row',borderBottomLeftRadius:30,}}>
          <View style={{margin:10}}>           
            <TouchableOpacity style={{marginTop:5}} onPress={()=>this.props.navigation.goBack()}>
              <AntDesign name="arrowleft" size={25} color={'#fff'}  />
            </TouchableOpacity>
          </View>
          <View style={{justifyContent:'center',flex:1}}>          
            <Text style={{textAlign:'center',fontFamily:Font.AgencyBold,fontSize:Font.headingText,color:Color.HeadingColor}}>Message</Text>
          </View>
        </View>

        <KeyboardAvoidingView style={{flex:1}} behavior='padding' enabled>
          <View style={{flex:1,padding:10,justifyContent:'center',backgroundColor:'#cdcccc',borderBottomRightRadius:30,borderTopRightRadius:30,marginRight:20,marginTop:20}}>
            <TextInput
              onChangeText={value => this.setState({title: value})}
              underlineColorAndroid='transparent'
              placeholder='Title'
              placeholderTextColor={Color.PlaceholderColor}
              marginTop='400'
              style={{...styles.InputFieldsStyle}}
            />
            <TextInput
              onChangeText={value => this.setState({message: value})}
              multiline={true}
              maxHeight={190}
              numberOfLines={5}
              underlineColorAndroid='transparent'
              placeholder='Message'
              placeholderTextColor={Color.PlaceholderColor}
              style={{...styles.InputFieldsStyle,marginTop:10}}
            />
              
            {this.state.isLoading?
              <View style={{justifyContent: 'center',alignItems: 'center'}}>
                <ActivityIndicator />
              </View>
              :
              <TouchableOpacity onPress={()=>this.send_message()} style={{width:'85%',borderWidth:1,marginTop:15,borderRadius:10,marginLeft:30,borderColor:'#044355'}}>
                <Text style={{textAlign:'center',padding:10,fontFamily:Font.AgencyBold,color:Color.textcolor,fontSize:Font.headingText}}>Send</Text>
              </TouchableOpacity>
            }
            <Text style={{color:'red',textAlign:'center'}}>{this.state.error_message}</Text>
          </View>
        </KeyboardAvoidingView>

        <Text style={{color:Color.textcolor,textAlign:'center',marginTop:20,fontFamily:Font.AgencyBold,fontSize:Font.normalText}}>──────  OR  ──────</Text>
        
        <View style={{flex:0.2,backgroundColor:Color.backgroundcolor,justifyContent:'center',alignItems:'center',borderTopLeftRadius:30,borderBottomLeftRadius:30,marginTop:10,marginLeft:20}}>
          <Text style={{color:'#fff',textAlign:'center',marginTop:10,fontFamily:Font.Agency,fontSize:Font.normalText}}>Give Us A Call</Text>
            <TouchableOpacity onPress={()=>this.dialCall()} style={{flexDirection:'row'}}>
              <Ionicons name="md-call" color={Color.defaultIconColor} size={20} style={{marginTop:12,marginRight:5}}/>
              <Text style={{color:'#fff',textAlign:'center',marginTop:10,fontFamily:Font.AgencyBold,fontSize:Font.normalText}}>12345678900</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',

  },
  InputFieldsStyle:{
    fontFamily: Font.Agency,
    marginTop:15,
    borderWidth:1,
    borderRadius:5,
    borderColor:Color.backgroundcolor,
    padding:5,
    fontSize:20,
    width:'85%',
    paddingHorizontal:15,
    marginBottom:10,
    marginLeft:30
  },
});