import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput} from 'react-native'
import { connect } from 'react-redux';
import firebase from './../../firebase';
import { fetchBids, fetchBidItem, setBidItem } from './../../store/actions/action'



export class Bid extends Component {
    
    static navigationOptions = {
        title : 'Auctions'
    }

    constructor(props){
        super(props);
        this.searchItem = this.searchItem.bind(this);
        this.path = firebase.database().ref().child(`auctionapp/users`);
        this.uid = firebase.auth().currentUser.uid;
        this.state ={
            highestBid:[],
            msg:'',
            searchKey:'',
            searched:[]
        }
        
    }
    searchItem(text){
        this.setState({searchKey:text})
        let arr = this.props.bids.filter((e)=> e.productName.toLowerCase().includes(text.toLowerCase()))
        this.setState({searched:arr})

        if(this.state.searched.length ===0 ){
            this.setState({flag:true})
        }
        else{
            this.setState({flag:false})
        }
    }


    componentDidMount(){
        this.props.fetchBids();
    }

    
    showItem(pushKey){
        this.props.setBidItem(this.props.bids.filter((e)=>e.pushKey === pushKey)[0])
        this.props.navigation.navigate('BidItem')
    }

  render() {
      
    return (
      <ScrollView style={{flex:1,}}>
            <View style={{flex:1, padding:10, borderBottomColor:'#ccc', borderBottomWidth:1 }}>
                <TextInput  style={{borderWidth:1, borderColor:'#ccc',borderRadius:5}} placeholder='search' defaultValue={this.state.searchKey} onChangeText={(text) => this.searchItem(text)} />
            </View>
    <View style={styles.container}>
        {
            this.state.searchKey ==='' ? this.props.bids.map((e, i)=>{
                let time = getTime(e);
                return (
                    <TouchableOpacity style={styles.bid}  key={i} onPress={()=>this.showItem(e.pushKey)}>
                        <View style={styles.info1} >
                            <Text style={{fontSize:20, color:'#000'}}>{e.productName}</Text>
                        </View>
        
                        <View style={styles.info2}>
                            <Text style={{color:'green'}}>{time}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }) : this.state.searched.map((e,i) => {
                    let time = getTime(e);
                    return (
                        <TouchableOpacity style={styles.bid}  key={i} onPress={()=>this.showItem(e.pushKey)}>
                            <View style={styles.info1} >
                                <Text style={{fontSize:20, color:'#000'}}>{e.productName}</Text>
                            </View>
            
                            <View style={styles.info2}>
                                <Text style={{color:'green'}}>{time}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
        }

        {
            this.state.flag && this.state.searchKey ? <Text style={{textAlign:'center'}}>No items matched</Text>
             : (this.props.bids.length === 0 ? <Text style={{textAlign:'center'}} >No Data</Text>: null)     
        }
      </View>
      </ScrollView>
    )
  }
}


function mapStateToProps(state){
    return ({
        bids: state.loginReducer.bids,
        bidItem : state.loginReducer.bidItem
    })
}

function mapDispatchToProps(dispatch){
    return{
        fetchBids : () =>{
            dispatch(fetchBids())
        },
        fetchBidItem : (pushKey) =>{
            dispatch(fetchBidItem(pushKey))
        },
        setBidItem : (item) =>{
            dispatch(setBidItem(item));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Bid);



const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    bid:{
        flex:1,
        // flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        borderBottomWidth:1,
        borderColor:'#ccc'
    },
    info1:{
        fontSize:60
    },
    info2:{
    }
})

export function getTime(item){
    const {pushKey, endDate, startDate} = item;

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
        
        let msg = `Auction will start on ${newTime.toDateString()} at ${hours.length<=1?'0'+hours: hours}:${mins.length<=1?'0'+mins: mins} and will end on ${newEndTime.toDateString()} ${endHours.length<=1?'0'+endHours: endHours}:${endMins.length<=1?'0'+endMins: endMins}`
        return msg
    }
    else{
        let diff = endDate-now;
        if(diff<=0){
            let msg = 'Auction has ended'
        return msg

        }
        else{
            const day = parseInt(diff/8.64e+7);
            dif = diff%8.64e+7;
            const hours = parseInt(diff/3.6e+6);
            diff=diff%3.6e+6;
            const mins = parseInt(diff/60000)
            let msg = `${day==0?'':day+' days'} ${hours===0?'':hours+' hours'} ${mins===0?'':mins+' minutes'}`
            return msg
        }
    }// outer else closed
}
