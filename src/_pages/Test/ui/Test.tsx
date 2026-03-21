'use client';

import React, { useState } from 'react';
import { TestsStore } from '@/entities/test/model/store';
import { Box, Typography, TextField, InputAdornment, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Search, ContentCopy, Delete, Edit, Add } from '@mui/icons-material';

export const Test = () => {  
  const [searchTerm, setSearchTerm] = useState('');
  // const tests = TestsStore((state) => state.tests);
  const [tests, setTests] = useState(TestsStore.getState().tests)
  // const {tests} = TestsStore()
  const deleteTest = TestsStore((state) => state.deleteTest);


  // const filteredTests = tests.filter((test) =>
  //   test.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredTests = React.useMemo(() =>
    tests.filter((test) =>
      test.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [tests, searchTerm]
  );

  const handleCopyLink = (id: string) => {
    const link = `${window.location.origin}/survey/${id}`;
    navigator.clipboard.writeText(link);
    alert('Ссылка скопирована');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Мои опросники</Typography>
        <Button variant="contained" startIcon={<Add />}>
          Создать опросник
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Поиск по названию..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
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
              <TableCell align="center">Вопросов</TableCell>
              <TableCell align="center">Шкал</TableCell>
              <TableCell align="center">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>
                  <Typography fontWeight={500}>{test.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {test.description}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {test.schema?.questions?.length || 0}
                </TableCell>
                <TableCell align="center">
                  {test.schema?.scales?.length || 0}
                </TableCell>
                <TableCell align="center">
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

      {tests.length === 0 && (
        <Typography align="center" sx={{ mt: 4 }} color="text.secondary">
          Нет опросников. Создайте первый!
        </Typography>
      )}
    </Box>
  );
}