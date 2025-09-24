# 🎉 Event Management System

A comprehensive full-stack web application for managing events with modern UI/UX design, built with React.js frontend and Node.js backend.

## 📋 Table of Contents
- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints-documentation)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Challenges and Solutions](#challenges-faced-and-solutions)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## 🚀 Project Description

The Event Management System is a modern web application designed to streamline event planning and management. It provides an intuitive interface for creating, viewing, editing, and managing events with features like advanced search, filtering, and real-time status updates.

### Key Objectives:
- **Efficient Event Management**: Create, read, update, and delete events
- **Advanced Filtering**: Search and filter events by title, description, and status
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Dynamic status management and instant feedback
- **User-friendly Interface**: Clean, modern UI with smooth transitions

## 💻 Technologies Used

### Frontend:
- **React.js 18+** - Modern UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS 3.4+** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **JavaScript (ES6+)** - Programming language

### Backend:
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables management

### Development Tools:
- **VS Code** - Code editor
- **npm** - Package manager
- **Git** - Version control
- **Nodemon** - Development server

## ✨ Features

### Core Features:
- ✅ **Event CRUD Operations** - Create, Read, Update, Delete events
- ✅ **Advanced Search & Filter** - Search by title/description, filter by status
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Status Management** - Draft, Published, Cancelled, Completed states
- ✅ **Real-time Filtering** - Instant search results as you type
- ✅ **Event Count Display** - Shows number of events per status
- ✅ **Modern UI Components** - Cards, buttons, forms with hover effects

### UI/UX Features:
- 🎨 **Beautiful Animations** - Smooth transitions and hover effects
- 📱 **Mobile-Responsive** - Optimized for all screen sizes
- 🔍 **Smart Search** - Search across multiple event properties
- 📊 **Visual Status Indicators** - Color-coded status badges
- 🚀 **Loading States** - User feedback during API calls

## 🛠️ Setup and Installation

### Prerequisites:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local installation or MongoDB Atlas)

### Installation Steps:

#### 1. Clone the Repository
```bash
git clone https://github.com/IT22574886/Event-management.git
cd Event-management
```

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/eventmanagement
PORT=5000" > .env

# Start the backend server
npm run dev
```

#### 3. Frontend Setup
```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

#### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: MongoDB running on localhost:27017

### Environment Variables:
Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/eventmanagement
PORT=5000
NODE_ENV=development
```

## 📡 API Endpoints Documentation

### Base URL: `http://localhost:5000/api`

#### Events Endpoints:

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/events` | Get all events | None |
| GET | `/events/:id` | Get event by ID | None |
| POST | `/events` | Create new event | Event object |
| PUT | `/events/:id` | Update event | Event object |
| DELETE | `/events/:id` | Delete event | None |

#### Event Object Structure:
```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string", 
  "date": "Date",
  "venue": "string",
  "capacity": "number",
  "status": "draft|published|cancelled|completed",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

#### Example API Calls:

**Create Event:**
```bash
POST /api/events
Content-Type: application/json

{
  "title": "Tech Conference 2024",
  "description": "Annual technology conference",
  "date": "2024-12-15",
  "venue": "Convention Center",
  "capacity": 500,
  "status": "published"
}
```

**Response:**
```json
{
  "_id": "674123...",
  "title": "Tech Conference 2024",
  "description": "Annual technology conference",
  "date": "2024-12-15T00:00:00.000Z",
  "venue": "Convention Center", 
  "capacity": 500,
  "status": "published",
  "createdAt": "2024-09-24T...",
  "updatedAt": "2024-09-24T..."
}
```

## 📸 Screenshots

### Main Dashboard
![Event List Page](screenshots/event-list.png)
*Main dashboard showing all events with search and filter functionality*

### Event Creation
![Create Event](screenshots/create-event.png)
*User-friendly form for creating new events*

### Search & Filter
![Search Filter](screenshots/search-filter.png)
*Advanced search and filtering interface*

### Mobile View
![Mobile Responsive](screenshots/mobile-view.png)
*Responsive design optimized for mobile devices*

## 📁 Project Structure

```
Event-management/
├── backend/
│   ├── controllers/
│   │   └── eventController.js
│   ├── models/
│   │   └── event.js
│   ├── routes/
│   │   └── eventRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EventList.js
│   │   │   ├── EventForm.js
│   │   │   └── SearchFilter.js
│   │   ├── pages/
│   │   │   ├── EventListPage.jsx
│   │   │   ├── CreateEventPage.jsx
│   │   │   └── EditEventPage.jsx
│   │   ├── services/
│   │   │   └── eventService.js
│   │   ├── App.js
│   │   └── index.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🧩 Challenges Faced and Solutions

### 1. **Tailwind CSS Configuration Issues**
**Challenge**: PostCSS configuration conflicts between Tailwind CSS v3 and v4
```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin
```

**Solution**: 
- Removed conflicting Tailwind v4 installation
- Installed stable Tailwind CSS v3.4.17
- Updated PostCSS configuration:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 2. **Duplicate Search Components**
**Challenge**: Two search filter bars appearing on the same page

**Solution**:
- Refactored component architecture
- Moved search logic to parent component (EventListPage)
- Made EventList a pure presentation component
- Established single source of truth for filtering

### 3. **Array.filter() TypeError**
**Challenge**: `events.filter is not a function` error during initial load

**Solution**:
```javascript
// Added default props and safety checks
const SearchFilter = ({ events = [], onFilter }) => {
  const safeEvents = Array.isArray(events) ? events : [];
  // ... rest of component
}
```

### 4. **API Data Structure Mismatch**
**Challenge**: Frontend expecting direct data, but receiving axios response object

**Solution**:
```javascript
// Fixed data extraction in EventListPage
const response = await getEvents();
const eventsArray = Array.isArray(response.data) ? response.data : [];
```

### 5. **Module Import Path Casing**
**Challenge**: File casing conflicts between `eventform.js` and `EventForm.js`

**Solution**:
- Standardized file naming convention
- Used consistent PascalCase for components
- Updated all import statements accordingly

### 6. **Component State Management**
**Challenge**: Managing filtered vs. all events across multiple components

**Solution**:
- Implemented proper state lifting
- Used separate state for `allEvents` and `filteredEvents`
- Clear data flow: EventListPage → SearchFilter → EventList

## 🔮 Future Enhancements

- 🔐 **User Authentication** - Login/register system
- 📧 **Email Notifications** - Event reminders and updates
- 📊 **Analytics Dashboard** - Event statistics and insights
- 🎫 **Ticket Management** - Booking and registration system
- 📅 **Calendar Integration** - Google Calendar sync
- 🖼️ **Image Upload** - Event photos and galleries
- 🌙 **Dark Mode** - Theme switching capability
- 📱 **Mobile App** - React Native implementation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**IT22574886**
- GitHub: [@IT22574886](https://github.com/IT22574886)
- Project Link: [https://github.com/IT22574886/Event-management](https://github.com/IT22574886/Event-management)

---

**⭐ If you found this project helpful, please give it a star on GitHub!**