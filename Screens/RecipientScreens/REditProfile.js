import React, { Component } from 'react';
import { StyleSheet,Text,AsyncStorage, View,TouchableOpacity,TextInput,KeyboardAvoidingView ,Image,ScrollView, ActivityIndicator} from 'react-native';
import { AntDesign,FontAwesome,MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons'; 
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import {BasePath} from '../../config/path'
import Toast from 'react-native-tiny-toast'
import Color from '../../constants/Color'
import Font from '../../constants/Font'

export default class EditProfile extends Component {

  constructor(props){
    super(props);
   this.state={ name:'',phone:'',isLoading:false,email:'',zipcode:'',city:'',state:'',imageuri:null,edit:false,image:'none'},

   this.getImage();
  }

  storedate = async (response) =>{
    try{ 
      await AsyncStorage.setItem('id', response.user_id);
      await AsyncStorage.setItem('full_name', response.name);
      await AsyncStorage.setItem('phone', response.phone);
      await AsyncStorage.setItem('zipcode', response.zipcode);
      await AsyncStorage.setItem('city', response.city);  
      await AsyncStorage.setItem('state', response.state); 
      await AsyncStorage.setItem('image', response.image); 
      this.setState({edit:false})
      await this.getImage()
    }catch(e){}
  }
  

  change_info_request = () =>{
    const formData = new FormData()
    formData.append('user_id', this.state.id);
    formData.append('name', this.state.name);
    formData.append('phone', this.state.phone);
    formData.append('zipcode', this.state.zipcode);
    formData.append('city', this.state.city);
    formData.append('state', this.state.state);
    if(this.state.image=='none'){
      formData.append('image', this.state.image);
    }else{
      formData.append('image', this.state.img_str);
    }

    try{
      fetch(`${BasePath}recepient_update_profile.php`, {
        
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
          this.storedate(responseJson)
        }
      })
      .catch((error) =>{});
    }catch(e){}
  }


  saveUserInfo=()=>{
    this.setState({isLoading:true})
    this.change_info_request()
  }

  getImage = async() =>{
    var id = await AsyncStorage.getItem('id')
    await this.setState({id: id})
    var imagefromasync = await AsyncStorage.getItem('image')
    await this.setState({imageuri: imagefromasync})
     var name=await AsyncStorage.getItem('full_name')
     await this.setState({name: name})
    var phone=await AsyncStorage.getItem('phone')
    await this.setState({phone: phone})
    var email=await AsyncStorage.getItem('email')
    await this.setState({email: email})
    var zipcode=await AsyncStorage.getItem('zipcode')
    await this.setState({zipcode: zipcode})
    var city=await AsyncStorage.getItem('city')
    await this.setState({city: city})
    var state=await AsyncStorage.getItem('state')
    await this.setState({state: state})
  }


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
        this.setState({ img_str:`data:image/jpg;base64,${result.base64}` });
      }
  };

  changeinfo=()=>{
    if(this.state.edit){
      this.setState({edit:false})
    }else{
      this.setState({edit:true})
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={{backgroundColor:Color.backgroundcolor,height:'20%',borderBottomStartRadius:20,borderBottomEndRadius:20}}>
          <View style={{height:'40%',marginTop:10,padding:10,flexDirection:'row'}}>
            <View style={{width:'10%'}}> 
              <TouchableOpacity style={{alignItems:'flex-start'}} onPress={()=>this.props.navigation.goBack()}>
                <AntDesign name="arrowleft" size={25} color={'#fff'}  />
              </TouchableOpacity>
            </View>
            
            <View style={{flex:1}}/> 
            
            <View>
              {(this.state.edit==false)?      
                <TouchableOpacity style={{justifyContent:'flex-end',alignSelf:'flex-end'}} onPress={()=>this.changeinfo()}>
                  <AntDesign name="edit" size={25} color={'#fff'}  />
                </TouchableOpacity>:
                <View>
                 {(this.state.isLoading==true)?
                    <ActivityIndicator color={'#fff'}/>:
                    <TouchableOpacity style={{justifyContent:'flex-end',alignSelf:'flex-end'}} onPress={()=>this.saveUserInfo()}>
                      <FontAwesome name="thumbs-o-up" size={25} color={'#fff'}  />
                    </TouchableOpacity>

                  }
                </View>
              }
             
            </View>
          </View>

          <Text style={{color:'#fff',justifyContent:'center',textAlign:'center',fontSize:25,fontFamily:'Agency',fontWeight:'bold'}}>Edit Profile</Text>
        </View>

                                                    {/* Row 1 Start Here*/}
        <ScrollView style={{flex:1}}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',margin:10 }}>
            {(this.state.edit==false)?      
              <View style={{alignItems:'center',justifyContent:'center',width:105,height:105,borderRadius:100,backgroundColor:Color.backgroundcolor}}>
                <View style={{alignItems:'center',justifyContent:'center',width:100,height:100,borderRadius:100,backgroundColor:'#fff'}}>
                  <Image source={{ uri: this.state.imageuri }} style={{width: 100, height: 100,borderRadius:100 }} />
                </View>
              </View>

              :
              <TouchableOpacity onPress={this._pickImage}>
                <View style={{alignItems:'center',justifyContent:'center',width:120,height:120,borderRadius:100,backgroundColor:'#044355A9'}}> 
                  <View style={{alignItems:'center',justifyContent:'center',width:105,height:105,borderRadius:100,backgroundColor:'#044355'}}>
                    <View style={{alignItems:'center',justifyContent:'center',width:100,height:100,borderRadius:100,backgroundColor:'#fff'}}>
                      {(this.state.image=='none')? 
                        <Image source={{ uri: this.state.imageuri }} style={{width: 100, height: 100,borderRadius:100 }} /> :
                        <Image source={{ uri: this.state.image }} style={{width: 100, height: 100,borderRadius:100 }} />
                      }                      
                    </View>
                  </View>
                </View>
              </TouchableOpacity> 
            }
          </View>

          {(this.state.edit==true)?

            <View style={{padding:20,justifyContent:'center',alignItems:'center'}}>
              <KeyboardAvoidingView style={{flex:1,width:'100%'}} behavior='padding' enabled  >
                <View style={{justifyContent:'center',elevation:3,borderTopEndRadius:20,borderTopLeftRadius:20,padding:10,backgroundColor:'#fff',width:'100%'}} >
                  <FontAwesome name='user' size={30} color={Color.iconColor} style={{textAlign:'center'}}/>
                  <View style={{justifyContent:'center'}}>
                  < TextInput style={{...styles.textInputStyle,}} autoFocus={true} onChangeText={value=>this.setState({name:value})} value={this.state.name}/>
                  </View>
                </View>
                
                <View style={{justifyContent:'center',marginTop:10,elevation:3,padding:10,backgroundColor:'#fff',width:'100%'}} >
                  <FontAwesome  name='phone' size={30} color={Color.iconColor} style={{textAlign:'center'}}/>
                    <View style={{marginLeft:'5%',flexDirection:'row'}}>
                      <Text style={styles.textstyle}>Email:   {this.state.email}</Text>
                    </View>
                  <TextInput style={{...styles.textInputStyle,}} onChangeText={value=>this.setState({phone:value})} value={this.state.phone}/>
                </View>

                <View style={{justifyContent:'center',marginTop:10,borderBottomLeftRadius:20,borderBottomRightRadius:20,elevation:3,padding:10,backgroundColor:'#fff',width:'100%'}} >
                  <MaterialIcons   name='location-on' size={30} color={Color.iconColor} style={{textAlign:'center'}}/>
                  <View>
                    <TextInput style={{...styles.textInputStyle,}} onChangeText={value=>this.setState({zipcode:value})} value={this.state.zipcode}/>
                    <TextInput style={{...styles.textInputStyle,}} onChangeText={value=>this.setState({city:value})} value={this.state.city}/>
                    <TextInput style={{...styles.textInputStyle,}} onChangeText={value=>this.setState({state:value})} value={this.state.state}/>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
            :
            <View style={{padding:20,justifyContent:'center',alignItems:'center'}}>
              <View style={{justifyContent:'center',elevation:3,borderTopEndRadius:20,borderTopLeftRadius:20,padding:10,backgroundColor:'#fff',width:'100%'}} >
                <FontAwesome name='user' size={30} color={Color.iconColor} style={{textAlign:'center'}}/>
                <View style={{marginLeft:'5%'}}>
                  <Text style={{...styles.textstyle,marginTop:10}}>Name:  {this.state.name}</Text>
                </View>
              </View>

              <View style={{justifyContent:'center',marginTop:10,elevation:3,padding:10,backgroundColor:'#fff',width:'100%'}} >
                <FontAwesome  name='phone' size={30} color={Color.iconColor} style={{textAlign:'center'}}/>
                <View style={{marginLeft:'5%'}}>
                  <Text style={styles.textstyle}>Email:   {this.state.email}</Text>
                  <Text style={styles.textstyle}>Phone:   {this.state.phone}</Text>
                </View>
              </View>
              
              <View style={{justifyContent:'center',marginTop:10,borderBottomLeftRadius:20,borderBottomRightRadius:20,elevation:3,padding:10,backgroundColor:'#fff',width:'100%'}} >
                <MaterialIcons   name='location-on' size={30} color={Color.iconColor} style={{textAlign:'center'}}/>
                <View style={{marginLeft:'5%'}}>
                  <Text style={styles.textstyle}>Zipcode:    {this.state.zipcode}</Text>
                  <Text style={styles.textstyle}>City:          {this.state.city}</Text>
                  <Text style={styles.textstyle}>State:        {this.state.state}</Text>
                </View>
              </View>
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f0f0f0',

  },
  textInputStyle:{
    borderWidth:1,
    paddingHorizontal:10,
    borderColor:'#dddddd',
    fontSize:20,
   marginTop:5,
   padding:10,borderRadius:2,
    fontFamily:Font.Agency
  },
  labelStyle:{
    fontFamily:Font.Agency,
    fontSize:20,
    marginTop:5
  },
  textstyle:{
    fontFamily:Font.Agency,
    fontSize:20,
  }
});