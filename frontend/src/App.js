import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventListPage from "./pages/EventListPage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventDetailsPage from "./pages/EventDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventListPage />} />
        <Route path="/create" element={<CreateEventPage />} />
        <Route path="/edit/:id" element={<EditEventPage />} />
        <Route path="/details/:id" element={<EventDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
