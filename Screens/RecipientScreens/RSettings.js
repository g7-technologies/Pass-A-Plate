import React from 'react';
import { StyleSheet,Text,AsyncStorage, View,ImageBackground,Image } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons,AntDesign, } from '@expo/vector-icons';
import Color from '../../constants/Color'
import Font from '../../constants/Font'


export default class SponsorMeal extends React.Component {

  static navigationOptions = {
    title: 'Setting',
    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons
      name="settings" size={20}
      style={{ color: tintColor }}
      />
    )
  };

  constructor(props){
    super(props);
    this.state={ imageuri:null}
    this.getImage();
  }

   
  
  getImage = async() =>{
    var image = await AsyncStorage.getItem('image')
    await this.setState({imageuri: image})
    
  }
    
  render() {
    const {navigate} = this.props.navigation;
    return (
      //-----------------main view-------------------------------
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.getImage()}/>
        {/* //---------------------------------------top bar background---------------------------- */}
        <View style={{flex:0.5,backgroundColor:'#f0f0f0'}}>
          {/* //---------------------------------------background profile image---------------------------- */}
          <View style={{flex:1,backgroundColor:'#044355',borderBottomLeftRadius:700,borderBottomRightRadius:450,width:'150%',marginLeft:-100,marginBottom:-46}}>
            <ImageBackground style={{height:'100%',width:'100%'}} imageStyle={{borderBottomLeftRadius:700,borderBottomRightRadius:450}} source={{ uri: this.state.imageuri }} >
              <View style={{flex:1,backgroundColor:'#04435566',borderBottomLeftRadius:500,borderBottomRightRadius:450,width:'120%',marginLeft:-100}}>
                <View style={{flex:1,backgroundColor:'#04435566',borderBottomLeftRadius:1200,borderBottomRightRadius:10,width:'120%',marginRight:-100}}>
                  <View style={{width:'10%',marginLeft:213,marginTop:18}}> 
                    <TouchableOpacity style={{alignItems:'flex-start'}} onPress={()=>this.props.navigation.goBack()}>
                        <AntDesign name="arrowleft" size={25} color={'#fff'}  />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
            {/* //---------------------------------------circular image border---------------------------- */}
            <View style={{alignItems:'center',justifyContent:'center',width:110,height:110,borderRadius:100,backgroundColor:'#FFF',marginLeft:110,bottom:0,position:'absolute'}}>
              <View style={{alignItems:'center',justifyContent:'center',width:100,height:100,borderRadius:100,backgroundColor:'#fff'}}>
                <Image style={{width:100,height:100,borderRadius:100}} source={{uri:this.state.imageuri}}/>
              </View>
            </View>
            {/* //---------------------------------------circular image border ends---------------------------- */}
          </View>
          {/* //---------------------------------------background profile image ends---------------------------- */}
        </View>
        {/* //---------------------------------------top bar ends---------------------------- */}
        {/* //---------------------------------------body---------------------------- */}
        <View style={{height:'40%',width:'100%',backgroundColor:'#f0f0f0',bottom:0,position:'absolute',flexDirection:'row',padding:30,justifyContent:'space-evenly',alignItems:'center'}}>
          {/* //---------------------------------------button 1---------------------------- */}
          <View style={{height:'60%',backgroundColor:'#fff',borderRadius:20,elevation:4,width:'50%',margin:10,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>navigate('REditProfile')}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <AntDesign name="edit" size={30} color={Color.iconColor} />
                <Text style={{fontSize:Font.normalText,fontFamily:Font.AgencyBold,color:Color.textcolor,marginTop:10}}>Edit Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* //---------------------------------------button 2---------------------------- */}
          <View style={{height:'60%',padding:5,backgroundColor:'#fff',borderRadius:20,elevation:4,width:'50%',margin:10,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>navigate('RChangePassword')}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <MaterialCommunityIcons name="textbox-password" size={30} color={Color.iconColor} />
                <Text style={{fontSize:Font.normalText,fontFamily:Font.AgencyBold,color:Color.textcolor,marginTop:10}}>Change Password</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* //---------------------------------------body ends---------------------------- */}
      </View>
      // {/* //---------------------------------------main view ends---------------------------- */}
    );
  }
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f0f0f0',
  },
});