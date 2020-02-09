import React, {useRef} from 'react';
import {View, Text, FlatList, Dimensions} from 'react-native';

import {ListItem} from 'react-native-elements';
import {greenColor, blueColor, redColor, defaultGreen} from '../myColors';
import moment from 'moment';
import {notifications} from './Reducer';
import Interactable from 'react-native-interactable';

const width = Dimensions.get('screen').width;

const list = [
  {
    title: 'Money Plant',
    body: '💧55﹪ 🌡36℃  🌱450🅪',
    additionalData: {time: 1776086600, status: 'init'},
    //we will have 3 statuss -> init, fail, success
  },
  {
    title: 'Sunflower',
    body: '💧 55﹪🌡36℃  🌱450🅪',
    additionalData: {time: 1533081200, status: 'fail'},
  },
  {
    title: 'Red Rose',
    body: '💧 55﹪🌡36℃  🌱450🅪',
    additionalData: {time: 1999081200, status: 'success'},
  },
  {
    title: 'Red Rose',
    body: '💧 55﹪🌡36℃  🌱450🅪',
    additionalData: {time: 1999081200, status: 'success'},
  },
  {
    title: 'Money Plant',
    body: '💧 55﹪🌡36℃  🌱450🅪',
    additionalData: {time: 1576086600, status: 'init'},
    //we will have 3 statuss -> init, fail, success
  },
];

//we will pass the status and return a icon string
const getIcon = status => {
  switch (status.additionalData.status) {
    case 'init':
      return 'shower';
    case 'fail':
      return 'remove';
    case 'success':
      return 'check';
    default:
      return 'cloud';
  }
};
//we will pass the status and return a icon string
const getColor = status => {
  switch (status.additionalData.status) {
    case 'init':
      return blueColor;
    case 'fail':
      return redColor;
    case 'success':
      return defaultGreen;
    default:
      return 'black';
  }
};

//we will pass the status and return the full meaning of status
const getStatus = status => {
  switch (status.additionalData.status) {
    case 'init':
      return 'Started Watering!';
    case 'fail':
      return 'Something Went Wrong!';
    case 'success':
      return 'Watering Completed';
    default:
      return 'Unknown Error';
  }
};

//format date and time using moment js
const formatTime = data => {
  return moment(data.additionalData.time).format('ddd D MMM h:mm A');
};

//component starts here
const keyExtractor = (item, index) => index.toString();

const renderNotification = ({item}) => (
  <Interactable.View
    horizontalOnly={true}
    // cordinates where component will snappppp
    snapPoints={[
      {x: 0, id: 'right'},
      {x: width, id: 'right'},
    ]}
    boundaries={{left: 0}}
    // onSnap={showUndoMsg}
    // ref={containerRef}
  >
    <ListItem
      leftAvatar={{
        icon: {
          name: getIcon(item),
          type: 'font-awesome',
          color: '#fff',
        },
        overlayContainerStyle: {backgroundColor: getColor(item)},
      }}
      title={item.title}
      titleStyle={{fontWeight: '700'}}
      subtitle={`${getStatus(item)}\n${item.body}`}
      subtitleStyle={{color: 'black'}}
      badge={{
        value: formatTime(item),
        badgeStyle: {padding: 1, backgroundColor: '#fff'},
        textStyle: {color: 'black'},
        containerStyle: {marginTop: -40},
      }}
      bottomDivider
    />
  </Interactable.View>
);
const AlertsPage = () => {
  const containerRef = useRef(null);

  return (
    <View>
      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderNotification}
      />
    </View>
  );
};

export default AlertsPage;
