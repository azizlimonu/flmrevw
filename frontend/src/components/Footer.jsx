import { Paper, Stack, Button, Box } from '@mui/material';
import React from 'react';
import Container from './Container';
import Logo from './Logo';
import menuConfigs from "../configs/menu.configs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row " }}
          sx={{ height: "max-content" }}
        >
          <Box sx={{ flexDirection: 'column' }}>
            <Logo />
            <p>This Website using Tmdb Api</p>
          </Box>
          <Box>
            {menuConfigs.main?.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "inherit" }}
                component={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))}
          </Box>
        </Stack>
        <hr />
        <p>Made with MERN stack</p>
      </Paper>
    </Container>
  );
};

export default Footer;