import { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';

const rows = [
  { id: 1, name: 'Data Grid', description: 'Versão Community' },
  { id: 2, name: 'Data Grid Pro', description: 'Versão Pro' },
  { id: 3, name: 'Data Grid Premium', description: 'Versão Premium' },
];

const columns = [
  { field: 'name', headerName: 'Nome do Produto', width: 200 },
  { field: 'description', headerName: 'Descrição', width: 300 },
];

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ptBR,
);

function About() {
  const memoizedColumns = useMemo(() => columns, []);

  return (
    <div className='border'>
      Bem-vindo à Selva
      <br />
      <Button variant="contained">Contido</Button>
      <br />
      <ThemeProvider theme={theme}>
        <DataGrid 
          rows={rows} 
          columns={memoizedColumns}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </ThemeProvider>
    </div>
  );
}

export default About;