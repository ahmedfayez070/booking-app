import React, { useState } from 'react'
import './index.scss'

import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import { format } from 'date-fns'
import { useLocation } from 'react-router-dom'
import { DateRange } from 'react-date-range'
import HotelsList from '../../components/HotelsList'
import useFetch from '../../hooks/useFetch'

export default function List() {
  const location = useLocation()
  // const { destination, date, options } = location.state
  const [destination, setDistination] = useState(location.state.destination)
  const [date, setDate] = useState(location.state.date)
  const [options, setOptions] = useState(location.state.options)

  const [openDate, setOpenDate] = useState(false)

  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8000/api/hotels?city=${destination}&min=${min || 0}&max=${
      max || 10000
    }`
  )

  const handleSearch = () => {
    reFetch()
  }

  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="list-container">
        <div className="list-wrapper">
          <div className="list-search">
            <h3 className="list-search-title">Search</h3>
            <div className="list-search-item">
              <label>Destination</label>
              <input
                type="text"
                className="list-search-input"
                placeholder={destination}
                onChange={(e) => setDistination(e.target.value)}
                value={destination}
              />
            </div>
            <div className="list-search-item">
              <label>Check-in date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
                  date[0].endDate,
                  'MM/dd/yyyy'
                )}`}
              </span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="date"
                />
              )}
            </div>
            <div className="list-search-item options">
              <label>Options</label>
              <div className="list-options">
                <div className="list-search-option">
                  <label>
                    Min price <span>(per night)</span>
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className="list-search-option">
                  <label>
                    Max price <span>(per night)</span>
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
                <div className="list-search-option">
                  <label>Adults</label>
                  <input type="number" min={1} placeholder={options.adults} />
                </div>
                <div className="list-search-option">
                  <label>Children</label>
                  <input type="number" min={0} placeholder={options.children} />
                </div>
                <div className="list-search-option">
                  <label>Rooms</label>
                  <input type="number" min={1} placeholder={options.rooms} />
                </div>
              </div>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="list-results">
            {loading ? (
              'Loading please wait...'
            ) : (
              <>
                {data.map((item, i) => (
                  <HotelsList hotel={item} key={i} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
