import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomeView } from './views/HomeView';
import { LearnView } from './views/LearnView';
import { PracticeView } from './views/PracticeView';
import { MockTestsView } from './views/MockTestsView';
import { DiagnosticView } from './views/DiagnosticView';
import { ErrorBookView } from './views/ErrorBookView';
import { FormulaBankView } from './views/FormulaBankView';
import { PlacementPrepView } from './views/PlacementPrepView';
import { ProgressView } from './views/ProgressView';
import { TeacherView } from './views/TeacherView';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#07080b] selection:bg-amber-500/30 selection:text-amber-200">
      <div>
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'learn' && <LearnView />}
            {activeTab === 'practice' && <PracticeView />}
            {activeTab === 'mock-tests' && <MockTestsView />}
            {activeTab === 'diagnostic' && <DiagnosticView />}
            {activeTab === 'error-book' && <ErrorBookView />}
            {activeTab === 'formula-bank' && <FormulaBankView />}
            {activeTab === 'placement-prep' && <PlacementPrepView />}
            {activeTab === 'progress' && <ProgressView />}
            {activeTab === 'teacher' && <TeacherView />}
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
