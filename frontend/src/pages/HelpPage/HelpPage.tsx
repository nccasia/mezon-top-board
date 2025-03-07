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
      <div className="container m-auto mt-2 pb-3">
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
              Thank you for your interest in Mezon Top Board. To receive further information, please send an email to
              <span className='text-[#173C8D] font-bold'> sales@ncc.asia</span> Or call us
              directly (+84) 2466874606.
            </p>
            <p className='mt-16'>
              <div className='mb-1.5'>
                <strong>Contact Information: </strong>
              </div>
              <div className='mb-1.5'>
                <strong>Address: </strong>
                2nd Floor, CT3 The Pride, To Huu st, Ha Dong District, Ha Noi City, Viet Nam
              </div>
              <div className='mb-1.5'>
                <strong>Telephone: </strong>
                (+84) 2466874606
              </div>
              <strong>Email: </strong>
              sales@ncc.asia
            </p>
          </div>
        </section>
        <section className="mt-4 w-full">
          <iframe
            className="w-full h-[300px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1647.5896225785345!2d106.73302339262241!3d10.838027852364212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175271112acd217%3A0x910c2c261e2f5159!2zVG_DoCBOaMOgIFNUIE1vcml0eg!5e0!3m2!1sen!2sus!4v1741322133599!5m2!1sen!2sus"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

      </div>
    </main>
  )
}

export default HelpPage
