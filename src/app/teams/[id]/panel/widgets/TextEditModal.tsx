import CuModal from '@/components/CuModal'
import React, { useState } from 'react'
import { FormHelperText, TextField, Typography } from '@mui/material'

const MAX_CHARS = 500

const TextEditModal = ({
  open,
  handleClose,
  data,
  setData,
}: {
  open: boolean
  handleClose: () => void
  data: string
  setData: (data: string) => void
}) => {
  const [text, setText] = useState<string>(data)

  const [charCount, setCharCount] = useState(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value
    const inputCharCount = inputText.length

    if (inputCharCount <= MAX_CHARS) {
      setText(inputText)
      setCharCount(inputCharCount)
    }
  }

  const handleSubmit = () => {
    setData(text)
    handleClose()
  }
  return (
    <CuModal
      open={open}
      onClose={handleClose}
      title={'텍스트박스'}
      mobileFullSize
      textButton={{
        text: '취소',
        onClick: handleClose,
      }}
      containedButton={{
        text: '저장',
        onClick: handleSubmit,
      }}
    >
      <>
        <TextField
          value={text}
          onChange={handleChange}
          multiline
          minRows={10}
          maxRows={10}
          fullWidth
        />
        <FormHelperText sx={{ textAlign: 'end' }}>
          <Typography variant="Body1" color="text.alternative">
            {charCount}/{MAX_CHARS}자
          </Typography>
        </FormHelperText>
      </>
    </CuModal>
  )
}

export default TextEditModal
