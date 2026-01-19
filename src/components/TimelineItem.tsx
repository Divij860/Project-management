import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Circle } from 'lucide-react';

interface TimelineItemProps {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  completedOn: string | null;
  index: number;
  isLast: boolean;
}

export default function TimelineItem({
  id,
  title,
  description,
  status,
  completedOn,
  index,
  isLast,
}: TimelineItemProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-white" />,
          bgColor: 'bg-green-500',
          badgeColor: 'bg-green-100 text-green-800',
          badgeText: 'Completed',
          lineColor: 'bg-green-500',
        };
      case 'in-progress':
        return {
          icon: <Clock className="w-6 h-6 text-white" />,
          bgColor: 'bg-blue-500',
          badgeColor: 'bg-blue-100 text-blue-800',
          badgeText: 'In Progress',
          lineColor: 'bg-gradient-to-b from-green-500 to-blue-500',
        };
      default:
        return {
          icon: <Circle className="w-6 h-6 text-white" />,
          bgColor: 'bg-gray-400',
          badgeColor: 'bg-gray-100 text-gray-800',
          badgeText: 'Pending',
          lineColor: 'bg-gray-300',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div
      className="relative flex gap-6 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className={`${config.bgColor} rounded-full p-3 shadow-lg z-10 relative`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {config.icon}
          {status === 'in-progress' && (
            <motion.span
              className="absolute inset-0 rounded-full bg-blue-400"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>
        {!isLast && (
          <div className={`w-1 flex-1 mt-2 ${status === 'completed' ? 'bg-green-500' : config.lineColor}`} />
        )}
      </div>

      <motion.div
        className="flex-1 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 mb-8 border border-gray-100"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Step {id}
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${config.badgeColor}`}>
              {config.badgeText}
            </span>
          </div>
          {completedOn && (
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {new Date(completedOn).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </motion.div>
    </motion.div>
  );
}
