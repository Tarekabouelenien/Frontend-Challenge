import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const Button = ({ 
  children = "Done", 
  className = "", 
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={`
        /* Layout: Fixed Dimensions (340x40) */
        w-[340px]
        h-[40px]
        px-[20px]
        py-[10px]
        rounded-[4px]
        
        /* Flexbox Alignment */
        flex
        items-center
        justify-center
        gap-[10px]
        
        /* Typography */
        font-['Montserrat']
        font-normal
        text-[14px]
        leading-[1.3]
        text-[#1F2128]
        
        /* Colors & States */
        bg-[#FFCE22]          /* Variant 1: Default */
        hover:bg-[#FFD84D]    /* Variant 2: Hover */
        active:bg-[#FFCE22]   /* Variant 3: Pressed */
        
        /* Behavior */
        cursor-pointer
        transition-none       /* Instant Transition */
        
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};