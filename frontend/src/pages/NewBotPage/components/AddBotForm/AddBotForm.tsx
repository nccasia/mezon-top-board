import FormField from '@app/components/FormField/FormField'
import RichTextEditor from "@app/components/RichText/RichText"
import { errorStatus } from '@app/constants/common.constant'
import Button from '@app/mtb-ui/Button'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import {
  CreateMezonAppRequest,
  SocialLinkDto,
  useMezonAppControllerCreateMezonAppMutation,
  useMezonAppControllerUpdateMezonAppMutation
} from '@app/services/api/mezonApp/mezonApp'
import { RootState } from '@app/store'
import { ILinkTypeStore } from '@app/store/linkType'
import { ITagStore } from '@app/store/tag'
import { IAddBotFormProps, ISocialLinksData } from '@app/types/Botcard.types'
import { Checkbox, Form, Input, Select, TagProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
function AddBotForm({ isEdit }: IAddBotFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useFormContext<CreateMezonAppRequest>()
  const [addBot] = useMezonAppControllerCreateMezonAppMutation()
  const navigate = useNavigate()
  const [updateBot] = useMezonAppControllerUpdateMezonAppMutation()
  const { tagList } = useSelector<RootState, ITagStore>((s) => s.tag)
  const { linkTypeList } = useSelector<RootState, ILinkTypeStore>((s) => s.link)
  const selectedSocialLink = watch('socialLinks')
  const [socialLinksData, setSocialLinksData] = useState<ISocialLinksData[]>([])
  const [socialLinkUrl, setSocialLinkUrl] = useState<string>('')
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // setValue('socialLinks', [])
  }, [socialLinksData, setValue])
  console.log('socialLinksData', socialLinksData)
  useEffect(() => {
    console.log('selectedSocialLink', selectedSocialLink)
    if (Array.isArray(selectedSocialLink) && selectedSocialLink.length > 0) {
      const defaultSocialLink = Array.isArray(selectedSocialLink) ? selectedSocialLink.map(selectedLink => ({
        icon: selectedLink?.icon || '',
        name: `${selectedLink.icon} ${selectedLink.name}`,
        url: selectedLink?.url?.split('.com/')[1],
        id: selectedLink?.id || '',
        siteName: `${selectedLink?.url?.split('.com/')[0]}.com/` || ''
      })) : []
      // add new links to the links list
      setSocialLinksData([...socialLinksData, ...defaultSocialLink])
    }
  }, [selectedSocialLink])

  const { botId } = useParams()

  const onSubmit = async (data: CreateMezonAppRequest) => {
    try {
      const { socialLinks, ...restData } = data

      const formattedSocialLinks = socialLinksData.map((link) => ({
        url: `${link.siteName}${link.url}`,
        linkTypeId: link.id
      }))

      const addBotData = {
        ...restData,
        socialLinks: formattedSocialLinks
      }
      if (!isEdit && !botId) {
        const response = await addBot({ createMezonAppRequest: addBotData }).unwrap()
        toast.success('Add new bot success')
        if (response.id) {
          navigate(`/${response.id}`)
        }
        return
      }
      if (!botId) return
      console.log('formattedSocialLinks', formattedSocialLinks)
      updateBot({ updateMezonAppRequest: { ...data, id: botId, socialLinks: formattedSocialLinks } })
      toast.success('Edit bot success')
    } catch (error) {
      toast.error('Fail')
    }
  }

  const options = useMemo(() => {
    return tagList?.data?.map((tag) => ({
      label: tag.name,
      value: tag.id
    }))
  }, [tagList])



  const tagRender = (props: TagProps & { label?: string }) => {
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

  const optionsLink = useMemo(() => {
    return linkTypeList?.map((item) => ({
      label: `${item.icon} ${item.name}`,
      value: item.id,
      icon: item.icon,
      siteName: `https://${item.name.toLowerCase()}.com/`
    }))
  }, [linkTypeList])

  const addNewLink = () => {
    // if not selectedSocialLink then return
    if (selectedSocialLink?.length === 0) return
    // get selected link's id
    const selectedSocialLinkValue = Array.isArray(selectedSocialLink) ? selectedSocialLink[0] : selectedSocialLink
    // get selectedLink in optionsLink
    const selectedLink = optionsLink?.find((item) => item.value === selectedSocialLinkValue)
    // if selectedLink in socialLinksData then return
    if (socialLinksData.some((link) => link.name === selectedLink?.label)) return

    const defaultSocialLink = {
      icon: selectedLink?.icon || '',
      name: selectedLink?.label || '',
      url: `${socialLinkUrl}`,
      id: selectedLink?.value || '',
      siteName: selectedLink?.siteName || ''
    }
    // add new links to the links list
    setSocialLinksData([...socialLinksData, defaultSocialLink])
    setSocialLinkUrl('')
  }

  const removeLink = (id: string) => {
    setSocialLinksData(socialLinksData.filter((link) => link.id !== id))
  }

  const handleSocialLinkUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocialLinkUrl(e.target.value)
  }

  const editSocialLink = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const index = socialLinksData.findIndex((link) => link.id === id)
    if (index === -1) return

    const newLinks = [...socialLinksData]
    newLinks[index].url = e.target.value
    setSocialLinksData(newLinks)
  }

  const handleSelectTag = (value: string[]) => {
    console.log(`selected ${value}`)
  }

  const handleSelectLink = (value: SocialLinkDto[]) => {
    console.log(`Link ${value}`)
  }

  console.log('getValues', getValues())

  return (
    <div className='shadow-md p-8 rounded-md bg-white'>
      <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
        <MtbTypography variant='h4'>Your Bot Detail</MtbTypography>
        <FormField label='Name' description='Name your bot' errorText={errors.name?.message}>
          <Controller
            control={control}
            name='name'
            render={({ field }) => <Input {...field} placeholder='MezonBot' status={errorStatus(errors.name)} />}
          />
        </FormField>
        <FormField
          label='Headline'
          description='Provide a short and catchy phrase that describes your bot.'
          errorText={errors.headline?.message}
        >
          <Controller
            control={control}
            name='headline'
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder='A powerful and multi-functional role bot.'
                status={errorStatus(errors.headline)}
              />
            )}
          />
        </FormField>
        <FormField
          label='Full Description'
          description='Tell us what your bot can do. We want to hear the whole story!'
          errorText={errors.description?.message}
        >
          <Controller
            control={control}
            name='description'
            render={({ field }) => (
              <RichTextEditor
                value={field.value || ""}
                onChange={field.onChange}
                customClass="custom-editor"
              />
            )}
          />
        </FormField>
        <FormField label='Auto-publish?' customClass='!items-center'>
          <Controller control={control} name='isAutoPublished' render={({ field }) => <Checkbox {...field} />} />
        </FormField>
        <FormField
          label='Install Link'
          description='A place where users can install your bot on their Mezon server.'
          errorText={errors.installLink?.message}
        >
          <Controller
            control={control}
            name='installLink'
            render={({ field }) => (
              <Input
                {...field}
                placeholder='https://mezon.ai/oauth2/authorize?client_id=1261258962204889149&scope=bot'
                status={errorStatus(errors.installLink)}
              />
            )}
          />
        </FormField>
        <FormField
          label='Prefix'
          description='What keyword or phrase does your bot react to?'
          errorText={errors.prefix?.message}
        >
          <Controller
            control={control}
            name='prefix'
            render={({ field }) => <Input {...field} placeholder='*' status={errorStatus(errors.prefix)} />}
          />
        </FormField>
        <FormField
          label='Tags'
          description='Select the top 12 categories that best represent your community.'
          errorText={errors.tagIds?.message}
        >
          <Controller
            control={control}
            name='tagIds'
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  allowClear
                  value={field.value || []}
                  mode='multiple'
                  options={options}
                  placeholder='Search for tags'
                  tagRender={() => <></>} // Hides tags inside the field
                  status={errors?.tagIds?.message ? 'error' : ''}
                  open={dropdownOpen}
                  onDropdownVisibleChange={(visible) => setDropdownOpen(visible)}
                  onChange={(value) => {
                    field.onChange(value)
                    handleSelectTag(value)
                    setDropdownOpen(false); // Close the dropdown after selection

                  }}
                />
                {(field.value ?? []).length > 0 && (
                  <div className='mt-2 flex flex-wrap gap-2'>
                    {(field.value ?? []).map((tag) => {
                      const tagOption = options.find((opt) => opt.value === tag)
                      // Call customTagRender manually outside Select
                      return tagRender({
                        label: tagOption?.label,
                        closable: true,
                        onClose: () => {
                          const updatedTags = (field.value ?? []).filter((t) => t !== tag)
                          field.onChange(updatedTags)
                          handleSelectTag(updatedTags)
                        }
                      })
                    })}
                  </div>
                )}
              </>
            )}
          />
        </FormField>
        <FormField
          label='Support URL'
          description='People might have many questions about your bot, make sure you can answer them!'
          errorText={errors.supportUrl?.message}
        >
          <Controller
            control={control}
            name='supportUrl'
            render={({ field }) => (
              <Input {...field} placeholder='https://mezon.ai/support' status={errorStatus(errors.supportUrl)} />
            )}
          />
        </FormField>
        <FormField
          label='Note'
          description='If you have any important information for the reviewer, you can share it here'
          errorText={errors.remark?.message}
        >
          <Controller
            control={control}
            name='remark'
            render={({ field }) => (
              <TextArea
                {...field}
                rows={4}
                placeholder='Please share any important information or details about your bot that our reviewers should know'
                status={errorStatus(errors.remark)}
              />
            )}
          />
        </FormField>
        <FormField label='Social Links' description='Link your social channels'>
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
            <div className='flex-1'>
              <Input value={socialLinkUrl} prefix={selectedSocialLink?.length ? `https://${linkTypeList.find(item => item.id === selectedSocialLink)?.name.toLocaleLowerCase() || ''}.com/` : ''} disabled={Array.isArray(selectedSocialLink)} onChange={handleSocialLinkUrlChange} />
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
                  prefix={`${link?.icon} ${link.siteName}`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => editSocialLink(e, link?.id)}
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
