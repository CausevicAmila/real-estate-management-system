import React from 'react';
import PropertyData from './PropertyData';
import './Property.css';

function AdminData({ cardItems }) {

    console.log('Received cardItems:', cardItems);


  return (
    <div className='pcard'>
          {cardItems.map((card, index) => (
        <PropertyData
          key={index}
          pimage={card.pimage}
          header={card.title}
          desc={card.description}
          address={card.address}
          bed = {card.bed}
          area = {card.area}
          price ={card.price}
          link={card.plink + '/' + card.id} 
        />
      ))}
    </div>
  );
}

export default AdminData;