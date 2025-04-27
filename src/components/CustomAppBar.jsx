import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';

export default function CustomAppBar() {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6">Meu Sistema</Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
