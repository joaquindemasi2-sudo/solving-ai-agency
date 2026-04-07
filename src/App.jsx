import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WebGLHero from './components/WebGLHero'
import Home from './pages/Home'
import Book from './pages/Book'
import LeadQualification from './pages/LeadQualification'
import About from './pages/About'
import ReviewManagement from './pages/ReviewManagement'
import SmartScheduling from './pages/SmartScheduling'
import WorkflowAutomation from './pages/WorkflowAutomation'
import WebRedesign from './pages/WebRedesign'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

function App() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <WebGLHero fixed />
      <Navbar />
      <main className="flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
          <Route path="/lead-qualification" element={<LeadQualification />} />
          <Route path="/about" element={<About />} />
          <Route path="/review-management" element={<ReviewManagement />} />
          <Route path="/smart-scheduling" element={<SmartScheduling />} />
          <Route path="/workflow-automation" element={<WorkflowAutomation />} />
          <Route path="/web-redesign" element={<WebRedesign />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App