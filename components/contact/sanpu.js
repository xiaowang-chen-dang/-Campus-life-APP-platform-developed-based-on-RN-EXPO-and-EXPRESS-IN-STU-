
import {contactData} from '../../data/contact/contactData'
import React, { useState, useEffect } from 'react';
import Same from "./same";
export default function Sanpu (){
   return(
    <Same data={contactData}></Same>
    );
} 