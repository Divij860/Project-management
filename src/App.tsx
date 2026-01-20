import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const sections = useMemo(() => {
    const uniqueSections = Array.from(
      new Set(timelineData.map((item) => item.section))
    );
    return ['All', ...uniqueSections];
  }, []);

  const filteredData = useMemo(() => {
    if (selectedSection === 'All') return timelineData;
    return timelineData.filter((item) => item.section === selectedSection);
  }, [selectedSection]);

  const groupedData = useMemo(() => {
    const groups: Record<string, TimelineStep[]> = {};
    filteredData.forEach((item) => {
      if (!groups[item.section]) groups[item.section] = [];
      groups[item.section].push(item as TimelineStep);
    });
    return groups;
  }, [filteredData]);

  const stats = useMemo(() => {
    const completed = timelineData.filter(
      (item) => item.status === 'completed'
    ).length;
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ===== Desktop Sidebar ===== */}
          <motion.aside
            className="hidden lg:block lg:w-60 bg-white rounded-2xl shadow-lg p-3 h-fit sticky top-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-4 text-gray-700 font-semibold">
              <Filter className="w-5 h-5" />
              <span>Filter by Section</span>
            </div>

            <div className="flex flex-col gap-1">
              {sections.map((section) => (
                <motion.button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={`text-left px-4 py-1.5 rounded-lg font-medium transition-all ${
                    selectedSection === section
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 text-sm hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {section}
                </motion.button>
              ))}
            </div>
          </motion.aside>

          {/* ===== Timeline Content ===== */}
          <div className="flex-1 relative">
            {Object.entries(groupedData).map(
              ([section, items], sectionIndex) => (
                <div key={section}>
                  {selectedSection === 'All' && (
                    <SectionHeader
                      section={section}
                      index={sectionIndex}
                    />
                  )}

                  {items.map((item, index) => (
                    <TimelineItem
                      key={item.id}
                      {...item}
                      index={index}
                      isLast={
                        index === items.length - 1 &&
                        sectionIndex ===
                          Object.keys(groupedData).length - 1
                      }
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* ===== Mobile Floating Filter Button ===== */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full shadow-xl"
          whileTap={{ scale: 0.9 }}
        >
          <Filter className="w-5 h-5" />
          Filter
        </motion.button>
      </div>

      {/* ===== Mobile Bottom Sheet Filter ===== */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileFilterOpen(false)}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5"
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">
                  Filter by Section
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-sm text-blue-600"
                >
                  Close
                </button>
              </div>

              <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      setSelectedSection(section);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`px-4 py-2 rounded-lg text-left font-medium ${
                      selectedSection === section
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
