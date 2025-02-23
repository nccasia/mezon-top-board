import avatarDefault from '@app/assets/images/0e54d87446f106d1fd58385295ae9deb.png'
import Button from '@app/mtb-ui/Button'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { Upload, UploadProps } from 'antd'
import { useState } from 'react'
import { toast } from 'react-toastify'
import AddBotForm from './components/AddBotForm/AddBotForm'
function NewBotPage() {
  const [avatar, setAvatar] = useState<string>(avatarDefault)

  const mockUpload = ({ file, onSuccess, onError }: any) => {
    console.log('Uploading...', file)

    setTimeout(() => {
      if (Math.random() > 0.2) {
        onSuccess({ url: URL.createObjectURL(file) })
        toast.success('Upload successfully!');
      } else {
        onError(new Error('Upload failed!'))
        toast.error('Upload failed!');
      }
    }, 1500)
  }

  const handleUpload: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'done') {
      setAvatar(info.file.response.url)
    }
  }

  return (
    <div className='pt-8 pb-12 w-[75%] m-auto'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-6'>
          <div className='w-[80px] object-cover'>
            <img src={avatar || 'https://via.placeholder.com/80'} alt='Avatar' className='w-20 h-20 rounded-full' />
          </div>
          <div>
            <MtbTypography variant='h4'>Name</MtbTypography>
            <MtbTypography variant='p'>Headline (Short description)</MtbTypography>
          </div>
        </div>
        <div>
          <Upload onChange={handleUpload} customRequest={mockUpload} showUploadList={false}>
            <Button color='primary' size='large'>
              Change image
            </Button>
          </Upload>
        </div>
      </div>
      <div className='pt-8'>
        <AddBotForm></AddBotForm>
      </div>
    </div>
  )
}

export default NewBotPage
