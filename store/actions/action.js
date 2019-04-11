import firebase from './../../firebase';

import {AsyncStorage} from 'react-native'

export function signup(user, nav) {
    return  dispatch =>{
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(()=>{

            firebase.database().ref().child(`auctionapp/users/${firebase.auth().currentUser.uid}`)
            .set({
                info:user
            }).then(()=>{
                
                nav.navigation.navigate('login');
                // console.warn(user.navigation)
            })

            
            
            dispatch({
                    type:'SIGNUP',
                    payload:'success'
                })
            })
            .catch((e)=>{
                alert(e)
                return
            })
            
        }// dispatch closed
}



export function loginAction(user){
    return dispatch =>{
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then( async (e)=>{
            // console.warn(e)
            try{
                await AsyncStorage.setItem('user', firebase.auth().currentUser)
            } catch(error){
                // console.warn(error)
            }
            user.navigation.navigate('dashboard')
        })
        .catch((e)=>{
            alert(e)
        })
    }
}

export function fetchBids(){
    return dispatch =>{
        firebase.database().ref().child(`auctionapp/users`)
        .on('value', (snap)=>{
            let data = []
            for(let key in snap.val()){
                for(let key2 in snap.val()[key]){
                    for(let key3 in snap.val()[key][key2]){
                        for(let key4 in snap.val()[key][key2][key3]){
                            if(snap.val()[key][key2][key3][key4].minimalPrice){
                                data.unshift(snap.val()[key][key2][key3][key4])
                            }
                        }
                            
                    }
                }
            }// outer most for closed
            dispatch({
                type:'UPDATE_BIDS',
                payload:data
            })
            // return data
        })// on closed
    }
}

export function fetchBidItem(pushKey){
    return dispatch =>{
        firebase.database().ref().child(`auctionapp/users/DQcAy7dzTHMbwJK12JUZNEicSPJ3/auctions/${pushKey}/auctionInfo`)
        .on('value', (snap)=>{
            // console.warn(snap.val(), pushKey)
        })// on closed
    }
}

export function setBidItem(item){
    return dispatch =>{
        dispatch({
            type:'SET_ITEM',
            payload:item
        })
    }
}

export function fetchHistory(pushKey, uid){
    return dispatch =>{
        firebase.database().ref().child(`auctionapp/users/${uid}/auctions/${pushKey}/bidders`)
        .on('value', (snap)=>{
            let data = []
            for(let key in snap.val()){
                data.unshift(snap.val()[key])
            }
            dispatch({
                type:'FETCH_HISTORY',
                payload:data
            })

        })// on closed

        
    }
}