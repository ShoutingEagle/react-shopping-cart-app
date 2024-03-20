import React, { useContext } from 'react';
import { cartContext } from '../App';
import Filters from './Filters';
import SingleProduct from './SingleProduct';
import Preloader from './Preloader';

function Home() {
  const { state,dispatch,filterState, filterDispatch } = useContext
  (cartContext);

  const { loading, data } = state;
  const {} = filterState;



  if (loading) {
    return (<Preloader/>);
  }


  const transformProducts = () => {
    let filteredProducts = [...data]

    console.log(filteredProducts)
    if( filterState.sort === 'high'){ 
      filteredProducts = filteredProducts.sort((a,b) => {
        return b.price-a.price
      });
    }


    if (filterState.sort === 'low'){
      filteredProducts = filteredProducts.sort((a,b) => {
        return a.price-b.price
      });      
    }


    if(filterState.byRating){
      filteredProducts = filteredProducts.filter((item) => {
       console.log(filterState.byRating,item.rating.rate)
       return  item.rating.rate >= filterState.byRating
      }).sort((a,b)=> b.rating.rate-a.rating.rate )
    }


    if(filterState.searchQuery){
      filteredProducts = filteredProducts.filter((item) => {
        return item.title.toLowerCase().includes(filterState.searchQuery.toLowerCase())
      })
    }

    return filteredProducts;
  }



  

  return (
    <div className='home'>
      <Filters />
      <div className='product-container'>
        {transformProducts().map((item) => (
          <SingleProduct item={item} key={item.id} state={state} dispatch={dispatch}/>
        ))}
      </div>
    </div>
  );
}

export default Home;

