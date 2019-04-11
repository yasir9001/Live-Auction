import React, { Component } from 'react'
import { Text, View, Image, ActivityIndicator, StyleSheet, ImageBackground} from 'react-native'
import firebase from './../../firebase';
import { Container, Header, Content, Spinner, H1} from 'native-base';
export class SplashScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) =>{
            if(user){
                this.props.navigation.navigate('dashboard')
            }
            else{
                this.props.navigation.navigate('login')
            }
        })
    }

    render() {
        return (
            <View style={{flex:1,justifyContent:'center', alignItems:'center', backgroundColor:'#fff'}}>
                    <Image source={require('./splashlogo.png')} style={{width:200, height:200}}/>
                    {/* <H1 style={{color:'#fff'}}>Live Auctions</H1> */}
                    {/* <Spinner /> */}
                    {/* <ActivityIndicator style={{ position: "relative", zIndex: 9999, display: "flex" }} color='#000' /> */}
                    {/* <ActivityIndicator color='green' /> */}
                    {/* <Spinner color='blue' /> */}

                </View>
                
        )
    }
}

export default SplashScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#000"
    },
    // horizontal: {
    //   flexDirection: 'row',
    //   justifyContent: 'space-around',
    //   padding: 10
    // }
})