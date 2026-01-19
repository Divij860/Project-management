import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import ProgressTracker from './components/ProgressTracker';
import TimelineItem from './components/TimelineItem';
import SectionHeader from './components/SectionHeader';
import timelineData from './timeline.json';

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  completedOn: string | null;
  section: string;
}

function App() {
  const [selectedSection, setSelectedSection] = useState<string>('All');

  const sections = useMemo(() => {
    const uniqueSections = Array.from(new Set(timelineData.map((item) => item.section)));
    return ['All', ...uniqueSections];
  }, []);

  const filteredData = useMemo(() => {
    if (selectedSection === 'All') return timelineData;
    return timelineData.filter((item) => item.section === selectedSection);
  }, [selectedSection]);

  const groupedData = useMemo(() => {
    const groups: Record<string, TimelineStep[]> = {};
    filteredData.forEach((item) => {
      if (!groups[item.section]) {
        groups[item.section] = [];
      }
      groups[item.section].push(item as TimelineStep);
    });
    return groups;
  }, [filteredData]);

  const stats = useMemo(() => {
    const completed = timelineData.filter((item) => item.status === 'completed').length;
    const total = timelineData.length;
    const percentage = Math.round((completed / total) * 100);
    return { completed, total, percentage };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ProgressTracker
        completedCount={stats.completed}
        totalCount={stats.total}
        percentage={stats.percentage}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="mb-8 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <Filter className="w-5 h-5" />
            <span>Filter by Section:</span>
          </div>
          {sections.map((section) => (
            <motion.button
              key={section}
              onClick={() => setSelectedSection(section)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedSection === section
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section}
            </motion.button>
          ))}
        </motion.div>

        <div className="relative">
          {Object.entries(groupedData).map(([section, items], sectionIndex) => (
            <div key={section}>
              {selectedSection === 'All' && <SectionHeader section={section} index={sectionIndex} />}
              {items.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  {...item}
                  index={index}
                  isLast={index === items.length - 1 && sectionIndex === Object.keys(groupedData).length - 1}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
