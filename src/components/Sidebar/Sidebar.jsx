import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, People, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <List sx={{ width: 240, bgcolor: 'background.paper' }}>
      {/* Item Dashboard */}
      <ListItem
        button
        onClick={() => navigate(ROUTES.HOME)}
        sx={{
          '&:hover': { bgcolor: 'primary.light' },
          '&.Mui-selected': { bgcolor: 'primary.main' },
        }}
      >
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      {/* Item Clientes */}
      <ListItem
        button
        onClick={() => navigate(ROUTES.CLIENTS)}
        sx={{
          '&:hover': { bgcolor: 'primary.light' },
          '&.Mui-selected': { bgcolor: 'primary.main' },
        }}
      >
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItem>
    </List>
  );
}
