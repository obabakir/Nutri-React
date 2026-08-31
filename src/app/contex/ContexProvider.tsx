// import React, { ReactNode, useState } from "react";
// import Cookies from "universal-cookie";
// import { Member } from "../../lib/types/member";
// import { GlobalContex } from "../hooks/useGlabals";

// const ContexProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const cookies = new Cookies();
//   //   cookies data => removed by timelimit => we remove = data in localStorage

//   //   TODO:ertaga shu mantiqi tekshiramiz
//   if (!cookies.get("accessToken")) localStorage.removeItem("memberData");

//   const [authMember, setAuthMember] = useState<Member | null>(
//     // making data reusable
//     localStorage.getItem("memberData")
//       ? JSON.parse(localStorage.getItem("memberData") as string)
//       : null,
//   );
// const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
//   console.log("=== verify ===");

//   return (
//     <GlobalContex.Provider value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}>
//       {children}
//     </GlobalContex.Provider>
//   );
// };

// export default ContexProvider;

import axios from "axios";
import React, { ReactNode, useEffect, useState } from "react";
import { Member } from "../../lib/types/member";
import { GlobalContex } from "../hooks/useGlabals";

const ContexProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem("memberData")
      ? JSON.parse(localStorage.getItem("memberData") as string)
      : null,
  );
  // ====
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
  // ====
  useEffect(() => {
    const verifyMember = async () => {
      try {
        const result = await axios.get("http://localhost:3003/member/detail", {
          withCredentials: true,
        });

        console.log("verify member =>", result.data);

        setAuthMember(result.data);

        localStorage.setItem("memberData", JSON.stringify(result.data));
      } catch (err) {
        console.log("Not authenticated");

        setAuthMember(null);

        localStorage.removeItem("memberData");
      }
    };

    verifyMember();
  }, []);

  return (
    <GlobalContex.Provider
      value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}
    >
      {children}
    </GlobalContex.Provider>
  );
};

export default ContexProvider;
