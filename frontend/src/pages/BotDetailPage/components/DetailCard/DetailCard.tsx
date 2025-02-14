import { DiscordOutlined, InfoCircleOutlined, LinkOutlined, RiseOutlined, TagOutlined, UserOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import styles from './DetailCard.module.scss'

function DetailCard() {
  return (
    <div className='pt-2 pb-2 pl-2'>
      <div className='pb-4'>
        <p>
          <InfoCircleOutlined /> Details
        </p>
        <div className='pt-2 flex flex-col gap-1'>
          <p>Prefix $</p>
          <p>Shards 1792</p>
          <p>Server Count 3371839</p>
        </div>
      </div>
      <div className='pb-4'>
        <p>
          <RiseOutlined /> Socials
        </p>
        <div className='pt-2 flex flex-col gap-1'>
          <p>
            <LinkOutlined /> www.patreon.com
          </p>
          <p>
            <DiscordOutlined /> Discord Support Server
          </p>
        </div>
      </div>
      <div className='pb-4'>
        <p>
          <TagOutlined /> Categories
        </p>
        <div className='pt-3'>
          {Array.from({ length: 3 }, (_, index) => (
            <Tag key={index}>Tag</Tag>
          ))}
        </div>
      </div>
      <div className='pb-4'>
        <p>
          <UserOutlined /> Creators
        </p>
        <div className={`pt-3 ${styles['card-detail-tag']}`}>
            <Tag>
                <span className='mr-2'>Avatar</span>
                <span>Username</span>
            </Tag>
        </div>
      </div>
    </div>
  )
}

export default DetailCard
