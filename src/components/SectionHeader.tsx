import { motion } from 'framer-motion';
import {
  Server,
  Database,
  Shield,
  Layout,
  CreditCard,
  TestTube,
  Zap,
  Filter,
  MapPin,
  Tag,
  Globe
} from 'lucide-react';

interface SectionHeaderProps {
  section: string;
  index: number;
}

const sectionIcons: Record<string, React.ReactNode> = {
  'Backend API & Architecture': <Server className="w-6 h-6" />,
  'Database & Product Schema': <Database className="w-6 h-6" />,
  'Admin Panels': <Shield className="w-6 h-6" />,
  'Admin Data Filtering': <Filter className="w-6 h-6" />,
  'Frontend Logic': <Layout className="w-6 h-6" />,
  'Country Selection': <Globe className="w-6 h-6" />,
  'Pricing & Checkout': <CreditCard className="w-6 h-6" />,
  'Promotions': <Tag className="w-6 h-6" />,
  Payments: <CreditCard className="w-6 h-6" />,
  'Address & Contact': <MapPin className="w-6 h-6" />,
  'Content & Marketing': <Layout className="w-6 h-6" />,
  'Testing & QA': <TestTube className="w-6 h-6" />,
  Scalability: <Zap className="w-6 h-6" />
};

const sectionColors: Record<string, string> = {
  'Backend API & Architecture': 'from-purple-500 to-purple-600',
  'Database & Product Schema': 'from-blue-500 to-blue-600',
  'Admin Panels': 'from-red-500 to-red-600',
  'Admin Data Filtering': 'from-rose-500 to-rose-600',
  'Frontend Logic': 'from-teal-500 to-teal-600',
  'Country Selection': 'from-indigo-500 to-indigo-600',
  'Pricing & Checkout': 'from-amber-500 to-amber-600',
  Promotions: 'from-yellow-500 to-yellow-600',
  Payments: 'from-orange-500 to-orange-600',
  'Address & Contact': 'from-cyan-500 to-cyan-600',
  'Content & Marketing': 'from-pink-500 to-pink-600',
  'Testing & QA': 'from-fuchsia-500 to-fuchsia-600',
  Scalability: 'from-emerald-500 to-emerald-600'
};

export default function SectionHeader({ section, index }: SectionHeaderProps) {
  const icon = sectionIcons[section] ?? <Server className="w-6 h-6" />;
  const gradient = sectionColors[section] ?? 'from-gray-500 to-gray-600';

  return (
    <motion.div
      className="mb-8 mt-12 first:mt-0"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${gradient} text-white shadow-lg`}
      >
        {icon}
        <h2 className="text-xl font-bold">{section}</h2>
      </div>
    </motion.div>
  );
}
