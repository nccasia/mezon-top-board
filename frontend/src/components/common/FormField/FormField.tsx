import { ReactNode } from 'react'

interface FormFieldProps {
  label?: string
  children: ReactNode
  errorText?: string
  customClass?: string
}

function FormField({ label, children, errorText, customClass }: FormFieldProps) {
  return (
    <div className={`flex items-start pt-10 ${customClass}`}>
      <p className='text-[18px] flex-1'>{label}</p>
      <div className="flex flex-col flex-5">
        {children}
        {errorText && <p className="text-red-500 text-sm pt-2">{errorText}</p>}
      </div>
    </div>
  )
}

export default FormField
