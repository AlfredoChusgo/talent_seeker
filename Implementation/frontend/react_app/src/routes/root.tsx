import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link, Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useEffect } from 'react';
import store, { useAppDispatch } from '../redux/store/store';
import { fetchItems } from '../redux/features/search_home/search_home_slice';

//import MenuIcon from '@mui/icons-material/Menu';

const pages = ['searchPageHome', 'resourceList', 'teamBuilder', 'Teams','Skills'];
//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ButtonAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch;
  useEffect(() => {
    store.dispatch(fetchItems());
  }, [dispatch]);
  

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PersonSearchIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Talent Seeker
          </Typography>

          <PersonSearchIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                component={Link} // Use Link component
                to={`/${page}`} // Specify the link target
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Typography textAlign="center">
                  {/* <Link to={`/${page}`}>{page}</Link> */}
                  {page}
                </Typography>
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default function Root() {
  return (
    <>
      <div className="App" >
        <ButtonAppBar></ButtonAppBar>
        <Container
          maxWidth="md"
          style={{
            minHeight: 'calc(100vh - 64px)', // Subtract app bar height (64px)
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid container 
>
            <Outlet />
          </Grid>
        </Container>



      </div>
    </>
  );
}