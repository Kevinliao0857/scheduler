import React from "react";

import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import Confirm from "./Confirm"
import Status from "./Status"
import Error from "./Error"

import "./styles.scss";



export default function Appointment(props) {
  return (
    <article className="appointment">
    <Header />
    <Empty />
    <Show />
    <Confirm />
    <Status />
    <Error />
    
    </article> 
  

  )
}


