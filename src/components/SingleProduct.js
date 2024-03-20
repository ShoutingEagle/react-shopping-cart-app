import React, { useContext } from 'react'
import {Card,Button} from 'react-bootstrap'
import Rating from './Rating'
import { cartContext } from '../App'

function SingleProduct({item,state,dispatch}) {
    const {title,image,category,price,rating,} = item
    const {cart} = state 




  return (
    <div className='single-product'>
      <Card>
        <Card.Img variant="top" src={image} alt="img" className='single-product-img'/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>
            <span>₹ {price}</span>
            <Rating rating={rating.rate}/>
          </Card.Subtitle>
          {
            cart.some((p) => p.id === item.id)?(
            <Button onClick={() => dispatch({
              type : 'deleteFromCart',
              payload : item,

            })} variant='danger'>Remove from cart</Button>
            ):(<Button onClick={() => dispatch({
              type:'addToCart',
              payload : item,
            })}>Add to cart</Button>)
          }
          
          
        </Card.Body>
      </Card>

    </div>
  )
}

export default SingleProduct





