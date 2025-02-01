import React from "react";

const DimensionControls = ({ dimensions, onDimensionChange }) => {
  const handleChange = (dimension, value) => {
    onDimensionChange(dimension, parseFloat(value));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Width:{" "}
          <span className="font-semibold">{dimensions.width.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={dimensions.width}
          onChange={(e) => handleChange("width", e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:rounded-full"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Height:{" "}
          <span className="font-semibold">{dimensions.height.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={dimensions.height}
          onChange={(e) => handleChange("height", e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Depth:{" "}
          <span className="font-semibold">{dimensions.depth.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={dimensions.depth}
          onChange={(e) => handleChange("depth", e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DimensionControls;
