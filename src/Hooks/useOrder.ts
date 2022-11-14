import { formatToMoney } from "helpers/formatToMoney";
import { List } from "interfaces/Interfaces";
import { useEffect, useState } from "react"

interface props {
 list: List
}

export const useOrder = ({list}: props) => {
 const [subTotal, setSubTotal] = useState(0);
 const [delivery, setDelivery] = useState(0);

  const getSubTotal = (data:List) => {
   let result =  data.products.reduce((acc, curr) => {
     const mountPerProduct = curr.quantities.reduce((accq, q) => {
       return accq + q.quantity * q.price
     }, 0)

     return acc + mountPerProduct
   }, 0)

   return formatToMoney(result)
 }

 const getDelivery = (subTotal:number): number => {
  if(subTotal <= 30) return 2;
  return 0;
 }

 const getMountTotal = (subTotal:number,delivery:number) => {
   return formatToMoney(subTotal + delivery)
 }

 useEffect(()=>{
  if(list) setSubTotal(getSubTotal(list))
 },[list])

 useEffect(()=>{
  setDelivery(getDelivery(subTotal))
 },[subTotal])



 return {
  subTotal,
  delivery,
  total: getMountTotal(subTotal, delivery)
 }
}