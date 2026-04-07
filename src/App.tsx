import { Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import AboutPage from './pages/AboutPage'
import BusinessPage from './pages/BusinessPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import FaqPage from './pages/FaqPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ProjectsPage from './pages/ProjectsPage'
import ThankYouPage from './pages/ThankYouPage'

function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/our-business" element={<BusinessPage />} />
        <Route path="/projects-gallery" element={<ProjectsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  )
}

export default App
