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
        <p className='text-[18px] '>{label}</p>
        <p className='text-[14px] text-gray-500'>{description}</p>
      </div>
      <div className='flex flex-col w-[calc(75%-1.5rem)]'>
        {children}
        {errorText && <p className='text-red-500 text-sm pt-2'>{errorText}</p>}
      </div>
    </div>
  )
}

export default FormField
