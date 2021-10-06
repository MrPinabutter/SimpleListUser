import Link from 'next/link';
import { useState, ForwardRefRenderFunction, forwardRef } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import { Container } from './styles';
import { ReactElement } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  label: string;
  value: string;
  setValue: (value: string) => void;
  password?: boolean;
  errorMessage?: string;
  forgetPassword?: boolean;
  error?: boolean;
  icon?: ReactElement;
}

export const Input = ({ 
  label,
  value,
  setValue,
  password, 
  icon,
  forgetPassword, 
  error,
  errorMessage,
  ...rest 
}: InputProps) => {
  const [isInputVisible, setIsInputVisible] = useState(true);

  return (
    <Container>
      <section className="labelContent">
        <label> 
          {label} 
        </label>
      </section>
      
      <div className="inputContainter">

        { !!icon && icon }

        <input 
          type={ password && isInputVisible ? "password" : "text" }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          {...rest} 
        />

        { password && (
          isInputVisible ? (
          <AiFillEyeInvisible 
            onClick={() => setIsInputVisible(false)} 
            size={24} 
            color="#C0C0C0" 
          />
          ) : (
          <AiFillEye 
            onClick={() => setIsInputVisible(true)} 
            size={24} 
            color="#C0C0C0" 
          />
          )  
        )}
      </div>
    </Container>
  )
}