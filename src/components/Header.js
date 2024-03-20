import React, { useContext } from 'react'
import { Navbar, Container, FormControl, Nav, Dropdown, Badge, Button } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { cartContext } from '../App'
import { AiFillDelete } from 'react-icons/ai'

function Header() {
  const {state,dispatch,filterState,filterDispatch} = useContext(cartContext);
  const {cart} = state 
  console.log(filterState)
  return (
    <div className='header'>
      <Navbar bg='dark' variant='dark' style={{ height: 80 }} >
        <Container>
          <Navbar.Brand>
            <Link href='/'>Shopping</Link>
          </Navbar.Brand>
          <Navbar.Text className='search'>
            <FormControl style={{ width: 500 }} placeholder='Search Product' className='m-auto' onChange={(e) => {
              filterDispatch({
                type : 'searchFilter',
                payload : e.target.value
              })
            }}/>
          </Navbar.Text>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <FaShoppingCart color='white' fontSize='25px' />
                <Badge bg='inherit'>{cart.length>0?cart.length:'Cart is Empty!'}</Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu" style={{minWidth:500}}>
                
                  {
                    cart.length>0?(
                      <div className='dropdown-container'>
                       {
                        cart.map((item) => {
                          return (
                          <div className='dropdown-wrapper' key={item.id}>
                            <div className='drop-down'>
                            <img src={item.image} alt='img'/>
                            <div className='details'>
                              <span>{item.title}</span>
                              <span>₹ {item.price}</span>
                            </div>
                            </div>
                            <AiFillDelete fontSize="20px" style={{cursor:'pointer'}} onClick={() => dispatch({
                              type : 'deleteFromCart',
                              payload : item
                            })}/>
                          </div>
                          )
                          
                        })
                       }
                       <Link to='/cart'>
                        <Button className='drop-down-btn'>Go To Cart</Button>
                       </Link>
                       
                      </div>
                    ):(
                      <span style={{ padding: 10 }}>Cart is Empty!</span>
                    )
                  }
                
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
