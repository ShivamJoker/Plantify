import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {greenColor, lightGreen} from './myColors';


const FloatingBtn = ({addNewPlant}) => {
  return (
    <TouchableOpacity
      style={styles.actionContainer}
      onPress={() => addNewPlant()}>
      <Entypo name="plus" size={40} color={greenColor} />
    </TouchableOpacity>
  );
};

export default FloatingBtn;

const styles = StyleSheet.create({
  actionContainer: {
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
});
