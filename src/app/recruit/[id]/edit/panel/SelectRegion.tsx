import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useEffect, useState } from 'react'
import { koreaDistrict } from '@/constant/DistrictData'
import { Stack } from '@mui/material'

interface BasicSelectProps {
  setValue: (value: string[]) => void
  region?: string[]
  error?: boolean
}

// 해당 컴포넌트에는 react-hook-form을 제대로 적용하지 않았습니다.

export default function SelectRegion({
  setValue,
  region,
  error = false,
}: BasicSelectProps) {
  const [largeScaleData, setLargeScaleData] = useState<string>('')
  const [smallScaleData, setSmallScaleData] = useState<string>('')

  const handleChangeLargeScaleData = (event: SelectChangeEvent) => {
    setLargeScaleData(event.target.value as string)
    setValue([event.target.value as string, smallScaleData])
  }

  const handleChangeSmallScaleData = (event: SelectChangeEvent) => {
    setSmallScaleData(event.target.value as string)
    setValue([largeScaleData, event.target.value as string])
  }

  useEffect(() => {
    if (region) {
      setLargeScaleData(region[0])
      setSmallScaleData(region[1])
    }
  }, [region])

  let options1 = [
    koreaDistrict.largeScaleData.map((value) => {
      return (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem>
      )
    }),
  ]

  let options2 = koreaDistrict.smallScaleData[largeScaleData]
    ? koreaDistrict.smallScaleData[largeScaleData].map((value) => {
        return (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        )
      })
    : []

  return (
    <Stack
      sx={{ width: ['100%', '26rem'], height: '2rem' }}
      direction={'row'}
      gap={'1rem'}
    >
      <FormControl sx={{ width: ['100%', '12.75rem'], height: '2rem' }}>
        <Select
          sx={{
            width: ['100%', '12.75rem'],
            height: '2rem',
            backgroundColor: 'background.tertiary',
            borderWidth: '0',
          }}
          variant="outlined"
          value={largeScaleData}
          onChange={handleChangeLargeScaleData}
          error={error}
        >
          {options1}
        </Select>
      </FormControl>
      <FormControl sx={{ width: ['100%', '12.75rem'] }} error={error}>
        <Select
          sx={{
            width: ['100%', '12.75rem'],
            height: '2rem',
            backgroundColor: 'background.tertiary',
            borderWidth: '0',
          }}
          value={smallScaleData}
          onChange={handleChangeSmallScaleData}
          variant="outlined"
          error={error}
        >
          {options2}
        </Select>
      </FormControl>
    </Stack>
  )
}
