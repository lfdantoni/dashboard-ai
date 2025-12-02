import { InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  placeholder?: string;
}

export const SearchBar = ({ placeholder = 'Search...', className = '', ...props }: SearchBarProps) => {
  return (
    <div className={`search-bar ${className}`.trim()}>
      <Search size={18} color="#888" />
      <input 
        type="text" 
        placeholder={placeholder}
        className="search-input"
        {...props}
      />
    </div>
  );
};

