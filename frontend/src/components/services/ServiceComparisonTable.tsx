import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface ComparisonItem {
  feature: string;
  dumuzi: string;
  others: string;
}

interface ServiceComparisonTableProps {
  items: ComparisonItem[];
}

export const ServiceComparisonTable = ({
  items,
}: ServiceComparisonTableProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg"
    >
      {/* Header */}
      <div className="grid grid-cols-3 bg-stone-900 text-white">
        <div className="p-4 md:p-6 font-medium text-sm md:text-base border-r border-stone-700">
          Feature
        </div>
        <div className="p-4 md:p-6 font-display text-sm md:text-lg text-center border-r border-stone-700 bg-primary/20">
          <span className="text-secondary">DUMUZI</span> Confections
        </div>
        <div className="p-4 md:p-6 font-medium text-sm md:text-base text-center text-stone-400">
          Typical Brands
        </div>
      </div>

      {/* Rows */}
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`grid grid-cols-3 ${
            idx % 2 === 0 ? "bg-stone-50" : "bg-white"
          } border-b border-stone-100 last:border-b-0`}
        >
          <div className="p-4 md:p-5 text-sm md:text-base font-medium text-gray-800 border-r border-stone-100">
            {item.feature}
          </div>
          <div className="p-4 md:p-5 text-sm md:text-base text-center border-r border-stone-100 flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-green-600 shrink-0" />
            <span className="text-gray-700">{item.dumuzi}</span>
          </div>
          <div className="p-4 md:p-5 text-sm md:text-base text-center flex items-center justify-center gap-2 text-gray-500">
            <X className="w-4 h-4 text-red-400 shrink-0" />
            <span>{item.others}</span>
          </div>
        </div>
      ))}
    </motion.div>
  );
};
