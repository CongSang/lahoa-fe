'use client';

import React, { useState } from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/index';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

type InputPasswordProps = {
  value?: string;
  onChange?: (val: string) => void;
};

export const InputPassword = ({ value, onChange, ...props } : InputPasswordProps & React.ComponentProps<"input">) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
      setShowPassword(!showPassword);
  };

  return (
    <InputGroup>
      <InputGroupInput
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        {...props}
      />

      <InputGroupAddon align="inline-end" className='cursor-pointer'>
        {showPassword ? (
            <EyeIcon size={18} className='text-gray-400' onClick={toggleShowPassword} />
        ) : (
            <EyeOffIcon size={18} className='text-slate-400' onClick={toggleShowPassword} />
        )}
      </InputGroupAddon>
    </InputGroup>
  );
}
