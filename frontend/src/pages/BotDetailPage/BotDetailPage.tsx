import { Tag, Divider, Rate } from 'antd'
import styles from './BotDetailPage.module.scss'
import BotCard from '@app/components/BotCard/BotCard'
import DetailCard from './components/DetailCard/DetailCard'
import CompactBotCard from '@app/components/CompactBotCard/CompactBotCard'
import { ratings, searchOption } from '@app/constants/common.constant'
import Comment from './components/Comment/Comment'
import MtbProgress from '@app/mtb-ui/ProgressBar/ProgressBar'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { TypographyStyle } from '@app/enums/typography.enum'
import SearchBar from '@app/mtb-ui/SearchBar/SearchBar'
function BotDetailPage() {
  return (
    <div className={`m-auto pt-10 pb-10 ${styles.detail}`}>
      <MtbTypography>Explore milions of mezon bots</MtbTypography>
      <div className='pt-5'>
        <SearchBar data={searchOption} onSearch={(val) => console.log('Search:', val)}></SearchBar>
      </div>
      <div className={`pt-5 ${styles['detail-search-tag']}`}>
        {Array.from({ length: 8 }, (_, index) => (
          <Tag key={index} style={{ borderRadius: '10px' }} color='#999999'>
            Tag
          </Tag>
        ))}
      </div>
      <div className='pt-5 pb-5'>
        <BotCard readonly={true}></BotCard>
      </div>
      <MtbTypography variant='h3' textStyle={[TypographyStyle.UNDERLINE]}>
        Overview
      </MtbTypography>
      <div className='flex gap-10 pt-5 pb-5'>
        <div className='flex-3'>
          <p className='text-justify'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo magni tempora ducimus blanditiis, harum
            reiciendis recusandae eum quaerat id ea! Accusamus vero excepturi minus porro quam cum temporibus ea. Odit?
            Dolorum numquam expedita voluptatum libero molestiae ut provident praesentium totam deleniti nemo. Debitis
            nihil voluptatum sunt iste rem accusamus. Doloribus ab asperiores nemo dolorem perspiciatis tempore
            accusamus exercitationem minus quas? Cumque, voluptates ipsum! Recusandae fuga autem sequi culpa totam
            ratione voluptatibus, accusantium blanditiis eveniet nemo nulla dignissimos atque obcaecati neque quia alias
            eum expedita itaque mollitia? Sapiente magnam doloremque minima? Laudantium totam saepe modi assumenda atque
            commodi! Aliquid asperiores deserunt maxime quibusdam, debitis, voluptas nobis pariatur fuga, exercitationem
            explicabo nisi! Et quisquam temporibus, explicabo facilis nemo saepe amet? Ad, hic? Non vel voluptas totam
            repudiandae saepe quibusdam debitis, inventore, qui pariatur necessitatibus explicabo possimus perspiciatis
            sunt magni dolorem nihil eius doloremque! Iste repellendus delectus unde omnis temporibus ad iure
            aspernatur. Temporibus sapiente ipsa ut blanditiis pariatur in modi, voluptas cum voluptatem ipsum libero
            alias voluptatibus voluptates hic suscipit quis eligendi sed possimus tempore, similique debitis totam
            beatae harum. Quod, repellat? Quisquam deserunt eaque soluta. Ducimus facere minima ab distinctio, tempore
            voluptas quisquam totam magnam accusamus inventore veritatis nam atque ratione modi sunt. Temporibus iure
            aspernatur non animi corrupti deleniti harum? Nam sit eos saepe ab dolores! Veniam itaque commodi
            consectetur adipisci suscipit blanditiis maxime beatae cumque. Earum quis esse molestiae rerum! Asperiores
            hic commodi placeat optio mollitia, architecto possimus quam. At, aliquam, quidem totam laboriosam eum
            nostrum temporibus libero beatae minima voluptatem sequi repudiandae officia fugiat iste ipsa. Quidem quos
            libero repudiandae quisquam accusamus ipsam enim magnam vero dolores error. Aliquam, ipsa. Numquam tenetur
            molestias laudantium unde quos dolor fuga ducimus! Sit aspernatur quod obcaecati assumenda nostrum saepe
            aperiam, soluta facilis nulla eum, alias beatae eaque repellat illum, eius dolore?
          </p>
          <div className='pt-5'>
            <MtbTypography variant='h3'>More like this</MtbTypography>
            <Divider></Divider>
            <div className='flex justify-between'>
              {Array.from({ length: 5 }, (_, index) => (
                <CompactBotCard key={index}></CompactBotCard>
              ))}
            </div>
          </div>
          <div className='pt-8'>
            <MtbTypography variant='h3'>Ratings & Reviews</MtbTypography>
            <Divider></Divider>
            <div className='flex justify-between gap-4'>
              <div className='flex-1'>
                <div className='flex items-center gap-10'>
                  <p className='text-6xl'>4.54</p>
                  <div>
                    <Rate defaultValue={4.5} allowHalf disabled></Rate>
                    <p className='pt-2'>9,160 reviews</p>
                  </div>
                </div>
                <p className='pt-5'>
                  Reviews can be left only by registered users. All reviews are moderated by Top.gg moderators. Please
                  make sure to check our guidelines before posting.
                </p>
              </div>
              <div className='flex-1 flex flex-col gap-1'>
                {ratings.map((rating) => (
                  <div key={rating.stars} className='flex items-center gap-2 pb-2'>
                    <p className='whitespace-nowrap'>{rating.stars} stars</p>
                    <MtbProgress percent={rating.percent} strokeColor={'red'} showInfo={false}></MtbProgress>
                    <p className='align-middle'>{rating.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <Divider></Divider>
            {Array.from({ length: 5 }, (_, index) => (
              <Comment key={index}></Comment>
            ))}
          </div>
        </div>
        <div className='flex-1'>
          <DetailCard></DetailCard>
        </div>
      </div>
    </div>
  )
}

export default BotDetailPage
