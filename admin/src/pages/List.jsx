import axios from "axios";
import React, { useEffect, useState } from "react";
import { backend_url } from "../App";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div>
      <div>
        <div>
          <h5>Image</h5>
          <h5>Name</h5>
          <h5>Category</h5>
          <h5>Price</h5>
          <h5>Remove</h5>
        </div>
        {list.map((item) => (
          <div key={item._id}>
            <img src={item.image[0]} alt="" className="w-12 rounded-lg" />
            <h5>{item.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
