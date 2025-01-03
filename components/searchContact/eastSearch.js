import {eastCampus} from '../../data/contact/eastCampus'
import React, { useState, useEffect } from 'react';
import Search from "./Search";
////东海岸校区的搜索页面
export default function East (){
    return(
    <Search data= {eastCampus}></Search>
    );
} 