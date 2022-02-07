import React from 'react';
import { Spinner } from "react-bootstrap"

export default function Loading() {
  return( 
    <div className='mt-4' style={{textAlign: "center"}}>
        <p>Please wait a few seconds while we retrieve the data</p>
        <Spinner animation="border"/>
    </div>
)}
