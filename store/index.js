import {createStore , combineReducers, applyMiddleware} from 'redux'
import loginReducer from './reducers/loginReducer'
import thunk from 'redux-thunk'
    
export default createStore(
    combineReducers({loginReducer}),
    {},
    applyMiddleware(thunk)
)