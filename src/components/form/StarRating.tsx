// src/components/form/StarRating.tsx
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
    name: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    value: string;
    required?: boolean;
}

export const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
    ({ name, options, onChange, value, required = false }, ref) => {
        return (
            <div ref={ref} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-4">
                    {options.map((option) => (
                        <label
                            key={option.value}
                            className="flex flex-col items-center cursor-pointer"
                        >
                            <div className="relative">
                                <input
                                    type="radio"
                                    name={name}
                                    value={option.value}
                                    checked={value === option.value}
                                    onChange={() => onChange(option.value)}
                                    className="sr-only"
                                    required={required}
                                />
                                <Star
                                    className={cn(
                                        "h-12 w-12 transition-all duration-200",
                                        value === option.value
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "fill-gray-200 text-gray-300 hover:fill-gray-300"
                                    )}
                                />
                            </div>
                            <span className="mt-1 text-xs text-center">{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        );
    }
);

StarRating.displayName = "StarRating";