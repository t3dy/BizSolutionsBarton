import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { SolutionsPage } from './pages/SolutionsPage';
import { QuotePage } from './pages/QuotePage';
import { AssistantPage } from './pages/AssistantPage';
import { LeadsPage } from './pages/LeadsPage';
import { SchedulingPage } from './pages/SchedulingPage';
import { PortalPage } from './pages/PortalPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/scheduling" element={<SchedulingPage />} />
            <Route path="/portal" element={<PortalPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
