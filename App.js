import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './components/login/Login'
import Signup from './components/singup/Signup'
import Dashboard from './components/dashboard/Dashboard';
import BidItem from './components/dashboard/BidItem'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firebase from './firebase';
import SplashScreen from './components/dashboard/SplashScreen'


const AppRoutes = createStackNavigator({
  login: { screen: Login },
  signup: { screen: Signup },
  dashboard: { screen: Dashboard },
  bidItem: { screen: BidItem },
  splashScreen : {screen : SplashScreen}
},{
  initialRouteName : 'splashScreen'
})

const AppContainer = createAppContainer(AppRoutes)


export default class App extends Component {
  constructor() {
    super()
    
  }
  render() {
    return (
      <AppContainer />

    )
  }
}




// let uid = firebase.auth().currentUser
// alert(uid)
// firebase.auth().signOut()

// function createNavigator(){
//   let uid = firebase.auth().currentUser
//   if(uid !== null){
//     return createStackNavigator({
//       dashboard : {screen : Dashboard},
//       login: {screen: Login},
//       signup: {screen: Signup},
//       bidItem : {screen : BidItem}
//     },
//     {
//       initialRouteName:'dashboard'
//     }
//     );
//   }
  // if closed

//   else{
//     return createStackNavigator({
//       login: {screen: Login},
//       signup: {screen: Signup},
//       dashboard : {screen : Dashboard},
//       bidItem : {screen : BidItem}
//     },
//     {
//       initialRouteName:'login'
//     }
//     );
//   }
// }

// let Navigation = createStackNavigator({
//   login: {screen: Login},
//   signup: {screen: Signup},
//   dashboard : {screen : Dashboard},
//   bidItem : {screen : BidItem}
// },
// {
//   initialRouteName: uid !== null ? 'dashboard' : 'login'
// }
// );
// let nav = createNavigator()


// export default createAppContainer(nav);



// async  function createNavigator(){
//   alert(uid)

//   try{
//     let data = await AsyncStorage.getItem('user');
//     if(data !== null){

//       return createStackNavigator({
//               dashboard : {screen : Dashboard},
//               login: {screen: Login},
//               signup: {screen: Signup},
//               bidItem : {screen : BidItem}
//             },
//             {
//               initialRouteName:'dashboard'
//             }
//             );
//     }// if closed


//     else{
//       alert(uid)

//       return createStackNavigator({
//               login: {screen: Login},
//               signup: {screen: Signup},
//               dashboard : {screen : Dashboard},
//               bidItem : {screen : BidItem}
//             },
//             {
//               initialRouteName:'login'
//             }
//             );

//     } // else closed
//   } // try 
//   catch(error){
//     alert(error)    
//   }

// }