import React from 'react';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Categories from '../components/Categories';
import FeatureVideo from '../components/FeatureVideo';
import useTvShowsApi from '../hooks/useTvShowsApi';
import '../assets/styles/Home.scss';

const API = 'http://localhost:3000/api';

const Home = () => {
  const initialState = useTvShowsApi(API);
  return initialState.length === 0 ? <h1>Loading...</h1> : (
    <>
      <FeatureVideo {...initialState.featureVideo} />
      <Categories title="Mi lista">
        <Carousel>
          {initialState.mylist.map(item =>
            <CarouselItem key={item.id} {...item} />
          )}
        </Carousel>
      </Categories>
      <Categories title="Tendencias">
        <Carousel>
          {initialState.trends.map(item =>
            <CarouselItem key={item.id} {...item} />
          )}
        </Carousel>
      </Categories>
      <Categories title="Originales de Platfix">
        <Carousel>
          {initialState.originals.map(item =>
            <CarouselItem key={item.id} {...item} />
          )}
        </Carousel>
      </Categories>
    </>
  );
}

export default Home;
