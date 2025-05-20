import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', className = '' }) => {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };
  
  return (
    <div className={`${sizeStyles[size]} rounded-full overflow-hidden flex-shrink-0 ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to initials if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.parentElement!.classList.add('bg-gray-200', 'flex', 'items-center', 'justify-center');
          
          const initials = document.createElement('span');
          initials.className = 'text-gray-700 font-medium';
          initials.textContent = alt.split(' ').map(name => name[0]).join('').toUpperCase();
          target.parentElement!.appendChild(initials);
        }}
      />
    </div>
  );
};

export default Avatar;