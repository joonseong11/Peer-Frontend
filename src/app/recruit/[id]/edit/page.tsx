'use client'

import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import RowRadioButtonsGroup from './panel/radioGroup'
import SetTeamRole from './panel/SetTeamRole/SetTeamRole'
import TagAutoComplete from './panel/SetTeamTag/TagAutoComplete'
import { useEffect, useState } from 'react'
import BasicSelect, { ComponentType } from './panel/BasicSelect'
import SetInterview from './panel/SetInterview/SetInterview'
import SetCommunicationToolLink from './panel/SetCommunicationToolLink/SetCommunicationToolLink'
import useToast from '@/hook/useToast'
import SelectRegion from './panel/SelectRegion'
import ImageUploadButton from '@/components/ImageUploadButton'
import Image from 'next/image'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import { useRouter } from 'next/navigation'
import RowRadioButtonsGroupStatus from './panel/radioGroupStatus'
import {
  IFormInterview,
  IRoleData,
  ITag,
  statusEnum,
} from '@/types/IPostDetail'
import { convertImageToBase64 } from '../../write/page'

const CreateTeam = ({ params }: { params: { recruit_id: string } }) => {
  const [title, setTitle] = useState<string>('')
  const [image, setImage] = useState<File[]>([])
  const [previewImage, setPreviewImage] = useState<string>(
    '/images/defaultImage.png',
  )
  const [name, setName] = useState<string>('')
  const [type, setType] = useState<string>('project')
  const [tagList, setTagList] = useState<ITag[]>([])
  const [region, setRegion] = useState<string[]>([])
  const [place, setPlace] = useState<string>('')
  const [due, setMonth] = useState<string>('')
  const [teamsize, setTeamsize] = useState<string>('')
  const [link, setCommunicationTool] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [roleList, setRoleList] = useState<IRoleData[]>([])
  const [interviewList, setInterviewList] = useState<IFormInterview[]>([])
  const [openBasicModal, setOpenBasicModal] = useState(false)
  const [status, setStatus] = useState<statusEnum>(statusEnum.BEFORE)
  const [allTagList, setAllTagList] = useState<ITag[]>([])
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const { CuToast, isOpen, openToast, closeToast } = useToast()
  const [toastMessage, setToastMessage] = useState<string>('')
  const router = useRouter()
  const axiosInstance = useAxiosWithAuth()
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/edit/${params.recruit_id}`,
    (url: string) => axiosInstance.get(url).then((res) => res.data),
  )

  useEffect(() => {
    if (error) {
      console.log('error ocurred!!')
      setToastMessage('데이터를 불러오는데 실패했습니다.')
      openToast()
    } else {
      setTitle(data.title)
      setPreviewImage(data.previewImage)
      setName(data.name)
      setType(data.type)
      setTagList(data.tagList)
      setRegion(data.region)
      setPlace(data.place)
      setMonth(data.due)
      setTeamsize(data.teamsize)
      setCommunicationTool(data.link)
      setContent(data.content)
      setRoleList(data.roleList)
      setInterviewList(data.interviewList)
      setStatus(data.status)
      setAllTagList(data.tagList)
    }
  }, [data])

  const onHandlerFinish = async () => {
    if (type === 'project') {
      setRoleList([{ role: null, member: parseInt(teamsize) }])
    }
    if (
      !image ||
      !title ||
      !name ||
      !due ||
      !region ||
      !place ||
      !link ||
      !tagList ||
      !roleList ||
      !interviewList ||
      !content
    ) {
      alert('빈칸을 모두 채워주세요')
      return
    }
    try {
      if (type === 'project') {
        setRoleList([{ role: null, member: parseInt(teamsize) }])
      }
      const base64Data = await convertImageToBase64(image[0])
      setSelectedImage(base64Data)
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/edit/${params.recruit_id}`,
        {
          place: place,
          image: selectedImage,
          title: title,
          name: name,
          due: due,
          type: type,
          content: content,
          region: region,
          link: link,
          tagList: tagList,
          roleList: roleList,
          interviewList: interviewList,
          status: status,
        },
      )
      if (response.status === 200) router.push(`/recruit/${response.data}`) // 백엔드에서 리턴값으로 새로생긴 모집글의 id 를 던져줌
    } catch (error) {
      console.log(error)
      setToastMessage('모집글 작성 실패, 다시 시도해주세요')
      openToast()
    }
  }

  return (
    <>
      <Box>
        <Typography variant="h3">모집 글 쓰기</Typography>
        <Box>
          <ImageUploadButton
            setImage={setImage}
            setPreviewImage={setPreviewImage}
          >
            <Box>
              <Image
                src={previewImage}
                width={218}
                height={144}
                alt="Picture of the author"
              />
            </Box>
          </ImageUploadButton>
        </Box>
        <Box>
          <Typography variant="h6">모집글 제목</Typography>
          <TextField
            variant="outlined"
            value={title}
            onChange={(e) => {
              if (e.target.value.length > 20)
                setTitle(e.target.value.slice(0, 20) as string)
              else setTitle(e.target.value as string)
            }}
          />
        </Box>
        <Box>
          <Typography variant="h6">팀 이름</Typography>
          <TextField
            variant="outlined"
            value={name}
            onChange={(e) => {
              if (e.target.value.length > 20)
                setName(e.target.value.slice(0, 20) as string)
              else setName(e.target.value as string)
            }}
          />
        </Box>
        <Box>
          <Typography>팀 진행 상태</Typography>
          <RowRadioButtonsGroupStatus setValue={setStatus} />
        </Box>
        <Box>
          <Typography variant="h6">팀 분류</Typography>
          <RowRadioButtonsGroup setValue={setType} />
        </Box>
        {type === 'study' && (
          <Box>
            <Typography variant="h6">팀 인원</Typography>
            <BasicSelect
              type={ComponentType.TeamSize}
              value={teamsize}
              setValue={setTeamsize}
            />
          </Box>
        )}
        <Box>
          <Typography variant="h6">목표기간</Typography>
          <BasicSelect
            type={ComponentType.Month}
            value={due}
            setValue={setMonth}
          />
        </Box>
        <Box>
          <Typography variant="h6">지역</Typography>
          <SelectRegion setValue={setRegion} />
        </Box>
        <Box>
          <Typography variant="h6">활동방식</Typography>
          <BasicSelect
            type={ComponentType.Place}
            value={place}
            setValue={setPlace}
          />
        </Box>
        <Box>
          <Typography variant="h6">커뮤니케이션 툴 링크</Typography>
          <SetCommunicationToolLink setValue={setCommunicationTool} />
        </Box>
        <Stack>
          <Typography variant="h6" sx={{ paddingRight: '5px' }}>
            모집인원 인터뷰 등록하기
          </Typography>
          <Button variant="outlined" onClick={() => setOpenBasicModal(true)}>
            등록
          </Button>
          <SetInterview
            openBasicModal={openBasicModal}
            handleCloseBasicModal={() => setOpenBasicModal(false)}
            interviewData={interviewList}
            setInterviewData={setInterviewList}
          />
        </Stack>
        <Box>
          <Typography variant="h6">태그</Typography>
          <TagAutoComplete
            datas={tagList}
            setData={setTagList}
            allTagList={allTagList}
          />
        </Box>
        {type === 'study' ? null : (
          <Box>
            <Typography variant="h6">팀 역할</Typography>
            <SetTeamRole roleData={roleList} setRoleData={setRoleList} />
          </Box>
        )}
        <Box>
          <Typography variant="h6">팀 소개</Typography>
          <TextField
            variant="outlined"
            sx={{ width: '80vw', height: 'auto' }}
            value={content}
            onChange={(e) => {
              if (e.target.value.length > 1000)
                setContent(e.target.value.slice(0, 1000) as string)
              else setContent(e.target.value as string)
            }}
            multiline
          />
        </Box>
        <Button variant="contained" color="success" onClick={onHandlerFinish}>
          작성 완료
        </Button>
        <CuToast open={isOpen} onClose={closeToast} severity="error">
          <Typography>{toastMessage}</Typography>
        </CuToast>
      </Box>
    </>
  )
}

export default CreateTeam
