import React, { useEffect } from 'react';
import Navbar from "./navbar/Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import Registration from "./registration/Registration";
import Login from "./login/Login";
import OperatorBoard from './operator/OperatorBoard'
import {auth} from '../actions/user'

function App() {
    const isAuth=useSelector(state=>state.user.isAuth)
    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(auth())
    })
    

    return (
        <BrowserRouter>
            <div className='app'>
                <Navbar/>
                    {
                    !isAuth?
                        <Switch>
                            <Route path="/registration" component={Registration}/>
                            <Route path="/login" component={Login}/>
                        </Switch>
                        :
                        <Switch>
                            <Route path="/operator" component={OperatorBoard}/>
                        </Switch>
                    }
            </div>
        </BrowserRouter>
    );
}

export default App;
