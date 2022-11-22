import React, { useState, useEffect } from 'react';

import './doctor.css';
import { Navbar } from './Navbar';
import { ListBox } from './listBox';
import { Heading } from './heading';

export const DoctorHome=()=>{
const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return(
    <div>
        {loading?(
            <div className="loader-container">
                <div className="spinner"></div>

            </div>

        ):(

            <>
                <Navbar />
                <Heading />
                <ListBox />
            </>

        )}
    </div>
  )
  
    
}