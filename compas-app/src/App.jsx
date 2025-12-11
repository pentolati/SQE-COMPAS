import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import Gamification from './pages/Gamification';
import AIAssistant from './pages/AIAssistant';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/gamification" element={<Gamification />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
      </Routes>
    </Layout>
  );
}

export default App;
