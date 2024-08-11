import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Video from './pages/Video/Video'



const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home />} />
      </Routes>
      <Route path = '/video/:categoryId/:videoId' element={<Video/>}/>
    </div>
  )
}

export default App;