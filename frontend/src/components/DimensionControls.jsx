import React from "react";

const DimensionControls = ({ dimensions, onDimensionChange }) => {
  const handleChange = (dimension, value) => {
    onDimensionChange(dimension, parseFloat(value));
  };

  return (
    <div className="space-y-6 bg-white p-5 rounded-2xl shadow-lg">
      {["width", "height", "depth"].map((dim) => (
        <div key={dim} className="flex flex-col space-y-2">
          <label className="text-md font-semibold text-gray-800 flex justify-between">
            {dim.charAt(0).toUpperCase() + dim.slice(1)}:
            <span className="text-blue-600">{dimensions[dim].toFixed(2)}m</span>
          </label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={dimensions[dim]}
            onChange={(e) => handleChange(dim, e.target.value)}
            className="
              w-full h-2 bg-gradient-to-r from-blue-300 to-blue-600 
              rounded-lg appearance-none cursor-pointer transition-all 
              shadow-inner 
              [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
              [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all 
              [&::-webkit-slider-thumb]:hover:scale-110 
              [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
              [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:rounded-full 
              [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition-all 
              [&::-moz-range-thumb]:hover:scale-110
            "
          />
        </div>
      ))}
    </div>
  );
};

export default DimensionControls;
