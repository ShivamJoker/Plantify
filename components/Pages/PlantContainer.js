import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
  UIManager,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {Text, Button} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import Interactable from 'react-native-interactable';
import Snackbar from 'react-native-snackbar';
import {greenColor, lightGreen} from '../myColors';
import formatAMPM from './formatTime';

// enable flag for android layout animation
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  console.log('Android');
}

// comoponent starts here
const PlantContainer = ({
  setCurrentPlant,
  setTimePickerState,
  data,
  allPlants,
  index,
  dispatch,
}) => {
  const [containerStyle, setContainerStyle] = useState(null);
  const containerRef = useRef(null);
  const animatableRef = useRef(null);

  // we will use width in swipe
  const width = Dimensions.get('screen').width;

  const returnFrequency = () => {
    if (data.frequency === 1) {
      return 'EVERYDAY';
    } else {
      return `IN ${data.frequency} DAYS`;
    }
  };

  const showUndoMsg = event => {
    const snapPointId = event.nativeEvent.id;
    // get the id of snapping point
    // only trigger when user has swipped to left
    if (snapPointId === 'left') {
      const timeout = setTimeout(() => {
        // we will now delete the plant from server and reducer
      }, 3000);

      dispatch({
        type: 'init',
        payload: allPlants.filter(o => o.id === data.id),
      });

      Snackbar.show({
        text: 'Plant Deleted',
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'UNDO',
          textColor: 'green',
          onPress: () => {
            setContainerStyle({display: 'flex'});
            containerRef.current.snapTo({index: 1});
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
          },
        },
      });

      // hide the elemenet when swiped
      setContainerStyle({display: 'none'});
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  return (
    // we will use slide feature to delete the plant
    //
    <Interactable.View
      horizontalOnly={true}
      // cordinates where component will snappppp
      snapPoints={[
        {x: -width, id: 'left'},
        {x: 0, id: 'right'},
      ]}
      boundaries={{right: 0}}
      onSnap={showUndoMsg}
      ref={containerRef}>
      <Animatable.View
        ref={animatableRef}
        style={[styles.mainContainer, containerStyle]}
        animation="fadeInUp"
        duration={270}>
        <LinearGradient
          colors={['#0f9b0f', greenColor]}
          style={styles.plantNameContainer}>
          <View style={styles.plantNameInnerContainer}>
            <FontAwesome5
              name={'seedling'}
              color="#FFF"
              size={100}
              style={{transform: [{translateY: 13}]}}
            />
            <Text style={{color: '#fff', fontSize: 36, marginLeft: 5}}>
              {data.name}
            </Text>
            <TouchableOpacity
              onPress={() => setCurrentPlant(index)}
              // we will set the name of plant and then we will search for it

              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 40,
                height: 40,
                alignItems: 'center',
              }}>
              <FontAwesome5 name={'sliders-h'} color="#FFF" size={18} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        {/* container for data which we will show  */}
        <View style={{flexDirection: 'row', height: 200}}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoHeader}>Watering</Text>
            <FontAwesome5 name={'tint'} color="#42a5f5" size={50} />
            <View>
              <Text style={styles.infoValue}>{formatAMPM(data.time)}</Text>
            </View>
            <Button
              title={returnFrequency()}
              buttonStyle={styles.actionBtn}
              onPress={() => setTimePickerState(data)}
              icon={
                <FontAwesome5
                  name={'calendar-check'}
                  color="#fff"
                  size={18}
                  style={{paddingRight: 6}}
                />
              }
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoHeader}>Moisture</Text>
            <FontAwesome5 name={'water'} color="#8d6e63" size={50} />
            <Text style={styles.infoValue}>{data.moistureLevel} MC</Text>
            <Button
              icon={
                <FontAwesome5
                  name={'fill-drip'}
                  color="#fff"
                  size={18}
                  style={{paddingRight: 4}}
                />
              }
              title="WATER NOW"
              buttonStyle={styles.actionBtn}
            />
          </View>
        </View>
      </Animatable.View>
    </Interactable.View>
  );
};
export default PlantContainer;

var styles = StyleSheet.create({
  greenColor: {
    color: greenColor,
  },
  greenBackground: {
    backgroundColor: greenColor,
  },
  plantNameContainer: {
    height: 116,
    backgroundColor: greenColor,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  plantNameInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // padding: 2,
    transform: [{translateY: 8}],
  },
  mainContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '95%',
  },
  infoContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '50%',
    padding: 5,
  },
  infoHeader: {
    fontSize: 18,
  },
  infoValue: {
    fontSize: 26,
  },
  actionBtn: {
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: greenColor,
    paddingLeft: 18,
    paddingRight: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
