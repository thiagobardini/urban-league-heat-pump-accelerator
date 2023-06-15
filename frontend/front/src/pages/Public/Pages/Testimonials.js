import React from "react";
import { Box, Container } from "@mui/material";
import Heading1BlueBgGround from "../Components/Typography/Heading1BlueBgGround";
import Testimonial from "./Home/Testimonial";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";


// Ref:
// https://react-google-maps-api-docs.netlify.app/#section-introduction
// https://www.youtube.com/watch?v=pDPOwmBzBd8
// https://console.cloud.google.com/apis/credentials/key/843a28c4-5e97-4ea7-91b8-320319a206e2?cloudshell=false&project=bhpa-389920


function Testimonials() {
  const inputRef = React.useRef();

  const handlePlaceChanged = () => {
    const place = inputRef.current.getPlaces();

    if (place) {
      console.log(place);
      console.log(place.map((p) => p.geometry.location.lat()));
      // console.log(place.geometry.location.lat());
      // console.log(place.geometry.location.lng());
    }
  };

  return (
    <Box
      mb={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 520px)",
      }}
    >
      <Heading1BlueBgGround text="Testimonials" />
      <Container>
        <Box mb={{ xs: 1, sm: 6 }} mt={{ xs: 1, sm: 2 }}>
          <Testimonial />
        </Box>
          <Box>
            <LoadScript
              googleMapsApiKey="API_KEY"
              // libraries={["places"]}
            >
              <StandaloneSearchBox
                onLoad={(ref) => (inputRef.current = ref)}
                onPlacesChanged={handlePlaceChanged}
              >
                <input
                  // ref={inputRef}
                  type="text"
                  placeholder="Customize your placeholder"
                  className="form-control"
                  style={{
                    boxSizing: "border-box",
                    border: "1px solid transparent",
                    width: "240px",
                    height: "32px",
                    padding: "0 12px",
                    borderRadius: "3px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                    fontSize: "14px",
                    outline: "none",
                    textOverflow: "ellipsis",
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px",
                  }}
                />
              </StandaloneSearchBox>
            </LoadScript>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Testimonials;
