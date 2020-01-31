import React, {Fragment, useState, useEffect, useRef, useReducer} from 'react';
import {ScrollView, StyleSheet, Text, View, Dimensions} from 'react-native';
import PlantContainer from './PlantContainer';
import TimePicker from '../TimePicker';
import SettingsPage from '../SettingsPage';
import {plantsDetail} from '../ServerResponses';
import FloatingBtn from '../FloatingBtn';
import {Header} from 'react-native-elements';
import {greenColor} from '../myColors';
import reducer from './Reducer';

const uuid = require('uuid');

function init(initialCount) {
  return plantsDetail;
}

const windowHeight = Dimensions.get('screen').height;

const PlantsPage = () => {
  const [currentPlant, setCurrentPlant] = useState(null);
  const [timePickerState, setTimePickerState] = useState(null);
  // we will store the clicked plant object
  const [data, dispatch] = useReducer(reducer, plantsDetail, init);
  // we will store the clicked plant data in settings and time

  const scrollRef = useRef(null);

  const addNewPlant = () => {
    setTimeout(() => {
      scrollRef.current.scrollToEnd({
        animated: true,
      });
    }, 1);

    const defaultPlant = {
      name: `Plant ${data.length + 1}`,
      watering: true,
      notifications: true,
      moistureLevel: 350,
      time: 1578880448844,
      frequency: 1,
      sensorPin: 2,
      pumpPin: 16,
      id: uuid.v4(),
    };

    dispatch({type: 'init', payload: [...data, defaultPlant]});
  };

  useEffect(() => {
    console.log(data);
  }, data);

  return (
    <Fragment>
      <TimePicker
        timePickerState={timePickerState}
        setTimePickerState={setTimePickerState}
        dispatch={dispatch}
      />
      {data[currentPlant] && (
        <SettingsPage
          data={data[currentPlant]}
          allPlant={data}
          dispatch={dispatch}
          setCurrentPlant={setCurrentPlant}
          currentPlant={currentPlant}
          setTimePickerState={setTimePickerState}
        />
      )}

      <ScrollView style={styles.container} ref={scrollRef}>
        {data.map((plant, index) => {
          return (
            <PlantContainer
              data={plant}
              allPlants={data}
              setCurrentPlant={setCurrentPlant}
              setTimePickerState={setTimePickerState}
              key={index}
              dispatch={dispatch}
              index={index}
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
    // height: windowHeight - 88,
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
