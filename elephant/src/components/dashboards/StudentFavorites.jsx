import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import StudentTitle from '../dashboards/StudentTitle';

export default function StudentFavorites() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <StudentTitle>Favorited Schools</StudentTitle>
    </React.Fragment>
  );
}