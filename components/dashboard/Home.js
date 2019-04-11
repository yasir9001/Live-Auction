import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, BackHandler, } from 'react-native'
import { connect } from 'react-redux';
import firebase from './../../firebase';
import { fetchBids, fetchBidItem, setBidItem } from './../../store/actions/action'
import { getTime } from './Bid'
import {Button, Icon, Text, Header } from 'native-base';



export class Home extends Component {
    static navigationOptions = {

        headerTitle: "My Auctions",
        headerRight: (
            
            <Button style={{padding:15}}iconLeft transparent onPress={()=>{
                firebase.auth().signOut().catch((e)=>alert(e))
            }}>
                <Icon name='exit' />
            </Button>
        ),
    }



    constructor(props) {
        super(props);
        this.path = firebase.database().ref().child(`auctionapp/users`);
        this.uid = firebase.auth().currentUser.uid;
        this.state = {
            infoData: []
        }
    }

    showItem(pushKey) {
        this.props.setBidItem(this.props.bids.filter((e) => e.pushKey === pushKey)[0])
        this.props.navigation.navigate('BidItem')
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp()
        })

        this.props.fetchBids()

        this.path.child(`${this.uid}/auctions/`)
            .on('value', snap => {
                let infoData = [];
                for (let key in snap.val()) {
                    for (let key2 in snap.val()[key]) {
                        if (snap.val()[key][key2].minimalPrice) {
                            infoData.push(snap.val()[key][key2])
                        }// outer if closed
                    } // inner for closed
                } // outer for closed    
                this.setState({ infoData })
                // console.warn(this.state.infoData, infoData)
            })// on closed




        this.path.once('value', snap => {
            let data = []
            for (let key in snap.val()) {
                for (let key2 in snap.val()[key]) {
                    for (let key3 in snap.val()[key][key2]) {
                        for (let key4 in snap.val()[key][key2][key3]) {
                            if (snap.val()[key][key2][key3][key4].name) {
                                data.unshift(snap.val()[key][key2][key3][key4])
                            }
                        }
                    }
                }
            }// outer most for closed
            // console.warn(data);
            
            let arr = data.filter((e) => e.endDate < (new Date().getTime() + 1.8e+7))

            arr.forEach(e => {
                this.path.child(`winners`).push(e);
                this.path.child(`${e.posterUid}/auctions/${e.pushKey}`).remove();
            })
            // console.warn(arr);



        })// on closed 




    }


    render() {
        return (
            <>
                <ScrollView style={{ flex: 1 }}>


                    <View style={styles.container}>



                        {
                            this.state.infoData.length !== 0 ? this.state.infoData.map((e, i) => {
                                let time = getTime(e);
                                return (
                                    <TouchableOpacity style={styles.bid} key={i} onPress={() => this.showItem(e.pushKey)}>
                                        <View style={styles.info1} >
                                            <Text style={{ fontSize: 20, color: '#000' }}>{e.productName}</Text>
                                            {/* <Text>{this.state.numBids}bids</Text> */}
                                        </View>

                                        <View style={styles.info2}>
                                            {/* <Text style={{fontSize:20, color:'#000'}}>{'sd'}$</Text> */}
                                            <Text style={{ color: 'green' }}>{time}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }) : <Text style={{ flex: 1, fontSize: 25, justifyContent: 'center', textAlign: 'center', marginVertical: 10 }}>no data</Text>

                        }




                    </View>
                </ScrollView>
            </>
        )
    }
}




function mapStateToProps(state) {
    return ({
        bids: state.loginReducer.bids,
        bidItem: state.loginReducer.bidItem
    })
}

function mapDispatchToProps(dispatch) {
    return {
        fetchBids: () => {
            dispatch(fetchBids())
        },
        fetchBidItem: (pushKey) => {
            dispatch(fetchBidItem(pushKey))
        },
        setBidItem: (item) => {
            dispatch(setBidItem(item));
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home)









const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bid: {
        flex: 1,
        // flexDirection:'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    info1: {
        fontSize: 60
    },
    info2: {
    }
})



