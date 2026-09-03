import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: #343434;
  box-sizing: border-box;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        {/* ================= MAIN FOOTER ================= */}
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            mt: "94px",
            width: "100%",
          }}
        >
          {/* ================= LEFT ================= */}
          <Stack
            direction="column"
            sx={{
              width: "340px",
            }}
          >
            <Box>
              <img
                className="footer-logo"
                src="/img/project-logo.png"
                alt="NutriMart"
              />
            </Box>

            <Box className="foot-desc-txt">
              NutriMart makes quality nutrition products simple to discover,
              compare, and shop online. We care about your physical wellness and
              beauty!
            </Box>

            <Box className="sns-context">
              <img src="/icons/facebook.svg" alt="Facebook" />
              <img src="/icons/twitter.svg" alt="Twitter" />
              <img src="/icons/instagram.svg" alt="Instagram" />
              <img src="/icons/youtube.svg" alt="YouTube" />
            </Box>
          </Stack>

          {/* ================= RIGHT ================= */}
          <Stack
            direction="row"
            sx={{
              gap: "100px",
              pt: "8px",
            }}
          >
            {/* SECTIONS */}
            <Box>
              <Box className="foot-category-title">Sections</Box>

              <Box className="foot-category-link">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>

                {authMember && <Link to="/orders">Orders</Link>}

                <Link to="/help">Help</Link>
              </Box>
            </Box>

            {/* VISIT US */}
            <Box>
              <Box className="foot-category-title">Visit us</Box>

              <Box className="foot-category-link">
                <Box className="find-us">
                  <span>L.</span>
                  <div>South Korea, Pyeongtaek</div>
                </Box>

                <Box className="find-us">
                  <span>P.</span>
                  <div>+010-9504-0797</div>
                </Box>

                <Box className="find-us">
                  <span>E.</span>
                  <div>nutrimart@gmail.com</div>
                </Box>

                <Box className="find-us">
                  <span>H.</span>
                  <div>Visit 24/7</div>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Stack>

        {/* ================= DIVIDER ================= */}
        <Box
          sx={{
            width: "100%",
            height: "1px",
            mt: "80px",
            background: "#c5c8c9",
            opacity: 0.2,
          }}
        />

        {/* ================= COPYRIGHT ================= */}
        <Stack className="copyright-txt">
          © Copyright NutriMart Global, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
