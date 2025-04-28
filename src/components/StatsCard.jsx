import { Card, CardContent, Typography } from '@mui/material';

const StatsCard = ({ title, value, icon }) => {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;