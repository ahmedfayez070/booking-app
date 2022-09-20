import React from 'react'
import './index.scss'

import Featured from '../../components/Featured'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import PropertyList from '../../components/PropertyList'
import LovedHotels from '../../components/LovedHotels'
import MailList from '../../components/Mail'
import Footer from '../../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Header type="home" />
      <div className="home-container">
        <Featured />
        <h2 className="home-title">Browse by property type</h2>
        <PropertyList />
        <h2 className="home-title">Homes guests love</h2>
        <LovedHotels />
        <MailList />
        <Footer />
      </div>
    </>
  )
}
