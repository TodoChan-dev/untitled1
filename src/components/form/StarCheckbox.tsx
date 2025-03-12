// src/components/form/StarCheckbox.tsx
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarCheckboxProps {
    name: string;
    label: React.ReactNode;
    checked: boolean;
    onChange: (checked: boolean) => void;
    required?: boolean;
}

export const StarCheckbox = React.forwardRef<HTMLLabelElement, StarCheckboxProps>(
    ({ name, label, checked, onChange, required = false }, ref) => {
        return (
            <label
                ref={ref}
                className="flex items-center space-x-2 cursor-pointer group"
            >
                <div className="relative flex items-center justify-center h-6 w-6">
                    <input
                        type="checkbox"
                        name={name}
                        checked={checked}
                        onChange={(e) => onChange(e.target.checked)}
                        className="sr-only"
                        required={required}
                    />
                    <Star
                        className={cn(
                            "h-6 w-6 transition-colors",
                            checked
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-300 group-hover:fill-gray-300"
                        )}
                    />
                </div>
                <span className="text-sm">{label}</span>
            </label>
        );
    }
);

StarCheckbox.displayName = "StarCheckbox";