import React, { createContext, useContext, useState } from 'react';

interface FormContextData {
  forms: { [formName: string]: { [key: string]: any } }; // Menyimpan form data di nested object
  formErrors: { [formName: string]: { [key: string]: string | undefined } };
  handleChange: (name: string, value: any, formName?: string) => void; 
  resetForm: (formName?: string) => void;
}

const FormContext = createContext<FormContextData | null>(null);

export const FormProvider = ({ children }: { children: any }) => {
  const [forms, setForms] = useState<FormContextData['forms']>({});
  const [formErrors, setFormErrors] = useState<FormContextData['formErrors']>({});

  const handleChange = (name: string, value: any, formName: string = 'defaultForm') => {
    setForms((prevForms) => ({
      ...prevForms,
      [formName]: { ...prevForms[formName], [name]: value },
    }));
  };

  const resetForm = (formName: string = 'defaultForm') => {
    setForms((prevForms) => ({ ...prevForms, [formName]: {} }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [formName]: {} }));
  };

  const value = { forms, formErrors, handleChange, resetForm };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (formName: string = 'defaultForm') => {
  const context = useContext(FormContext);

  if (context === null) {
    throw new Error("useForm must be used within FormProvider");
  }

  const { forms, formErrors, handleChange, resetForm } = context;

  const currentFormValues = forms[formName] || {};
  const currentFormErrors = formErrors[formName] || {};

  return {
    values: currentFormValues,
    errors: currentFormErrors,
    handleChange: (name: string, value: any) => handleChange(name, value, formName),
    resetForm: () => resetForm(formName),
  };
};
