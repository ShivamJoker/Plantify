import React, {useState, useEffect} from 'react';
import {Button, Header} from 'react-native-elements';
import './components/LocalStorage';
import 'react-native-gesture-handler';
import PlantsPage from './components/Pages/PlantsPage';
import Notifications from './components/Notifications';
const Spinner = require('react-native-spinkit');

import {
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  View,
  AsyncStorage,
} from 'react-native';
import NotifPanel from './components/NotifiPanel';
import CatLooking from './components/CatLooking';
import SplashScreen from 'react-native-splash-screen';
import {greenColor} from './components/myColors';
import RouteHandler from './components/RouteHandler';

import {DrawerActions} from '@react-navigation/routers';
import {NavigationNativeContainer} from '@react-navigation/native';

import {navigationRef} from './components/RootNavigation';

const App = () => {
  const [searchState, setSearchState] = useState('');

  useEffect(() => {
    SplashScreen.hide();
  }, []);


  return (
    <NavigationNativeContainer ref={navigationRef}>
      {/* <Header
        leftComponent={{icon: 'menu', color: '#fff'}}
        centerComponent={{
          text: 'Plants Dashboard',
          style: {color: '#fff', fontSize: 22},
        }}
        backgroundColor={greenColor}
        barStyle="light-content"
        statusBarProps={{translucent: true}}
      /> */}
      <RouteHandler />
      <StatusBar backgroundColor={'#00600f'} barStyle="light-content" />
      {/* <Spinner color="#fff" type="Bounce" size={80} /> */}
    </NavigationNativeContainer>
  );
};
export default App;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#4caf50',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 40,
    color: '#fff',
    fontSize: 20,
  },
});
