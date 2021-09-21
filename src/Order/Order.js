import React from "react";
import styled from "styled-components";
import {
  DialogContent,
  DialogFooter,
  ConfirmButton,
} from "../FoodDialog/FoodDialoge";
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
`;

export function Order({orders}) {
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
                <OrderItems>{order.name}</OrderItems>
              </OrderContainer>
            ))}
          </OrderContent>
        )}
        <DialogFooter>
          <ConfirmButton>Checkout</ConfirmButton>
        </DialogFooter>
      </OrderContent>
    </OrderStyled>
  );
}
