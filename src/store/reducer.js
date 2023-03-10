// reducers.js
import { combineReducers } from 'redux';
import { CONNEXION, LOGOUT, REGISTER,GET_ARTICLES,GET_ARTICLE,GET_ARTICLES_FAVORIS,GET_USERS } from './actions';

const todos = (state = [], action) => {
  switch (action.type) {
    case CONNEXION:
      console.log(action.payload)
      return {
            ...state,
          token: action.payload.token,
          user: action.payload.user,
          isLogin: true,
        };
    case REGISTER:
      return state.map((todo, index) => {
        if (index === action.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    case LOGOUT:
        console.log(state)
        return {
            ...state,
            token: null,
            user: null,
            isLogin: false,
            };
    case GET_ARTICLES:
            console.log(action)
        return {
            ...state,
            articles: action.payload,
            };
    case GET_ARTICLE:
            console.log(action)
        return {
            ...state,
            article: action.payload,
            };
    case GET_ARTICLES_FAVORIS:
            
        return {
            ...state,
            articlesFavoris: action.payload,
            };
    case GET_USERS:
        return {
            ...state,
            users: action.payload,
        }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  todos,
});

export default rootReducer;
