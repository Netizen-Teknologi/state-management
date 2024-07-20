// FormContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface FormContextData {
  values: { [key: string]: any }; // Replace with your specific form data types
  errors: { [key: string]: string | undefined };
  handleChange: (name: string, value: any) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextData | null>(null);

export const FormProvider = ({ children } : { children: any}) => {
    const [values, setValues] = useState<FormContextData['values']>({}); // Replace with your initial values
    const [errors, setErrors] = useState<FormContextData['errors']>({});
  
    const handleChange = (name: string, value: any) => {
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
      // setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined })); // Clear error on change
    };
  
    const resetForm = () => {
      setValues({});
      setErrors({});
    };
  
    const value = { values, errors, handleChange, resetForm };
  
    return (
      <FormContext.Provider value={value}>
        {children}
      </FormContext.Provider>
    );
  };
  
export const useForm = () => {
  const context = useContext(FormContext);

  if ( context === null ) {
    throw new Error("useForm must be used within FormProvider");
  }

  return context;
}