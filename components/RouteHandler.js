import React from 'react';
import {View, Text} from 'react-native';
import PlantsPage from './Pages/PlantsPage';
import PrivacyPage from './Pages/PrivacyPage';
import AlertsPage from './Pages/AlertsPage';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';

import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {greenColor, lightestGreen} from './myColors';

import {Icon} from 'react-native-elements';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{alignItems: 'flex-start', margin: 20}}>
        <FontAwesome5
          name={'seedling'}
          color="#fff"
          size={35}
          style={{
            backgroundColor: greenColor,
            borderRadius: 100,
            padding: 8,
            width: 50,
            height: 50,
          }}
        />
        {/* <Text>Plantifi</Text> */}
      </View>

      <DrawerItemList
        activeBackgroundColor="#c8e6c9"
        labelStyle={{color: greenColor}}
        {...props}
      />
    </DrawerContentScrollView>
  );
}

const stackNav = (component, title, navigation) => {
  const customHeader = {
    headerTitleAlign: 'center',
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon
          name="menu"
          size={24}
          color="#fff"
          iconStyle={{paddingLeft: 15}}
        />
      </TouchableOpacity>
    ),
    headerRight: () => {
      //we will only show the clear notification icon when user is on alerts page
      return title === 'Watering Alerts' ? (
        <Icon
          name="clear-all"
          size={24}
          color="#fff"
          iconStyle={{paddingRight: 15}}
          onPress={() => navigation.openDrawer()}
        />
      ) : null;
    },

    headerStyle: {
      backgroundColor: greenColor,
    },

    headerTintColor: '#fff',
    headerTitleStyle: {},
  };

  return (
    <Stack.Navigator>
      <Stack.Screen component={component} name={title} options={customHeader} />
    </Stack.Navigator>
  );
};

const RouteHandler = () => {
  return (
    <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)}>
      <Drawer.Screen name="Dashboard">
        {({navigation}) => stackNav(PlantsPage, 'Plants Dashboard', navigation)}
      </Drawer.Screen>
      <Drawer.Screen name="Privacy Policy">
        {({navigation}) =>
          stackNav(PrivacyPage, 'Privacy & Policy', navigation)
        }
      </Drawer.Screen>
      <Drawer.Screen name="Notifications">
        {({navigation}) => stackNav(AlertsPage, 'Watering Alerts', navigation)}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default RouteHandler;
