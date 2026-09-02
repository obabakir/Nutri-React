import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// ------
import { CssVarsProvider } from "@mui/joy/styles";
import Avatar from "@mui/joy/Avatar";
import AvatarGroup from "@mui/joy/AvatarGroup";
import JoyButton from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// -------
// ========
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

// REDUX SLICE & SELECTOR => Payloadinng definition:
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

/**BASKET UCHUN PROPS**/
interface ProductsProps {
  onAdd: (item: CartItem) => void;
}
/**BASKET UCHUN PROPS**/
export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  /* useStatelar => */
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.SUPPLEMENT,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");

  // boshqa page ga ulashish => chosenProducts
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => {
        console.log("Failed to load products:", err);
      });
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /*HANDLER*/
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };
  const chooseDishHandler = (id: string) => {
    // console.log("product_id => :", id);
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          {/* =====================================================
        TOP CONTROL BOX
    ====================================================== */}
          <Stack className={"products-control-box"}>
            {/* TITLE + SEARCH */}
            <Stack className={"products-control-top"}>
              <Box className={"products-page-title"}>Online Nutrition Shop</Box>

              <Stack className={"single-search-big-box"}>
                <input
                  type={"search"}
                  className={"single-search-input"}
                  name={"singleResearch"}
                  placeholder={"Search products..."}
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />

                <Button
                  className={"single-button-search"}
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  Search
                </Button>
              </Stack>
            </Stack>

            {/* =====================================================
          CATEGORY BUTTONS
      ====================================================== */}
            <Stack className={"product-category"}>
              <Box>🏷️ Category</Box>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection ===
                  ProductCollection.SUPPLEMENT
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  searchCollectionHandler(ProductCollection.SUPPLEMENT);
                }}
              >
                SUPPLEMENT
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.PROTEIN
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  searchCollectionHandler(ProductCollection.PROTEIN);
                }}
              >
                PROTEIN
              </Button>

              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.VITAMIN
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  searchCollectionHandler(ProductCollection.VITAMIN);
                }}
              >
                VITAMIN
              </Button>

              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.MINERAL
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  searchCollectionHandler(ProductCollection.MINERAL);
                }}
              >
                MINERAL
              </Button>

              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.OTHER
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  searchCollectionHandler(ProductCollection.OTHER);
                }}
              >
                OTHER
              </Button>
            </Stack>

            {/* =====================================================
          SORT BUTTONS
      ====================================================== */}
            <Stack className={"dishes-filter-box"}>
              <Box>↕️ Sort by</Box>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                onClick={() => {
                  searchOrderHandler("createdAt");
                }}
              >
                New
              </Button>

              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  searchOrderHandler("productPrice");
                }}
              >
                Price
              </Button>

              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  searchOrderHandler("productViews");
                }}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          {/* =====================================================
        PRODUCTS
    ====================================================== */}
          <Stack className={"product-wrapper"}>
            {products.length !== 0 ? (
              products.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                const sizeVolume = product.productLeftCount + " left";

                return (
                  <Stack
                    key={product._id}
                    className={"product-card"}
                    onClick={() => {
                      chooseDishHandler(product._id);
                    }}
                  >
                    <Stack
                      className={"product-img"}
                      sx={{
                        backgroundImage: `url(${imagePath})`,
                      }}
                    >
                      <div className={"product-sale"}>{sizeVolume}</div>

                      {/* ADD TO CART */}
                      <Button
                        className={"shop-btn"}
                        onClick={(e) => {
                          console.log(
                            "BUTTON PRESSED AND STOPPROPAGATION STARTED",
                          );

                          onAdd({
                            _id: product._id,
                            quantity: 1,
                            name: product.productName,
                            price: product.productPrice,
                            image: product.productImages[0],
                          });

                          e.stopPropagation();
                        }}
                      >
                        <img
                          src={"/icons/shopping-cart.svg"}
                          style={{ display: "flex" }}
                        />
                      </Button>

                      {/* VIEWS */}
                      <Button className={"view-btn"} sx={{ right: "36px" }}>
                        <Badge
                          badgeContent={product.productViews}
                          color="secondary"
                        >
                          <RemoveRedEyeIcon
                            sx={{
                              color:
                                product.productViews === 0 ? "gray" : "white",
                            }}
                          />
                        </Badge>
                      </Button>
                    </Stack>

                    {/* PRODUCT INFO */}
                    <Box className={"product-desc"}>
                      <span className={"product-title"}>
                        {product.productName}
                      </span>

                      <div className={"product-desc"}>
                        <MonetizationOnIcon />
                        {product.productPrice}
                      </div>
                    </Box>
                  </Stack>
                );
              })
            ) : (
              <Box className="no-data">Products are not available!</Box>
            )}
          </Stack>

          {/* =====================================================
        PAGINATION
    ====================================================== */}
          <Stack className={"pagination-section"}>
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"brands-logo"}>
        <Container className={"family-brands"}>
          <Box className={"category-title"}>
            Get Professional Advice before You Buy
          </Box>

          <Stack className={"brand-list"}>
            <CssVarsProvider>
              {/* Advisor 1 */}
              <Card variant="outlined" className={"advisor-card"}>
                <Box className={"advisor-card-top"}>
                  <Avatar src="/img/advisor-female.jpg" size="lg" />

                  <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar>+4K</Avatar>
                  </AvatarGroup>
                </Box>

                <CardContent>
                  <Typography level="title-lg" className={"advisor-card-title"}>
                    Nutrition Advisor
                  </Typography>

                  <Typography
                    level="body-sm"
                    className={"advisor-card-description"}
                  >
                    Get personalized nutrition guidance and choose the right
                    products for your daily health and nutrition needs.
                  </Typography>
                </CardContent>

                <CardActions buttonFlex="0 1 120px">
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    sx={{ mr: "auto" }}
                  >
                    <FavoriteBorder />
                  </IconButton>

                  <JoyButton variant="outlined" color="neutral">
                    View
                  </JoyButton>

                  <JoyButton variant="solid" color="primary">
                    Consult
                  </JoyButton>
                </CardActions>
              </Card>

              {/* Advisor 2 */}
              <Card variant="outlined" className={"advisor-card"}>
                <Box className={"advisor-card-top"}>
                  <Avatar src="/img/fitness-advisor.jpg" size="lg" />

                  <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar>+3K</Avatar>
                  </AvatarGroup>
                </Box>

                <CardContent>
                  <Typography level="title-lg" className={"advisor-card-title"}>
                    Fitness Advisor
                  </Typography>

                  <Typography
                    level="body-sm"
                    className={"advisor-card-description"}
                  >
                    Find the right protein, supplements, and nutrition products
                    to support your workouts and fitness goals.
                  </Typography>
                </CardContent>

                <CardActions buttonFlex="0 1 120px">
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    sx={{ mr: "auto" }}
                  >
                    <FavoriteBorder />
                  </IconButton>

                  <JoyButton variant="outlined" color="neutral">
                    View
                  </JoyButton>

                  <JoyButton variant="solid" color="primary">
                    Consult
                  </JoyButton>
                </CardActions>
              </Card>

              {/* Advisor 3 */}
              <Card variant="outlined" className={"advisor-card"}>
                <Box className={"advisor-card-top"}>
                  <Avatar src="/img/advisor-male.jpg" size="lg" />

                  <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar>+5K</Avatar>
                  </AvatarGroup>
                </Box>

                <CardContent>
                  <Typography level="title-lg" className={"advisor-card-title"}>
                    Supplement Advisor
                  </Typography>

                  <Typography
                    level="body-sm"
                    className={"advisor-card-description"}
                  >
                    Need help choosing vitamins, minerals, proteins, or other
                    supplements? Get professional product recommendations.
                  </Typography>
                </CardContent>

                <CardActions buttonFlex="0 1 120px">
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    sx={{ mr: "auto" }}
                  >
                    <FavoriteBorder />
                  </IconButton>

                  <JoyButton variant="outlined" color="neutral">
                    View
                  </JoyButton>

                  <JoyButton variant="solid" color="primary">
                    Consult
                  </JoyButton>
                </CardActions>
              </Card>

              {/* Advisor 4 */}
              <Card variant="outlined" className={"advisor-card"}>
                <Box className={"advisor-card-top"}>
                  <Avatar src="/img/wellness-advisor.jpg" size="lg" />

                  <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar>+6K</Avatar>
                  </AvatarGroup>
                </Box>

                <CardContent>
                  <Typography level="title-lg" className={"advisor-card-title"}>
                    Wellness Advisor
                  </Typography>

                  <Typography
                    level="body-sm"
                    className={"advisor-card-description"}
                  >
                    Build a healthier daily routine with balanced nutrition and
                    products selected for your personal wellness goals.
                  </Typography>
                </CardContent>

                <CardActions buttonFlex="0 1 120px">
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    sx={{ mr: "auto" }}
                  >
                    <FavoriteBorder />
                  </IconButton>

                  <JoyButton variant="outlined" color="neutral">
                    View
                  </JoyButton>

                  <JoyButton variant="solid" color="primary">
                    Consult
                  </JoyButton>
                </CardActions>
              </Card>
            </CssVarsProvider>
          </Stack>
        </Container>
      </div>

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Business Address</Box>

            <iframe
              style={{ marginTop: "60px", border: 0 }}
              title="Business Address"
              src="https://www.google.com/maps/embed?pb=!1m5!3m3!1m2!1s0x357b1becc9c2e76b%3A0xef5070f27a3d85c6!2s201%ED%98%B8%2C%2017-10%20Yeosul%203-gil%2C%20Poseung-eup%2C%20Pyeongtaek%2C%20Gyeonggi-do!5e0!3m2!1sen!2skr!4v1788318323394!5m2!1sen!2skr"
              width="1320"
              height="500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </Stack>
        </Container>
      </div>
    </div>
  );
}
//
