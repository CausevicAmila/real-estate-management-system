import React from 'react';
import PropertyData from './PropertyData';
import './Property.css';

function PropertyCard({ cardItems }) {

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
          link={card.plink}
        />
      ))}
    </div>
  );
}

export default PropertyCard;