import React from "react";

const ProductDescription = () => {
  return (
    <div className="ring-1 ring-slate-900/10 rounded-lg">
      <div className="felx gap-3">
        <button className="medium-14 p-3 w-32 border-b-2 border-secondary">Description</button>
        <button className="medium-14 p-3 w-32 border-b-2 ">Size Guide</button>
        <button className="medium-14 p-3 w-32 border-b-2 ">Care Guide</button>
      </div>
      <hr className="h-[1px] w-full" />
      <div className="flex flex-col gap-3 p-3">
        <div>
          <h5 className="h5">Details</h5>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            quisquam sed delectus perferendis consequuntur ullam et? Doloremque
            possimus suscipit fugit quia rem eveniet asperiores cum odit natus
            debitis, quam necessitatibus.
          </p>
        </div>
        <div>
            <h5 className="h5">Benefits</h5>
            <ul className="list-disc pl-5 text-sm text-gray-30 flex gap-1 flex-col">
                <li>Free Shipping</li>
                <li>30 Days Returns</li>
                <li>100% Authentic</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
