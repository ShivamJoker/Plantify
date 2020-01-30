import React from 'react';
import {View, Text} from 'react-native';
import PlantsPage from './Pages/PlantsPage';
import PrivacyPage from './Pages/PrivacyPage';
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
      <Icon
        name="menu"
        size={24}
        color="#fff"
        iconStyle={{paddingLeft: 15}}
        onPress={() => navigation.openDrawer()}
      />
    ),
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
      <Drawer.Screen
        name="Dashboard"
        component={({navigation}) =>
          stackNav(PlantsPage, 'Plants Dashboard', navigation)
        }
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={({navigation}) =>
          stackNav(PrivacyPage, 'Privacy & Policy', navigation)
        }
      />
    </Drawer.Navigator>
  );
};

export default RouteHandler;
