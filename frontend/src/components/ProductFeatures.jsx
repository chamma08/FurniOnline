import React from "react";
import { TbArrowBackUp, TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";

const ProductFeatures = () => {
  return (
    <section className="bg-primary rounded-xl mt-6 mb-6 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 rounded-xl">
        <div className="flexCenter gap-x-4 p-2 rounded-3xl">
          <div className="text-3xl">
            <TbArrowBackUp className="mb-3 text-yellow-400" />
            <div>
              <h4 className="h4 capitalize">Easy Return</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deleniti reiciendis molestias ab eos porro in et, animi odio
                veritatis nemo ipsa repellendus. Rem dolores veritatis, est
                repudiandae impedit officiis dolorum.
              </p>
            </div>
          </div>
        </div>
        <div className="flexCenter gap-x-4 p-2 rounded-3xl">
          <div className="text-3xl">
            <TbTruckDelivery className="mb-3 text-red-600" />
            <div>
              <h4 className="h4 capitalize">Fast Delivery</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deleniti reiciendis molestias ab eos porro in et, animi odio
                veritatis nemo ipsa repellendus. Rem dolores veritatis, est
                repudiandae impedit officiis dolorum.
              </p>
            </div>
          </div>
        </div>
        <div className="flexCenter gap-x-4 p-2 rounded-3xl">
          <div className="text-3xl">
            <RiSecurePaymentLine className="mb-3 text-secondary" />
            <div>
              <h4 className="h4 capitalize">Payment Protection</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deleniti reiciendis molestias ab eos porro in et, animi odio
                veritatis nemo ipsa repellendus. Rem dolores veritatis, est
                repudiandae impedit officiis dolorum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
