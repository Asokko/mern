import React from 'react'
import {useSelector} from 'react-redux'


const GetTable=()=>{

    const flight=useSelector(state=>state.flight)
    console.log(flight)
    return (
        <div>
             fdgdfg
        </div>
    )
}

export default GetTable