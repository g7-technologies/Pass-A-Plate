import React from 'react';
import { StyleSheet,Share,AsyncStorage,Text, View, Image,TouchableHighlight,Modal } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons,Entypo,FontAwesome,MaterialCommunityIcons,AntDesign, } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import Color from '../../constants/Color'
import Font from '../../constants/Font'
export default class Dashboard extends React.Component {
  static navigationOptions = {
   drawerLabel:'Dashboard',
    drawerIcon: ({ tintColor }) => (
      <AntDesign
      name="home" size={20}
      style={{ color: tintColor }}
      />
    )
  };

  constructor(props){
    super(props);
    this.state={
      dataSource:null,
      isLoading: false,
      modalVisible: false,
    }
    this.getImage()
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }
  setModalVisible=(visible)=> {
    this.setState({modalVisible: visible});
  }
  set_token = async() =>{
    
  }

  getImage = async() =>{
    var totalmeals = await AsyncStorage.getItem('total_meals')
    await this.setState({token: totalmeals})
    
  }
    
  Logout=async() =>{
    await AsyncStorage.clear()
    await this.props.navigation.navigate('Login')
  }
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{...styles.container,}}>
      <NavigationEvents onDidFocus={() => this.getImage()}/>
        {/*////////////-----------------MAIN PAGE VIEW---------------------////////////*/}
        <View style={{flex:0.3,flexDirection:'row',backgroundColor:Color.backgroundcolor,padding:5}}>
          <View style={{justifyContent:'flex-start',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}> 
              <MaterialCommunityIcons name="hamburger" size={30} color={Color.defaultIconColor} />
            </TouchableOpacity>
          </View>
          <View style={{justifyContent:'flex-start',alignItems:'center',flex:1}}>
            <Text style={{ fontFamily: Font.AgencyBold,fontSize:Font.headingText,color:Color.HeadingColor,}}>Pass A Plate</Text>
          </View>
          <View style={{justifyContent:'flex-start',alignItems:'center',paddingRight:5}}>
            <Modal
              animationType='fade'
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
              
              }}>
              <View style={{marginTop: 22,}}>
              <Image style={{width:'50%',height:'50%',alignSelf:'center'}} source={require('../../assets/logo.jpg')}/>
              <Text style={{fontSize:Font.normalText,fontFamily: Font.AgencyBold,textAlign:'center',marginBottom:60}}>Are You Sure To Logout</Text>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>

                  <View style={{width:'30%',}}>
                  <TouchableHighlight style={{borderRadius:5,borderWidth:1,padding:15,}}
                  onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={{fontSize:Font.normalText,fontFamily: Font.AgencyBold,textAlign:'center',color:Color.textcolor}}>Cancel</Text>
                  </TouchableHighlight>
                  </View>
                  <View style={{width:'30%',}}>
                  <TouchableHighlight style={{borderRadius:5,borderWidth:1,padding:15,}}
                  onPress={()=>this.Logout()}> 
                    <Text style={{fontSize:Font.normalText,fontFamily: Font.AgencyBold,textAlign:'center',color:Color.textcolor}}>Ok</Text>
                  </TouchableHighlight>
                  </View>

                  
                </View>
              </View>
            </Modal>
                <TouchableOpacity onPress={() => {
                  this.setModalVisible(true);
                  }}> 
                  <FontAwesome name="power-off" size={25} color="#fff" />
                </TouchableOpacity>
          </View>
        </View>

        {/*////////////-----------------DASHBOARD VIEW-----------------------////////////*/}
        <View style={{flex:0.3,justifyContent:'center',alignItems:'center',}}>
          <Text style={{fontFamily:  Font.AgencyBold,fontSize:Font.headingText,color:Color.HeadingColor,marginBottom:45}}>Dashboard</Text>
        </View>

        {/*////////////-----------------TOTAL DONATION CARD------------------////////////*/}
        <LinearGradient colors={['#0F2027', '#203A43', '#2C5364']}  start={[0.0, 0.5]} end={[1.0, 0.5]}  style={{flex:3,justifyContent:'center',alignItems:'center',backgroundColor:'#033544',borderTopRightRadius:40,borderTopLeftRadius:40}}>
          <View style={{flexDirection:'row',top:20,}}>
            <Text style={{fontFamily:Font.AgencyBold,fontSize:Font.headingText,marginBottom:45,color:Color.HeadingColor}}> Total Meals: {this.state.token}</Text>
          </View>
          {/*///////////--------------------Rows Section Start--------------------------//////////*/}
          <View style={{flex:1,padding:10,width:'100%',borderTopRightRadius:40,borderTopLeftRadius:40,backgroundColor:'#f0f0f0'}}>
           {/*///////////--------------------Row 1  Start--------------------------//////////*/}
            <View style={{flex:1,flexWrap:'wrap',flexDirection:'row',justifyContent:'space-evenly',width:'100%',marginTop:10}}>
              <View style={{backgroundColor:'#fff',borderRadius:20,elevation:4,width:'40%',margin:5}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>navigate('RSponsorMeal')}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <MaterialIcons name="restaurant" size={30} color={Color.iconColor}  />
                    <Text style={{fontSize:Font.normalText,fontFamily:  Font.AgencyBold,color:Color.iconColor,marginTop:10}}>Get Meal</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{padding:5,backgroundColor:'#fff',borderRadius:20,elevation:4,width:'40%',margin:5}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>navigate('RMealStatus')}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <AntDesign name="checkcircle" size={30} color={Color.iconColor}  />
                    <Text style={{fontSize:Font.normalText,fontFamily:  Font.AgencyBold,color:Color.iconColor,marginTop:10}}>Coupon Status</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/*///////////--------------------Row 2  Start--------------------------//////////*/}  

            <View style={{flex:1,flexWrap:'wrap',flexDirection:'row',justifyContent:'space-evenly',width:'100%',marginTop:10}}>
              <View style={{backgroundColor:'#fff',borderRadius:20,elevation:4,width:'40%',margin:5}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>navigate('RHistory')}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <FontAwesome name="history" size={30} color={Color.iconColor}/>
                    <Text style={{fontSize:Font.normalText,fontFamily:  Font.AgencyBold,color:Color.iconColor,marginTop:10}}>History</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{padding:5,backgroundColor:'#fff',borderRadius:20,elevation:4,width:'40%',margin:5}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>navigate('RWritetoUs')}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Entypo name="mail-with-circle" size={30} color={Color.iconColor} />
                    <Text style={{fontSize:Font.normalText,fontFamily:  Font.AgencyBold,color:Color.iconColor,marginTop:10}}>Write to Us</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/*///////////--------------------Row 3  Start--------------------------//////////*/}  
            
            <View style={{flex:1,flexWrap:'wrap',flexDirection:'row',justifyContent:'space-evenly',width:'100%',marginTop:10}}>
              <View style={{backgroundColor:'#fff',borderRadius:20,elevation:4,width:'40%',margin:5}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>this.onShare()}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <FontAwesome name="share-alt" size={30} color={Color.iconColor} />
                    <Text style={{fontSize:Font.normalText,fontFamily:  Font.AgencyBold,color:Color.iconColor,marginTop:10}}>Share</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{padding:5,backgroundColor:'#fff',borderRadius:20,elevation:4,width:'40%',margin:5}}>
                <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>navigate('RSettings')}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <MaterialCommunityIcons name="settings" size={30} color={Color.iconColor} />
                    <Text style={{fontSize:Font.normalText,fontFamily:  Font.AgencyBold,color:Color.iconColor,marginTop:10}}>Settings</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

          </View>

        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundcolor,
  },
});