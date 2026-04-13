// Mock data for the entire admin panel

export const stats = {
  totalBookings: 248,
  upcomingShoots: 34,
  completedShoots: 189,
  pendingBookings: 25,
  droneEnquiries: 12,
  totalRevenue: 1248500,
};

export const monthlyRevenue = [
  { month: 'Jan', revenue: 85000 },
  { month: 'Feb', revenue: 92000 },
  { month: 'Mar', revenue: 110000 },
  { month: 'Apr', revenue: 98000 },
  { month: 'May', revenue: 125000 },
  { month: 'Jun', revenue: 140000 },
  { month: 'Jul', revenue: 132000 },
  { month: 'Aug', revenue: 158000 },
  { month: 'Sep', revenue: 145000 },
  { month: 'Oct', revenue: 162000 },
  { month: 'Nov', revenue: 178000 },
  { month: 'Dec', revenue: 195000 },
];

export const bookingsByCategory = [
  { category: 'Wedding', count: 95 },
  { category: 'Event', count: 72 },
  { category: 'Business', count: 48 },
  { category: 'Drone Show', count: 33 },
];

export const bookings = [
  { id: 'BK001', customer: 'Priya Sharma', phone: '9876543210', category: 'Wedding', package: 'Royal Wedding', date: '2026-04-15', location: 'Chennai', paymentStatus: 'Advance Paid', status: 'Confirmed' },
  { id: 'BK002', customer: 'Rahul Verma', phone: '9123456789', category: 'Event', package: 'Corporate Event', date: '2026-04-18', location: 'Bangalore', paymentStatus: 'Fully Paid', status: 'Confirmed' },
  { id: 'BK003', customer: 'Ananya Kris', phone: '9012345678', category: 'Business', package: 'Brand Shoot', date: '2026-04-20', location: 'Mumbai', paymentStatus: 'Pending', status: 'Pending' },
  { id: 'BK004', customer: 'Vikram Singh', phone: '8901234567', category: 'Drone Show', package: 'Aerial Magic', date: '2026-04-22', location: 'Delhi', paymentStatus: 'Advance Paid', status: 'Confirmed' },
  { id: 'BK005', customer: 'Kavitha Rajan', phone: '7890123456', category: 'Wedding', package: 'Classic Wedding', date: '2026-04-25', location: 'Hyderabad', paymentStatus: 'Fully Paid', status: 'Completed' },
  { id: 'BK006', customer: 'Arjun Nair', phone: '6789012345', category: 'Event', package: 'Birthday Bash', date: '2026-04-28', location: 'Pune', paymentStatus: 'Pending', status: 'Pending' },
  { id: 'BK007', customer: 'Deepika Menon', phone: '5678901234', category: 'Business', package: 'Product Shoot', date: '2026-05-01', location: 'Kochi', paymentStatus: 'Fully Paid', status: 'Completed' },
  { id: 'BK008', customer: 'Suresh Kumar', phone: '4567890123', category: 'Wedding', package: 'Platinum Wedding', date: '2026-05-05', location: 'Chennai', paymentStatus: 'Advance Paid', status: 'Reviewed' },
  { id: 'BK009', customer: 'Meena Patel', phone: '3456789012', category: 'Event', package: 'Anniversary', date: '2026-05-10', location: 'Ahmedabad', paymentStatus: 'Pending', status: 'New' },
  { id: 'BK010', customer: 'Rajesh Iyer', phone: '9999988888', category: 'Business', package: 'Headshot Shoot', date: '2026-05-12', location: 'Coimbatore', paymentStatus: 'Fully Paid', status: 'Cancelled' },
];

export const payments = [
  { id: 'TXN001', bookingId: 'BK001', customer: 'Priya Sharma', total: 85000, advance: 42500, remaining: 42500, method: 'UPI', status: 'Advance Paid', date: '2026-03-28' },
  { id: 'TXN002', bookingId: 'BK002', customer: 'Rahul Verma', total: 35000, advance: 35000, remaining: 0, method: 'Bank Transfer', status: 'Fully Paid', date: '2026-04-01' },
  { id: 'TXN003', bookingId: 'BK003', customer: 'Ananya Kris', total: 25000, advance: 0, remaining: 25000, method: '-', status: 'Pending', date: '2026-04-05' },
  { id: 'TXN004', bookingId: 'BK004', customer: 'Vikram Singh', total: 60000, advance: 30000, remaining: 30000, method: 'Card', status: 'Advance Paid', date: '2026-04-06' },
  { id: 'TXN005', bookingId: 'BK005', customer: 'Kavitha Rajan', total: 75000, advance: 75000, remaining: 0, method: 'UPI', status: 'Fully Paid', date: '2026-04-08' },
  { id: 'TXN006', bookingId: 'BK010', customer: 'Rajesh Iyer', total: 18000, advance: 18000, remaining: 0, method: 'UPI', status: 'Refunded', date: '2026-04-09' },
];

export const droneEnquiries = [
  { id: 'DE001', name: 'Arun Babu', phone: '9876501234', email: 'arun@gmail.com', eventDate: '2026-05-20', location: 'Chennai Beachside', budget: '₹1,50,000', message: 'Need drone show for wedding reception with 200 drones.', status: 'New' },
  { id: 'DE002', name: 'Shalini Mani', phone: '9865432109', email: 'shalini@corp.com', eventDate: '2026-06-01', location: 'Bangalore Palace Grounds', budget: '₹3,00,000', message: 'Corporate event with custom drone light show logo animation.', status: 'Contacted' },
  { id: 'DE003', name: 'Prateek Joshi', phone: '9754321098', email: 'prateek@joshi.in', eventDate: '2026-06-15', location: 'Mumbai Juhu Beach', budget: '₹2,00,000', message: 'Anniversary celebration, need 150 drones.', status: 'Converted' },
];

export const categories = [
  { id: 1, name: 'Wedding', description: 'Elegant wedding photography and videography packages for your special day.', status: 'Active', image: '/assets/wedding.png' },
  { id: 2, name: 'Event', description: 'Corporate events, birthday parties, and social gatherings captured beautifully.', status: 'Active', image: '/assets/event.png' },
  { id: 3, name: 'Business', description: 'Professional business headshots, product shoots, and brand photography.', status: 'Active', image: '/assets/business.png' },
  { id: 4, name: 'Drone Show', description: 'Spectacular aerial drone light shows and aerial photography for grand events.', status: 'Active', image: '/assets/drone.png' },
];

export const packages = [
  { id: 1, name: 'Classic Wedding', category: 'Wedding', price: 75000, duration: '8 Hours', deliverables: '500 edited photos + 1 highlight reel', description: 'A timeless wedding photography package with two photographers.', image: '/assets/wedding.png' },
  { id: 2, name: 'Royal Wedding', category: 'Wedding', price: 150000, duration: '2 Days', deliverables: '1000 edited photos + Full video + Album', description: 'Our premium all-inclusive wedding photography and videography package.', image: '/assets/wedding.png' },
  { id: 3, name: 'Platinum Wedding', category: 'Wedding', price: 250000, duration: '3 Days', deliverables: '2000 photos + Cinematic film + Drone coverage', description: 'The ultimate luxury wedding documentation with drone coverage and cinematic film.', image: '/assets/wedding.png' },
  { id: 4, name: 'Corporate Event', category: 'Event', price: 35000, duration: '6 Hours', deliverables: '300 edited photos', description: 'Professional corporate event documentation package.', image: '/assets/event.png' },
  { id: 5, name: 'Birthday Bash', category: 'Event', price: 20000, duration: '4 Hours', deliverables: '200 edited photos', description: 'Fun and vibrant birthday party photography.', image: '/assets/event.png' },
  { id: 6, name: 'Brand Shoot', category: 'Business', price: 45000, duration: '6 Hours', deliverables: '150 edited photos + Brand story video', description: 'Elevate your brand with professional photography and storytelling.', image: '/assets/business.png' },
  { id: 7, name: 'Product Shoot', category: 'Business', price: 25000, duration: '4 Hours', deliverables: '80 edited product photos', description: 'High-quality product photography for e-commerce and marketing.', image: '/assets/business.png' },
  { id: 8, name: 'Aerial Magic', category: 'Drone Show', price: 180000, duration: '1 Night', deliverables: '100-drone light show + Aerial video', description: 'A stunning 100-drone light show with choreographed aerial display.', image: '/assets/drone.png' },
];

export const users = [
  { id: 1, name: 'Priya Sharma', phone: '9876543210', email: 'priya@gmail.com', bookings: 5, status: 'Active', joined: '2025-01-15' },
  { id: 2, name: 'Rahul Verma', phone: '9123456789', email: 'rahul@gmail.com', bookings: 3, status: 'Active', joined: '2025-02-20' },
  { id: 3, name: 'Ananya Kris', phone: '9012345678', email: 'ananya@gmail.com', bookings: 1, status: 'Active', joined: '2025-03-10' },
  { id: 4, name: 'Vikram Singh', phone: '8901234567', email: 'vikram@gmail.com', bookings: 2, status: 'Active', joined: '2025-04-05' },
  { id: 5, name: 'Kavitha Rajan', phone: '7890123456', email: 'kavitha@gmail.com', bookings: 7, status: 'Blocked', joined: '2025-01-01' },
  { id: 6, name: 'Rajesh Iyer', phone: '9999988888', email: 'rajesh@gmail.com', bookings: 4, status: 'Active', joined: '2025-05-18' },
];

export const photographers = [
  { id: 1, name: 'Aakash Raj', phone: '9988776655', email: 'aakash@myshoot.in', specialization: 'Wedding', shoots: 45, rating: 4.9, status: 'Available' },
  { id: 2, name: 'Sneha Pillai', phone: '8877665544', email: 'sneha@myshoot.in', specialization: 'Event', shoots: 38, rating: 4.7, status: 'Booked' },
  { id: 3, name: 'Karthik V', phone: '7766554433', email: 'karthik@myshoot.in', specialization: 'Business', shoots: 62, rating: 4.8, status: 'Available' },
  { id: 4, name: 'Divya Nair', phone: '6655443322', email: 'divya@myshoot.in', specialization: 'Wedding', shoots: 29, rating: 4.6, status: 'Leave' },
];

export const calendarEvents = [
  { id: 1, title: 'Priya - Wedding', date: '2026-04-15', photographer: 'Aakash Raj', status: 'Confirmed', category: 'Wedding', time: '07:00' },
  { id: 2, title: 'Rahul - Corporate', date: '2026-04-18', photographer: 'Sneha Pillai', status: 'Confirmed', category: 'Event', time: '10:00' },
  { id: 3, title: 'Ananya - Brand Shoot', date: '2026-04-20', photographer: 'Karthik V', status: 'Pending', category: 'Business', time: '09:00' },
  { id: 4, title: 'Vikram - Drone Show', date: '2026-04-22', photographer: 'Aakash Raj', status: 'Confirmed', category: 'Drone Show', time: '18:00' },
  { id: 5, title: 'Arjun - Birthday', date: '2026-04-28', photographer: 'Divya Nair', status: 'Pending', category: 'Event', time: '16:00' },
  { id: 6, title: 'Deepika - Product', date: '2026-05-01', photographer: 'Karthik V', status: 'Confirmed', category: 'Business', time: '11:00' },
  { id: 7, title: 'Suresh - Wedding', date: '2026-05-05', photographer: 'Aakash Raj', status: 'Confirmed', category: 'Wedding', time: '07:00' },
  { id: 8, title: 'Meena - Anniversary', date: '2026-04-15', photographer: 'Sneha Pillai', status: 'Pending', category: 'Event', time: '17:00' },
];

export const portfolioItems = [
  { id: 1, title: 'Royal Wedding Ceremony', category: 'Wedding', type: 'image', image: '/assets/wedding.png', description: 'Elegant outdoor wedding ceremony at Leela Palace.' },
  { id: 2, title: 'Corporate Summit 2025', category: 'Event', type: 'image', image: '/assets/event.png', description: 'TechCorp annual summit at Bangalore Convention Center.' },
  { id: 3, title: 'Drone Show Finale', category: 'Drone', type: 'video', image: '/assets/drone.png', description: '500 drone light show at Marina Beach.' },
  { id: 4, title: 'Brand Story - NatureCo', category: 'Business', type: 'image', image: '/assets/business.png', description: 'Organic brand shoot in natural settings.' },
  { id: 5, title: 'Beach Wedding Shoot', category: 'Wedding', type: 'image', image: '/assets/wedding.png', description: 'Romantic sunset beach wedding in Goa.' },
  { id: 6, title: 'Birthday Gala Night', category: 'Event', type: 'image', image: '/assets/event.png', description: 'Extravagant 50th birthday celebration.' },
  { id: 7, title: 'Product Launch - StyleZ', category: 'Business', type: 'video', image: '/assets/business.png', description: 'Fashion brand product launch video.' },
  { id: 8, title: 'Aerial Wedding Coverage', category: 'Drone', type: 'video', image: '/assets/drone.png', description: 'Aerial footage of outdoor wedding venue.' },
];
