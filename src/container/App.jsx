import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import FeatureVideo from '../components/FeatureVideo';
import '../styles/App.scss';

const data = {
  featureVideo: {
    "id": 30342,
    "slug": "stargate-origins",
    "name": "Stargate Atlantis",
    "type": "Scripted",
    "language": "English",
    "year": 2004,
    "contentRating": '16+',
    "duration": 206,
    "image": "https://static.tvmaze.com/uploads/images/original_untouched/1/3059.jpg"
  },
  mylist: [
    {
      "id": 37234,
      "slug": "stargate-origins",
      "name": "Breaking Bad",
      "type": "Scripted",
      "language": "English",
      "year": 2008,
      "contentRating": '16+',
      "duration": 96,
      "image": "https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg"
    },
    {
      "id": 36234,
      "slug": "once-upon-a-time-in-wonderland",
      "name": "Once Upon a Time in Wonderland",
      "type": "Scripted",
      "language": "English",
      "year": 2013,
      "contentRating": '18+',
      "duration": 109,
      "image": "https://static.tvmaze.com/uploads/images/original_untouched/73/183661.jpg"
    },
    {
      "id": 34634,
      "slug": "stargate-origins",
      "name": "Stargate Origins",
      "type": "Scripted",
      "language": "English",
      "year": 2018,
      "contentRating": '16+',
      "duration": 116,
      "image": "https://static.tvmaze.com/uploads/images/medium_portrait/146/365955.jpg"
    }
  ],
  trends: [
    {
      "id": 31234,
      "slug": "stargate-origins",
      "name": "Breaking Bad",
      "type": "Scripted",
      "language": "English",
      "year": 2008,
      "contentRating": '16+',
      "duration": 96,
      "image": "https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg"
    },
    {
      "id": 32234,
      "slug": "once-upon-a-time-in-wonderland",
      "name": "Once Upon a Time in Wonderland",
      "type": "Scripted",
      "language": "English",
      "year": 2013,
      "contentRating": '18+',
      "duration": 109,
      "image": "https://static.tvmaze.com/uploads/images/original_untouched/73/183661.jpg"
    },
    {
      "id": 32624,
      "slug": "stargate-origins",
      "name": "Stargate Origins",
      "type": "Scripted",
      "language": "English",
      "year": 2018,
      "contentRating": '16+',
      "duration": 116,
      "image": "https://static.tvmaze.com/uploads/images/medium_portrait/146/365955.jpg"
    }
  ],
  originals: [
    {
      "id": 30231,
      "slug": "stargate-origins",
      "name": "Breaking Bad",
      "type": "Scripted",
      "language": "English",
      "year": 2008,
      "contentRating": '16+',
      "duration": 96,
      "image": "https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg"
    },
    {
      "id": 30232,
      "slug": "once-upon-a-time-in-wonderland",
      "name": "Once Upon a Time in Wonderland",
      "type": "Scripted",
      "language": "English",
      "year": 2013,
      "contentRating": '18+',
      "duration": 109,
      "image": "https://static.tvmaze.com/uploads/images/original_untouched/73/183661.jpg"
    },
    {
      "id": 32634,
      "slug": "stargate-origins",
      "name": "Stargate Origins",
      "type": "Scripted",
      "language": "English",
      "year": 2018,
      "contentRating": '16+',
      "duration": 116,
      "image": "https://static.tvmaze.com/uploads/images/medium_portrait/146/365955.jpg"
    }
  ]
}

const App = () => (
  <div className="App">
    <Header />
    <FeatureVideo {...data.featureVideo} />
    <Categories title="Mi lista">
      <Carousel>
        {data.mylist.map(item =>
          <CarouselItem key={item.id} {...item} />
        )}
      </Carousel>
    </Categories>
    <Categories title="Tendencias">
      <Carousel>
        {data.trends.map(item =>
          <CarouselItem key={item.id} {...item} />
        )}
      </Carousel>
    </Categories>
    <Categories title="Originales de Platfix">
      <Carousel>

        {data.originals.map(item =>
          <CarouselItem key={item.id} {...item} />
        )}
      </Carousel>
    </Categories>
    <Footer />
  </div>
);

export default App;
