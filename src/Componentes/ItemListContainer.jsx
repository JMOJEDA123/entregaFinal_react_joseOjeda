import React, { useEffect, useState } from 'react';
import { ItemList } from './ItemList';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

//Este componente se encarga de pedir productos a partir de la funcion pediProductos() y manejar la logica para renderizar
//la aplicacion con todos los productos o con la categoria que capta de la URL a traves de useParam. 
//Retorna el componente ItemList y pasa productos como Prop

export const ItemListContainer = () => {
  

  let { categoryId } = useParams();
  console.log(categoryId);
  let [productos, setProductos] = useState([]);
  let [titulo, setTitulo] = useState("Productos");
  


  useEffect(() => {

    const autosRef = collection(db, "autos");
    const q= query(autosRef, where("marca", "==", categoryId));
    // setProducto(data.find((prod) => (prod.id) === parseInt(itemId)));

    getDocs(autosRef)
    .then((res) => {
      setProductos(
        res.docs.map((doc) => {
          return { ...doc.data(), id:doc.id}
        })
      )
    });
    
    
      
  }, [categoryId]);
  


  return (
    <div className="item-list-container">
      <h1 className='titulo-categoria'>{titulo}</h1>
      <ItemList productos={productos} />
    </div>
  )
}