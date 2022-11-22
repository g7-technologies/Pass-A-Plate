import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Screens/Login'
import SponsorDashboard from './Screens/SponsorDashboard'
import RecipientDashboard from './Screens/RecipientDashboard'
import ForgotPasswordSponsar from  './Screens/ForgotPasswordSponsar'
import ForgotPasswordRecipient from  './Screens/ForgotPasswordRecipient'
import SignupSponsor from './Screens/SignupSponsor'
import SignupRecipient from './Screens/SignupRecipient'
import EditProfile from './Screens/SponsorScreens/EditProfile'
import ChangePassword from './Screens/SponsorScreens/ChangePassword'
import RChangePassword from './Screens/RecipientScreens/RChangePassword'
import REditProfile from './Screens/RecipientScreens/REditProfile'
export default class PassaPlate extends Component{
  constructor(props){
    super(props)
    this.state={
      isLoading:true
    }
  
  }
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'ArchitectsDaughter-regular': require('./assets/fonts/ArchitectsDaughter.ttf'),
      'FrederickatheGreat': require('./assets/fonts/FrederickatheGreat-Regular.ttf'),
      'Agency': require('./assets/fonts/Agency.ttf'),
      'AgencyBold': require('./assets/fonts/AgencyBold.ttf')
    });

    this.setState({ fontLoaded: true });
    this.setState({ isLoading: false });
  }
  // getImage = async() =>{
  //   var Logedin = await AsyncStorage.getItem('isLogedIn')
  //   await this.setState({imageuri: image})
    
  // }
  // CheckLoginStatus=()=>{
  //   const if
  //     if(){
  //       navigateto=<App/>
  //     }else if(){
  //       navigateto=<SponsorDashboard/>
  //     }else if(){
  //       navigateto=<RecipientDashboard/>
  //     }
  // }




  render(){
    

    return(
      <View style={{flex:1,marginTop:Dimensions.get('window').height<800?23:30}}>
        {this.state.isLoading?
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator/>
          </View>:
         
          <App/>
        }
      </View>
    )
  }
} 

const MainNavigator = createStackNavigator({
Login,
SponsorDashboard,
ForgotPasswordSponsar,
SignupSponsor,
RecipientDashboard,
ForgotPasswordRecipient,
SignupRecipient,
EditProfile,
ChangePassword,
RChangePassword,
REditProfile,
},{
  headerMode:'none',
});

const App = createAppContainer(MainNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



