import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { Checkbox, Form, Input, Select, SelectProps } from 'antd'
import FormField from '@app/components/common/FormField/FormField'
import { Controller, useForm } from 'react-hook-form'
import { ADD_BOT_SCHEMA } from '@app/validations/addBot.validations'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@app/mtb-ui/Button'
import { errorStatus } from '@app/constants/common.constant'
import TextArea from 'antd/es/input/TextArea'
import { useMemo } from 'react'

interface AddBotFormValues {
  name: string
  headline: string
  description: string
  autoPublish?: boolean
  installLink: string
  prefix: string
  supportURL: string
  tags: string[]
  note: string
  linkType?: string
}

const optionTag = ['enhance', 'tool']

const optionLinkType = ['discord', 'telegram']

function AddBotForm() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AddBotFormValues>({
    defaultValues: {
      name: '',
      headline: '',
      description: '',
      autoPublish: false,
      installLink: '',
      prefix: '',
      supportURL: '',
      tags: [],
      note: '',
      linkType: optionLinkType[0]
    },
    resolver: yupResolver(ADD_BOT_SCHEMA)
  })

  const onSubmit = (data: AddBotFormValues) => {
    console.log(data)
  }

  const options = useMemo(() => {
    return optionTag.map((tag) => ({
      label: tag.replace(tag[0], tag[0].toUpperCase()),
      value: tag.toLowerCase()
    }))
  }, [])

  const optionsLink = useMemo(() => {
    return optionLinkType.map((value) => {
      return {
        value,
        label: value.replace(value[0], value[0].toUpperCase())
      }
    })
  }, [])

  const tagRender: SelectProps['tagRender'] = (props) => {
    const { label, closable, onClose } = props

    return (
      <div className={`px-2 rounded-md inline-flex items-center mr-2 text-black capitalize !bg-gray-300`}>
        <span>{label}</span>
        {closable && (
          <span onClick={onClose} className='ml-2 cursor-pointer font-bold'>
            ×
          </span>
        )}
      </div>
    )
  }

  const handleSelectTag = (value: string[]) => {
    console.log(`selected ${value}`)
  }

  const handleSelectLink = (value: string) => {
    console.log(`Link ${value}`)
  }

  return (
    <div className='shadow-md p-8 rounded-md bg-white'>
      <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
        <MtbTypography variant='h4'>Your Bot Detail</MtbTypography>
        <FormField label='Name' errorText={errors.name?.message}>
          <Controller
            control={control}
            name='name'
            render={({ field }) => <Input {...field} placeholder='Name' status={errorStatus(errors.name)} />}
          />
        </FormField>
        <FormField label='Headline' errorText={errors.headline?.message}>
          <Controller
            control={control}
            name='headline'
            render={({ field }) => <TextArea {...field} placeholder='Headline' status={errorStatus(errors.headline)} />}
          />
        </FormField>
        <FormField label='Full Description' errorText={errors.description?.message}>
          <Controller
            control={control}
            name='description'
            render={({ field }) => (
              <TextArea {...field} placeholder='Description' status={errorStatus(errors.description)} />
            )}
          />
        </FormField>
        <FormField label='Auto-publish?' customClass='!items-center'>
          <Controller control={control} name='autoPublish' render={({ field }) => <Checkbox {...field} />} />
        </FormField>
        <FormField label='Install Link' errorText={errors.installLink?.message}>
          <Controller
            control={control}
            name='installLink'
            render={({ field }) => (
              <Input {...field} placeholder='Install Link' status={errorStatus(errors.installLink)} />
            )}
          />
        </FormField>
        <FormField label='Prefix' errorText={errors.prefix?.message}>
          <Controller
            control={control}
            name='prefix'
            render={({ field }) => <Input {...field} placeholder='Prefix' status={errorStatus(errors.prefix)} />}
          />
        </FormField>
        <FormField label='Tags' errorText={errors.tags?.message}>
          <Controller
            control={control}
            name='tags'
            render={({ field }) => (
              <Select
                {...field}
                allowClear
                value={field.value || []}
                mode='multiple'
                options={options}
                placeholder='Tags'
                tagRender={tagRender}
                status={errors.tags?.message ? 'error' : ''}
                onChange={(value) => {
                  field.onChange(value)
                  handleSelectTag(value)
                }}
              />
            )}
          />
        </FormField>
        <FormField label='Support URL' errorText={errors.supportURL?.message}>
          <Controller
            control={control}
            name='supportURL'
            render={({ field }) => (
              <Input {...field} placeholder='Support URL' status={errorStatus(errors.supportURL)} />
            )}
          />
        </FormField>
        <FormField label='Note' errorText={errors.note?.message}>
          <Controller
            control={control}
            name='note'
            render={({ field }) => (
              <TextArea {...field} rows={4} placeholder='Note' status={errorStatus(errors.note)} />
            )}
          />
        </FormField>
        <FormField label='Link Type'>
          <Controller
            control={control}
            name='linkType'
            render={({ field }) => (
              <Select
                {...field}
                options={optionsLink}
                placeholder='Link Types'
                value={field.value}
                onChange={(value) => {
                  field.onChange(value)
                  handleSelectLink(value)
                }}
              />
            )}
          />
        </FormField>
        <div className='flex justify-end pt-8 gap-4 items-center'>
          <Button color='default' customClassName='w-[200px] !text-blue-500'>
            Preview
          </Button>
          <Button htmlType='submit' customClassName='w-[200px]'>
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AddBotForm
