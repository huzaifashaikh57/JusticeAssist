import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiFileText, FiBarChart2, FiHelpCircle, FiUser, FiLogOut, FiSearch, FiBell, FiChevronLeft, FiMenu, FiX, FiMoreVertical, FiArrowRight } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Placeholder Data
const user = {
    name: 'Jane Doe',
    avatar: 'https://i.pravatar.cc/150?img=32',
};

const stats = [
    { id: 1, label: 'Total Complaints', value: '18', icon: <FiFileText /> },
    { id: 2, label: 'Pending', value: '5', icon: <FiHelpCircle /> },
    { id: 3, label: 'Resolved', value: '13', icon: <FiBarChart2 /> },
];

const complaints = [
    { id: 'JA001', category: 'Online Harassment', date: '2025-10-08', status: 'Pending' },
    { id: 'JA002', category: 'UPI Fraud', date: '2025-10-05', status: 'Resolved' },
    { id: 'JA003', category: 'Fake Job Offer', date: '2025-09-28', status: 'In Progress' },
    { id: 'JA004', category: 'Loan App Scam', date: '2025-09-22', status: 'Resolved' },
];

const learningModules = [
    { id: 1, title: 'Protect Your UPI', description: 'Learn how to secure your digital payments.', image: '/images/crypto.jpg' },
    { id: 2, title: 'Avoid Fake Job Offers', description: 'Identify and report fraudulent job postings.', image: '/images/job.jpg' },
];

const recentActivities = [
    { id: 1, text: 'You submitted a complaint regarding Online Harassment.', time: 'Oct 8, 2025' },
    { id: 2, text: 'Your complaint about UPI Fraud was resolved.', time: 'Oct 5, 2025' },
    { id: 3, text: 'You completed the "Safe Social Media" learning module.', time: 'Oct 2, 2025' },
];

const weeklyComplaintsData = [
  { name: 'Week 1', complaints: 4 },
  { name: 'Week 2', complaints: 3 },
  { name: 'Week 3', complaints: 5 },
  { name: 'Week 4', complaints: 6 },
];

// Reusable Components
const StatCard = ({ icon, label, value, children }) => (
    <motion.div
        whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
    >
        <div className="flex justify-between items-start">
            <span className="text-2xl text-deep-blue">{icon}</span>
        </div>
        <div>
            <p className="text-lg font-semibold text-dark-navy mt-4">{value}</p>
            <h3 className="text-sm text-gray-500">{label}</h3>
        </div>
        {children}
    </motion.div>
);

const StatusBadge = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    const statusClasses = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Resolved': 'bg-green-100 text-green-800',
        'In Progress': 'bg-blue-100 text-blue-800',
    };
    return <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
    const navItems = [
        { icon: <FiHome />, label: 'Dashboard' },
        { icon: <FiFileText />, label: 'My Complaints' },
        { icon: <FiBarChart2 />, label: 'Awareness Hub' },
        { icon: <FiHelpCircle />, label: 'Get Guidance' },
        { icon: <FiUser />, label: 'Profile' },
    ];

    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
            <aside className={`fixed top-0 left-0 h-full bg-dark-navy text-white z-40 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-0 lg:w-20'} overflow-hidden`}>
                <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} p-4 h-16 border-b border-gray-700`}>
                    {isSidebarOpen && <span className="font-bold text-xl">JusticeAssist</span>}
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden text-2xl">
                        <FiX />
                    </button>
                </div>
                <nav className="mt-6 flex-grow">
                    {navItems.map(item => (
                        <a href="#" key={item.label} className={`flex items-center py-3 px-6 my-1 transition-colors duration-200 hover:bg-deep-blue ${isSidebarOpen ? '' : 'justify-center'}`}>
                            <span className="text-2xl">{item.icon}</span>
                            {isSidebarOpen && <span className="ml-4">{item.label}</span>}
                        </a>
                    ))}
                </nav>
                <div className="absolute bottom-0 w-full border-t border-gray-700">
                    <a href="#" className={`flex items-center py-3 px-6 transition-colors duration-200 hover:bg-deep-blue ${isSidebarOpen ? '' : 'justify-center'}`}>
                        <span className="text-2xl"><FiLogOut /></span>
                        {isSidebarOpen && <span className="ml-4">Logout</span>}
                    </a>
                </div>
            </aside>
        </>
    );
};

const Header = ({ isSidebarOpen, setSidebarOpen }) => (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-20 border-b border-soft-blue-gray">
        <div className="flex items-center justify-between p-4 h-16">
            <div className="flex items-center">
                <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-2xl text-dark-navy mr-4">
                    {isSidebarOpen ? <FiChevronLeft className="hidden lg:block" /> : <FiMenu />}
                </button>
                <div className="relative hidden md:block">
                    <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Quick Search..." className="bg-very-light-gray rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-deep-blue" />
                </div>
            </div>
            <div className="flex items-center space-x-6">
                <button className="relative text-2xl text-dark-navy">
                    <FiBell />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>
                <div className="flex items-center space-x-3">
                    <img src={user.avatar} alt="User Avatar" className="h-10 w-10 rounded-full" />
                    <span className="hidden sm:block font-semibold text-dark-navy">{user.name}</span>
                </div>
            </div>
        </div>
    </header>
);

const UserDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="bg-very-light-gray min-h-screen font-sans">
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="p-4 sm:p-6 lg:p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl font-bold text-dark-navy mb-6">Welcome back, {user.name.split(' ')[0]}!</h1>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        {stats.map(stat => (
                            <motion.div key={stat.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                <StatCard icon={stat.icon} label={stat.label} value={stat.value} />
                            </motion.div>
                        ))}
                         <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                            <StatCard icon={<FiBarChart2 />} label="Awareness Progress" value="75%">
                                <div className="w-full bg-soft-blue-gray rounded-full h-2.5 mt-3">
                                    <div className="bg-deep-blue h-2.5 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                            </StatCard>
                        </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Complaint Tracker */}
                        <motion.div 
                            className="xl:col-span-2 bg-white p-6 rounded-xl shadow-sm"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-xl font-bold text-dark-navy mb-4">Complaint Tracker</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-soft-blue-gray">
                                        <tr>
                                            <th className="p-3 text-sm font-semibold text-gray-500">Complaint ID</th>
                                            <th className="p-3 text-sm font-semibold text-gray-500">Category</th>
                                            <th className="p-3 text-sm font-semibold text-gray-500">Date</th>
                                            <th className="p-3 text-sm font-semibold text-gray-500">Status</th>
                                            <th className="p-3 text-sm font-semibold text-gray-500">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {complaints.map(c => (
                                            <tr key={c.id} className="border-b border-very-light-gray hover:bg-very-light-gray/50">
                                                <td className="p-3 font-mono text-sm text-dark-navy">{c.id}</td>
                                                <td className="p-3 text-sm text-gray-600">{c.category}</td>
                                                <td className="p-3 text-sm text-gray-600">{c.date}</td>
                                                <td className="p-3"><StatusBadge status={c.status} /></td>
                                                <td className="p-3">
                                                    <button className="text-deep-blue hover:underline text-sm">View Details</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* Recent Activities */}
                        <motion.div 
                            className="bg-white p-6 rounded-xl shadow-sm"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h2 className="text-xl font-bold text-dark-navy mb-4">Recent Activity</h2>
                            <div className="space-y-4">
                                {recentActivities.map(activity => (
                                    <div key={activity.id} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-deep-blue rounded-full mt-2"></div>
                                        <div>
                                            <p className="text-sm text-gray-700">{activity.text}</p>
                                            <p className="text-xs text-gray-400">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                    
                    {/* Weekly Complaints Chart */}
                    <motion.div 
                        className="mt-8 bg-white p-6 rounded-xl shadow-sm"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h2 className="text-xl font-bold text-dark-navy mb-4">Weekly Complaint Report</h2>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <AreaChart data={weeklyComplaintsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3F72AF" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#3F72AF" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#DBE2EF" />
                                    <XAxis dataKey="name" tick={{ fill: '#112D4E' }} />
                                    <YAxis tick={{ fill: '#112D4E' }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #DBE2EF' }} />
                                    <Area type="monotone" dataKey="complaints" stroke="#112D4E" fillOpacity={1} fill="url(#colorComplaints)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Awareness & Learning */}
                    <motion.div 
                        className="mt-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <h2 className="text-xl font-bold text-dark-navy mb-4">Awareness & Learning</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {learningModules.map(module => (
                                <div key={module.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row items-center group">
                                    <img src={module.image} alt={module.title} className="w-full sm:w-1/3 h-48 sm:h-full object-cover" />
                                    <div className="p-6 flex-1">
                                        <h3 className="font-bold text-lg text-dark-navy">{module.title}</h3>
                                        <p className="text-gray-600 text-sm mt-1 mb-4">{module.description}</p>
                                        <button className="flex items-center text-deep-blue font-semibold text-sm group-hover:underline">
                                            Continue Learning <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </main>
            </div>

            {/* Floating Chatbot Button */}
            <motion.button
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-8 right-8 bg-deep-blue text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl cursor-pointer z-50"
            >
                <FiHelpCircle />
            </motion.button>
        </div>
    );
};

export default UserDashboard;