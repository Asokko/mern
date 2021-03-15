import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {create,get} from '../../actions/flight';
import {useDispatch,useSelector} from 'react-redux';
import GetTable from './GetTable'

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    root2: {
        flexGrow: 1,
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
    DatePicker:{
        margin:theme.spacing(1,0), 
    }
  }));

const DashBoard=()=>{
    const classes = useStyles();
    const [from, setFrom]=useState('');
    const [to, setTo]=useState('');
    const [cost, setCost]=useState('');
  
    const [startDate1, setStartDate1] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    
    const dispatch=useDispatch()
   
 
   
    useEffect(()=>{
        dispatch(get())
    })
    
    const onChangeFrom=(e)=>{
        const from =e.target.value;
        setFrom(from);
    };
    const onChangeTo=(e)=>{
        const to =e.target.value;
        setTo(to);
    };
    const onChangeCost=(e)=>{
        const cost =e.target.value;
        setCost(cost);
    };
      
    const filterPassedTime = time => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
    }
    const handleSubmit = event => {
      event.preventDefault();
    };
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} component={Paper} square>
           <GetTable/>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={2} square>
          <div className={classes.paper}>
          
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField value={from} onChange={onChangeFrom} variant="outlined" margin="normal" required fullWidth name="From"
                label="откуда" type="from" id="from" autoFocus />
            <TextField value={to} onChange={onChangeTo} variant="outlined" margin="normal" required fullWidth id="to"
                label="Куда" name="To" />   
            <TextField value={cost} onChange={onChangeCost} variant="outlined" margin="normal" required fullWidth name="cost"
                label="Цена" type="cost" id="cost" />
            <Grid container justify="space-around" >
                <Grid item >
                <Typography component="h1" variant="h5">
                    Туда
                </Typography>
                    <DatePicker className={classes.DatePicker} 
                        selected={startDate1} onChange={date => setStartDate1(date)}
                        showTimeSelect
                        filterTime={filterPassedTime}
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </Grid>
                <Grid item >
                <Typography component="h1" variant="h5">
                    Обратно
                </Typography>
                    <DatePicker className={classes.DatePicker} 
                        selected={startDate2} onChange={date => setStartDate2(date)}
                        showTimeSelect
                        filterTime={filterPassedTime}
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </Grid>   
            </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
                onClick={()=>create(from, to, startDate1, startDate2)}
              >Создать</Button>
              
            </form>
            
          </div>
        </Grid>
        
      </Grid>

    );
}

export default DashBoard