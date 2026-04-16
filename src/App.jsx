import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Categories from './pages/Categories';
import Packages from './pages/Packages';
import Bookings from './pages/Bookings';
import DroneEnquiries from './pages/DroneEnquiries';
import Portfolio from './pages/Portfolio';
import Users from './pages/Users';
import Photographers from './pages/Photographers';
import PromoCodes from './pages/PromoCodes';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="categories" element={<Categories />} />
          <Route path="packages" element={<Packages />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="drone-enquiries" element={<DroneEnquiries />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="users" element={<Users />} />
          <Route path="photographers" element={<Photographers />} />
          <Route path="promo-codes" element={<PromoCodes />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
