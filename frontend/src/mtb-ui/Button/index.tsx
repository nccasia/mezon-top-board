import { EButtonColor } from '@app/enums/button.enum'
import { IButtonProps } from '@app/types/Button.types'
import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd'
import { useMemo } from 'react'

const Button = (props: IButtonProps & Omit<AntdButtonProps, 'color'>) => {
  const { color = 'primary', children, customClassName } = props

  const colorClassName: Record<string, string> = {
    [EButtonColor.PRIMARY]: `
      !bg-primary-default hover:!bg-primary-hover active:!bg-primary-active 
      !text-white !border-primary-border hover:!border-primary-hover active:!border-primary-active 
      disabled:!bg-gray-300 disabled:!border-gray-400 disabled:!text-gray-500 disabled:!cursor-not-allowed
    `,
    [EButtonColor.SECONDARY]: `
      !bg-secondary-default hover:!bg-secondary-hover active:!bg-secondary-active 
      !text-white !border-secondary-border hover:!border-secondary-hover active:!border-secondary-active 
      disabled:!bg-gray-300 disabled:!border-gray-400 disabled:!text-gray-500 disabled:!cursor-not-allowed
    `,
    [EButtonColor.DEFAULT]: `
      hover:!bg-default-hover active:!bg-default-active hover:!text-white 
      !border-default-border hover:!border-default-hover active:!border-default-active 
      disabled:!bg-gray-200 disabled:!border-gray-300 disabled:!text-gray-400 disabled:!cursor-not-allowed
    `
  }

  const _className = useMemo(() => {
    return `${colorClassName[color]} ${customClassName || ''}`
  }, [color, customClassName])

  // Exclude 'color' and 'customClassName' from props before passing to AntdButton
  const { color: _color, customClassName: _customClassName, ...antdButtonProps } = props

  return (
    <AntdButton className={_className} {...antdButtonProps}>
      {children}
    </AntdButton>
  )
}

export default Button
