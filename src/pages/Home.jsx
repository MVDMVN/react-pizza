import { React, useState, useEffect } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

import axios from "axios";

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://62d30c4f81cb1ecafa69a899.mockapi.io/items")
      .then((response) => {
        setPizzas(response.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : pizzas.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)}
        </div>
      </div>
    </>
  );
}

export default Home;
