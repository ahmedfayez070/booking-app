import React, { useContext, useState } from 'react'
import './index.scss'

import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import MailList from '../../components/Mail'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot,
  faCircleXmark,
  faCircleArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../Context/SearchContext'
import { AuthContext } from '../../Context/AuthContext'
import ReserveModal from '../../components/ReserveModal'

export default function Hotel() {
  // handle open slider
  const [open, setOpen] = useState(false)
  const [sliderNumber, setSliderNumber] = useState(0)

  const images = [
    {
      src: 'https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=',
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=',
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=',
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=',
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=',
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=',
    },
  ]

  const { dates, options } = useContext(SearchContext)

  const MILLI_SECONDS_PER_DAY = 1000 * 60 * 60 * 24
  function dayDiffrence(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(timeDiff / MILLI_SECONDS_PER_DAY)
    return diffDays
  }

  const days = dayDiffrence(dates[0].endDate, dates[0].startDate)

  const handleOpen = (i) => {
    setSliderNumber(i)
    setOpen(true)
  }

  const handleMove = (direction) => {
    if (direction == 'l' && sliderNumber != 0) {
      setSliderNumber(sliderNumber - 1)
    } else if (direction == 'l' && sliderNumber == 0) {
      setSliderNumber(data.photos.length - 1)
    } else if (direction == 'r' && sliderNumber != data.photos.length - 1) {
      setSliderNumber(sliderNumber + 1)
    } else if (direction == 'r' && sliderNumber == data.photos.length - 1) {
      setSliderNumber(0)
    }
  }

  // handle Modal
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    } else {
      navigate('/login')
    }
  }

  const location = useLocation()
  const id = location.pathname.split('/')[2]

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8000/api/hotels/find/${id}`
  )

  return (
    <>
      <Navbar />
      <Header type="list" />
      {loading ? (
        'loading please wait...'
      ) : (
        <>
          {data && (
            <>
              <div className="hotel-container">
                {open && (
                  <div className="slider">
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className="exit"
                      onClick={() => setOpen(false)}
                    />
                    <FontAwesomeIcon
                      icon={faCircleArrowLeft}
                      className="left"
                      onClick={() => handleMove('l')}
                    />
                    <div className="slider-wrapper">
                      <img
                        src={data.photos.length && data.photos[sliderNumber]}
                        alt=""
                      />
                    </div>
                    <FontAwesomeIcon
                      icon={faCircleArrowRight}
                      className="right"
                      onClick={() => handleMove('r')}
                    />
                  </div>
                )}
                <div className="hotel-wrapper">
                  <div className="hotel-data">
                    <div className="hotel-description">
                      <h1>{data.name}</h1>
                      <p className="address">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{data.address}</span>
                      </p>
                      <span className="address-option">
                        Exellent location - {data.distance}m from center
                      </span>
                      <span className="extra">
                        Book a stay over ${data.cheapestPrice} at this property
                        and get a free airport taxi
                      </span>
                    </div>
                    <button className="book" onClick={handleClick}>
                      Reserve or Book Now!
                    </button>
                  </div>

                  <div className="hotel-images">
                    {data.photos?.map((img, i) => (
                      <img
                        className="hotel-image"
                        src={img}
                        alt=""
                        key={i}
                        onClick={() => handleOpen(i)}
                      />
                    ))}
                  </div>

                  <div className="hotel-info">
                    <div className="about">
                      <h2>{data.title}</h2>
                      <p>{data.description}</p>
                    </div>
                    <div className="reservation">
                      <h3>Perfect for a {days}-night stay!</h3>
                      <p>
                        Located in the real heart of Krakow, this property has
                        an excellent location score of 9.8!
                      </p>
                      <span>
                        ${days * data.cheapestPrice * options.rooms}{' '}
                        <span>({days} nights)</span>
                      </span>
                      <button onClick={handleClick}>
                        Reserve or Book Now!
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="home-container">
                <MailList />
                <Footer />
              </div>
            </>
          )}
        </>
      )}
      {openModal && <ReserveModal setOpen={setOpenModal} hotelId={id} />}
    </>
  )
}
