import React from "react";
import { Box, Container, Stack } from "@mui/material";

export default function Statistics() {
  return (
    <div className="static-frame">
      <Container>
        <Stack className="nutrimart-benefits">
          {/* Quality Products */}
          <Stack className="benefit-box">
            <Box className="benefit-icon">✦</Box>

            <Box className="benefit-title">Quality Products</Box>

            <Box className="benefit-text">
              Carefully selected for your wellness
            </Box>
          </Stack>

          <Box className="benefit-divider" />

          {/* Easy Shopping */}
          <Stack className="benefit-box">
            <Box className="benefit-icon">⌁</Box>

            <Box className="benefit-title">Easy Shopping</Box>

            <Box className="benefit-text">
              Simple and convenient online shopping
            </Box>
          </Stack>

          <Box className="benefit-divider" />

          {/* Trusted Choice */}
          <Stack className="benefit-box">
            <Box className="benefit-icon">✓</Box>

            <Box className="benefit-title">Trusted Choice</Box>

            <Box className="benefit-text">
              Products you can feel confident about
            </Box>
          </Stack>

          <Box className="benefit-divider" />

          {/* Daily Wellness */}
          <Stack className="benefit-box">
            <Box className="benefit-icon">♡</Box>

            <Box className="benefit-title">Daily Wellness</Box>

            <Box className="benefit-text">
              Better choices for everyday living
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
