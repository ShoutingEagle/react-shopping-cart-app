import React,{useContext} from 'react'
import Rating from './Rating'
import { cartContext } from '../App'


function Filters() {
  const {filterState : {byRating,searchQuery,sort},filterDispatch} = useContext(cartContext) 



  return (
    <div className='filters'>
      <div className='heading-text'>Filter Products</div>


      <div className='container-filters'>

        <div className='wrapper-filters'>
          <input 
            type='radio' 
            name='filter-products' 
            
            onClick={() => {
            filterDispatch({
              type : 'sorting',
              payload : 'high'
            })
          }}/>
          <span>High to Low</span>
        </div>

        <div className='wrapper-filters'>
          <input 
            type='radio' 
            name='filter-products' 
            onClick={() => {
            filterDispatch({
              type : 'sorting',
              payload : 'low'
            })
          }}/>
          <span>Low to High</span>
        </div>

        <div className='wrapper-filters'>
          <label>Rating : </label>
          <Rating 
          rating={byRating} 
          onClick={(i) => filterDispatch({
            type : 'filterByRating',
            payload : i+1,
          })}
          style={{cursor:"pointer"}}
          />
        </div>

      </div>


      <button onClick={() => filterDispatch({type : 'clearFilter'})}>Clear Filter</button>

    </div>
  )
}

export default Filters



