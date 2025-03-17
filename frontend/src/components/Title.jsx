import React from "react";

const Title = ({ title1, title2, titleStyles, title1Styles, paraStyles }) => {
  return (
    <div className={`${titleStyles} pb-1`}>
      <h3 className={`h3 ${title1Styles}`}>
        {title1}
        <span className="text-secondary !font-normal"> {title2}</span>
      </h3>
      <p className={`${paraStyles} hidden`}>
        Discover the latest in modern furniture, crafted for style and comfort.
      </p>
    </div>
  );
};

export default Title;
