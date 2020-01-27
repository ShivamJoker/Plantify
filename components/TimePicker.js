import React, {Fragment, useState, useEffect} from 'react';
import {StyleSheet, View, ToastAndroid} from 'react-native';
import {Overlay, Input, Text, Button} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import RNDateTimePicker from '@react-native-community/datetimepicker';

import {greenColor} from './myColors';
import SettingsPage from './SettingsPage';

const TimePicker = ({timePickerState, setTimePickerState}) => {
  const [dayPickerVisibility, setDayPickerVisibility] = useState(false);
  const [timePickerVisibility, setTimePickerVisibility] = useState(false);
  const [time, setTime] = useState(new Date());

  const [dayFrequency, setDayFrequency] = useState(1);

  const setDate = (event, date) => {
    console.log('date event occured' + date);
    setTimePickerVisibility(false);

    if (date === undefined) {
      // we will hide the date container on cancel
      setTimePickerState(null);
      //we are also going to set the picker state to null if closed
      // setting date as undefined gives error
    } else {
      setTime(date);
      // we will show the day selector
      setDayPickerVisibility(true);
    }
  };

  useEffect(() => {
    if (timePickerState) {
      setTime(timePickerState.time);
      setTimePickerVisibility(true);
      setDayFrequency(timePickerState.frequency)
    }
  }, [timePickerState]);

  const changeDayFrequency = operation => {
    // we will pass +1 and -1
    //if day frequency is greater than 0 then only we will push the state
    if (dayFrequency + operation > 0) {
      setDayFrequency(dayFrequency + operation);
    } else {
      ToastAndroid.showWithGravity(
        "You can't set frequency below 1",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  const saveDayFrequency = bool => {
    // if the value is true then we have to save it
    setTimePickerState(null);
    setDayPickerVisibility(false);
  };
  return (
    <Fragment>
      {timePickerVisibility && (
        <RNDateTimePicker mode="time" value={time} onChange={setDate} />
      )}
      <Overlay
        isVisible={dayPickerVisibility}
        onBackdropPress={() => setDayPickerVisibility(false)}
        height={350}>
        <View style={styles.container}>
          <Text style={{fontSize: 26}}>Day Frequency</Text>
          <View style={{alignItems: 'center'}}>
            <FontAwesome5
              name={'caret-up'}
              color={greenColor}
              size={80}
              style={{transform: [{translateY: 22}]}}
              onPress={() => changeDayFrequency(1)}
            />
            <Text style={styles.counterStyle}>{dayFrequency}</Text>
            <FontAwesome5
              name={'caret-down'}
              color={greenColor}
              size={80}
              style={{transform: [{translateY: -22}]}}
              onPress={() => changeDayFrequency(-1)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
            }}>
            <Button
              title="CANCEL"
              type="clear"
              titleStyle={styles.btnStyle}
              onPress={() => saveDayFrequency(false)}
            />
            <Button
              title="SET"
              type="clear"
              titleStyle={styles.btnStyle}
              onPress={() => saveDayFrequency(true)}
            />
          </View>
        </View>
      </Overlay>
    </Fragment>
  );
};
export default TimePicker;

var styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
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
