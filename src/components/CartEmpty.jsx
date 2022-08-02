import React from "react";
import { Link } from "react-router-dom";

import cartEmptyImg from "../assets/img/empty-cart.png";

function CartEmpty() {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Корзина пустая 😕</h2>
        <p>Вероятней всего, вы не добавляли пиццу для заказа.</p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
}

export default CartEmpty;
