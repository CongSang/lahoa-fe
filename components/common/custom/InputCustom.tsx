'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cleanAmount, formatDisplay } from '@/lib/index';
import { Input } from "@/components/common/ui"

interface InputProps {
  name?: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  isSelect?: boolean;
  options?: { value: string; label: string }[];
  inputClass?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const InputCustom = ({ name, label, value, placeholder, type = "text", disabled, isSelect, options, onChange }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [displayValue, setDisplayValue] = useState("");

  const toggleShowPassword = () => {
      setShowPassword(!showPassword);
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const inputVal = e.target.value;
    const numericValue = cleanAmount(inputVal);

    if (/^\d*\.?\d*$/.test(numericValue)) {
      setDisplayValue(formatDisplay(numericValue));

      const customEvent = {
        ...e,
        target: {
          ...e.target,
          value: numericValue,
          name: name
        }
      } as ChangeEvent<HTMLInputElement>;

      onChange(customEvent);
    }
  }

  useEffect(() => {
    setDisplayValue(formatDisplay(value))
  }, [value])

  return (
    <div className='w-full'>
        {label && (
          <label className="block text-sm max-sm:text-xs font-semibold mb-1">
            {label}
          </label>
        )}

        <div className="relative">
            {isSelect ? (
                <select 
                  name={name}
                  disabled={disabled}
                  className="w-full px-3 py-2 bg-white text-sm max-sm:text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all placeholder:text-gray-300"
                  value={value ?? ""}
                  onChange={(e) => onChange(e)}
                >
                  <option value="">{placeholder}</option>
                  {options?.map((item) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
            ) : (type === "number") ? (
                <Input
                  name={name}
                  disabled={disabled}
                  type="text"
                  value={displayValue}
                  onChange={(e) => handleNumberChange(e)}
                  placeholder={placeholder}
                  min={0}
                  className="bg-white px-3 py-2 h-auto"
                />
            ) : (
                <Input
                  name={name}
                  disabled={disabled}
                  type={type === "password" ? (showPassword ? "text" : "password") : type}
                  value={value ?? ""}
                  onChange={(e) => onChange(e)}
                  placeholder={placeholder}
                  className="bg-white px-3 py-2 h-auto"
                />
            )}

            {type === "password" && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                    {showPassword ? (
                        <Eye size={18} className='text-gray-400' onClick={toggleShowPassword} />
                    ) : (
                        <EyeOff size={18} className='text-slate-400' onClick={toggleShowPassword} />
                    )}
                </span>
            )}
        </div>
    </div>
  );
}