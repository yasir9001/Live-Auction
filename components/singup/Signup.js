import React, { Component } from 'react'
import {
     TouchableOpacity, TextInput, View, StyleSheet, ScrollView, Image
} from 'react-native'
import {Button, Input, Item, Form, Label, Content, Container,Text} from 'native-base'

// import loginReducer from './../../store/reducers/loginReducer'
import {connect} from 'react-redux'
import firebase from './../../firebase';
import {signup} from './../../store/actions/action'

class Signup extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props){
        super(props);
        this.path = firebase.database().ref().child('auctionapp');
        this.handleSignup = this.handleSignup.bind(this)
        this.state = {
            name:'',
            email:'',
            password:'',
            cnfrmPass:''
        }
    }

    handleSignup(){
        let {name, email, password, cnfrmPass} = this.state;
        if(password !== cnfrmPass){
            alert("Passwords mismatched")
            return
        }

        this.props.signupWithEmailAndPassword({name, email, password}, {navigation:this.props.navigation});
        
    }


  render() {
    return (
        <Container >
            <Content>
                 <ScrollView style={{flex:1}}>
                 <View style={styles.container}>
                
                <View style={styles.logo}>
                    <Image source={require('./../login/icon.png')} style={{height:200, width:200}}/>
                </View>

            <Form style={styles.form}>

            <Item floatingLabel style={styles.textInput}> 
                <Label>Name</Label>
                <TextInput
                onChangeText={(name) => this.setState({name})} 
                defaultValue={this.state.name}
                style={styles.textInput}
                // placeholder='Name' 
                />
            </Item>
            
            <Item floatingLabel>
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
                    // placeholder='Password' 
                    secureTextEntry
                />

            </Item>


            <Item floatingLabel>
                <Label>Confirm Password</Label>
                <Input
                onChangeText={(cnfrmPass) => this.setState({cnfrmPass})} 
                style={styles.textInput}
                defaultValue={this.state.cnfrmPass}
                secureTextEntry
                // placeholder='Retype password'
                />
            </Item>
           

        </Form>


             <TouchableOpacity style={[styles.textInput, {marginTop:10}]}>
                <Button onPress={this.handleSignup} full block rounded> 
                    <Text style={{color:"#fff"}}>SIGN UP</Text>
                </Button>
             </TouchableOpacity>


                </View>

                 </ScrollView>


            <View style={styles.link}>
                <Text>Already have an account! 
                    <Text  style={styles.linkText} onPress={() => this.props.navigation.navigate('login')}> &nbsp;Login</Text>
                </Text>

            </View>
            </Content>
        </Container>
        
      
    )
  }
}


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
        marginTop:10,
    },
    linkText:{
        color:'#46229b',
        fontStyle:'italic',
    }

  });

  const matchStateToProps = (state) =>{ 
      return({
        name: state.loginReducer.name,
        success: state.loginReducer.success

      })
  }
  
  const  matchDispatchToProps = (dispatch) =>{
      return{
          signupWithEmailAndPassword : (user,nav) => {
            dispatch(signup(user, nav))              
          }
      }
  }

  export default connect(matchStateToProps, matchDispatchToProps)(Signup)











//   <KeyboardAvoidingView behavior='padding' style={{flex:1}}>

//   <View style={styles.container}>
//       <View style={styles.logo}>
//           <Text style={{fontSize:50}}>Signup</Text>
//       </View>

//       <View style={styles.inputs}>

//           <TextInput
//           onChangeText={(name) => this.setState({name})} 
//           defaultValue={this.state.name}
//           style={styles.textInput}
//           placeholder='Name' 
//           />
  
  
  
//           <TextInput
//           onChangeText={(email) => this.setState({email})} 
//           defaultValue={this.state.email}
//           style={styles.textInput}
//           placeholder='Email' 
//           />


//           <TextInput
//           onChangeText={(password) => this.setState({password})} 
//           style={styles.textInput}
//           defaultValue={this.state.password}
//           placeholder='Password' />

//           <TextInput
//           onChangeText={(cnfrmPass) => this.setState({cnfrmPass})} 
//           style={styles.textInput}
//           defaultValue={this.state.cnfrmPass}
//           placeholder='Retype password' />

          
//           <Button title='Signup' onPress={this.handleSignup}/>
          
//           <View style={styles.link}>
//           <Text>Already have an account! 
//               <Text  style={styles.linkText} onPress={() => this.props.navigation.navigate('login')}>login</Text>
//           </Text>
//       </View>
//       </View>
//   </View>
// </KeyboardAvoidingView>
