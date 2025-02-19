import { TypographyVariant, TypographyWeight, TypographyStyle } from '@app/enums/typography.enum'
import { CSSProperties, ReactNode } from 'react'

export interface MtbTypographyProps {
  variant?: `${TypographyVariant}`
  children?: ReactNode
  label?: ReactNode
  position?: 'left' | 'right'
  weight?: `${TypographyWeight}`
  textStyle?: TypographyStyle[]
  customClassName?: string
  size?: number
  style?: CSSProperties
}
