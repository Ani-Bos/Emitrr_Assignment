import React from 'react'
import DashNav from '../../Components/DashNav/DashNav'
import Footer from "../../Components/Footer/Footer";
import DashHero from '../../Components/DashHero/DashHero';
const Dashboard = () => {
  return (
      <div>
      <DashNav />  
      <DashHero/>
      <Footer/>
    </div>
  )
}

export default Dashboard