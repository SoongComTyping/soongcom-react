import React, {Component} from 'react'
import '../../../sass/main.css';
import main_image_2 from '../../../assets/main_image_1.jpg';
import main_image_3 from '../../../assets/main_image_3.jpg';
import main_image_1 from '../../../assets/main_image_5.jpg';
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledSlider = styled(Slider)`
    .slick-slide div{
      outline: none;
    }
`;

const ImageContainer = styled.div`
  margin: 0px;
`;

const Image = styled.img`
width:2000px;
height:750px;
object-fit: cover;
`;

const items = [
  { id: 1, url: main_image_1 },
  { id: 2, url: main_image_2 },
  { id: 3, url: main_image_3 },
];

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 4000, 
      pauseOnHover: false, 
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <StyledSlider {...settings}>
          {items.map(item => {
            return (
              <div key={item.id}>
                <ImageContainer>
                  <Image src={item.url} />
                </ImageContainer>
              </div>
            );
          })}
        </StyledSlider>
      </div>
    );
  }
}