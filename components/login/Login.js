import { Component } from 'react'
import React from 'react'
import {View, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import {Button, Input, Item, Form, Label, Content, Container,Text} from 'native-base'
import firebase from './../../firebase';
import {connect} from 'react-redux';
import {loginAction} from './../../store/actions/action'
class Login extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props){
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            email:'',
            password:''
        }
    }

    handleLogin(){
        let {email, password} = this.state;
        this.props.loginWithEmailAndPassword({email, password, navigation:this.props.navigation})
    }

    render() {
      
    return (

        <Container >
            <Content>
                 <ScrollView style={{flex:1}}>
                 <View style={styles.container}>
                
                <View style={styles.logo}>
                    <Image source={require('./icon.png')} style={{height:200, width:200}}/>

                </View>
            <Form style={styles.form}>

            <Item floatingLabel style={styles.textInput}> 
                <Label>Email</Label>
                <Input 
                onChangeText={(email) => this.setState({email})} 
                defaultValue={this.state.email}
                style={styles.textInput}
                // placeholder='Email' 
                />
            </Item>
            
            <Item floatingLabel>
                <Label>Password</Label>
                <Input
                onChangeText={(password) => this.setState({password})} 
                style={styles.textInput}
                defaultValue={this.state.password}
                secureTextEntry
                // placeholder='Password' 
                />

            </Item>

           

      </Form>


             <TouchableOpacity style={[styles.textInput, {marginTop:10}]}>
                <Button onPress={this.handleLogin} full block rounded> 
                    <Text style={{color:"#fff"}}>LOGIN</Text>
                </Button>
             </TouchableOpacity>


                </View>

                 </ScrollView>


            <View style={styles.link}>
                <Text>Don't have an account! 
                    <Text  style={styles.linkText} onPress={() => this.props.navigation.navigate('signup')}> &nbsp;Create One</Text>
                </Text>

            </View>
            </Content>
        </Container>
    )
  }
}


const mapStateToProps = (state) => {
    return({
      name: state.loginReducer.name  
    })
}

const mapDispatchToProps = (dispatch) =>{
    return({
            loginWithEmailAndPassword : (user) => {
            dispatch(loginAction(user))
            }
        })
    
}





export default connect(mapStateToProps, mapDispatchToProps)(Login)










const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },  
    logo:{
        flex:1,
        // backgroundColor:'skyblue',
        alignItems:'center',
        justifyContent:'center',
    },
    form:{
        flex:1,
    },
    textInput:{
        width:270,
        marginBottom:10,

    },
    link:{
        flex:1,
        alignItems:'center',
        marginTop:30,
    },
    linkText:{
        color:'#46229b',
        fontStyle:'italic',
    }

  });
