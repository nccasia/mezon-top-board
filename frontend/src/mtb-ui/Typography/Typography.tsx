import { TypographyVariant } from '@app/enums/common.enum'
import { ConfigProvider, Typography } from 'antd'
import styles from './Typography.module.scss'
import { MtbTypographyProps } from '@app/types/Typography.types'

const { Title, Text } = Typography

function MtbTypography({
  variant = 'h1',
  children,
  label,
  weight = 'bold',
  textStyle = [],
  position = 'left',
  customClassName,
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

  const classNames = [styles[weight], ...textStyle.map((style) => styles[style])].filter(Boolean).join(' ')

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
          fontFamily: 'Open Sans, sans-serif',
        }
      }}
    >
      <Component level={fontSize[variant]} className={classNames} style={{ marginTop: mt, marginBottom: mb, fontSize: size, color }}>
        <div className={`flex items-center ${customClassName}`}>
          {label && position === 'left' && <span className={styles.icon}>{label}</span>}
          {children}
          {label && position === 'right' && <span className={styles.icon}>{label}</span>}
        </div>
      </Component>
    </ConfigProvider>
  )
}

export default MtbTypography
