import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Copyright = (props) => (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Мессенджер
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
)

export default Copyright;