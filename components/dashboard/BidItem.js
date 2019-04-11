import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
import { connect } from 'react-redux';
import firebase from './../../firebase';
import { Button } from 'react-native-paper';
import {fetchHistory} from './../../store/actions/action'
import { ScrollView } from 'react-native-gesture-handler';

export class BidItem extends Component {
    static navigationOptions = {
        title : 'Place Bid'
    }
    constructor(props){
        super(props);
        this.showHistory = this.showHistory.bind(this)
        this.path = firebase.database().ref().child(`auctionapp/users`);
        this.uid = firebase.auth().currentUser.uid;
        this.state ={
            bidAmount:'',
            msg:'',
            showHistory: false
        }
    }

    showHistory(pushKey, uid){
        this.props.fetchHistory(pushKey, uid);
        this.setState({showHistory:!this.state.showHistory});
        // console.warn(this.props.history)
    }

    componentDidMount(){
        const {pushKey, endDate, startDate, uid} = this.props.bidItem;
        firebase.database().ref().child(`auctionapp/users/${uid}/auctions/${pushKey}/highestBid`)
        .on('value', (snap)=>{
            if(snap.val()===null){
                this.setState({currentBid:this.props.bidItem.minimalPrice})
            }
            else{
                this.setState({currentBid:snap.val().bidAmount})

            }
        })// on closed

        // console.warn(this.uid, uid)


        let now = new Date();
        now.setSeconds(0);
        now.setMilliseconds(0);

        now =  new Date(now.getTime()+1.8e+7).getTime()

        // if auction start date is future do this
        if(startDate > now){

            const newTime = new Date(startDate-1.8e+7);
            let hours = newTime.getHours().toString();
            let mins = newTime.getMinutes().toString();
            
            const newEndTime = new Date(endDate);
            let endHours = newTime.getHours().toString();
            let endMins = newTime.getMinutes().toString();
            
            // console.warn(hours, mins)
            let msg = `Auction will start on ${newTime.toDateString()} at ${hours.length<=1?'0'+hours: hours}:${mins.length<=1?'0'+mins: mins} and will end on ${newEndTime.toDateString()} ${endHours.length<=1?'0'+endHours: endHours}:${endMins.length<=1?'0'+endMins: endMins}`
            this.setState({msg:msg})
        }
        else{
            let diff = endDate-now;
            if(diff<=0){
                this.setState({msg:'Auction has ended'})
            }
            else{
                const day = parseInt(diff/8.64e+7);
                dif = diff%8.64e+7;
                const hours = parseInt(diff/3.6e+6);
                diff=diff%3.6e+6;
                const mins = parseInt(diff/60000)
                this.setState({msg:`${day==0?'':day+' days'} ${hours===0?'':hours+' hours'} ${mins===0?'':mins+' minutes'}`});
            }
        }// outer else closed
    }// function closed

    
     placeBid(k, uid){
        if(this.state.bidAmount==='' || this.state.bidAmount===' ' || this.state.bidAmount.includes(' ') || this.state.bidAmount.includes('.')||this.state.bidAmount.includes('-') || this.state.bidAmount.includes(',')){
            alert('Enter a valid amount')
            return
        }

        // console.warn(k, uid)
         firebase.database().ref().child(`auctionapp/users/${uid}/auctions/${k}/highestBid`)
        .once('value', (snap)=>{
            if(snap.val()===null){
                
                if(Number(this.state.bidAmount) <= Number(this.state.currentBid)){
                    alert('Place your bid higher than current bid')
                    return  
                }


                firebase.database().ref().child(`auctionapp/users/${firebase.auth().currentUser.uid}/info`)
                .once('value', snap =>{
                    firebase.database().ref().child(`auctionapp/users/${uid}/auctions/${k}/auctionInfo`)
                    .once('value', s=>{
                        firebase.database().ref().child(`auctionapp/users/${uid}/auctions/${k}/highestBid`).set({
                            bidderUid:firebase.auth().currentUser.uid,
                            bidAmount:this.state.bidAmount,
                            name:snap.val().name,
                            email: snap.val().email,
                            endDate:s.val().endDate,
                            startDate:s.val().startDate,
                            productName:s.val().productName,
                            posterUid:uid,
                            pushKey:k
                        })
        
                      
    
    
    
                        let pushKey = firebase.database().ref().child(`auctionapp/users/${uid}/auctions/${k}/bidders`).push().getKey();
                            firebase.database().ref().child(`auctionapp/users/${uid}/auctions/${k}/bidders/${pushKey}`).set({
                                pushKey,
                                amount:this.state.bidAmount,
                                bidderUid:firebase.auth().currentUser.uid,
                                name:snap.val().name,
                                email: snap.val().email,
                            })
                    }) // inner once closed

                        

                })// once closed                
            }
            else{
                if(Number(snap.val().bidAmount) >= Number(this.state.bidAmount)){
                    alert('Place your bid higher than current bid')
                    return
                } else{

                    firebase.database().ref().child(`auctionapp/users/${firebase.auth().currentUser.uid}/info`)
                    .once('value', snap =>{
                        firebase.database().ref().child(`auctionapp/users/${uid}/auctions/${k}/auctionInfo`)
                        .once('value', s=>{
                            firebase.database().ref().child(`auctionapp/users/${uid}/auctions/${k}/highestBid`).set({
                                bidderUid:firebase.auth().currentUser.uid,
                                bidAmount:this.state.bidAmount,
                                name:snap.val().name,
                                email: snap.val().email,
                                endDate:s.val().endDate,
                                startDate:s.val().startDate,
                                productName:s.val().productName,
                                posterUid:uid,
                                pushKey:k
                            })
            
                          
        
        
        
                            let pushKey = firebase.database().ref().child(`auctionapp/users/${uid}/auctions/${k}/bidders`).push().getKey();
                                firebase.database().ref().child(`auctionapp/users/${uid}/auctions/${k}/bidders/${pushKey}`).set({
                                    pushKey,
                                    amount:this.state.bidAmount,
                                    bidderUid:firebase.auth().currentUser.uid,
                                    name:snap.val().name,
                                    email: snap.val().email,
                                })
                        }) // inner once closed
    
                            
    
                    })// once closed      
                }// inner else closed 
            } // outer else closed
        })// on closed
        
    }


    render() {
        let {productName, pushKey, uid}  = this.props.bidItem;
    return (
      <ScrollView  style={{flex:1}}>
            
          
            <View style={styles.pInfo}>
                <Text style={{fontSize:25, color:'#000'}}>{productName}</Text>
            </View>

            <View style={styles.cBid}>
                <Text style={{ color:'#000'}}>HIGHEST BID</Text>
                <Text style={{fontSize:35, color:'#000'}}>{this.state.currentBid}$</Text>
            </View>

            { 
                this.uid !== uid ? 
            <View style={styles.placeBid}>
                <Text style={{fontSize:12, color:'#000'}}>YOUR BID</Text>                
                
                <TextInput 
                onChangeText={(text) => this.setState({bidAmount:text})}
                keyboardType = 'numeric'
                style={
                    {fontSize:25, color:'#000', borderWidth:1, borderColor:'#ccc', width:150, textAlign:'center',borderRadius:5,
                    marginBottom:20}
                }
                >{this.state.bidAmount}
                
                </TextInput>
                
                
                    <TouchableOpacity  
                    onPress={() => this.placeBid(pushKey, uid)}
                    style={
                        {justifyContent:'center', alignItems:'center',height:50, backgroundColor:'orange', borderWidth:1, borderColor:'orange',borderRadius:5, width:150, textAlign:'center'}
                    }><Text
                    style={{color:'#fff', fontSize:18 }}  
                    >Place bid</Text></TouchableOpacity>
                    
                                
            </View> : null
        }
                <Text style={{color:'green', padding:20, textAlign:'center'}}>
                        {this.state.msg}
                </Text>
         
            <View style={{flex:1}}>
                <Button style={{flex:1}} onPress={()=>this.showHistory(pushKey, uid)}>History</Button>
            </View>


                
            {this.state.showHistory ? 
            <View style={{flex:1,borderTopWidth:1, borderTopColor:'#ccc'}}>
                        
                        {this.props.history.length ? this.props.history.map(e =>{
                            return(
                                <View style={styles.history}>
                                    <Text>{e.name}</Text>
                                    <Text>{e.amount}$</Text>
                                </View>
                            )                            
                        }) : <Text>No Data</Text>}

            </View>
                        : null
                    }

      </ScrollView>
    )
  }
}




let matchStateToProps = (state) =>{
    return  ({
        bidItem: state.loginReducer.bidItem,
        history: state.loginReducer.history
    })
}

let matchDispatchToProps = (dispatch) =>{
    return {
        fetchHistory : (pushKey, uid) =>{
            dispatch(fetchHistory(pushKey, uid))
        }
    }
}




export default connect(matchStateToProps, matchDispatchToProps)(BidItem)


let styles = StyleSheet.create({
    container:{
        flex:1,
        borderWidth:1,
        // paddingRight:40,
        // paddingLeft:40,
        justifyContent:'center',
        alignItems:'center'
    },
    pInfo:{
        flex:.5,
        paddingTop:20,
        justifyContent:'center',
        alignItems:'center'
        
    },
    cBid:{
        flex:2,        
        justifyContent:'center',
        alignItems:'center'

    },
    placeBid:{
        flex:4,
        justifyContent:'flex-start',
        alignItems:'center'

    },
    history:{
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:20
    }
})





        // solve problem with date
        // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"
        //  let dateParam = new Date().toString().split(/[\s-:]/)
        //  dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString()
        //    console.warn(...dateParam)
        //  if(startDate > new Date().getTime()){
        //      alert('d')
        //  }