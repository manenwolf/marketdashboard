import {combineReducers} from 'redux';
import munten from './muntReducer';
import user from './userReducer';
import users from './usersReducer';
import aandelen from './aandeelReducer';
import favorites from './favoritesReducer';

const rootReducer = combineReducers({
    munten,
    user,
    users,
    favorites,
    aandelen
});

export default rootReducer;
