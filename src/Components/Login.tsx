import { useState } from 'react';
import { TextField, Checkbox, Button, Link, Box, Typography, FormControlLabel } from '@mui/material';
import { User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "../Styles/Login.css";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState<{ email: string; password: string }[]>([]);
  // const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      setUsers((prevUsers) => [...prevUsers, { email, password }]);
      alert('Sign up successful. Please sign in.');
      setIsSignUp(false);
    } else {
      const userExists = users.find((user) => user.email === email && user.password === password);
      if (userExists) {
        // setLoggedIn(true);
        localStorage.setItem('token', 'dummy-token'); 
        alert('Login successful!');
        navigate('/class'); 
      } else {
        alert('Invalid credentials!');
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #cc8b86, #f9eae1, #7d4f50, #d1be9c, #aa998f)',
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 15s ease infinite',
        padding: 2,
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#f9eae1',
          borderRadius: 4,
          boxShadow: 3,
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(249, 234, 225, 0.3)',
          padding: 4,
          width: '100%',
          maxWidth: 500,
          height: 'auto',
          maxHeight: '80vh',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          color="#7d4f50"
          noWrap
          sx={{ wordBreak: 'break-word', mb: 3, pr: 2 }}
        >
          {isSignUp ? 'Sign Up' : 'Welcome Back'}
        </Typography>
        <form onSubmit={handleSubmit}>
          {isSignUp ? (
            <>
              <Box sx={{ mb: 3 }}>
                <TextField
                  type="text"
                  placeholder="Username"
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <TextField
                  type="text"
                  placeholder="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <TextField
                  type="email"
                  placeholder="Email Address"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <TextField
                  type="number"
                  placeholder="Age"
                  variant="outlined"
                  fullWidth
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <TextField
                  type="password"
                  placeholder="Password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ mb: 3, position: 'relative' }}>
                <User
                  size={20}
                  style={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#aa998f',
                  }}
                />
                <TextField
                  type="email"
                  placeholder="Email Address"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    pl: 5,
                    mb: 3,
                    maxWidth: 400,
                    '& .MuiInputBase-input': { overflow: 'hidden', textOverflow: 'ellipsis' },
                  }}
                />
              </Box>
              <Box sx={{ mb: 3, position: 'relative' }}>
                <Lock
                  size={20}
                  style={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#aa998f',
                  }}
                />
                <TextField
                  type="password"
                  placeholder="Password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    pl: 5,
                    mb: 3,
                    maxWidth: 400,
                    '& .MuiInputBase-input': { overflow: 'hidden', textOverflow: 'ellipsis' },
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Remember me"
                />
                <Link href="#" underline="none" color="#7d4f50">
                  Forgot password?
                </Link>
              </Box>
            </>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#cc8b86',
              color: '#f9eae1',
              '&:hover': {
                backgroundColor: '#7d4f50',
              },
              overflow: 'hidden',
            }}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Box sx={{ mt: 3, textAlign: 'center', color: '#7d4f50' }}>
            {isSignUp ? (
              <>
                Already have an account?
                <Link
                  href="#"
                  underline="none"
                  color="#cc8b86"
                  sx={{ ml: 1 }}
                  onClick={() => setIsSignUp(false)}
                >
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Don&apos;t have an account?
                <Link
                  href="#"
                  underline="none"
                  color="#cc8b86"
                  sx={{ ml: 1 }}
                  onClick={() => setIsSignUp(true)}
                >
                  Sign up
                </Link>
              </>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
