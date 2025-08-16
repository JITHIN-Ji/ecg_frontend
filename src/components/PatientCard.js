// src/components/PatientCard.js
import React from 'react';
import { Paper, Typography, Box, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export function PatientCard({ patient }) {
  if (!patient) return null;

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 2.5 }, display: 'flex', alignItems: 'center', borderRadius: 4 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2.5, width: 56, height: 56 }}>
            <PersonIcon sx={{ fontSize: 32 }} />
        </Avatar>
        <Box>
            <Typography variant="overline" color="text.secondary">
                Patient Details
            </Typography>
            <Typography variant="h6" component="div" fontWeight="bold" color="text.primary">
                {patient.name || 'N/A'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Age: {patient.age || 'N/A'} | Gender: {patient.gender || 'N/A'}
            </Typography>
        </Box>
    </Paper>
  );
}