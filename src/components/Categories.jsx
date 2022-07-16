import React, { useState } from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = useState();

  const categories = [
    "Все",
    "Мясные",
    "Вегатерианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onClickHandle = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            key={i}
            onClick={() => onClickHandle(i)}
            className={activeIndex === i ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
