import React from 'react'
import Hero from '../componenets/Hero'
import FeatureDestination from '../componenets/FeatureDestination'
import ExclusiveOffers from '../componenets/ExclusiveOffers'
import Testimonial from '../componenets/Testimonial'
import NewsLetter from '../componenets/NewsLetter'
import Footer from '../componenets/Footer'

const Home = () => {
  return (
    <>
        <Hero/>
        <FeatureDestination/>
        <ExclusiveOffers/>
        <Testimonial/>
        <NewsLetter/>
    </>
  )
}

export default Home