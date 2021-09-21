import React from "react";
import styled from "styled-components";
import {FoodLabel} from "../Menu/FoodGrid";

const Dialog = styled.div`
  width: 500px;
  height: 2000px;
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
`;

const DialogBanner = styled.div`
  height: 200px;
  margin-bottom: 20px;
  ${({img}) => `background-image:url(${img});`}
  background-position:center;
  background-size: cover;
`;
const DialogBannerName = styled(FoodLabel)`
  top: 100px;
  font-size: 30px;
  padding: 5px 40px;
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

export function FoodDialog({openFood, setOpenFood}) {
  function close() {
    setOpenFood();
  }

  return openFood ? (
    <>
      <DialogShadow onClick={close} />
      <Dialog>
        <DialogBanner img={openFood.img}>
          <DialogBannerName>{openFood.name}</DialogBannerName>
        </DialogBanner>
      </Dialog>
    </>
  ) : null;
}
