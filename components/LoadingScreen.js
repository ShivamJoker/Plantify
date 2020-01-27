
import React, {useState} from 'react';
import {Button} from 'react-native-elements';
import FindLocalDevice from './FindLocalDevice';
import NetworkInfo from './NetworkInfo'

const Spinner = require('react-native-spinkit');

import {
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  View,
} from 'react-native';
const App = () => {
  const [searchState, setSearchState] = useState('');
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4caf50" barStyle="light-content" />
      <FindLocalDevice setSearchState={setSearchState} />
      <Spinner color="#fff" type="Bounce" size={80} />
      <Text style={styles.statusIndicator}>{searchState}</Text>
    </View>
  );
};
export default App;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4caf50',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 40,
    color: '#fff',
    fontSize: 20,
  },
});
