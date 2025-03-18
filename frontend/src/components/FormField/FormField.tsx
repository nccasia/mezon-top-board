import { ReactNode } from 'react'

interface FormFieldProps {
  label?: string
  description?: string
  children: ReactNode
  errorText?: string
  customClass?: string
}

function FormField({ label, description = '', children, errorText, customClass }: FormFieldProps) {
  return (
    <div className={`flex items-start pt-10 gap-6 ${customClass}`}>
      <div className='flex flex-col flex-1'>
        <p className='text-[18px] '>{label}</p>
        <p className='text-[16px] text-gray-500'>{description}</p>
      </div>
      <div className='flex flex-col flex-5'>
        {children}
        {errorText && <p className='text-red-500 text-sm pt-2'>{errorText}</p>}
      </div>
    </div>
  )
}

export default FormField
