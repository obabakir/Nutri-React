import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react"; // @ts-ignore
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { plans } from "../../../lib/data/plans";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function Events() {
  return (
    <div className={"events-frame"}>
      <Stack className={"events-main"}>
        <Box className={"events-text"}>
          <span className={"category-title"}>Our Partner Brands</span>
          <span className={"category-subtitle"}>
            Trusted nutrition. Trusted partners.
          </span>
        </Box>

        <Swiper
          className={"events-info"}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {plans.map((value, number) => {
            return (
              <SwiperSlide key={number} className={"events-info-frame"}>
                <Box className={"events-overlay"} />

                <Box className={"events-desc"}>
                  <Box className={"events-brand"}>
                    <span className={"partner-label"}>NUTRIMART PARTNER</span>

                    <h2 className={"brand-name"}>{value.title}</h2>

                    <p className={"brand-desc"}>{value.desc}</p>

                    <Box className={"brand-info"}>
                      <Box className={"brand-info-item"}>
                        <span className={"info-label"}>BRAND</span>
                        <span className={"info-value"}>{value.author}</span>
                      </Box>

                      <Box className={"brand-info-item"}>
                        <span className={"info-label"}>SPECIALTY</span>
                        <span className={"info-value"}>Sports Nutrition</span>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <Box className={"prev-next-frame"}>
          <Box className={"custom-prev"}>
            <ArrowCircleLeftIcon />
            {/* <img src={"/icons/arrow-right.svg"} alt="Previous" /> */}
          </Box>

          <Box className={"dot-frame-pagination swiper-pagination"}></Box>

          <Box className={"custom-next"}>
            <ArrowCircleRightIcon />
          </Box>
        </Box>
      </Stack>
    </div>
  );
}
