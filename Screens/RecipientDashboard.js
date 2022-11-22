import React from 'react';
import {  View,Image } from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator,  DrawerItems} from 'react-navigation-drawer';
import Dashboard from './RecipientScreens/Dashboard'
import RMealStatus from './RecipientScreens/RMealStatus'
import RSponsorMeal from './RecipientScreens/RSponsorMeal'
import RHistory from './RecipientScreens/RHistory'
import RWritetoUs from './RecipientScreens/RWritetoUs'
import RSettings from './RecipientScreens/RSettings'
const contentComponentOption=(props)=>(
   <View style={{flex:1}}>
      <View style={{justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#dddddd'}}>
         <Image source={require('../assets/logo.jpg' )} style={{width:100,height:100}}/>
      </View>
      <View style={{borderBottomWidth:1,borderBottomColor:'#dddddd'}}>
         <DrawerItems  {...props} />
      </View>

   </View>

);

const sidebar = createDrawerNavigator({   
   Dashboard,RMealStatus,RSponsorMeal,RHistory,RWritetoUs,RSettings,
},{
   contentComponent:contentComponentOption
   });  
  const App = createAppContainer(sidebar);
  
  export default App;
  
