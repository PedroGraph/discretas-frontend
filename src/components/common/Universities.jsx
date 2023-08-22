import React, {useState, useEffect} from 'react'
import { Card, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import MainLenceria from "./MainImage";
import MostSold from "./Carrusel";
import Footer from "./Footer";

export default function University() {
      return (
        
        <div>
          <MainLenceria/>
          {/* <MostSold/> */}
          
        </div>
    
      );
}
