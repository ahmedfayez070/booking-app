import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import './indes.scss'

export default function HotelsList({ hotel }) {
  const { data, loading, error } = useFetch(
    'http://localhost:8000/api/hotels/countByCity?cities=berlin,madrid,london'
  )

  return (
    <div className="hotels-list-item">
      <img
        src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
        alt=""
        className="hotels-list-image"
      />
      <div className="hotels-list-description">
        <h3 className="hotels-list-title">{hotel.title}</h3>
        <span className="hotels-list-distance">
          {hotel.distance}m from center
        </span>
        <span className="hotels-list-taxi-option">Free airport taxi</span>
        <span className="hotels-list-subtitle">
          Studio Apartment with air condioning
        </span>
        <span className="hotels-list-features">{hotel.description}</span>
        <span className="hotels-list-cancel">Free cancellation</span>
        <span className="hotels-list-cancel-option">
          You can cancel later, so lock in this price today
        </span>
      </div>
      <div className="hotels-list-extra">
        {hotel.rating && (
          <div className="hotels-list-rate">
            <span>Excellent</span>
            <button className="rate">{hotel.rating}</button>
          </div>
        )}
        <div className="hotels-list-price">
          <span className="price">${hotel.cheapestPrice}</span>
          <span className="option">Includes taxis and fees</span>
          <Link to={`/hotels/${hotel._id}`}>
            <button>See availability</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
