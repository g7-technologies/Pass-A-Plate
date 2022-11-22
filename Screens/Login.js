import React,{Component} from "react";
import {createAppContainer} from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import SponsorLogin from './SponsorLogin'
import RecipientLogin from './RecipientLogin'
import Font from '../constants/Font'
import Color from '../constants/Color'



const Login = createMaterialTopTabNavigator(
  {
    RecipientLogin,
    SponsorLogin,
  },
  {
    defaultNavigationOptions:{
      tabBarOptions: {
        activeTintColor: Color.textcolor,
      inactiveTintColor: 'gray',
        indicatorStyle:{
          backgroundColor:Color.bordercolor
        },
        style: {
          backgroundColor: '#fff',
          
          
        },
      },
      pagerComponent: ViewPagerAdapter,
    },
    contentOptions:{
    fontWeight:'normal'
    }
    
   
  }
);
export default createAppContainer(Login);

// const MainNavigator = createStackNavigator(
//   {
    
   
//   },
//   {
//     headerMode:'none'
//   }
// );

//const App = createAppContainer(MainNavigator);
