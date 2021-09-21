import React from "react";
import styled from "styled-components";
import {
  DialogContent,
  DialogFooter,
  ConfirmButton,
} from "../FoodDialog/FoodDialoge";
import {formatPrice} from "../Data/FoodData";
import {useOpenFood} from "../Hooks/useOpenFood";
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
`;

const OrderItems = styled.div`
  padding: 10px 0px;
  display: grid;
  grid-template-columns: 20px 150px 20px 60px;
  justify-content: space-between;
`;

export function Order({orders}) {
  const subtotal = orders.reduce((total, order) => {
    return total + getPrice(order);
  }, 0);
  const tax = subtotal * 0.07;
  const total = tax + subtotal;
  return (
    <OrderStyled>
      <OrderContent>
        {orders.length === 0 ? (
          <OrderContent>Your order looki'n pretty empty!</OrderContent>
        ) : (
          <OrderContent>
            <OrderContainer>Your Order:</OrderContainer>
            {orders.map((order) => (
              <OrderContainer>
                <OrderItems>
                  <div>{order.quantity}</div>
                  <div>{order.name}</div>
                  <div />
                  <div>{formatPrice(getPrice(order))}</div>
                </OrderItems>
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
