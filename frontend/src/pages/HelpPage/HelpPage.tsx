import { SyncOutlined } from '@ant-design/icons'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { useState } from 'react'

function HelpPage() {
  const [captcha, setCaptcha] = useState(generateCaptcha())
  const [captchaInput, setCaptchaInput] = useState('')

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8).toUpperCase() // Generates a 6-char code
  }

  function refreshCaptcha() {
    setCaptcha(generateCaptcha()) // Generates a new captcha
  }
  return (
    <main className='p-6'>
      <header className='relative text-center mb-10'>
        <h1 className='text-lg'>Contact Us</h1>
        <span className="absolute left-1/2 bottom-[-16px] w-24 h-[2px] bg-red-500 -translate-x-1/2"></span>
      </header>

      <section className='flex flex-col md:flex-row gap-36'>
        {/* Form */}
        <form action='' className='bg-[#EEEEEE] p-6 w-full md:w-1/2 rounded-sm'>
          <h2 className='mb-4 text-[18px]'>Send us a message</h2>
          <div className='flex gap-4 mb-4'>
            <input type='text' placeholder='Your name' className='w-1/2 p-2 rounded-xs bg-white' required />
            <input type='email' placeholder='Your email' className='w-1/2 p-2 rounded-xs bg-white' required />
          </div>
          <textarea placeholder='Information' className='w-full p-2 rounded-xs mb-4 h-24 bg-white' required></textarea>
          <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Verification code"
          className="p-2 rounded-xs w-2/3 bg-white"
          required
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
        />
        <div className="flex items-center justify-between p-2 rounded-xs w-1/3 text-center font-bold relative">
          {captcha}
          <button type="button" onClick={refreshCaptcha} className="absolute right-1 top-1/2 -translate-y-1/2">
            <SyncOutlined className="text-gray-500 hover:text-black transition text-sm cursor-pointer" />
          </button>
        </div>
      </div>
          <div className='text-center'>
            <button type='submit' className='bg-[#0C3388] text-white px-6 py-2 cursor-pointer'>
              Submit
            </button>
          </div>
        </form>

        {/* Content */}
        <div className='w-full md:w-1/2 p-6'>
          <p>
            Thank you for your interest in Andy quartz. To become Andy's dealer, please send an email to
            <span className='text-[#173C8D] font-bold'> sales@andistone.com & office@andistone.com</span> Or call us
            directly 0585 272 888 - 0586 272 888
          </p>
          <p className='mt-16'>
            <div className='mb-1.5'>
              <strong>Andy Contact Information:</strong>
            </div>
            <div className='mb-1.5'>
              My Xuan Industrial Park B1 Ocean, My Xuan Ward, Phu My Town, Ba Ria Vung Tau Province.
            </div>
            <div className='mb-1.5'>
              <strong>Telephone:</strong>
              0585 272 888 - 0586 272 888.
            </div>
            <strong>Email:</strong>
            sales@andistone.com & office@andistone.com
          </p>
        </div>
      </section>
      <section className="mt-4 w-full">
      <iframe
        className="w-full h-[300px]"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.851062527117!2d106.68221467481906!3d10.82215968932461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d3d4f2eec7%3A0x21cfd8e5f5e57e7a!2sUniversity%20of%20Economics%20Ho%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1709900000000!5m2!1sen!2s"
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      </section>
    </main>
  )
}

export default HelpPage
