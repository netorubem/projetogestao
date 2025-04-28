import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar/Sidebar';
import CustomAppBar from '@/components/CustomAppBar';

export default function AppLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <CustomAppBar />
        <Outlet />
      </Box>
    </Box>
  );
}
