import React, { useState } from 'react';

const ColorPicker = ({ onColorChange }) => {
  // Predefined colors (commonly used in furniture)
  const colors = [
    
    
    '#964B00', // Brown

    '#D2B48C', // Tan
    '#556B2F', // Dark Olive Green
    '#8A2BE2', // Blue Violet (for accent colors)
    '#FFD700', // Gold
    '#C0C0C0', // Silver
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    onColorChange(color);
  };

  return (
    <div style={{ margin: '20px' }}>
      {/* <label className="block mb-2 text-sm font-medium text-gray-700">
        Choose a color:
      </label> */}
      <div className="flex flex-wrap gap-3">
        {colors.map((color, index) => (
          <button
            key={index}
            className={`w-8 h-8 rounded-full border-2 ${
              selectedColor === color ? 'border-blue-500' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorChange(color)}
            title={color} // Show color code on hover
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;