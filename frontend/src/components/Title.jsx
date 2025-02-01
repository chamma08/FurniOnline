import React from "react";

const Title = ({ title1, title2, titleStyles, title1Styles, paraStyles }) => {
  return (
    <div className={`${titleStyles} pb-1`}>
      <h3 className={`h3 ${title1Styles}`}>
        {title1}
        <span className="text-secondary !font-normal"> {title2}</span>
      </h3>
      <p className={`${paraStyles} hidden`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
};

export default Title;
