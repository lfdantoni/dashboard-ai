import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Search } from 'lucide-react';

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  placeholder?: string;
}

const SEARCH_BAR_BASE_CLASSES = 'bg-white px-4 py-2 rounded-[20px] flex items-center w-[300px] shadow-[0_2px_5px_rgba(0,0,0,0.02)]';

export const SearchBar = ({ placeholder = 'Search...', className, ...props }: SearchBarProps) => {
  return (
    <div className={clsx(SEARCH_BAR_BASE_CLASSES, className)}>
      <Search size={18} color="#888" />
      <input 
        type="text" 
        placeholder={placeholder}
        className="border-none outline-none ml-2 w-full text-gray-600 bg-transparent placeholder:text-gray-500"
        {...props}
      />
    </div>
  );
};

