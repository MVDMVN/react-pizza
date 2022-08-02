import { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import { setItems, fetchPizzas } from "../redux/slices/pizzasSlice";

import qs from "qs";

import Categories from "../components/Categories";
import Sort, { sortItemsList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sortType, currentPage } = useSelector(
    (state) => state.filter
  );
  const search = useSelector((state) => state.search.search);
  const { pizzasList, status } = useSelector((state) => state.pizzas);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.sortProperty;
    const order = sortType.hasOwnProperty("order") ? `${sortType.order}` : "";
    const searchValue = search ? `&search=${search}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        category,
        order,
        searchValue,
        currentPage,
      })
    );
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortItem: sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sortType, categoryId, currentPage]);

  //Если был первый рендер то проверяем URL параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, []);

  const pizzasItems = pizzasList.map((pizza) => (
    <PizzaBlock {...pizza} key={pizza.id} />
  ));
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="container">
        {status !== "error" && (
          <div className="content__top">
            <Categories value={categoryId} onClickCategory={onClickCategory} />
            <Sort />
          </div>
        )}
        {status !== "error" && <h2 className="content__title">Все пиццы</h2>}
        {status === "error" ? (
          <div className="content__error-info">
            <h2>Произошла ошибка 😕</h2>
            <p>
              К сожалению, не удалось загрузиить питсы. Попробуйте повторить
              позже.
            </p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeletons : pizzasItems}
          </div>
        )}
        {status !== "error" && (
          <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        )}
      </div>
    </>
  );
}

export default Home;
