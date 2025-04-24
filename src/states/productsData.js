import Caja1 from "../images/FeedIG/caja11_11zon.webp";
import Caja2 from "../images/FeedIG/caja22_11zon.webp";
import Caja3 from "../images/FeedIG/caja33_11zon.webp";

const products = [
  {
    id: 1,
    name: "Porotos y Lentejas",
    category: "Congelados",
    brand: "VitalVeg",
    contenidoNeto: "200gr",
    price: 27,
    tacc: false,
    gluten: false,
    Veggie: true,

    image: Caja3,
  },
  {
    id: 2,
    name: "Soja y Arveja",
    category: "Congelados",
    brand: "VitalVeg",
    contenidoNeto: "200gr",
    price: 27,
    tacc: false,
    alcohol: false,
    Veggie: true,

    image: Caja1,
  },
  {
    id: 3,
    name: "Garbanzos y Zanahorias",
    category: "Congelados",
    brand: "VitalVeg",
    contenidoNeto: "200gr",
    price: 27,
    tacc: false,
    gluten: false,
    Veggie: true,
    image: Caja2,
  },
];

export default products;
