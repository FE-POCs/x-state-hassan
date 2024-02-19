/* eslint-disable react/prop-types */
import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import { IoCartOutline } from "react-icons/io5";
import ProductsMenu from "./ProductsMenu";
import { useState } from "react";

export default function Header({ cart, cartProducts }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} fontWeight={"bold"}>
            Shopping Store
          </Typography>
          <IconButton
            onClick={(e) => {
              if (cart > 0) setAnchorEl(e.currentTarget);
            }}
          >
            <Badge badgeContent={cart || 0} color="secondary">
              <IoCartOutline />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <ProductsMenu
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        cartProducts={cartProducts}
      />
    </>
  );
}
