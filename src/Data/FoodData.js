export const foodsItems = [
  {
    name: "Burger",
    img: "/img/burger.jpeg",
    section: "Burger",
  },
  {
    name: "Chicken Fingers",
    img: "/img/chickenfingers.jpeg",
    section: "Fingers",
  },
  {
    name: "Chicken Pizza",
    img: "/img/chickenpizza.jpeg",
    section: "Pizza",
  },
  {
    name: "Hot Slices",
    img: "/img/hotslices.jpeg",
    section: "Pizza",
  },
  {
    name: "Pepperoni Pizza",
    img: "/img/pepperpizza.jpeg",
    section: "Pizza",
  },
  {
    name: "Big Deal Pizza",
    img: "/img/xlarge.jpeg",
    section: "Pizza",
  },
];

export const foods = foodsItems.reduce((res, food) => {
  if (!res[food.section]) {
    res[food.section] = [];
  }
  res[food.section].push(food);
  return res;
}, {});
