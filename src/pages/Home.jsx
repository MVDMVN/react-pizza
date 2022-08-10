import { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
} from "../redux/slices/filterSlice";

import { fetchPizzas, selectPizzas } from "../redux/slices/pizzasSlice";

import { selectSearch } from "../redux/slices/searchSlice";

import qs from "qs";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sortType, currentPage } = useSelector(selectFilter);
  const search = useSelector(selectSearch);
  const { pizzasList, status } = useSelector(selectPizzas);

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
  }, [categoryId, sortType, search, currentPage]);

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
        {status !== "error" && pizzasItems.length > 0 && (
          <h2 className="content__title">Все пиццы</h2>
        )}
        {pizzasItems.length <= 0 && (
          <div className="content__empty">
            <h2>Похоже, у нас нет пиццы, которую вы ищете. 😱</h2>
            <p>Попробуйте поискать что-то другое.</p>
          </div>
        )}
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
        {status !== "error" && pizzasItems.length > 0 && (
          <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        )}
      </div>
    </>
  );
}

export default Home;
