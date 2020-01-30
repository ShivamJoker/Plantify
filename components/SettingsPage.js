import React, {useState, useEffect, useReducer, useRef} from 'react';
import {View, StyleSheet, Switch, TextInput} from 'react-native';
import {
  Overlay,
  Input,
  Text,
  Button,
  Slider,
  Divider,
} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// import variables from the reducer page
import {
  watering,
  notifications,
  name,
  moistureLevel,
  sensorPin,
  pumpPin,
} from './Pages/Reducer';

import {greenColor, lightGreen, lightestGreen} from './myColors';

// component starts here
const SettingsPage = ({
  data,
  dispatch,
  setCurrentPlant,
  currentPlant,
  setTimePickerState,
}) => {
  const [settingsVisibility, setSettingsVisibility] = useState(false);

  const prvState = useRef(null);

  const saveSettings = bool => {
    setSettingsVisibility(false);
    setCurrentPlant(null);
  };

  const checkNum = num => {
    const pattern = /[^0-9]/g;
    if (!pattern.test(num)) {
      // if its a number then we will change the state
      return num;
    } else {
      return num.replace(/[^0-9]/g, '');
    }
  };

  useEffect(() => {
    if (currentPlant !== null) {
      // we will put all the data in our state which we will get from server
      setSettingsVisibility(true);
      prvState.current = data
    }
  }, [currentPlant]);

  // dispatcher function to change the values of state using the reduc method
  const dispatcher = (actionType, value) => {
    dispatch({
      type: actionType,
      payload: {id: data.id, [actionType]: value},
    });
  };

  const revertToPrvState = () => {
 
    dispatch({type: 'init', payload: {}});
  };

  return (
    <Overlay
      isVisible={settingsVisibility}
      onBackdropPress={() => revertToPrvState()}
      height={400}
      overlayStyle={{padding: 0, paddingTop: 12}}>
      <View style={styles.container}>
        <Text style={{fontSize: 26}}>Settings</Text>
        <View style={{alignItems: 'stretch', width: '100%'}}>
          <View style={styles.spacedRow}>
            <Text style={styles.infoText}>Watering</Text>
            <Switch
              value={data.watering}
              thumbColor={greenColor}
              trackColor={{true: lightGreen}}
              onValueChange={val => dispatcher(watering, val)}
            />
          </View>
          <View style={styles.spacedRow}>
            <Text style={styles.infoText}>Notifications</Text>
            <Switch
              value={data.notifications}
              onValueChange={val => dispatcher(notifications, val)}
              thumbColor={greenColor}
              trackColor={{true: lightGreen}}
            />
          </View>
          <Divider
            style={{
              width: '100%',
              marginBottom: 20,
              marginTop: 5,
              height: 0.6,
            }}
          />
          <View style={styles.spacedRow}>
            <Text style={styles.infoText}>Name</Text>
            <TextInput
              style={styles.inputField}
              value={data.name}
              onChangeText={text => dispatcher(name, text)}
              maxLength={15}
            />
          </View>

          <View style={styles.spacedRow}>
            <Text style={styles.infoText}>Frequency</Text>
            <Text
              onPress={() => setTimePickerState(settingsState)}
              style={StyleSheet.compose({color: greenColor}, styles.infoText)}>
              Edit
            </Text>
          </View>
          <View style={styles.spacedRow}>
            <Text style={styles.infoText}>Sensor Pin</Text>
            <TextInput
              style={styles.inputField}
              value={data.sensorPin.toString()}
              onChangeText={text => dispatcher(sensorPin, checkNum(text))}
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
          <View style={styles.spacedRow}>
            <Text style={styles.infoText}>Pump Pin</Text>
            <TextInput
              style={styles.inputField}
              value={data.pumpPin.toString()}
              onChangeText={text => dispatcher(pumpPin, checkNum(text))}
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>

          <View style={styles.spacedRow}>
            <Text style={styles.infoText}>Stop Pump @</Text>
            <View style={{flexDirection: 'row', opacity: 0.8}}>
              <TextInput
                style={styles.inputField}
                value={data.moistureLevel.toString()}
                onChangeText={text => dispatcher(moistureLevel, checkNum(text))}
                keyboardType="numeric"
                maxLength={3}
              />
              {/* <Text style={styles.mcStyle}>MC</Text> */}
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
            padding: 5,
            position: 'relative',
          }}>
          <Button
            title="CANCEL"
            type="clear"
            titleStyle={styles.btnStyle}
            onPress={() => saveSettings(false)}
          />
          <Button
            title="SET"
            type="clear"
            titleStyle={styles.btnStyle}
            onPress={() => saveSettings(true)}
          />
        </View>
      </View>
    </Overlay>
  );
};

export default SettingsPage;

var styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  spacedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    height: 25,
  },
  inputField: {
    fontSize: 18,
    margin: 0,
    padding: 0,
    color: greenColor,
  },
  infoText: {
    fontSize: 18,
  },

  mcStyle: {
    fontSize: 10,
    transform: [{translateY: -2}],
  },
  counterStyle: {
    padding: 0,
    margin: 0,
    fontSize: 38,
    fontWeight: '500',
  },
  btnStyle: {
    color: greenColor,
  },
});
