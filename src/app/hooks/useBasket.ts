import { useState } from "react";
import { CartItem } from "../../lib/types/search";

const useBasket = () => {
  // ========
  const cartJson: string | null = localStorage.getItem("cartData");
  const curretCart = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(curretCart);
  // ozgaruvchi => chaqiruvchi kamanda => boshlangich qiymat

  /** HANDLERS**/
  const onAdd = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id,
    );
    if (exist) {
      // bu yangi amal, nomi qilayotgan amalimizga berildi, bor mahsulotni sonini qoshadi
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item,
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      // agar bor bolmaganda item bu yerga qaytadi
      const cartUpdate = [...cartItems, { ...input }];
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  //   basketdagi - tugmasi un
  const onRemove = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id,
    );
    if (exist.quantity === 1) {
      const cartUpdate = cartItems.filter(
        (item: CartItem) => item._id !== input._id,
      );

      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      /** agar 1 dan kop bolsa unda faqat 1 tasini ayriydi va qolganini qaytaradi va bu jarayonlarni hammasi localSotoragega yoziladi**/
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity - 1 }
          : item,
      );

      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  //   basketdagi x tugmasi un, !== yani tenglama / ochir mantigi
  const onDelete = (input: CartItem) => {
    const cartUpdate = cartItems.filter(
      (item: CartItem) => item._id !== input._id,
    );
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  //   basketdagi musur idish tugmasi un
  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cartData");
  };
  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
  };
};

export default useBasket;
