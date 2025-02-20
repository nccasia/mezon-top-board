import { LikeOutlined } from '@ant-design/icons'
import avatar from '@app/assets/images/0e54d87446f106d1fd58385295ae9deb.png'
import MtbRate from '@app/mtb-ui/Rate/Rate'
function Comment() {
  return (
    <>
      <div className='flex gap-10 p-4 shadow-sm rounded-2xl'>
        <div className='w-15'>
          <img src={avatar} alt='' className='rounded-full' />
        </div>
        <div className='flex flex-col gap-3'>
          <p>Name</p>
          <div className='flex gap-5'>
            <MtbRate value={4.5} readonly={true}></MtbRate>
            <p>over 4 years ago</p>
          </div>
          <p>Comment</p>
          <p>
            <LikeOutlined /> 3,800
          </p>
        </div>
      </div>
    </>
  )
}

export default Comment
