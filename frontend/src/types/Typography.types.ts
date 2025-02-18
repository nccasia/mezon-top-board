import { TypographyVariant, TypographyWeight, TypographyStyle } from '@app/enums/typography.enum'
import { ReactNode } from 'react'

export interface MtbTypographyProps {
  variant?: `${TypographyVariant}`
  children?: ReactNode
  label?: ReactNode
  position?: 'left' | 'right'
  weight?: `${TypographyWeight}`
  textStyle?: TypographyStyle[]
  customClassName?: string
  mt?: number
  mb?: number
  size?: number
  color?: string
}
