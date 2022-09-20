import React from 'react'
import './index.scss'

export default function MailList() {
  return (
    <div className="mail">
      <h2 className="mail-title">Save time, save money</h2>
      <p className="mail-description">
        Sign in and we'll send the best deals to you
      </p>
      <form className="mail-form">
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </form>
    </div>
  )
}
