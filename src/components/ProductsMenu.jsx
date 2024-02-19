/* eslint-disable react/prop-types */
import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";

function ProductMenuItem({ product }) {
  return (
    <MenuItem>
      <ListItemAvatar>
        <Avatar src={product?.image} />
      </ListItemAvatar>
      <ListItemText
        primary={
          product?.title?.length > 20
            ? product?.title?.slice(0, 20) + "..."
            : product?.title
        }
        secondary={product?.price}
      />
    </MenuItem>
  );
}

export default function ProductsMenu({
  open,
  anchorEl,
  onClose,
  cartProducts,
}) {
  return (
    <Paper
      sx={{
        width: 620,
        maxWidth: "100%",
      }}
    >
      <Menu open={open} onClose={onClose} anchorEl={anchorEl}>
        {cartProducts?.map((product) => (
          <MenuList key={product.id}>
            <ProductMenuItem product={product} />
          </MenuList>
        ))}
      </Menu>
    </Paper>
  );
}
