import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import securityCodes from './securityCodes.json'; // Adjust the path as needed
import { Box, TextField, Button, Typography, Container } from '@mui/material';

const SecurityPage = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if the security code has already been entered
    if (localStorage.getItem('securityCodeEntered')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    // Check if the entered code is in the securityCodes array
    if (securityCodes.includes(code)) {
      localStorage.setItem('securityCodeEntered', 'true');
      navigate('/login');
    } else {
      alert('Incorrect security code');
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Enter Security Code
      </Typography>
      <TextField
        type="text"
        value={code}
        onChange={handleCodeChange}
        inputProps={{ maxLength: 10 }}
        placeholder="Enter 10-digit code"
        variant="outlined"
        sx={{ marginBottom: 2, width: '100%', maxWidth: '300px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ width: '100%', maxWidth: '300px' }}
      >
        Submit
      </Button>
    </Container>
  );
};

export default SecurityPage;
