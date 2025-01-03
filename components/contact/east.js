import {eastCampus} from '../../data/contact/eastCampus'
import React, { useState, useEffect } from 'react';
import Same from "./same";
export default function East (){
    return(
    <Same data={eastCampus}></Same>
    );
} 