'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TestsStore } from '@/entities/test/model/store'
import { getTests } from '@/entities/test/model/api'
import type { Test as TestType } from '@/entities/test/model/types'
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material'
import { Search, ContentCopy, Delete, Edit, Add } from '@mui/icons-material'

export const Test = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [tests, setTests] = useState<TestType[]>([])

  useEffect(() => {
    getTests('1')
  }, [])

<<<<<<< HEAD
		const unsubscribe = TestsStore.subscribe(state => {
			setTests(state.tests)
		})
=======
  useEffect(() => {
    setTests(TestsStore.getState().tests)
>>>>>>> 8ae3019d958ea19ab9b97c8507a5628db2fed909

    const unsubscribe = TestsStore.subscribe((state) => {
      setTests(state.tests)
    })

    return unsubscribe
  }, [])

<<<<<<< HEAD
	const filteredTests = useMemo(
		() =>
			tests.filter(test =>
				test.title.toLowerCase().includes(searchTerm.toLowerCase()),
			),
		[tests, searchTerm],
	)
=======
  const deleteTest = TestsStore.getState().deleteTest
>>>>>>> 8ae3019d958ea19ab9b97c8507a5628db2fed909

  const filteredTests = useMemo(
    () =>
      tests.filter((test) =>
        test.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [tests, searchTerm],
  )

  const handleCopyLink = (id: string) => {
    const link = `${window.location.origin}/survey/${id}`
    navigator.clipboard.writeText(link)
  }

<<<<<<< HEAD
			<TextField
				fullWidth
				placeholder='Поиск по названию...'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				sx={{ mb: 3 }}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Search />
						</InputAdornment>
					),
				}}
			/>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Название</TableCell>
							<TableCell align='center'>Вопросов</TableCell>
							<TableCell align='center'>Шкал</TableCell>
							<TableCell align='center'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredTests.map(test => (
							<TableRow key={test.id}>
								<TableCell>
									<Typography fontWeight={500}>{test.title}</Typography>
									<Typography variant='caption' color='text.secondary'>
										{test.description}
									</Typography>
								</TableCell>
								<TableCell align='center'>
									{test.schema?.questions?.length ?? 0}
								</TableCell>
								<TableCell align='center'>
									{test.schema?.scales?.length ?? 0}
								</TableCell>
								<TableCell align='center'>
									<IconButton onClick={() => handleCopyLink(test.id)}>
										<ContentCopy />
									</IconButton>
									<IconButton>
										<Edit />
									</IconButton>
									<IconButton onClick={() => deleteTest(test.id)}>
										<Delete />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
=======
  const handleCreateSurvey = () => {
    router.push('/constructor')
  }

  const handleEditSurvey = (id: string) => {
    router.push(`/constructor/${id}`)
  }
>>>>>>> 8ae3019d958ea19ab9b97c8507a5628db2fed909

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h5'>Мои опросники</Typography>
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={handleCreateSurvey}
        >
          Создать опросник
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder='Поиск по названию...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell align='center'>Прохождений</TableCell>
              <TableCell align='center'>Дата активности</TableCell>
              <TableCell align='center'>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>
                  <Typography fontWeight={500}>{test.title}</Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {test.description}
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Chip
                    label={test.responses ?? 0}
                    size='small'
                    color='primary'
                    variant='outlined'
                  />
                </TableCell>
                <TableCell align='center'>
                  {test.lastActive
                    ? new Date(test.lastActive).toLocaleDateString('ru-RU')
                    : 'Нет данных'}
                </TableCell>
                <TableCell align='center'>
                  <IconButton onClick={() => handleCopyLink(test.id)}>
                    <ContentCopy />
                  </IconButton>
                  <IconButton onClick={() => handleEditSurvey(test.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteTest(test.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {tests.length === 0 && (
        <Typography align='center' sx={{ mt: 4 }} color='text.secondary'>
          Нет опросников. Создайте первый!
        </Typography>
      )}
    </Box>
  )
}