import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './src/home.js';
import ProfileScreen from './src/profile.js';
import LoginScreen from './src/login.js';
import ForgotPasswordScreen from './src/forgot_password.js';
import SignupScreen from './src/signup.js';
import LogoutScreen from './src/logout.js';
import StripeScreen from './src/stripe.js';
import CompletedRemindersScreen from './src/completed_reminders.js';
import UncompletedRemindersScreen from './src/uncompleted_reminders.js';
import AuthLoadingScreen from './src/auth_loading.js';
import RemindersScreen from './src/reminders.js';
import HistoryScreen from './src/history.js';
import ImageScreen from './src/post_image.js';
import PreviewScreen from './src/preview_image.js';
import { createStackNavigator } from 'react-navigation-stack'

import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Preview: { screen: PreviewScreen },
  Upload: { screen: ImageScreen },
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen },
  UnCompleted: { screen: UncompletedRemindersScreen },
  Completed: { screen: CompletedRemindersScreen },
  Logout: { screen: LogoutScreen },
  Stripe: { screen: StripeScreen },
  ForgotPassword: { screen: ForgotPasswordScreen },
  Profile: { screen: ProfileScreen },
  History: { screen: HistoryScreen },
  Reminder: { screen: RemindersScreen },
}, {headerMode: 'none'});
const AuthStack = createStackNavigator({ Login: LoginScreen }, {headerMode: 'none'});
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
// const App = createAppContainer(AppNavigator);

// export default App;
