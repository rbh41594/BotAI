import { Outlet } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getThemePallete } from './ThemePalette';
import { Grid } from '@mui/material';
import './App.css';

function App() {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');
  const [chat, setChat] = useState([]);  
  const [menuOpen, toggleMenu] = useState(false);  

  const theme = useMemo(() => createTheme(getThemePallete(mode)), [mode]);

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> 

        <Grid container className="app-container">
          <Grid
            item xs={12} md={2.5} 
            className={`sidebar-container ${menuOpen ? 'menu-open' : ''}`}
          >
            <Sidebar setChat={setChat} closeMenu={() => toggleMenu(false)} />
          </Grid>
          <Grid item xs={12} md={9.5}>
            <Outlet context={{ chat, setChat, handleMobileMenu: toggleMenu }} />
          </Grid>
        </Grid>

      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;