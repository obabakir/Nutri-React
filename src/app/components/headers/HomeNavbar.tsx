import { Box, Button, Container, Stack } from "@mui/material";

import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlabals";

interface HomeNavbarrProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}
// nega bosh erray ==> chunki biz app.tst da basketimizdagi localstoragedan bor bolgan productlarni render qilish ni ishlatayapmiz va shunga array ichida bir necha poroductlar bolishini taminlaydi

export default function HomeNavbar(props: HomeNavbarrProps) {
  const { setSignupOpen } = props;

  // const authMember = null; HARD CODINGS
  const { authMember } = useGlobals();

  return (
    <div className="home-navbar">
      {/* ---------- */}
      <Container className="navbar-container">
        <Stack className="header-frame">
          <Stack className="detail">
            <Box className="head-main-txt">Your Health - Our Priority.</Box>
            <Box className="wel-txt">Shop Quality Products Online.</Box>
            <Box className="service-txt"> 24 hours service</Box>
            <Box className="signup">
              {!authMember ? (
                <Button
                  variant={"contained"}
                  className={"signup-button"}
                  onClick={() => setSignupOpen(true)}
                >
                  SIGN UP
                </Button>
              ) : null}
            </Box>
          </Stack>
          <Box className="logo-frame">
            <div className="project-logo-img"></div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
