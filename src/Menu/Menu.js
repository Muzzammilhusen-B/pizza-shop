import React from "react";
import styled from "styled-components";
import {foods} from "../Data/FoodData";
import {Food, FoodGrid, FoodLabel} from "./FoodGrid";

export const MenuStyled = styled.div`
  margin: 0px 400px 50px 20px;
  height: 1000px;
`;

export function Menu({setOpenFood}) {
  return (
    <MenuStyled>
      {Object.entries(foods).map(([sectionName, foods]) => (
        <>
          <h1>{sectionName}</h1>
          <FoodGrid>
            {foods.map((food) => (
              <Food
                img={food.img}
                onClick={() => {
                  setOpenFood(food.name);
                }}
              >
                <FoodLabel>{food.name}</FoodLabel>
              </Food>
            ))}
          </FoodGrid>
        </>
      ))}
    </MenuStyled>
  );
}
