import React, { useState } from 'react';
import { Calendar, Bell, User, BarChart, Award, Zap, TrendingUp, Compass, Star, Moon, Sunrise, ChevronLeft, ChevronRight, Info, Play, Check, X } from 'lucide-react';

const ScholarshipDashboard = () => {
  // State management
  const [currentMonth, setCurrentMonth] = useState(new Date(2021, 0));
  const [selectedDay, setSelectedDay] = useState(8);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'NEW SCHOLARSHIP ASSIGNED TO YOUR CAMPAIGN', icon: <Bell className="w-5 h-5" />, read: false },
    { id: 2, title: 'SCHOLARSHIP APPROVED!', icon: <User className="w-5 h-5" />, read: false },
    { id: 3, title: 'EXPLORE NEW SCHOLARSHIPS', icon: <Award className="w-5 h-5" />, read: false },
    { id: 4, title: 'NEW SCHOLARSHIP ASSIGNED!', icon: <Bell className="w-5 h-5" />, read: false },
    { id: 5, title: 'SCHOLARSHIP ON HOLD', icon: <User className="w-5 h-5" />, read: false }
  ]);
  
  // Calendar data generation
  const getCalendarData = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const paddingDays = Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }, (_, i) => null);
    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    return { paddingDays, calendarDays };
  };
  
  const { paddingDays, calendarDays } = getCalendarData(currentMonth);
  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  // Functions to navigate months
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  // Function to format month name
  const formatMonth = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };
  
  // Function to mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  // Dashboard data
  const donorRelations = [
    { id: 1, title: 'MANAGING SCHOLARSHIPS AND FUNDS', date: "TODAY'S", status: 'in-progress', completed: false },
    { id: 2, title: 'DONOR RELATIONS AND FINDING', date: "TOMORROW'S", status: 'not-started', completed: true },
    { id: 3, title: 'SCHOLARSHIP PLANNING', date: 'UPCOMING', status: 'not-started', completed: true },
    { id: 4, title: 'FUNDRAISING STRATEGIES', date: '13/01/2021', status: 'not-started', completed: true },
    { id: 5, title: 'SCHOLARSHIP ESSENTIALS', date: '15/01/2021', status: 'not-started', completed: false },
    { id: 6, title: 'DONOR ENGAGEMENT TECHNIQUES', date: '17/01/2021', status: 'in-progress', completed: true },
    { id: 7, title: 'FUND MANAGEMENT STRATEGIES', date: '19/01/2021', status: 'in-progress', completed: false },
    { id: 8, title: 'SCHOLARSHIP ALLOCATION PROCESS', date: '21/01/2021', status: 'not-started', completed: true }
  ];
  
  const [scholarships, setScholarships] = useState([
    { id: 1, title: 'INTERACTIVE LEARNING SIMULATIONS', date: '01/02/2021', status: 'view', completed: true },
    { id: 2, title: 'GAMIFIED LEARNING EXPERIENCES', date: '14/02/2021', status: 'view', completed: true },
    { id: 3, title: 'VIRTUAL TEAMS FOR PROJECTS', date: '01/03/2021', status: 'full', completed: true },
    { id: 4, title: 'CERTIFICATION AND BADGE SYSTEM', date: '01/04/2021', status: 'view', completed: false },
    { id: 5, title: 'CASE STUDIES', date: '01/04/2021', status: 'full', completed: false }
  ]);
  
  // Function to apply for a scholarship
  const applyForScholarship = (id) => {
    setScholarships(
      scholarships.map(scholarship => 
        scholarship.id === id ? { ...scholarship, status: 'applied' } : scholarship
      )
    );
  };
  
  const scholarshipStats = [
    { title: 'Scholarship inbox', value: 5 },
    { title: 'Completed scholarships', value: 12 },
    { title: 'Certification details', value: 7 },
    { title: 'Time spent on scholarships', value: '11:34:12' },
    { title: 'Planned scholarships', value: 2 },
    { title: 'Organized scholarships', value: 1 }
  ];
  
  const achievements = [
    { title: 'GREAT START!', icon: <Star className="w-5 h-5" /> },
    { title: 'FAST LEARNER!', icon: <Zap className="w-5 h-5" /> },
    { title: 'GROWTH HERO', icon: <TrendingUp className="w-5 h-5" /> },
    { title: 'LEARNING EXPLORER', icon: <Compass className="w-5 h-5" /> },
    { title: 'NEWCOMER', icon: <User className="w-5 h-5" /> },
    { title: 'STREAK STAR', icon: <Star className="w-5 h-5" /> },
    { title: 'NIGHT OWL', icon: <Moon className="w-5 h-5" /> },
    { title: 'EARLY BIRD', icon: <Sunrise className="w-5 h-5" /> }
  ];
  
  return (
    <div className="bg-gray-100 p-2 md:p-4 w-full min-h-screen">
      {/* First Row */}
      <div className="grid grid-cols-1 mt-16 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        {/* Calendar Section */}
        <div className="bg-white shadow rounded-md overflow-hidden">
          <div className="bg-gray-700 text-white p-2 md:p-4 flex justify-between items-center">
            <h2 className="font-semibold text-sm md:text-base">{formatMonth(currentMonth)}</h2>
            <div className="flex space-x-2">
              <button className="text-white"><Calendar className="w-4 h-4 md:w-5 md:h-5" /></button>
              <button className="text-white"><BarChart className="w-4 h-4 md:w-5 md:h-5" /></button>
            </div>
          </div>
          <div className="p-2 md:p-4">
            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {weekdays.map((day, i) => (
                <div key={i} className="text-center font-medium text-gray-500 text-xs md:text-sm py-1">{day}</div>
              ))}
              {paddingDays.map((_, i) => (
                <div key={`padding-${i}`} className="text-center py-1 md:py-2"></div>
              ))}
              {calendarDays.map(day => (
                <button 
                  key={day} 
                  onClick={() => setSelectedDay(day)}
                  className={`text-center py-1 md:py-2 text-xs md:text-sm rounded-full hover:bg-gray-200 transition-colors ${day === selectedDay ? 'bg-gray-700 text-white hover:bg-gray-600' : ''}`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between p-2 border-t border-gray-200">
            <button 
              onClick={prevMonth}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextMonth}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Donor Relations Section */}
        <div className="bg-white shadow rounded-md overflow-hidden sm:col-span-2 lg:col-span-1">
          <div className="bg-gray-700 text-white p-2 md:p-4">
            <h2 className="font-semibold text-sm md:text-base">Donor relations</h2>
            <p className="text-xs text-gray-300">Crowdfunding</p>
          </div>
          <div className="overflow-auto max-h-60 md:max-h-96">
            <table className="min-w-full">
              <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
                <tr>
                  <th className="px-2 md:px-4 py-1 md:py-2 text-left text-xs">Scholarship</th>
                  <th className="px-1 md:px-2 py-1 md:py-2 text-left text-xs">Scholarship</th>
                  <th className="px-1 md:px-2 py-1 md:py-2 text-center text-xs">Certification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {donorRelations.map((item) => (
                  <tr key={item.id} className="text-xxs md:text-xs hover:bg-gray-50">
                    <td className="px-2 md:px-4 py-1 md:py-2 text-gray-700">{item.title}</td>
                    <td className="px-1 md:px-2 py-1 md:py-2 text-gray-600 text-xs">{item.date}</td>
                    <td className="px-1 md:px-2 py-1 md:py-2">
                      <div className="flex justify-center items-center space-x-1 md:space-x-2">
                        {item.status === 'in-progress' ? (
                          <div className="px-1 md:px-2 py-0.5 md:py-1 bg-gray-200 text-gray-700 text-xxs md:text-xs rounded">In progress</div>
                        ) : (
                          <div className="px-1 md:px-2 py-0.5 md:py-1 bg-gray-800 text-white text-xxs md:text-xs rounded">Not started</div>
                        )}
                        <span className={`inline-block h-3 w-3 md:h-4 md:w-4 ${!item.completed ? 'text-red-500' : 'text-green-500'}`}>
                          {!item.completed ? <X size={16} /> : <Check size={16} />}
                        </span>
                        <button className="text-gray-500 text-xs hover:bg-gray-200 rounded-full p-1 transition-colors">
                          <Info size={14} />
                        </button>
                        <button className="text-gray-700 text-xs hover:bg-gray-200 rounded-full p-1 transition-colors">
                          <Play size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Notification Center */}
        <div className="bg-white shadow rounded-md overflow-hidden col-span-1">
          <div className="bg-gray-700 text-white p-2 md:p-4">
            <h2 className="font-semibold text-sm md:text-base">Notification Center</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className="flex items-center p-2 md:p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex-shrink-0 bg-gray-200 p-1 md:p-2 rounded-full mr-2 md:mr-4">
                  {notification.icon}
                </div>
                <div className="flex-grow">
                  <p className="text-xxs md:text-xs font-medium text-gray-700">{notification.title}</p>
                </div>
                <div className="flex-shrink-0 ml-1 md:ml-2">
                  {!notification.read && (
                    <div className="h-1 w-1 md:h-2 md:w-2 bg-gray-300 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Second Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 mt-2 md:mt-4">
        {/* Scholarship Statistics */}
        <div className="bg-white shadow rounded-md overflow-hidden">
          <div className="bg-gray-700 text-white p-2 md:p-4 flex justify-between items-center">
            <h2 className="font-semibold text-sm md:text-base">Scholarship statistics</h2>
            <button className="text-white hover:bg-gray-600 rounded p-1 transition-colors">
              <BarChart className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
          <div className="p-2 md:p-4">
            <table className="min-w-full">
              <tbody className="divide-y divide-gray-200">
                {scholarshipStats.map((stat, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-1 md:py-2 text-xs md:text-sm text-gray-700">{stat.title}</td>
                    <td className="py-1 md:py-2 text-xs md:text-sm text-gray-900 text-right font-semibold">{stat.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* New Available Scholarships */}
        <div className="bg-white shadow rounded-md overflow-hidden">
          <div className="bg-gray-700 text-white p-2 md:p-4">
            <h2 className="font-semibold text-sm md:text-base">New available scholarships</h2>
          </div>
          <div className="overflow-auto max-h-60 md:max-h-96">
            <table className="min-w-full">
              <thead className="bg-gray-100 text-xxs md:text-xs text-gray-700 uppercase">
                <tr>
                  <th className="px-2 md:px-4 py-1 md:py-2 text-left">Scholarship details</th>
                  <th className="px-1 md:px-2 py-1 md:py-2 text-left">Scholarship</th>
                  <th className="px-1 md:px-2 py-1 md:py-2 text-center">Certification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {scholarships.map((item) => (
                  <tr key={item.id} className="text-xxs md:text-xs hover:bg-gray-50">
                    <td className="px-2 md:px-4 py-1 md:py-2 text-gray-700">{item.title}</td>
                    <td className="px-1 md:px-2 py-1 md:py-2 text-gray-600">{item.date}</td>
                    <td className="px-1 md:px-2 py-1 md:py-2">
                      <div className="flex justify-center items-center space-x-1 md:space-x-2">
                        {item.status === 'applied' ? (
                          <div className="px-1 md:px-2 py-0.5 md:py-1 bg-gray-400 text-white text-xxs md:text-xs rounded">Applied</div>
                        ) : (
                          <div className={`px-1 md:px-2 py-0.5 md:py-1 ${item.status === 'view' ? 'bg-gray-600' : 'bg-gray-800'} text-white text-xxs md:text-xs rounded`}>
                            {item.status === 'view' ? 'View' : 'Full'}
                          </div>
                        )}
                        <span className={`inline-block h-3 w-3 md:h-4 md:w-4 ${!item.completed ? 'text-red-500' : 'text-green-500'}`}>
                          {!item.completed ? <X size={16} /> : <Check size={16} />}
                        </span>
                        <button className="text-gray-500 text-xs hover:bg-gray-200 rounded-full p-1 transition-colors">
                          <Info size={14} />
                        </button>
                        {item.status === 'view' ? (
                          <button 
                            onClick={() => applyForScholarship(item.id)}
                            className="px-1 md:px-2 py-0.5 md:py-1 bg-gray-200 text-xxs md:text-xs rounded hover:bg-gray-300 transition-colors"
                          >
                            Apply
                          </button>
                        ) : (
                          <span className="px-1 md:px-2 py-0.5 md:py-1 text-xxs md:text-xs">
                            {item.status === 'applied' ? <Check size={16} className="text-green-500" /> : <X size={16} />}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Your Statistics */}
        <div className="bg-white shadow rounded-md overflow-hidden">
          <div className="bg-gray-700 text-white p-2 md:p-4 flex justify-between items-center">
            <h2 className="font-semibold text-sm md:text-base">Your statistics</h2>
            <button className="text-white hover:bg-gray-600 rounded p-1 transition-colors">
              <BarChart className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
          <div className="p-2 md:p-6 flex justify-center">
            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
              <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full border-4 md:border-8 border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xxs md:text-xs text-gray-500">CERTIFICATION</div>
                  <div className="text-lg md:text-2xl font-bold">12</div>
                </div>
              </div>
              <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full border-4 md:border-8 border-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold">99%</div>
                  <div className="text-xxs md:text-xs text-gray-500">SUCCESS RATE</div>
                </div>
              </div>
              <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full border-4 md:border-8 border-gray-400 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xxs md:text-xs text-gray-500">Scholarship</div>
                  <div className="text-lg md:text-2xl font-bold">9</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Achievements */}
      <div className="bg-white shadow rounded-md overflow-hidden mt-2 md:mt-4">
        <div className="bg-gray-700 text-white p-2 md:p-4">
          <h2 className="font-semibold text-sm md:text-base">Your accomplishments</h2>
        </div>
        <div className="p-2 md:p-4 grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4">
          {achievements.map((achievement, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="bg-gray-200 p-2 md:p-4 rounded-md mb-1 md:mb-2 hover:bg-gray-300 cursor-pointer transition-colors">
                {achievement.icon}
              </div>
              <p className="text-xxs md:text-xs text-center text-gray-700">{achievement.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Add custom text size for extra small screens
const style = document.createElement('style');
style.innerHTML = `
  .text-xxs {
    font-size: 0.65rem;
    line-height: 0.75rem;
  }
`;
document.head.appendChild(style);

export default ScholarshipDashboard;