export function formatPrice(price) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "INR",
  });
}

export const foodsItems = [
  {
    name: "Burger",
    img: "/img/burger.jpeg",
    section: "Burger",
    price: 90,
  },
  {
    name: "Chicken Fingers",
    img: "/img/chickenfingers.jpeg",
    section: "Fingers",
    price: 150,
  },
  {
    name: "Chicken Pizza",
    img: "/img/chickenpizza.jpeg",
    section: "Pizza",
    price: 200,
  },
  {
    name: "Hot Slices",
    img: "/img/hotslices.jpeg",
    section: "Pizza",
    price: 120,
  },
  {
    name: "Pepperoni Pizza",
    img: "/img/pepperpizza.jpeg",
    section: "Pizza",
    price: 230,
  },
  {
    name: "Big Deal Pizza",
    img: "/img/xlarge.jpeg",
    section: "Pizza",
    price: 300,
  },
];

export const foods = foodsItems.reduce((res, food) => {
  if (!res[food.section]) {
    res[food.section] = [];
  }
  res[food.section].push(food);
  return res;
}, {});
