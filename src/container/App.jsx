import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Category from '../components/Category';
import Footer from '../components/Footer';

const App = () => (
  <div className="App">
    <Header />

    <Category title="Mi lista">
      <Carousel>
        <CarouselItem />
      </Carousel>
    </Category>

    <Category title="Tendencias">
      <Carousel>
        <CarouselItem />
      </Carousel>
    </Category>

    <Category title="Originales de Platfix">
      <Carousel>
        <CarouselItem />
      </Carousel>
    </Category>

    <Footer />
  </div>
);

export default App;