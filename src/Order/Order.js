import React from "react";
import styled from "styled-components";
import {
  DialogContent,
  DialogFooter,
  ConfirmButton,
} from "../FoodDialog/FoodDialoge";
import {formatPrice} from "../Data/FoodData";
import {getPrice} from "../FoodDialog/FoodDialoge";

const OrderStyled = styled.div`
  position: fixed;
  right: 0px;
  top: 48px;
  width: 340px;
  background-color: white;
  height: calc(100%-48px);
  height: -webkit-calc(100% - 48px);
  height: -moz-calc(100% - 48px);
  z-index-10;
  box-shadow:4px 0px 5px 4px grey;
  display: flex;
  flex-direction: column;
`;

const OrderContent = styled(DialogContent)`
  padding: 20px;
  height: 100%;
`;

const OrderContainer = styled.div`
  padding: 10px 0px;
  border-bottom: 1px solid grey;
  ${({editable}) =>
    editable
      ? `
    &:hover {
      cursor: pointer;
      background-color: #e7e7e7;
    }
  `
      : `
    pointer-events: none; 
  `}
`;

const OrderItems = styled.div`
  padding: 10px 0px;
  display: grid;
  grid-template-columns: 14px 140px 28px 60px;
  justify-content: space-between;
`;

const DetailItem = styled.div`
  color: grey;
  font-size: 10px;
`;

export function Order({orders, setOrders, setOpenFood}) {
  const subtotal = orders.reduce((total, order) => {
    return total + getPrice(order);
  }, 0);
  const tax = subtotal * 0.07;
  const total = tax + subtotal;
  const deleteItem = (index) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  };

  return (
    <OrderStyled>
      <OrderContent>
        {orders.length === 0 ? (
          <OrderContent>Your order looki'n pretty empty!</OrderContent>
        ) : (
          <OrderContent>
            <OrderContainer>Your Order:</OrderContainer>
            {orders.map((order, index) => (
              <OrderContainer editable>
                <OrderItems
                  onClick={() => {
                    setOpenFood({...order, index});
                  }}
                >
                  <div>{order.quantity}</div>
                  <div>{order.name}</div>
                  <div
                    style={{cursor: "pointer", border: "1px"}}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteItem(index);
                    }}
                  >
                    ❌
                  </div>
                  <div>{formatPrice(getPrice(order))}</div>
                </OrderItems>
                <DetailItem>
                  {order.toppings
                    .filter((t) => t.checked)
                    .map((topping) => topping.name)
                    .join(", ")}
                </DetailItem>
                {order.choice && <DetailItem>{order.choice}</DetailItem>}
              </OrderContainer>
            ))}
            <OrderContainer>
              <OrderItems>
                <div />
                <div>Subtotal</div>
                <div>{formatPrice(subtotal)}</div>
              </OrderItems>
              <OrderItems>
                <div />
                <div>Tax</div>
                <div>{formatPrice(tax)}</div>
              </OrderItems>
              <OrderItems>
                <div />
                <div>Total</div>
                <div>{formatPrice(total)}</div>
              </OrderItems>
            </OrderContainer>
          </OrderContent>
        )}
        <DialogFooter>
          <ConfirmButton>Checkout</ConfirmButton>
        </DialogFooter>
      </OrderContent>
    </OrderStyled>
  );
}
