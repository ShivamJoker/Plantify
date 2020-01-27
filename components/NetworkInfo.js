import React, {useEffect, useState, Fragment} from 'react';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {Alert, View} from 'react-native';
import {Input, Icon, Divider} from 'react-native-elements';
import {setIP} from './LocalStorage';
const NetworkInfo = () => {
  const [localIP, setlocalIP] = useState(null);
  useEffect(() => {
    NetInfo.fetch().then(state => {
      //   Alert.alert(state.isConnected.toString());
      console.log(state);
      setlocalIP(state.details.ipAddress);
    });
  }, []);
  const checkIP = () => {
    // Alert.alert('Submit done');

    
    setIP(localIP);
  };

  return (
    <Fragment>
      <Icon
        name="wifi"
        type="material"
        color="#4caf50"
        raised={true}
        size={40}
        // reverse={true}
      />

      <Input
        value={localIP}
        placeholder="192.168.1.14"
        label="Enter your device IP"
        autoFocus={true}
        onChangeText={text => setlocalIP(text)}
        keyboardType="number-pad"
        onSubmitEditing={checkIP}
        maxLength={16}
        containerStyle={{width: 180, alignItems: 'center', marginTop: 30}}
        textAlign={'center'}
      />
    </Fragment>
  );
};

export default NetworkInfo;
