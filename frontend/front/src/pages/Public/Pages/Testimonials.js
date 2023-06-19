import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Stack,
  Divider,
  Paper,
  InputBase,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Heading1BlueBgGround from "../Components/Typography/Heading1BlueBgGround";
import Testimonial from "./Home/Testimonial";
import {
  StandaloneSearchBox,
  LoadScriptNext,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import MyMapComponent from "./MyMapComponent";
import MyMapComponentCluster from "./MyMapComponentCluster";
import Heading2 from "../Components/Typography/Heading2";

// Ref:
// https://react-google-maps-api-docs.netlify.app/#section-introduction
// https://www.youtube.com/watch?v=pDPOwmBzBd8
// https://console.cloud.google.com/apis/credentials/key/843a28c4-5e97-4ea7-91b8-320319a206e2?cloudshell=false&project=bhpa-389920
// https://github.com/googlemaps/js-markerclusterer

function Testimonials() {
  const [location, setLocation] = useState({ lat: 42.36, lng: -71.0588801 });
  const [isLoaded, setIsLoaded] = useState(false);

  const inputRef = useRef();

  const handlePlaceChanged = () => {
    const place = inputRef.current.getPlaces();

    if (place) {
      console.log(place);
      console.log(place.map((p) => p.geometry.location.lat()));
      console.log(place.map((p) => p.geometry.location.lng()));
      place.map((p) =>
        setLocation({
          lat: p.geometry.location.lat(),
          lng: p.geometry.location.lng(),
        })
      );
    }
  };

  useEffect(() => {
    setIsLoaded(true);

    return () => {
      setIsLoaded(false);
    };
  }, []);

  useEffect(() => {
    console.log("Location Updated:", location);
  }, [location]);

  const containerStyle = {
    height: "500px",
    width: "50%",
  };

  const center = {
    lat: location.lat,
    lng: location.lng,
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
      <Heading1BlueBgGround text="Google Map" />
      <Container>
        {isLoaded ? (
          <LoadScriptNext
            googleMapsApiKey="AIzaSyCl-R7lSkzQVqb0FwCJE-sDMrQpNqCMVTc"
            libraries={["places"]}
          >
            <StandaloneSearchBox
              onLoad={(ref) => (inputRef.current = ref)}
              onPlacesChanged={handlePlaceChanged}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  my: 3,
                }}
              >
                <Paper
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 400,
                  }}
                >
                  <InputBase
                    inputRef={inputRef}
                    onChange={handlePlaceChanged}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Google Maps"
                    inputProps={{ "aria-label": "search google maps" }}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  <IconButton
                    color="primary"
                    sx={{ p: "10px" }}
                    aria-label="directions"
                  >
                    <DirectionsIcon />
                  </IconButton>
                </Paper>
              </Box>
            </StandaloneSearchBox>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
              >
                <Marker position={center} title="Uluru" />
              </GoogleMap>

              {/* <Box>
                <MyMapComponent location={location} />
              </Box> */}
              <Box sx={{ width: "50%" }}>
                <MyMapComponentCluster location={location} />
              </Box>
            </Stack>
          </LoadScriptNext>
        ) : (
          <div>Loading...</div>
        )}
      </Container>
    </Box>
  );
}

export default Testimonials;
