import React, {useState} from "react";
import { Main, Name, Img, Stock, Link } from "./styles.js";
import {NavLink} from 'react-router-dom'; 
import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const Card = ({id, name, stock, image , price}) => {

  const [qty, setQty] =useState(1)

  function add(){
    setQty(qty + 1)
  }
  function remove(){
    setQty(qty - 1)
  }

  return (
    <Main>
      <Img src={image} alt=''  />

      <div style={{height: '12%', overflow: 'hidden'}}>
      <Link  href={`/Details/${id}`}><Name style={{fontFamily: 'Poppins'}}>{name}</Name></Link>
      </div>
      <p style={{color: '#2EB8B0'}}><b>$ </b>{price}</p>
      <p style={{fontFamily: 'Poppins'}}>{stock} {stock===0 ? 'Agotado': 'disponibles!'}</p>
      {/* <Stock>
      <Button onClick={add} size='small' style={{ height: '30px'}} variant="text"><AddIcon/> </Button>
      <p style={{marginRight: '20px', marginLeft: '20px', marginTop: '5px'}}>{qty}</p>
      <Button onClick={remove} style={{ height: '30px'}} variant="text"><RemoveIcon/> </Button>
      </Stock> */}
      <Link  href={`/Details/${id}`}><Button style={{backgroundColor: '#2EB8B0', color: 'white'}} variant="contained">Detalles</Button></Link>
    </Main>
  )
}

export default Card;