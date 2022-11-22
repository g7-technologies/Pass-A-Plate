import React from 'react';
import {Image,View}from 'react-native'
import {Header,Body,Left,Right,Container,Button,Icon,Title, Drawer} from 'native-base'
import {createAppContainer,} from 'react-navigation';
import { createDrawerNavigator,DrawerItems  } from 'react-navigation-drawer';
import Dashboard from './SponsorScreens/Dashboard'
import MealStatus from './SponsorScreens/MealStatus'
import SponsorMeal from './SponsorScreens/SponsorMeal'
import History from './SponsorScreens/History'
import WritetoUs from './SponsorScreens/WritetoUs'
import Settings from './SponsorScreens/Settings'

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
   Dashboard,MealStatus,SponsorMeal,History,WritetoUs,Settings
},{
   contentComponent:contentComponentOption
   });  
  const App = createAppContainer(sidebar);
  
  export default App;
  
