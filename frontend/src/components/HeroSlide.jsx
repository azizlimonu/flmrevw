import { toast } from "react-toastify";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { routesGen } from "../routes/routes";

import uiConfigs from "../configs/ui.configs";
import CircularRate from "./CircularRate";

import tmdbConfigs from "../api/configs/tmdb.configs";
import genreApi from "../api/modules/genre.api";
import mediaApi from "../api/modules/media.api";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      try {
        const { response } = await mediaApi.getList({
          mediaType,
          mediaCategory,
          page: 1
        });
        setMovies(response.results);

      } catch (error) {
        toast.error(error.message);
      }
      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      try {
        dispatch(setGlobalLoading(true));
        const { response } = await genreApi.getList({ mediaType });
        setGenres(response.genres);
        getMedias();

      } catch (error) {
        toast.error(error.message);
        setGlobalLoading(false);
      }
    };
    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  return (
    <Box sx={{
      position: "relative",
      color: "primary.contrastText",
      "&::before": {
        content: '""',
        width: "100%",
        height: "40%",
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2,
        pointerEvents: "none",
        ...uiConfigs.style.gradientBgImage[theme.palette.mode]
      }
    }}>
      {movie && (
        <>
          {/* background image */}
          <Box
            sx={{
              paddingTop: {
                xs: "130%",
                sm: "80%",
                md: "60%",
                lg: "45%"
              },
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfigs.backdropPath(movie.backdrop_path || movie.poster_path)})`
            }}
          />
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode]
            }}
          />

          {/* wrapper */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              paddingX: { sm: "10px", md: "5rem", lg: "3rem" }
            }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                paddingX: "30px",
                color: "text.primary",
                width: { sm: "unset", md: "40%", lg: "50%" }
              }}
            >
              <Stack spacing={4} direction="column">
                {/* title */}
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{
                    ...uiConfigs.style.typoLines(2, "left")
                  }}
                >
                  {movie.title || movie.name}
                </Typography>
                {/* title */}

                <Stack direction="row" spacing={1} alignItems="center">
                  {/* rating */}
                  <CircularRate value={movie.vote_average} />
                  {/* rating */}

                  <Divider orientation="vertical" />
                  {/* genres */}
                  {[...movie.genre_ids].splice(0, 2).map((genreId, index) => (
                    <Chip
                      variant="filled"
                      color="primary"
                      key={index}
                      label={genres.find(e => e.id === genreId) && genres.find(e => e.id === genreId).name}
                    />
                  ))}
                  {/* genres */}
                </Stack>

                {/* overview */}
                <Typography variant="body1" sx={{
                  ...uiConfigs.style.typoLines(3)
                }}>
                  {movie.overview}
                </Typography>
                {/* overview */}

                {/* buttons */}
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  component={Link}
                  to={routesGen.mediaDetail(mediaType, movie.id)}
                  sx={{ width: "max-content" }}
                >
                  watch now
                </Button>
                {/* buttons */}
              </Stack>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default HeroSlide;