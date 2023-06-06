import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from "../src/api/login";

const theme = createTheme({
  palette: {
    primary: {
      main: '#c49000',
    },
  },
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{

      
        if (username && password) {
          let response = await login(username,password)
          localStorage.setItem('token', response.token);
          navigate('/books');
        } else {
          alert('Please fill username & password');
        }
    }
    catch(e){
        localStorage.removeItem('token');
        alert(e)
    }
  
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" component="h1" mb={4}>
          Login
        </Typography>
        <Box width={300}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            color="primary"
            mb={2}
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            color="primary"
            mb={4}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
