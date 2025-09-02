import React from "react";
import UploadFile from "./components/UploadFile";
import  { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AIPredictions from './pages/AIPredictions';
import Resources from './pages/Resources'
import Alerts from './pages/Alerts'
import Settings from './pages/Settings'
import HistoryPage from './pages/HistoryPage'
import Crew from './pages/Crew'
import LiveDetection from "./pages/LiveDetection";




function App() {
  return (
    // <div>
    //   {/* <h1>AI Prediction App</h1>
    //   <Navbar/>
    //   <UploadFile />
    // </div> */}
     <div className={`min-h-screen dark`}>
          <Navbar />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ai-predictions" element={<AIPredictions />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/crew" element={<Crew />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/live" element={<LiveDetection />} />
            </Routes>
          </main>
        </div>
  );
}

export default App;
