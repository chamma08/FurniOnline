import React, { useContext, useEffect, useState } from "react";
import ShowSearch from "../components/ShowSearch";
import Item from "../components/Item";
import Footer from "../components/Footer";
import { ShopContext } from "../context/ShopContext";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavant");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const toggleFilter = (value, setState) => {
    setState((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }
      return [...prev, value];
    });
  };

  const applyFilters = () => {
    let filtered = [...products];
    if (category.length) {
      filtered = filtered.filter((product) =>
        category.includes(product.category)
      );
    }
    if (subCategory.length) {
      filtered = filtered.filter((product) =>
        subCategory.includes(product.subCategory)
      );
    }
    if (search && showSearch) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  };

  const applySorting = (productList) => {
    if (sortType === "price") {
      return productList.sort((a, b) => a.price - b.price);
    }
    if (sortType === "rating") {
      return productList.sort((a, b) => b.rating - a.rating);
    }
    return productList;
  };

  useEffect(() => {
    const filtered = applyFilters();
    const sorted = applySorting(filtered);
    setFilteredProducts(sorted);
    setCurrentPage(1);
  }, [category, subCategory, search, showSearch, sortType, products]);

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="max-padd-container !px-0">
      <div className="flex flex-col sm:flex-row gap-8 mb-16">
        <div className="min-w-72 bg-primary p-4 pt-8  pl-6 lg:pl-12 rounded-r-xl">
          <ShowSearch />
          <div className="pl-5 py-3 mt-4 bg-white rounded-xl">
            <h5 className="h5 mb-4">Categories</h5>
            <div className="flex flex-col gap-2 text-sm font-light">
              {["Tables", "Chairs", "Sofas"].map((cat) => (
                <label key={cat} className="flex gap-2 medium-14 text-gray-30">
                  <input
                    onChange={(e) => toggleFilter(e.target.value, setCategory)}
                    type="checkbox"
                    className="cursor-pointer w-3"
                    value={cat}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="pl-5 py-3 mt-6 bg-white rounded-xl">
            <h5 className="h5 mb-4">Sub Categories</h5>
            <div className="flex flex-col gap-2 text-sm font-light">
              {["Office", "Home", "Outdoor"].map((subCat) => (
                <label
                  key={subCat}
                  className="flex gap-2 medium-14 text-gray-30"
                >
                  <input
                    onChange={(e) =>
                      toggleFilter(e.target.value, setSubCategory)
                    }
                    type="checkbox"
                    className="cursor-pointer w-3"
                    value={subCat}
                  />
                  <span>{subCat}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="px-4 py-3 mt-6 bg-white rounded-xl">
            <h5 className="h5 mb-4">Sort By</h5>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="w-full bg-primary border border-slate-900/5 outline-none text-gray-30 medium-14 h-8 px-2 rounded-md"
            >
              <option value="relavant">Relavant</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        <div className="bg-primary p-4 rounded-l-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
            {getPaginatedProducts().length > 0 ? (
              getPaginatedProducts().map((product) => (
                <Item product={product} />
              ))
            ) : (
              <div className="flexCenter h-96 justify-center">
                No products found
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-14 mb-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`btn-secondary !py-1 !px-3 ${
                currentPage === 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              Previous{" "}
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`btn-light !py-1 !px-3 ${
                  currentPage === i + 1 && "!bg-tertiary text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`${
                currentPage === totalPages && "opacity-50 cursor-not-allowed"
              } btn-secondary !py-1 !px-3`}
            >
              {" "}
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Collection;
