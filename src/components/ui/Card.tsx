import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverable = false 
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm
        ${hoverable ? 'transition-all duration-300 hover:shadow-md hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;