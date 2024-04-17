import React from "react";
import { useSelector } from "react-redux";
import { categorySelector } from "../redux/categorySlice";
import MainCategory from "./MainCategory";

export default function HomePageCard() {
  const { category } = useSelector(categorySelector);

  return (
    <div>
      {category.map((cat) => (
        <div className="homePage">
          <MainCategory props={cat} />
        </div>
      ))}
    </div>
  );
}
