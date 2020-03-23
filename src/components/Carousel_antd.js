import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../styles/index.css';
import { Carousel } from 'antd';
import la from '../imgs/la.jpg';
import ny from '../imgs/ny.jpg';
import chicago from '../imgs/chicago.jpg';

class SliderAntd extends React.Component {
    render() {
      return (
        <Carousel autoplay autoplaySpeed={100} >
            <img src={la} />
            <img src={ny} />
            <img src={chicago}  />
        </Carousel>
      );
    }
}
  export default SliderAntd;