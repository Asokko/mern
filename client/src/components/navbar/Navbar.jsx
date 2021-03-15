import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import { logout } from "../../reducers/userReducer";
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Navbar = () => {
    const classes = useStyles();
    const isAuth=useSelector(state=>state.user.isAuth)
    const currentUser =useSelector(state=>state.user.currentUser)
    const dispatch=useDispatch();
    let operator=currentUser.role==="operator"?true:false
    return (
        <div>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Ковер Самолет
                </Typography>
                  {!isAuth&&<Button ><NavLink style={{color:"white",textDecoration:"none"}} to="/login">Вход</NavLink></Button>}
                  {!isAuth&&<Button ><NavLink style={{color:"white",textDecoration:"none"}} to='/registration'>Регистрация</NavLink></Button>}
                  {isAuth&&<Button onClick={()=>dispatch(logout())}> Выход</Button>}
                  {isAuth&&operator&&<Button ><NavLink style={{color:"white",textDecoration:"none"}} to='/operator'>Доска оператора</NavLink></Button>}
                </Toolbar>
            </AppBar>
            </div>
        </div>
    );
};

export default Navbar;
