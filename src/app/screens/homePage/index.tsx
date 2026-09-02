import React, { useEffect } from "react";

// import { Container } from "@mui/material";
import Statistics from "./Statistics";
import CustomerFavorites from "./CustomerFavorites";
import NewProducts from "./NewProducts";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
// import { createSelector } from "reselect";
import {
  setNewDishes,
  setPopularDishes /*setTestGroup*/,
  setTopUsers,
} from "./slice";
// import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { ProductService } from "../../services/ProductService"; // or the correct path to ProductService
// import { ProductCollection } from "../../../lib/enums/product.enum";
import "../../../css/home.css";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";

// REDUX SLICE & SELECTOR => Payloadinng definition:
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
  /*
  eshmat: (data: Product[]) => dispatch(setTestGroup(data)),
  */
});
// 1 - setPopularDishes: staring/calling commandasi
// 2 - setPopularDishes: selector.ts dan kelayapti

/* const TestGroupRetriever = createSelector(
 retrieveTestGroup,
  (toshmat) => ({ toshmat }),
); */

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } =
    actionDispatch(useDispatch());

  /*
  const { eshmat } = useSelector(TestGroupRetriever);  
  */

  // Selector: Store => Date

  useEffect(() => {
    // Backend server data request => Date /// DATA FETCH
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        // productCollection: ProductCollection.SUPPLEMENT,
      })
      .then((data) => {
        setPopularDishes(data);
      })
      .catch((err) => console.log("Error:", err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        // productCollection: ProductCollection.PROTEIN,
        // commit qilganimiz un eng ohirgi qoshilgan orderlarni olib beradi
      })
      .then((data) => {
        setNewDishes(data);
      })
      .catch((err) => console.log("Error:", err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));

    // Slice: Date => Store
  }, []);

  return (
    <div className="homepage">
      <Statistics />
      <CustomerFavorites />
      <NewProducts />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
