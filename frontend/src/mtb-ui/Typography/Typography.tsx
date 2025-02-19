import { TypographyVariant, TypographyWeight } from '@app/enums/typography.enum'
import { ConfigProvider, Typography } from 'antd'
import { MtbTypographyProps } from '@app/types/Typography.types'
import { useMemo } from 'react'

const { Title, Text } = Typography

function MtbTypography({
  variant = 'h1',
  children,
  label,
  weight,
  textStyle = [],
  position = 'left',
  customClassName = '',
  size,
  style = {}
}: MtbTypographyProps) {
  const level: Partial<Record<TypographyVariant, 1 | 2 | 3 | 4 | 5>> = {
    [TypographyVariant.H1]: 1,
    [TypographyVariant.H2]: 2,
    [TypographyVariant.H3]: 3,
    [TypographyVariant.H4]: 4,
    [TypographyVariant.H5]: 5
  } as const

  const fontSize = {
    [TypographyVariant.H1]: 38,
    [TypographyVariant.H2]: 36,
    [TypographyVariant.H3]: 24,
    [TypographyVariant.H4]: 20,
    [TypographyVariant.H5]: 16,
    [TypographyVariant.P]: 14
  } as const

  const weightClasses: Record<string, string> = {
    [TypographyWeight.BOLD]: 'font-bold',
    [TypographyWeight.NORMAL]: 'font-normal',
    [TypographyWeight.ITALIC]: 'italic',
    [TypographyWeight.SEMIBOLD]: 'font-semibold',
    [TypographyWeight.LIGHT]: 'font-light',
    [TypographyWeight.EXTRABOLD]: 'font-extrabold'
  }

  const Component = useMemo(() => {
    return variant === TypographyVariant.P ? 'p' : level[variant] ? Title : Text
  }, [variant])

  const titleLevel = level[variant] ?? undefined

  const fontWeight = useMemo(() => {
    return weight
      ? weightClasses[weight]
      : variant === TypographyVariant.P
        ? weightClasses[TypographyWeight.NORMAL]
        : weightClasses[TypographyWeight.BOLD]
  }, [weight, variant])

  return (
    <ConfigProvider
      theme={{
        components: {
          Typography: {
            titleMarginTop: 8,
            titleMarginBottom: 8
          }
        },
        token: {
          fontFamily: 'Open Sans, sans-serif'
        }
      }}
    >
      <Component
        {...(titleLevel ? { level: titleLevel } : {})}
        style={{
          ...style,
          fontSize: size ?? fontSize[variant]
        }}
      >
        <div className={['flex items-center', fontWeight, ...textStyle, customClassName].filter(Boolean).join(' ')}>
          {label && position === 'left' && <span className='mx-2 align-middle'>{label}</span>}
          {children}
          {label && position === 'right' && <span className='mx-2 align-middle'>{label}</span>}
        </div>
      </Component>
    </ConfigProvider>
  )
}

export default MtbTypography
