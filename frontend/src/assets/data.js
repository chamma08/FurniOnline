import img1 from "./c1.png";
import img2_1 from "./c2.png";
import img2_2 from "./product_2_2.png";
import img2_3 from "./product_2_3.png";
import img2_4 from "./product_2_4.png";
import img3 from "./c4.png";
import img4_1 from "./c5.png";
import img4_2 from "./product_4_2.png";
import img4_3 from "./product_4_3.png";
import img4_4 from "./product_4_4.png";
import img5 from "./c3.png";
import img6 from "./s6.png";
import img7 from "./s2.png";
import img8 from "./p1.jpg";
import img9 from "./p2.jpg";
import img10 from "./p1.jpg";
import img11 from "./product_11.png";
import img12 from "./product_12.png";
import img13 from "./product_13.png";
import img14 from "./product_14.png";
import img15 from "./product_15.png";
import img16 from "./product_16.png";
import img17 from "./product_17.png";
import img18 from "./product_18.png";
import img19 from "./product_19.png";
import img20 from "./product_20.png";
import img21 from "./product_21.png";
import img22 from "./product_22.png";
import img23 from "./product_23.png";
import img24 from "./product_24.png";
import img25 from "./product_25.png";
import img26 from "./product_26.png";
import img27 from "./product_27.png";
import img28 from "./product_28.png";
import img29 from "./product_29.png";
import img30 from "./product_30.png";
import img31 from "./product_31.png";
import img32 from "./product_32.png";
import img33 from "./product_33.png";
import img34 from "./product_34.png";
import img35 from "./product_35.png";
import img36 from "./product_36.png";
import img37 from "./product_37.png";
import img38 from "./product_38.png";
import img39 from "./product_39.png";
import img40 from "./product_40.png";
import img41 from "./product_41.png";
import img42 from "./product_42.png";
import img43 from "./product_43.png";
import img44 from "./product_44.png";
import img45 from "./product_45.png";
import img46 from "./product_46.png";
import img47 from "./product_47.png";
import img48 from "./product_48.png";
import img49 from "./product_49.png";
import img50 from "./product_50.png";
import img51 from "./product_51.png";
import img52 from "./product_52.png";

// Blogs
import blog1 from "../assets/blogs/blog1.png";
import blog2 from "../assets/blogs/blog2.png";
import blog3 from "../assets/blogs/blog3.png";
import blog4 from "../assets/blogs/blog4.png";

//3d models
import chair1 from "../assets/models/chair1.glb";
import chair2 from "../assets/models/chair2.glb";
import chair3 from "../assets/models/chair3.glb";
import chair4 from "../assets/models/chair4.glb";
import chair5 from "../assets/models/chair5.glb";
import sofa1 from "../assets/models/sofa.glb";
import sofa2 from "../assets/models/sofa.glb";

export const products = [
  {
    _id: "1",
    name: "Bellino Wing Chair",
    description:
      "This is truly a statement piece best suited for large living spaces to bring out a feeling of royalty and old-world charm",
    price: 150,
    image: [img1],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["Wood", "Metal", "Plastic"],
    date: 1716634345448,
    popular: true,
    model: [chair1],
  },
  {
    _id: "2",
    name: "Wendy Chair",
    description:
      " At the moment this product is made to order only. Kindly send us a web inquiry or get in touch using the below details to place an order",
    price: 220,
    image: [img2_1 /* , img2_2, img2_3, img2_4 */],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["Wood", "Metal", "Plastic"],
    date: 1716621345448,
    popular: true,
    model: [chair2],
  },
  {
    _id: "3",
    name: "Adjustable Counter Stool",
    description:
      "This sleek bar chair features a smooth, curved design that blends style and comfort. Its 360-degree rotation allows for easy movement and flexibility, making it perfect for any social setting.",
    price: 200,
    image: [img3],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["Wood", "Metal", "Fiber"],
    date: 1716234545448,
    popular: true,
    model: [chair3],
  },
  {
    _id: "4",
    name: "Euclid Velvet Accent Chair",
    description:
      "Add this side chair to your living room ensemble and give it some contemporary glam appeal. ",
    price: 180,
    image: [img4_1 /* , img4_2, img4_3, img4_4 */],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["Wood", "Metal", "Plastic"],
    date: 1716621345448,
    popular: false,
    model: [chair4],
  },
  {
    _id: "5",
    name: "Executive Chair",
    description:
      "Executive office chair, ergonomic office chair with adjustable lumbar back support, big and tall office chair with massage and heat, diamond-stitched cushion leather home office desk chair",
    price: 140,
    image: [img5],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["Wood", "Metal", "Plastic"],
    date: 1716622345448,
    popular: false,
    model: [chair5],
  },
  {
    _id: "6",
    name: "Beverly Sofa",
    description:
      "Fun and vibrant graphic tee, perfect for kids’ outdoor play and adventures.",
    price: 160,
    image: [img6],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["XS", "S", "M"],
    date: 1716623345448,
    popular: true,
    model: [sofa1],
  },
  {
    _id: "7",
    name: "Grace Sofa",
    description:
      "Grace Sofa exudes comfort with its upbeat design. It is completed with a plush arrangement of matching cusions that lends a soft warmth to any living room space.",
    price: 320,
    image: [img7],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716624345448,
    popular: true,
    model: [sofa2],
  },
  {
    _id: "8",
    name: "Furniture 1",
    description:
      "Warm and comfortable hoodie with an adjustable hood and front pockets.",
    price: 420,
    image: [img8],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["M", "L", "XL", "XXL"],
    date: 1716625345448,
    popular: false,
  },
  {
    _id: "9",
    name: "Furniture 1",
    description:
      "A casual hoodie designed for boys, featuring a soft material for all-day comfort.",
    price: 230,
    image: [img9],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1716626345448,
    popular: false,
  },
  {
    _id: "10",
    name: "Furniture 1",
    description:
      "These high-waisted joggers are ideal for casual wear and feature a relaxed fit for added comfort.",
    price: 260,
    image: [img10],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716627345448,
    popular: false,
  },
];

export const blogs = [
  {
    title: "Top Shopping Tips for Smart Buyers",
    category: "Men",
    image: blog1,
  },
  {
    title: "Latest Trends in Online Shopping 2025",
    category: "Women",
    image: blog2,
  },
  { title: "Why AR best for Online Shopping ", category: "Kids", image: blog3 },
  {
    title: "Why E-Commerce is the Future of Shopping",
    category: "Topwear",
    image: blog4,
  },
];
