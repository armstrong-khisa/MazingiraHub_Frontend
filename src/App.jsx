import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Organizations from './pages/Organizations'
import OrganizationDetails from './pages/OrganizationDetails'
import Stories from './pages/Stories'
import ApplyOrganization from './pages/ApplyOrganization'
import Login from './pages/Login'
import Register from './pages/Register'


function App() {
	return (
		<>
		<Navbar />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
			<Route path="/how-it-works" element={<HowItWorks />} />
			<Route path="/organizations" element={<Organizations />} />
			<Route path="/organizations/:id" element={<OrganizationDetails />} />
			<Route path="/stories" element={<Stories />} />
			<Route path="/apply-organization" element={<ApplyOrganization />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
		</>
	)
}
export default App