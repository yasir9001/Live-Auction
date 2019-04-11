import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import firebase from './../../firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Header, Content, Card, CardItem, Body, Text,Title } from 'native-base';


export class Wins extends Component {
    constructor(props){
        super(props);
        this.path = firebase.database().ref().child(`auctionapp/users`);
        this.uid = firebase.auth().currentUser.uid;

        this.state ={
            winData:[]
        }
    }


    componentDidMount(){
        this.path.child(`winners`)
        .on('value', snap =>{
            let data = [];
            for(let key in snap.val()){
                if(snap.val()[key].bidderUid === this.uid){
                    data.unshift(snap.val()[key])
                }
                // console.warn(snap.val()[key].bidderUid, this.uid) 
            }
            // console.warn(data)
            this.setState({winData:data})
        })
    }

  render() {
    return (
        <Container>
             <Header style={{backgroundColor:"#fff"}}>
          {/* <Left/> */}
          <Body>
            <Title style={{color:'#000', fontWeight:'bold', paddingLeft:5}}>Auctions Won</Title>
          </Body>
          {/* <Right /> */}
        </Header>
        
      <ScrollView style={{flex:1}}>
       <View style={styles.container}>
      

       {
           this.state.winData.length !== 0 ? this.state.winData.map((e,i) =>{
               let time = getTime(e);
               return (
                <Card style={styles.child} key={i}>
                    <CardItem header>
                        <Text style={{color:"green", fontSize:20}}>Conratulations {e.name}! </Text>
                    </CardItem>

                    <CardItem>
                        <Body>
                            <Text style={{color:'#000', textAlign:'center', fontSize:18}}>You won <Text style={{fontWeight:'bold'}}>{e.productName} </Text> for &nbsp; 
                             <Text style={{color:'red', fontSize:19}}>{e.bidAmount}$</Text> in an auction  {time}</Text>
                        </Body>
                    </CardItem>
                </Card>
               )
           }) : <Text style={{flex:1, fontSize:15, textAlign:'center'}}>You haven't win any auction</Text>
        }
        </View>
      </ScrollView>
      </Container>
    )
  }
}

export default Wins

let styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-evenly",
        alignItems:'center',
        paddingTop:20
    },
    child:{
        flex:1,
        borderWidth:1,
        width:300,
        height:200,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        margin:20
    }
})

 function getTime(item){
    const {pushKey, endDate, startDate} = item;

    let now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);

    now =  new Date(now.getTime()+1.8e+7).getTime()

    // if auction start date is future do this

        const newTime = new Date(startDate-1.8e+7);
        let hours = newTime.getHours().toString();
        let mins = newTime.getMinutes().toString();
        
        // const newEndTime = new Date(endDate);
        // let endHours = newTime.getHours().toString();
        // let endMins = newTime.getMinutes().toString();
        
        let msg = ` held on ${newTime.toDateString()} at ${hours.length<=1?'0'+hours: hours}:${mins.length<=1?'0'+mins: mins} `
        return msg
    }
    // and will end on ${newEndTime.toDateString()} ${endHours.length<=1?'0'+endHours: endHours}:${endMins.length<=1?'0'+endMins: endMins}