import React from "react";
import Slider from "react-slick";
import la from '../imgs/la.jpg';
import ny from '../imgs/ny.jpg';
import chicago from '../imgs/chicago.jpg';
import Image from 'react-image-resizer';


class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      // centerMode: true
    };
    const style_div = {
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      };
    return (
      <Slider {...settings}>
        {/* <div> */}
        <Image
          src={la} alt="la" align-items="center" className="center"
          height={350}
          width={700}
        />
        {/* </div> */}
        {/* <div> */}
        <Image
          src={ny} alt="ny" className="center"
          height={350}
          width={700}
        />
        {/* </div> */}
        {/* <div > */}
        <Image
          src={chicago} alt="chicago" className="center"
          height={350}
          width={700}
        />
        {/* </div> */}
      </Slider>
    );
  }
}
export default SimpleSlider;