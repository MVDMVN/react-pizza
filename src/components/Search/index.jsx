import { useState, useContext, useRef, useCallback } from "react";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearch } from "../../redux/slices/searchSlice";
import { setCurrentPage } from "../../redux/slices/filterSlice";

import styles from "./Search.module.scss";

const Search = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearch(str));
      dispatch(setCurrentPage(1)); // 1 потому что в компоненте пагинации мы передаём currentPage - 1
    }, 500),
    []
  );

  const onClickClear = () => {
    dispatch(setSearch(""));
    setValue("");
    inputRef.current.focus();
  };

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
        className={styles.icon}
      >
        <path
          d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
          id="XMLID_223_"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 0 48 48"
          width="48"
          className={styles.close}
        >
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
