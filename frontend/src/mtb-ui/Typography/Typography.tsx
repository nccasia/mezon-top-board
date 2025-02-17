import { TypographyVariant, TypographyWeight } from '@app/enums/common.enum'
import { ConfigProvider, Typography } from 'antd'
import styles from './Typography.module.scss'
import { MtbTypographyProps } from '@app/types/Typography.types'

const { Title, Text } = Typography

function MtbTypography({
  variant = 'h1',
  children,
  label,
  weight = TypographyWeight.BOLD,
  textStyle = [],
  position = 'left',
  customClassName = '',
  mt,
  mb,
  size,
  color
}: MtbTypographyProps) {
  const fontSize = {
    [TypographyVariant.H1]: 1,
    [TypographyVariant.H2]: 2,
    [TypographyVariant.H3]: 3,
    [TypographyVariant.H4]: 4,
    [TypographyVariant.H5]: 5
  } as const

  const weightClasses: Record<string, string> = {
    [TypographyWeight.BOLD]: 'font-bold',
    [TypographyWeight.NORMAL]: 'font-normal',
    [TypographyWeight.ITALIC]: 'italic',
    [TypographyWeight.SEMIBOLD]: 'font-semibold',
    [TypographyWeight.LIGHT]: 'font-light',
    [TypographyWeight.EXTRABOLD]: 'font-extrabold'
  }

  const Component = fontSize[variant] ? Title : Text

  return (
    <ConfigProvider
      theme={{
        components: {
          Typography: {
            titleMarginTop: mt ?? 8,
            titleMarginBottom: mb ?? 8
          }
        },
        token: {
          fontFamily: 'Open Sans, sans-serif'
        }
      }}
    >
      <Component level={fontSize[variant]} style={{ marginTop: mt, marginBottom: mb, fontSize: size, color }}>
        <div
          className={['flex items-center', weightClasses[weight] || 'font-bold', ...textStyle, customClassName]
            .filter(Boolean)
            .join(' ')}
        >
          {label && position === 'left' && <span className={styles.icon}>{label}</span>}
          {children}
          {label && position === 'right' && <span className={styles.icon}>{label}</span>}
        </div>
      </Component>
    </ConfigProvider>
  )
}

export default MtbTypography
