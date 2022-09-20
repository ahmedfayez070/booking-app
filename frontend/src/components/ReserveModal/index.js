import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './indes.scss'

import useFetch from '../../hooks/useFetch'

import { SearchContext } from '../../Context/SearchContext'

export default function ReserveModal({ setOpen, hotelId }) {
  const [selectedRooms, setSelectedRooms] = useState([])
  const { data, loading, error } = useFetch(
    `http://localhost:8000/api/hotels/room/${hotelId}`
  )
  const { dates } = useContext(SearchContext)

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const date = new Date(start.getTime())

    const dates = []

    while (date <= end) {
      dates.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }

    return dates
  }

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    )

    return !isFound
  }

  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    )
  }

  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `http://localhost:8000/api/rooms/availability/${roomId}`,
            {
              dates: alldates,
            }
          )
          console.log(res.data)
          return res.data
        })
      )
      setOpen(false)
      navigate('/')
      console.log('error up')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="reserve">
      <div className="reserve-container">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="reserve-close"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="room-item" key={item._id}>
            <div className="room-item-info">
              <div className="room-title">{item.title}</div>
              <div className="room-description">{item.desc}</div>
              <div className="room-max">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="room-price">{item.price}</div>
            </div>
            <div className="room-select-rooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="room-button" onClick={handleClick}>
          Reserve Now!
        </button>
      </div>
    </div>
  )
}
