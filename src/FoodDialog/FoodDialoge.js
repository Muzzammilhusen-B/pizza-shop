import React from "react";
import styled from "styled-components";
import {FoodLabel} from "../Menu/FoodGrid";
import {pizzaRed} from "../Styles/colors";
import {Title} from "../Styles/title";
import {formatPrice} from "../Data/FoodData";
import {QuantityInput} from "./QuantityInput";
import {useQuantity} from "../Hooks/useQuantity";
import {Toppings} from "./Toppings";
import {useToppings} from "../Hooks/useToppings";
import {useChoice} from "../Hooks/useChoice";
import {Choices} from "./Choices";

const Dialog = styled.div`
  width: 500px;
  position: fixed;
  background-color: white;
  top: 75px;
  z-index: 5;
  max-height: -webkit-calc(100% - 100px);
  max-height: -moz-calc(100% - 100px);
  max-height: calc(100% - 100px);
  left: -webkit-calc(50% - 250px);
  left: -moz-calc(50% - 250px);
  left: calc(50% - 250px);
  display:flex:
  flex-direction:column;
`;

export const DialogContent = styled.div`
  overflow: auto;
  min-height: 100px;
  padding: 0px 40px;
  padding-bottom: 80px;
`;

export const DialogFooter = styled.div`
  box-shadow: 0px -2px 10px 0px grey;
  height: 60px;
  display: flex;
  justify-content: center;
`;

export const ConfirmButton = styled(Title)`
  margin: 10px;
  color: white;
  height: 20px;
  padding: 10px;
  border-radius: 5px;
  width: 200px;
  text-align: center;
  cursor: pointer;
  background-color: ${pizzaRed};
  ${({disabled}) =>
    disabled &&
    ` opactity: .5; 
    background-color: grey; 
    pointer-events: none; 
  `}
`;

const DialogBanner = styled.div`
  height: 200px;
  margin-bottom: 20px;
  ${({img}) => (img ? `background-image: url(${img});` : `min-height: 75px;`)}
  background-position:center;
  background-size: cover;
`;
const DialogBannerName = styled(FoodLabel)`
  font-size: 30px;
  padding: 5px 40px;
  top: ${({img}) => (img ? `100px` : `20px`)};
`;

const DialogShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
`;

const priceperTopping = 50;

export function getPrice(order) {
  return (
    order.quantity *
    (order.price +
      order.toppings.filter((t) => t.checked).length * priceperTopping)
  );
}

function hasToppings(food) {
  return food.section === "Pizza";
}

function FoodDialogContainer({openFood, setOpenFood, orders, setOrders}) {
  const quantity = useQuantity(openFood && openFood.quantity);
  const toppings = useToppings(openFood.toppings);
  const choiceRadio = useChoice(openFood.choice);

  function close() {
    setOpenFood();
  }

  const order = {
    ...openFood,
    quantity: quantity.value,
    toppings: toppings.toppings,
    choice: choiceRadio.value,
  };

  function addToOrder() {
    setOrders([...orders, order]);
    close();
  }

  return openFood ? (
    <>
      <DialogShadow onClick={close} />
      <Dialog>
        <DialogBanner img={openFood.img}>
          <DialogBannerName>{openFood.name}</DialogBannerName>
        </DialogBanner>
        <DialogContent>
          <QuantityInput quantity={quantity} />
          {hasToppings(openFood) && (
            <>
              <h3>Would you like toppings?</h3>
              <Toppings {...toppings} />
            </>
          )}
          {openFood.choices && (
            <Choices choiceRadio={choiceRadio} openFood={openFood} />
          )}
        </DialogContent>
        <DialogFooter>
          <ConfirmButton
            onClick={addToOrder}
            disabled={openFood.choices && !choiceRadio.value}
          >
            Add to order:{formatPrice(getPrice(order))}
          </ConfirmButton>
        </DialogFooter>
      </Dialog>
    </>
  ) : null;
}

export function FoodDialog(props) {
  if (!props.openFood) return null;
  return <FoodDialogContainer {...props} />;
}
