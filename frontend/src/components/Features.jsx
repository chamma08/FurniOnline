import React from "react";
import img1 from "../assets/features/5.jpg";
import img2 from "../assets/features/2.jpg";
import img3 from "../assets/features/3.jpg";
import img4 from "../assets/features/4.jpg";
import img6 from "../assets/features/6.jpg";

const Features = () => {
  return (
    <section className="max-padd-container pt-14 pb-20">
      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_2fr] gap-6 gap-y-12 rounded-xl">
        <div className="flexCenter gap-x-10">
          <div>
            <img
              src={img2}
              alt=""
              height={77}
              width={222}
              className="rounded-full "
            />
          </div>
          <div>
            <img
              src={img6}
              alt=""
              height={77}
              width={222}
              className="rounded-full "
            />
          </div>
        </div>
        <div className="flexCenter flex-wrap sm:flex-nowrap gap-x-5">
          <div className="p-4 rounded-3xl">
            <h4 className="h4 capitalize">AR Powered</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, reiciendis eius tenetur perspiciatis doloribus non repudiandae tempore cumque adipisci ea minima ab provident quis ratione facilis velit ad est molestiae.
            </p>
          </div>
          <div className="p-4 rounded-3xl">
            <h4 className="h4 capitalize">Secure Payment</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni iure excepturi quia eius reiciendis velit perspiciatis quam, fugit nulla rem sit ex consectetur pariatur distinctio tempore vel officiis? Nihil, quas!</p>
          </div>
          <div className="p-4 rounded-3xl">
            <h4 className="h4 capitalize">AI Powered</h4>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium numquam ipsa, vero corporis exercitationem doloremque eveniet ab quasi iusto, minima asperiores error dolor mollitia commodi iste. Vitae error corrupti sed!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
