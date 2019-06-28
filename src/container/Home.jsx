import React from 'react';
import { connect } from 'react-redux';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Categories from '../components/Categories';
import FeatureVideo from '../components/FeatureVideo';
import '../assets/styles/Home.scss';

const Home = ({ featureVideo, myList, trends, originals }) => (
  <>
    <FeatureVideo {...featureVideo} />
    <Categories title="Mi lista">
      <Carousel>
        {myList.map(item =>
          <CarouselItem {...item} isList />
        )}
      </Carousel>
    </Categories>
    <Categories title="Tendencias">
      <Carousel>
        {trends.map(item =>
          <CarouselItem key={item.id} {...item} />
        )}
      </Carousel>
    </Categories>
    <Categories title="Originales de Platfix">
      <Carousel>
        {originals.map(item =>
          <CarouselItem key={item.id} {...item} />
        )}
      </Carousel>
    </Categories>
  </>
);

const mapStateToProps = state => {
  return {
    featureVideo: state.featureVideo,
    myList: state.myList,
    trends: state.trends,
    originals: state.originals
  };
};

export default connect(mapStateToProps, null)(Home);
