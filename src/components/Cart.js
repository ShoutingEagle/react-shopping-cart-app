import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../App'
import { ListGroup,Button } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import Rating from './Rating';



function Cart() {
  const{state,dispatch} = useContext(cartContext);
  const {cart} = state

  const [total,setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((acc,curr) => {
      return Math.round(acc + curr.qty * Number(curr.price))
    },0))
  },[cart])



  return (
    <div className='home'>
        <div className='productContainer'>
     
          <ListGroup>
            {
              cart.map((item) => {
                return( 
                
                  <div className='productContainer-Card' key={item.id}>

                    <div className='left-section'>

                      <div className='productContainer-image'>
                            <img src={item.image} alt='img' style={{border: '1px solid lightgrey', padding : '8px'}}/>
                            <div className='details-cartPage'>
                              <div>{item.title}</div>
                              <div>₹ {item.price}</div>
                            </div>

                        
                      </div>
                      <Rating rating={item.rating.rate}/>       

                      <div>
                        <span>Qty : </span>
                        <select onChange={(e) => {
                          dispatch({
                          type : 'updateCart',
                          payload : {
                            id : item.id,
                            qty : e.target.value
                          }
                          })}}>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>                     
                        </select>

                    </div>                 
                    </div>
                    
                    
                    


                    <AiFillDelete fontSize={40} onClick={() => {
                      dispatch({
                        type :'deleteFromCart',
                        payload : item
                        
                      })
                      }}
                      className='aifilldelete'
                    />

                  </div>
                )
              })
            }
          </ListGroup>
        </div>


        <div className='filters summary'>
            <span className='title'>
             Subtotal : {cart.length} {cart.length>1?'items':'item'}
            </span>
            <span>Total : {total}</span>
            <Button type="button" disabled={cart.length === 0}>Proceed to Checkout</Button>
        </div>
    </div>
  )
}

export default Cart




