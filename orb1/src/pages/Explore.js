import React from 'react';
import { useState } from 'react';
import SuggItin from '../components/SuggItin';
import './Explore.css';
import itinerary from '../json/suggItin.json';


function Explore () {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(search);
        alert("You have searched successfully!");
    }

    // function getStoredName() {
    //     return window.localStorage.getItem('name');
    // }

    // function setStoredName(name) {
    //     window.localStorage.setItem('name', name);
    // }

    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const isEmpty = (search) => {
        return search === ''; 
    }

    const itin = itinerary;

    return (
        <>
        <div>
            <h1>Explore</h1>
            <form onSubmit={handleSubmit}> 
                <input value={search} onChange={handleSearch} type='text'/>
                <button type='submit'> search </button>
                <p> {isEmpty(search) ? 'Please enter a search term' : search} </p>
            </form>
        </div>
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {/* Apply margin or padding to create spacing */}
              <div style={{ margin: '30px' }}>
                <SuggItin
                  title={itin[0].title}
                  description={itin[0].description}
                />
              </div>
              <div style={{ margin: '30px' }}>
                <SuggItin
                  title={itin[1].title}
                  description={itin[1].description}
                />
              </div>
              <div style={{ margin: '30px' }}>
                <SuggItin
                  title={itin[2].title}
                  description={itin[2].description}
                />
              </div>
            </div>
          </div>
        </>

    )
}

export default Explore;