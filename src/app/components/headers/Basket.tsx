import React, { useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory, useLocation } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlabals";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderService from "../../services/OrderServise";

// === basket un
interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();
  const location = useLocation();

  // ==== for basket price calcualtion ====
  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0,
    /** bu nol boshlangich qiymat un/ a ning qiymati sifatida bilsak boladi**/
  );
  const shippingCost: number = itemsPrice < 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setAnchorEl(null);
  }, [location.pathname]);

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();

      await order.createOrder(cartItems);

      onDeleteAll();

      // REFRESH VIA CONTEXT
      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      console.log("Error:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        }}
      >
        <Badge
          badgeContent={cartItems.length}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#8B6F47",
              color: "#fff",
              fontWeight: 700,
              minWidth: 19,
              height: 19,
              fontSize: "11px",
            },
          }}
        >
          <img
            src={"/icons/shopping-cart.svg"}
            alt="Shopping cart"
            style={{
              width: "25px",
              height: "25px",
            }}
          />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "hidden",

            width: "450px",
            maxWidth: "calc(100vw - 24px)",

            maxHeight: "650px",

            backgroundColor: "#F5EFE6",

            borderRadius: "18px",

            boxShadow: "0 10px 30px rgba(92, 70, 48, 0.18)",

            mt: 1.5,

            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",

              top: 0,
              right: 14,

              width: 10,
              height: 10,

              backgroundColor: "#F5EFE6",

              transform: "translateY(-50%) rotate(45deg)",

              zIndex: 0,
            },
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <Stack
          className={"basket-frame"}
          sx={{
            width: "98%",
            backgroundColor: "#F5EFE6",
            color: "#3E342A",
          }}
        >
          {/* CART HEADER */}
          <Box
            className={"all-check-box"}
            sx={{
              padding: "17px 20px",
              backgroundColor: "#FFFDF9",
              borderBottom: "1px solid #E4D8C8",
              color: "#5C4630",
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            {cartItems.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  color: "#8B6F47",
                }}
              >
                Cart is empty!
              </Box>
            ) : (
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box>Delete all ORDERS</Box>

                <DeleteSweepIcon
                  sx={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    color: "#8B6F47",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "#5C4630",
                      transform: "scale(1.1)",
                    },
                  }}
                  onClick={() => onDeleteAll()}
                />
              </Stack>
            )}
          </Box>

          {/* PRODUCTS */}
          <Box
            className={"orders-main-wrapper"}
            sx={{
              maxHeight: "310px",
              minHeight: "120px",
              overflowY: "auto",
              padding: "14px",

              "&::-webkit-scrollbar": {
                width: "5px",
              },

              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#C9B69E",
                borderRadius: "10px",
              },
            }}
          >
            {/* here-- */}
            <Box
              className={"orders-wrapper"}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "9px",
              }}
            >
              {cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.image}`;

                return (
                  <Box
                    className={"basket-info-box"}
                    key={item._id}
                    sx={{
                      position: "relative",

                      display: "grid",
                      gridTemplateColumns: "58px 1fr auto",
                      gridTemplateRows: "auto auto",

                      alignItems: "center",

                      gap: "3px 12px",

                      padding: "11px",

                      backgroundColor: "#FFFDF9",

                      border: "1px solid #EADFD1",
                      borderRadius: "14px",

                      boxShadow: "0 3px 12px rgba(92, 70, 48, 0.08)",

                      transition: "all 0.25s ease",

                      "&:hover": {
                        transform: "translateY(-2px)",
                        borderColor: "#CDB99D",
                        boxShadow: "0 8px 22px rgba(92, 70, 48, 0.14)",
                      },
                    }}
                  >
                    {/* DELETE */}
                    <Box
                      className={"cancel-btn"}
                      sx={{
                        position: "absolute",
                        top: "15px",
                        right: "8px",
                        zIndex: 2,
                      }}
                    >
                      <CancelIcon
                        onClick={() => onDelete(item)}
                        sx={{
                          fontSize: "32px",
                          color: "#A48A6C",
                          cursor: "pointer",
                          opacity: 0.65,

                          transition: "all 0.2s ease",

                          "&:hover": {
                            color: "#6B4D32",
                            opacity: 1,
                            transform: "scale(1.12)",
                          },
                        }}
                      />
                    </Box>

                    {/* IMAGE */}
                    <img
                      src={imagePath}
                      alt={item.name}
                      className={"product-img"}
                      style={{
                        width: "58px",
                        height: "58px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        backgroundColor: "#F1E8DC",
                        border: "1px solid #EADFD1",
                      }}
                    />

                    {/* NAME */}
                    <Box
                      className={"product-name"}
                      sx={{
                        minWidth: 0,
                        paddingRight: "22px",

                        fontSize: "14px",
                        fontWeight: 700,

                        color: "#4D3927",

                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name}
                    </Box>

                    {/* PRICE */}
                    <Box
                      className={"product-price"}
                      sx={{
                        margin: 0,
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#8B6F47",
                      }}
                    >
                      {item.price} x {item.quantity}
                    </Box>

                    {/* QUANTITY */}
                    <Box
                      sx={{
                        minWidth: 120,
                      }}
                    >
                      <Box
                        className="col-2"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <button
                          onClick={() => onRemove(item)}
                          className="remove"
                          style={{
                            width: "28px",
                            height: "28px",

                            border: "none",
                            borderRadius: "8px",

                            backgroundColor: "#EEE4D7",
                            color: "#6D5238",

                            fontSize: "17px",
                            fontWeight: 700,

                            cursor: "pointer",

                            transition: "all 0.2s ease",
                          }}
                        >
                          -
                        </button>

                        <button
                          onClick={() => onAdd(item)}
                          className="add"
                          style={{
                            width: "28px",
                            height: "28px",

                            border: "none",
                            borderRadius: "8px",

                            backgroundColor: "#8B6F47",
                            color: "#FFFFFF",

                            fontSize: "17px",
                            fontWeight: 700,

                            cursor: "pointer",

                            transition: "all 0.2s ease",
                          }}
                        >
                          +
                        </button>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* ORDER */}
          {cartItems.length !== 0 ? (
            <Box
              className={"basket-order"}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",

                gap: "12px",

                padding: "16px 18px",

                backgroundColor: "#FFFDF9",

                borderTop: "1px solid #E4D8C8",
              }}
            >
              <Box
                className={"price"}
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#5C4630",
                }}
              >
                Total: ${totalPrice} ({itemsPrice} + {shippingCost})
              </Box>

              <Button
                onClick={proceedOrderHandler}
                startIcon={<ShoppingCartIcon />}
                variant={"contained"}
                sx={{
                  minWidth: "95px",

                  padding: "9px 15px",

                  borderRadius: "10px",

                  backgroundColor: "#8B6F47",
                  color: "#FFFFFF",

                  fontSize: "14px",
                  fontWeight: 700,

                  textTransform: "none",

                  boxShadow: "0 3px 8px rgba(92, 70, 48, 0.12)",

                  "&:hover": {
                    backgroundColor: "#6F5638",

                    transform: "translateY(-2px)",

                    boxShadow: "0 7px 16px rgba(92, 70, 48, 0.20)",
                  },
                }}
              >
                Order
              </Button>
            </Box>
          ) : null}
        </Stack>
      </Menu>
    </Box>
  );
}
