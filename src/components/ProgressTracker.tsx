import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ProgressTrackerProps {
  completedCount: number;
  totalCount: number;
  percentage: number;
}

export default function ProgressTracker({ completedCount, totalCount, percentage }: ProgressTrackerProps) {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <motion.div
              className="relative w-32 h-32"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="46"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="46"
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 352" }}
                  animate={{ strokeDasharray: `${(percentage / 100) * 352} 352` }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="text-2xl font-bold text-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {percentage}%
                </motion.span>
              </div>
            </motion.div>

            <div className="text-left">
              <motion.h1
                className="text-3xl md:text-3xl font-bold text-gray-900 mb-1"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Cokomi Project Timeline
              </motion.h1>
              <motion.p
                className="text-md text-gray-600 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Project Completion
              </motion.p>
              <motion.div
                className="flex items-center gap-2 text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="font-semibold">
                  {completedCount} of {totalCount} tasks completed
                </span>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="w-full md:w-64 bg-gray-100 rounded-full h-6 overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
