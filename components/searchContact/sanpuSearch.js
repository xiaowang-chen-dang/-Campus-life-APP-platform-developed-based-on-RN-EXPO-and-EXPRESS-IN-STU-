import {contactData} from '../../data/contact/contactData'
import {eastCampus} from '../../data/contact/eastCampus'
import React, { useState, useEffect } from 'react';
import Search from "./Search";
//本部校区的搜索页面
export default function Sanpu (){
    return(
    <Search data= {contactData}></Search>
    );
} 