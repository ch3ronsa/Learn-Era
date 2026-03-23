import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Explore } from './pages/Explore'
import { CreateLesson } from './pages/CreateLesson'
import { ViewLesson } from './pages/ViewLesson'
import { Dashboard } from './pages/Dashboard'
import { Profile } from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create" element={<CreateLesson />} />
          <Route path="/lesson/:slug" element={<ViewLesson />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/:address" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
