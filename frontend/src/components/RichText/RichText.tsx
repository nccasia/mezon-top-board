import ReactQuill, { Value } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { imageMimeTypes, videoMimeTypes } from '@app/constants/mimeTypes'
import { useMediaControllerCreateMediaMutation } from '@app/services/api/media/media'
import { toast } from 'react-toastify'

export const isMimeTypeValid = (mimeType: string, mimeTypes: string[]): boolean => mimeTypes.includes(mimeType)

export interface IRichTextEditorRef {
  getUploadedMediaIds: () => string[]
}

interface IRichTextEditorProps {
  value?: string
  onChange?: (content: string) => void
  placeholder?: string
  customClass?: string
}

function RichTextEditor({ value = '', placeholder = 'Type here...', onChange, customClass }: IRichTextEditorProps) {
  const quillRef = useRef<ReactQuill | null>(null)
  const uploadedMediaIds = useRef<string[]>([])
  const [uploadMedia] = useMediaControllerCreateMediaMutation()

  const videoHandler = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', videoMimeTypes.join(','))
    input.click()

    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      
      console.log(file)
      if (!isMimeTypeValid(file.type, videoMimeTypes)) {
        toast.error('Please upload a valid video file!')
        return
      }

      const maxVideoSize = 25 * 1024 * 1024
      if (file.size > maxVideoSize) {
        toast.error(`${file.name} upload failed (exceeds 25MB)`)
        return
      }

      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await uploadMedia(formData).unwrap()
        const url = response?.data?.filePath
        const id = response?.data?.id
        if (id) uploadedMediaIds.current.push(id)

        const editor = quillRef.current?.getEditor()
        const range = editor?.getSelection()
        if (range) {
          editor?.insertEmbed(range.index, 'video', url)
        } else {
          toast.error('No editor selection found.')
        }
      } catch (err) {
        toast.error('Upload failed!')
        console.error('Upload error:', err)
      }
    }
  }, [])

  const imageHandler = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', imageMimeTypes.join(','))
    input.click()

    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return

      if (!isMimeTypeValid(file.type, imageMimeTypes)) {
        toast.error('Please upload a valid image file!')
        return
      }

      const maxImageSize = 4 * 1024 * 1024
      if (file.size > maxImageSize) {
        toast.error(`${file.name} upload failed (exceeds 4MB)`)
        return
      }

      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await uploadMedia(formData).unwrap()
        const url = response?.data?.filePath
        const id = response?.data?.id
        if (id) uploadedMediaIds.current.push(id)

        const editor = quillRef.current?.getEditor()
        const range = editor?.getSelection()
        if (range) {
          editor?.insertEmbed(range.index, 'image', url)
        } else {
          toast.error('No editor selection found.')
        }
      } catch (err) {
        toast.error('Upload failed!')
        console.error('Upload error:', err)
      }
    }
  }, [])

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ color: [] }, { background: [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: imageHandler,
        video: videoHandler
      }
    }
  }

  const handleChange = (newContent: Value) => {
    if (onChange) onChange(newContent as string)
  }

  return (
    <ReactQuill
      ref={quillRef}
      theme='snow'
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      modules={modules}
      className={customClass}
    />
  )
}

export default RichTextEditor
