import React, {useState, useEffect} from 'react';
import {Button} from 'react-native-elements';
import './components/LocalStorage';
import PlantsPage from './components/PlantsPage';
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
import { greenColor } from './components/myColors';

const App = () => {
  const [searchState, setSearchState] = useState('');

  useEffect(() => {
      SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <PlantsPage/>
      {/* <CatLooking /> */}

      {/* <Notifications/> */}
      {/* <NetworkInfo /> */}
      <StatusBar backgroundColor={"#00600f"} barStyle="light-content" />
      {/* <FindLocalDevice setSearchState={setSearchState} />
      <Spinner color="#fff" type="Bounce" size={80} /> */}
      {/* <Text style={styles.statusIndicator}>{searchState}</Text> */}
    </View>
  );
};
export default App;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
