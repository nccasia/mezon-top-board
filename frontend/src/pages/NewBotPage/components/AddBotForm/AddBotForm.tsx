import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { Checkbox, Form, Input, Select, SelectProps } from 'antd'
import FormField from '@app/components/FormField/FormField'
import { Controller, useFormContext } from 'react-hook-form'
import Button from '@app/mtb-ui/Button'
import { errorStatus } from '@app/constants/common.constant'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useMemo, useState } from 'react'
import {
  CreateMezonAppRequest,
  SocialLinkDto,
  useMezonAppControllerCreateMezonAppMutation
} from '@app/services/api/mezonApp/mezonApp'
import { useSelector } from 'react-redux'
import { RootState } from '@app/store'
import { ITagStore } from '@app/store/tag'
import { ILinkTypeStore } from '@app/store/linkType'
import { IAddBotFormProps, ISocialLinksData } from '@app/types/Botcard.types'
import { toast } from 'react-toastify'
function AddBotForm({ onResetAvatar }: IAddBotFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useFormContext<CreateMezonAppRequest>()
  const [addBot] = useMezonAppControllerCreateMezonAppMutation()
  const { tagList } = useSelector<RootState, ITagStore>((s) => s.tag)
  const { linkTypeList } = useSelector<RootState, ILinkTypeStore>((s) => s.link)
  const selectedSocialLink = watch('socialLinks')
  const [socialLinksData, setSocialLinks] = useState<ISocialLinksData[]>([])

  useEffect(() => {
    setValue('socialLinks', [])
  }, [socialLinksData, setValue])

  const onSubmit = (data: CreateMezonAppRequest) => {
    const formattedSocialLinks = socialLinksData.map((link) => ({
      url: link.url,
      linkTypeId: link.id
    }))

    const { socialLinks, ...restData } = data

    const addBotData = {
      ...restData,
      socialLinks: formattedSocialLinks
    }

    addBot({ createMezonAppRequest: addBotData })
    toast.success('Add new bot success')
    onResetAvatar()
    reset()
  }

  const options = useMemo(() => {
    return tagList?.data?.map((tag) => ({
      label: tag.name,
      value: tag.id
    }))
  }, [tagList])

  const optionsLink = useMemo(() => {
    return linkTypeList?.map((item) => ({
      label: `${item.icon} ${item.name}`,
      value: item.id,
      icon: item.icon
    }))
  }, [linkTypeList])

  const addNewLink = () => {
    if (selectedSocialLink?.length === 0) return
    const selectedSocialLinkValue = Array.isArray(selectedSocialLink) ? selectedSocialLink[0] : selectedSocialLink
    const selectedLink = optionsLink?.find((item) => item.value === selectedSocialLinkValue)

    if (socialLinksData.some((link) => link.name === selectedLink?.label)) return

    const defaultSocialLink = {
      icon: selectedLink?.icon || '',
      name: selectedLink?.label || '',
      url: '',
      id: selectedLink?.value || ''
    }

    setSocialLinks([...socialLinksData, defaultSocialLink])
  }

  const removeLink = (id: string) => {
    setSocialLinks(socialLinksData.filter((link) => link.id !== id))
  }

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const index = socialLinksData.findIndex((link) => link.id === id)
    if (index === -1) return

    const newLinks = [...socialLinksData]
    newLinks[index].url = e.target.value
    setSocialLinks(newLinks)
  }

  const handleSelectTag = (value: string[]) => {
    console.log(`selected ${value}`)
  }

  const handleSelectLink = (value: SocialLinkDto[]) => {
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
          <Controller control={control} name='isAutoPublished' render={({ field }) => <Checkbox {...field} />} />
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
        <FormField label='Tags' errorText={errors.tagIds?.message}>
          <Controller
            control={control}
            name='tagIds'
            render={({ field }) => (
              <Select
                {...field}
                allowClear
                value={field.value || []}
                mode='multiple'
                options={options}
                placeholder='Tags'
                tagRender={tagRender}
                status={errors?.tagIds?.message ? 'error' : ''}
                onChange={(value) => {
                  field.onChange(value)
                  handleSelectTag(value)
                }}
              />
            )}
          />
        </FormField>
        <FormField label='Support URL' errorText={errors.supportUrl?.message}>
          <Controller
            control={control}
            name='supportUrl'
            render={({ field }) => (
              <Input {...field} placeholder='Support URL' status={errorStatus(errors.supportUrl)} />
            )}
          />
        </FormField>
        <FormField label='Note' errorText={errors.remark?.message}>
          <Controller
            control={control}
            name='remark'
            render={({ field }) => (
              <TextArea {...field} rows={4} placeholder='Note' status={errorStatus(errors.remark)} />
            )}
          />
        </FormField>
        <FormField label='Social Links'>
          <div className='flex items-center gap-4 w-full'>
            <div className='flex-1'>
              <Controller
                control={control}
                name='socialLinks'
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsLink}
                    placeholder='Link Types'
                    className='w-full'
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value)
                      handleSelectLink(value)
                    }}
                  />
                )}
              />
            </div>
            <div className='flex justify-end'>
              <Button onClick={addNewLink} customClassName='!w-[70px]'>
                Add
              </Button>
            </div>
          </div>
          {!!socialLinksData.length &&
            socialLinksData.map((link, index) => (
              <div key={index} className='mt-4 flex gap-4'>
                <Input
                  className='flex-1 border p-2 rounded'
                  value={link.url}
                  placeholder='Enter link'
                  prefix={link?.icon}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, link?.id)}
                />
                <Button onClick={() => removeLink(link?.id)} customClassName='!w-[70px]'>
                  Delete
                </Button>
              </div>
            ))}
        </FormField>
        <div className='flex !justify-end pt-8 gap-4 items-center'>
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
