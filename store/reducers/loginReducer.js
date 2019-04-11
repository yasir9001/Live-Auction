import firebase from './../../firebase';
const initialState = {
    name:firebase.auth().currentUser,
    bids:[],
    bidItem:{},
    history:[]
}





export default loginReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SIGNUP':
            return({
                ...state,
                success:action.payload
            })
  
        case 'UPDATE_BIDS':
            return({
                ...state,
                bids:action.payload
            })
            
        case 'SET_ITEM':
        return({
            ...state,
            bidItem:action.payload
        })

        case 'FETCH_HISTORY':
        return({
            ...state,
            history:action.payload
        })
        default :
        return {
            ...state
        }
    }
} 