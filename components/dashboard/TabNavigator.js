import React from 'react'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import Home from './Home';
import Auction from './Auction'
import Bid from './Bid';
import BidItem from './BidItem'
import BidContainerRoutes, {HomeContainerRoutes} from './BidContainerRoutes'
import Wins from './Wins';
import Ionicons from 'react-native-vector-icons/Ionicons';

const  TabNavigator = createBottomTabNavigator(
    {
    Auction : Auction,
    Home: HomeContainerRoutes,
    Bid:BidContainerRoutes,
    Wins : Wins,
}, 

// {
//     initialRouteName:'Home'
// },

{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : ''}`;
        //   IconComponent = HomeIconWithBadge; 
        } else if (routeName === 'Wins') {
          iconName = `md-done-all`;
        } else if(routeName ==='Auction'){
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;
        } else if(routeName === 'Bid'){
          iconName = `ios-checkmark-circle${focused ? '' : '-outline'}`;
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      initialRouteName:'Home',
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
)

export default createAppContainer(TabNavigator)


export const StackNavigator = createAppContainer(
    createStackNavigator({
        Bid,
        BidItem,
    })
)


export const StackNavigator2 = createAppContainer(
    createStackNavigator({
        Home,
        BidItem,
    })
)

