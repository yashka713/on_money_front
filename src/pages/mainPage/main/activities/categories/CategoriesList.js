import React from "react";
import Category from "./Category";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";

export const CategoriesList = ({ list }) => {
  let categoriestList = list.map(category => {
    return <Category category={category} key={category.id} />;
  });

  return (
    <ul className="flexContainer">
      {categoriestList}
      <li className="flexBox centralize">
        <span>
          <FontAwesomeIcon
            icon={faPlus}
            className="cursor-pointer addCategory"
          />
        </span>
      </li>
    </ul>
  );
};
