import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

export const cartContext = createContext();

const initialState = {
  loading: true,
  data: [],
  error: '',
  cart : []
};

const filterInitialState = {
  byRating : 0,
  searchQuery : '',
  sort : ''
}

const fetchingReducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        loading: true,
      };
    case 'success':
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: ''
      };
    case 'failure':
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload
      };

    case 'addToCart':
      return {
        ...state,
        cart : [
          ...state.cart,
          {
            ...action.payload,
            qty : 1
          }
        ]
      }

    case 'updateCart' : 
      return {
        ...state,
        cart : state.cart.map((item) => {
          if(item.id === action.payload.id){
            return {
              ...item,
              qty : action.payload.qty
            }
          }
          return item
        })
      }

    case 'deleteFromCart':
      return {
        ...state,
        cart : state.cart.filter((c) => {
          return c.id!==action.payload.id
        })
      }

    default:
      return state;
  }
};

const filterReducer = (state,action) => {
  switch (action.type) {
    case 'sorting' :
    return {
      ...state,
      sort : action.payload
    } 
    case 'filterByRating' :
    return {
      ...state,
      byRating : action.payload
    } 
    case 'searchFilter' :
    return {
      ...state,
      searchQuery : action.payload
    } 
    case 'clearFilter' :
    return {
      byRating : 0,
      searchQuery : '',
      sort : ''
    } 
    default : return state
  }
}


function App() {
  const [state, dispatch] = useReducer(fetchingReducer, initialState);
  const [filterState,filterDispatch] = useReducer(filterReducer,filterInitialState)
  // console.log(filterState)

  useEffect(() => {
    dispatch({ type: 'fetching' });
    axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        dispatch({
          type: 'success',
          payload: response.data
        });
      })
      .catch(error =>
       dispatch({
          type: 'failure',
          payload: error.message
        })
      );
  }, []);



  return (
    <div className="App">
      <cartContext.Provider value={{ state, dispatch, filterState, filterDispatch }}>
        <Header />
        <Routes>
          <Route path="/react-shopping-cart-app" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </cartContext.Provider>
    </div>
  );
}

export default App;




