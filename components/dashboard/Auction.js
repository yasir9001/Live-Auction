import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
// import ImagePicker from 'react-native-image-picker';
import firebase from './../../firebase'
import {Header, Left, Body, Title, Right, Input, Text, Label, Container, Content, Form, Item, Button} from 'native-base';

import {ScrollView,
  View,
  TextInput,
  StyleSheet,
   } from 'react-native'
   


export default class Auction extends Component {
  static navigationOptions = {
    title: 'Add Auction'
  }
  constructor(props){
    super(props);
    this.postAuction = this.postAuction.bind(this);

    this.state = {
    }    
  }



  postAuction(){

    let { productName, endDate, startDate,minimalPrice, description } = this.state;

    if(minimalPrice === '' || minimalPrice === undefined || description === undefined || description ==='' || productName==='' || productName===undefined || endDate===undefined || startDate===undefined){
      // console.warn(Number(minimalPrice), Number(minimalPrice)+1,Number(minimalPrice)<=0)
      alert('Fill out all fileds correctly')
      return
    }
    else if(!Number(minimalPrice) || Number(minimalPrice)<=0){
      // console.warn(Number(minimalPrice))
      alert('invalid minimal price')
      return
    }
  

    let ss  = endDate.split(' ')[0]
    let dd  = endDate.split(' ')[1]
    endTime = dd;
    endDate = ss;
    let ed = new Date(`${endDate}T${endTime}`).getTime()

    ss = startDate.split(' ')[0]
    dd = startDate.split(' ')[1]
    let startTime = dd;
    startDate = ss;
    let sd = new Date(`${startDate}T${startTime}`).getTime()
    
    // console.warn(new Date(sd), new Date(new Date().getTime()+1.8e+7))
    if((new Date().getTime() +1.8e+7 ) > sd){
      alert('start time can be current or future time')
      return
    }
    else if((new Date().getTime() +1.8e+7) > ed){
      alert('end time can be future time')
      return
    }
    else if(sd >= ed ){
      alert('invalid start or end time')
      return
    }
    else  if(this.state.minimalPrice==='' || this.state.minimalPrice===' ' || this.state.minimalPrice.includes(' ') || this.state.minimalPrice.includes('.')||this.state.minimalPrice.includes('-') || this.state.minimalPrice.includes(',')){
      alert('Enter a valid Minimal price')
      return
  }

    let pushKey = firebase.database().ref().child(`auctionapp/users/${firebase.auth().currentUser.uid}/auctions`).push().getKey()
    firebase.database().ref().child(`auctionapp/users/${firebase.auth().currentUser.uid}/auctions/${pushKey}`)
    .set(
      {
        auctionInfo:{
          productName,
          minimalPrice,
          pushKey,
          startDate:sd,
          endDate:ed,
          uid:firebase.auth().currentUser.uid
        }
      }
    ).then(()=> {
      this.setState({
        productName:'',
        minimalPrice:'',
        startDate:'',
        endDate:'',
        description:''

      })
      this.props.navigation.navigate('Home')
    })
  }

  render() {
    return (
      <>
          <Header style={{backgroundColor:"#fff",}}>
          {/* <Left/> */}
          <Body>
            <Title style={{color:'#000', fontWeight:'bold', paddingLeft:5}}>Add Auction</Title>
          </Body>
          {/* <Right /> */}
        </Header>

      <ScrollView style={styles.scrollView}>

          <View style={styles.container}>
            <Form style={{flex:1, width:'80%'}}>
              <Item floatingLabel >
                <Label>Product Name</Label>
                
              <Input style={styles.input} 
              keyboardType='email-address'
              value={this.state.productName}
              onChangeText={(text)=> this.setState({productName:text})} 
              // placeholder='Product Name'
              />
                  
              </Item>

            <Item floatingLabel>
              <Label>Minimal Price</Label>
              <Input
              value={this.state.minimalPrice}

                onChangeText={(text)=> this.setState({minimalPrice:text})}
                style={styles.input}
                keyboardType='numeric'
              />
            
            </Item>

            <Item>
            <DatePicker 
              style={styles.date}
              minDate={new Date()}
              mode='datetime'
              is24Hour={false}
              showIcon={false}
              format="YYYY-MM-DD HH:mm"
              date={this.state.startDate}
              placeholder="Select auction start date and time"
              onDateChange={(startDate) => this.setState({startDate})}
              customStyles={{dateInput:{borderWidth: 0}, placeholderText:{color:'#364149', fontSize:18}}}
              />
            </Item>

            <Item>
              <DatePicker 
              style={styles.date}
              is24Hour={false}
              mode='datetime'
              format="YYYY-MM-DD HH:mm"
              showIcon={false}
              minDate={new Date()}
              date={this.state.endDate}
              placeholder="Select auction end date and time"
              onDateChange={(endDate) =>this.setState({endDate})}
              customStyles={{dateInput:{borderWidth: 0}, placeholderText:{color:'#364149', fontSize:18}}}
              />
            </Item>

            <Item floatingLabel>
              <Label>Product Description</Label>
              <Input style={[styles.input]}
              value={this.state.description}

                multiline = {true}
                numberOfLines = {1}
                onChangeText={(text) => this.setState({description:text})}
                // placeholder='Short description of product'
                />
                
            </Item>

            <View style={{marginTop:20}}>
          <Button
            block
            onPress={this.postAuction}> 
              <Text>Create Auction</Text>
            </Button>
          </View>
            </Form>

                      
          




        </View>
      </ScrollView>
      </>
    )
  }
}



const styles = StyleSheet.create({
  scrollView:{
    flex:1,
    // justifyContent:'center',
    // alignItems:'center'
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:"center",
  },
  input:{
  },
  date:{
    width:'100%',
    marginTop:35
  }
})
