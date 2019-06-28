import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import FeatureVideo from '../components/FeatureVideo';
import useTvShowsApi from '../hooks/useTvShowsApi';
import '../assets/styles/App.scss';

const API = 'http://localhost:3000/api';

const App = () => {
  const initialState = useTvShowsApi(API);
  return initialState.length === 0 ? <h1>Loading...</h1> : (
    <Layout>
      <Header />
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
      <Footer />
    </Layout>
  );
}

export default App;
