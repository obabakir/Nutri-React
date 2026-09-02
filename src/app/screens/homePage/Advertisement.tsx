import React from "react";
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
import { Box, Button, Container, Stack } from "@mui/material";
// -------

export default function Advertisement() {
  return (
    <>
      <div className={"home-ads"}>
        <Container className={"home-ads-main"}>
          <Box className={"home-ads-title"}>
            Get Professional Advice before You Buy
          </Box>

          <Stack className={"home-ads-list"}>
            <CssVarsProvider>
              {/* Advisor 1 */}
              <Card variant="outlined" className={"home-ads-card"}>
                <Box className={"home-ads-card-top"}>
                  <Avatar src="/img/advisor-female.jpg" size="lg" />

                  <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar>+4K</Avatar>
                  </AvatarGroup>
                </Box>

                <CardContent>
                  <Typography
                    level="title-lg"
                    className={"home-ads-card-title"}
                  >
                    Nutrition Advisor
                  </Typography>

                  <Typography
                    level="body-sm"
                    className={"home-ads-card-description"}
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
              <Card variant="outlined" className={"home-ads-card"}>
                <Box className={"home-ads-card-top"}>
                  <Avatar src="/img/fitness-advisor.jpg" size="lg" />

                  <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar>+3K</Avatar>
                  </AvatarGroup>
                </Box>

                <CardContent>
                  <Typography
                    level="title-lg"
                    className={"home-ads-card-title"}
                  >
                    Fitness Advisor
                  </Typography>

                  <Typography
                    level="body-sm"
                    className={"home-ads-card-description"}
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
              <Card variant="outlined" className={"home-ads-card"}>
                <Box className={"home-ads-card-top"}>
                  <Avatar src="/img/advisor-male.jpg" size="lg" />

                  <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar>+5K</Avatar>
                  </AvatarGroup>
                </Box>

                <CardContent>
                  <Typography
                    level="title-lg"
                    className={"home-ads-card-title"}
                  >
                    Supplement Advisor
                  </Typography>

                  <Typography
                    level="body-sm"
                    className={"home-ads-card-description"}
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
              <Card variant="outlined" className={"home-ads-card"}>
                <Box className={"home-ads-card-top"}>
                  <Avatar src="/img/wellness-advisor.jpg" size="lg" />

                  <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar src="/icons/default-user.svg" />
                    <Avatar>+6K</Avatar>
                  </AvatarGroup>
                </Box>

                <CardContent>
                  <Typography
                    level="title-lg"
                    className={"home-ads-card-title"}
                  >
                    Wellness Advisor
                  </Typography>

                  <Typography
                    level="body-sm"
                    className={"home-ads-card-description"}
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
      <div className="ads-restaurant-frame"></div>
    </>
  );
}
