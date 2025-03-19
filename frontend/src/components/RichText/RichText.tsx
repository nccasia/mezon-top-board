import React from 'react'
import ReactQuill, { Value } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface IRichTextEditorProps {
  value?: string
  onChange?: (content: string) => void
  placeholder?: string
  customClass?: string
}

function RichTextEditor({ value = '', placeholder = 'Type here...', onChange, customClass }: IRichTextEditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      [{ align: [] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
      ['clean']
    ]
  }

  function handleChange(newContent: Value) {
    if (onChange) onChange(newContent as string)
  }

  return (
    <ReactQuill
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
