import React from 'react'
import SettingContainer from './SettingContainer'
import { IUserProfileLink } from '@/types/IUserProfile'
import { Grid } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'

const ProfileLinkEditor = ({
  closeModal,
  links,
}: {
  closeModal: () => void
  links: Array<IUserProfileLink>
}) => {
  const defaultValues: Array<IUserProfileLink> = links.map((link) => ({
    id: link.id,
    linkName: link.linkName,
    link: link.link,
  }))

  const emptyLinksLength: number = 3 - links.length

  for (let i = 0; i < emptyLinksLength; i++)
    defaultValues.push({
      id: links.length + i + 1,
      linkName: '',
      link: '',
    })
  console.log(defaultValues)
  const onSubmit = (data: Array<IUserProfileLink>) =>
    console.log('on positive click', data)

  const { handleSubmit, control } = useForm<Array<IUserProfileLink>>({
    defaultValues: { ...defaultValues },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SettingContainer onNegativeClick={closeModal} settingTitle="links">
        <Grid container rowSpacing={2}>
          {defaultValues.map((link, i) => {
            return (
              <Grid item container xs={12} key={link.id} rowSpacing={1}>
                <Grid item xs={3} key={link.id}>
                  <CuTextFieldLabel htmlFor={`link-${i}-name-field`}>
                    제목
                  </CuTextFieldLabel>
                </Grid>
                <Grid item xs={9}>
                  <Controller
                    render={({ field }) => (
                      <CuTextField
                        variant="outlined"
                        id={`link-${i}-name-field`}
                        field={{ ...field, fullWidth: true }}
                      />
                    )}
                    name={`${i}.linkName`}
                    control={control}
                  />
                </Grid>
                <Grid item container xs={12} key={link.id}>
                  <Grid item xs={3} key={link.id}>
                    <CuTextFieldLabel htmlFor={`link-${i}-link-field`}>
                      링크
                    </CuTextFieldLabel>
                  </Grid>
                  <Grid item xs={9} key={link.id}>
                    <Controller
                      render={({ field }) => (
                        <CuTextField
                          variant="outlined"
                          id={`link-${i}-link-field`}
                          field={{ ...field, fullWidth: true }}
                        />
                      )}
                      name={`${i}.link`}
                      control={control}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </SettingContainer>
    </form>
  )
}

export default ProfileLinkEditor
