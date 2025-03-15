import { ChevronDown } from "lucide-react";
export default function Accordion({ title, children }) {
    return (
        <details className="group w-full border-b border-gray-300">
        <summary className="flex justify-between items-center cursor-pointer px-2 py-4 xs:text-sm lg:text-xl font-medium text-gray-800 dark:text-white">
          {title}
          <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <div className="px-2 pb-4 text-gray-600 text-sm leading-6 dark:text-white">
          {children}
        </div>
      </details>
    );
}