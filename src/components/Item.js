import React from 'react'
import './Item.css'
import { useCart } from '../context/CartContext'
export default function Item(props) {
  const {id,name,price,image,quantity} = props
  const {formatMoney,removeItem,addItem,reduceItem} = useCart()

  return (
<div className="card">
  <img src={image} alt={id} />
  <div className="product">
    <p className='name'>ชื่อสินค้า : {name}</p>
    <p className='price'>ราคา : {formatMoney(price)} บาท</p> 
  </div>
  <div className="quantity">
    <button onClick={()=> reduceItem(id)}>-</button>
    <input type="text" value={quantity} disabled/>
    <button onClick={()=> addItem(id)}>+</button>
  </div>
  <div className="total-price">{formatMoney(quantity * price)}</div>
  <button onClick={()=> removeItem(id)}>ลบสินค้า</button>
  </div>
  )
}
