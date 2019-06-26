import React from 'react';

const Category = (props) => (
  <div className="Carousel">
    <h3 className="categories__title">{props.title}</h3>
    {props.children}
  </div>
);

export default Category;