import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {registration} from '../../actions/user'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://img5.goodfon.ru/wallpaper/nbig/d/d6/boeing-boeing-777-plane.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Registration() {
  const classes = useStyles();
  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [number, setNumber]=useState('');


  const onChangeName=(e)=>{
    const name =e.target.value;
    setName(name);
  };
  const onChangeEmail=(e)=>{
    const email =e.target.value;
    setEmail(email);
  };
  const onChangePassword=(e)=>{
    const password =e.target.value;
    setPassword(password);
  };
  const onChangeNumber=(e)=>{
    const number =e.target.value;
    setNumber(number);
  };
  const handleSubmit = event => {
    
     
    event.preventDefault();
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
              value={name}
              onChange={onChangeName}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="name"
              id="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              value={email}
              onChange={onChangeEmail}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              value={password}
              onChange={onChangePassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              value={number}
              onChange={onChangeNumber}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="number"
              label="Phone Number"
              name="number"
              autoComplete="number"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=>registration(name,email,password,number)}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
