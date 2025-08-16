// src/components/ParametersGrid.js
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

// Helper to split the parameter name from its unit (e.g., "Heart Rate (bpm)")
const parseParameter = (paramString) => {
  const match = paramString.match(/(.+?)\s*\((.+)\)/);
  if (match) {
    return { name: match[1].trim(), unit: match[2] };
  }
  return { name: paramString, unit: '' };
};

export function ParametersGrid({ data }) {
  if (!data || data.length === 0) {
    return <Typography>No parameters available.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {data.map((item) => {
        const { name, unit } = parseParameter(item.parameter);
        return (
          // Each parameter gets its own grid item
          <Grid item xs={6} sm={4} key={item.parameter}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                <Typography variant="h5" component="div" fontWeight="bold" color="primary.main">
                  {item.value}
                </Typography>
                {unit && (
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                    {unit}
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}