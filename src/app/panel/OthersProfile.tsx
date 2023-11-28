'use client'

import { Box, Button, Popover, Typography } from '@mui/material'
import { MouseEvent, ReactNode, useState } from 'react'

interface IOthersProfile {
  name: string
  userId: string
  children: ReactNode
}

const OthersProfile = ({ name, userId, children }: IOthersProfile) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      {children && (
        <Button
          variant="text"
          disableRipple
          sx={{
            ':hover': { backgroundColor: 'transparent' },
            p: 0,
            m: 0,
            color: 'inherit',
          }}
          onClick={handleClick}
        >
          {children}
        </Button>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography>이름: {name}</Typography>
          <Typography>아이디: {userId}</Typography>
          <Button>프로필 보기</Button>
          <Button>쪽지 보내기</Button>
          <Button>신고하기</Button>
        </Box>
      </Popover>
    </div>
  )
}

export default OthersProfile
