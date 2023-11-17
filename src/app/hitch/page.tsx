'use client'

import React, { useState } from 'react';
import './Card.css'; // 필요한 CSS를 여기에 임포트 하세요.

const App = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
            <div className="front"> 
                카드 앞면
            </div>
            <div className="back">
                카드 뒷면
            </div>
        </div>
    );
}

// export default Card;
// 'use client'
// import React from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CardSliderProps {
  cards: string[];
}

const cards = ['hello world!', 'hello world!', 'hello world!'];

const CardSlider: React.FC<CardSliderProps> = ({ cards }) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };

  return (
    <div>
      <Slider {...settings}>
        {cards?.map((card, index) => (
          <div key={index}>
            <h3>{card}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
