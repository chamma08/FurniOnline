import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ColorPicker = ({ onColorChange }) => {
  const colors = ['#964B00', '#D2B48C', '#556B2F', '#8A2BE2', '#FFD700', '#C0C0C0'];
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    onColorChange(color);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: '0',
    focusOnSelect: true,
    slidesToShow: 5, // Default for larger screens
    slidesToScroll: 1,
    beforeChange: (current, next) => handleColorChange(colors[next]),
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile devices
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="flex justify-center mt-5 mb-10">
      <div className="w-2/3">
        <Slider {...settings}>
          {colors.map((color, index) => (
            <div key={index} className="flex justify-center">
              <button
                className={`rounded-full border-2 ${
                  selectedColor === color ? 'border-blue-500' : 'border-gray-300'
                }`}
                style={{
                  backgroundColor: color,
                  width: selectedColor === color ? '50px' : '40px',
                  height: selectedColor === color ? '50px' : '40px',
                  opacity: selectedColor === color ? 1 : 0.7,
                  transition: 'all 0.3s ease',
                }}
                onClick={() => handleColorChange(color)}
                title={color}
              ></button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ColorPicker;
