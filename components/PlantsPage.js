import React, {Fragment, useState, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import PlantContainer from './PlantContainer';
import TimePicker from './TimePicker';
import SettingsPage from './SettingsPage';
import {plantsDetail} from './ServerResponses';
import FloatingBtn from './FloatingBtn';
import { Header } from 'react-native-elements';
import { greenColor } from './myColors';


const defaultPlant = {
  name: 'Cool Plant',
  watering: true,
  notifications: false,
  moistureLevel: 350,
  time: 1578880448844,
  frequency: 1,
  sensorPin: 2,
  pumpPin: 16,
};

const PlantsPage = () => {
  const [settingsState, setSettingsState] = useState(null);
  const [timePickerState, setTimePickerState] = useState(null);
  const [allPlants, setAllPlants] = useState(plantsDetail);
  // we will store the clicked plant data in settings and time

  const scrollRef = useRef(null);

  const addNewPlant = () => {
    setTimeout(() => {
      scrollRef.current.scrollToEnd({
        animated: true,
      });
    }, 1);

    setAllPlants(prv => {
      return [...prv, defaultPlant];
    });
  };

  return (
    <Fragment>
      <TimePicker
        timePickerState={timePickerState}
        setTimePickerState={setTimePickerState}
      />
      <SettingsPage
        settingsState={settingsState}
        setSettingsState={setSettingsState}
        setTimePickerState={setTimePickerState}
      />
      <Header
        leftComponent={{icon: 'menu', color: '#fff'}}
        centerComponent={{text: 'Plants Dashboard', style: {color: '#fff', fontSize: 22,}}}
        backgroundColor={greenColor}
        barStyle="light-content"
        statusBarProps={{translucent: true}}
      />
      <ScrollView style={styles.container} ref={scrollRef}>
        {allPlants.map((data, index) => {
          return (
            <PlantContainer
              data={data}
              setSettingsState={setSettingsState}
              setTimePickerState={setTimePickerState}
              key={index}
            />
          );
        })}

        <View style={{height: 60}}></View>
      </ScrollView>
      <FloatingBtn addNewPlant={addNewPlant} />
    </Fragment>
  );
};

export default PlantsPage;

const styles = StyleSheet.create({
  container: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',

    width: '100%',
    height: '100%',
  },
  headerStyle: {
    paddingTop: 0,
    height: 56,
    backgroundColor: '#3FB57A',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
