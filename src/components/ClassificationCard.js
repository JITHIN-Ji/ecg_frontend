// src/components/ClassificationCard.js
import React from 'react';
import { Paper, Typography, Box, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

export function ClassificationCard({ result }) {
    const getClassificationStyle = (text) => {
        if (!text) return { name: 'Unavailable', color: 'text.secondary', Icon: InfoIcon };
        const lowerText = text.toLowerCase();
        if (lowerText.includes('normal')) return { name: 'Normal', color: 'success.main', Icon: CheckCircleIcon };
        if (lowerText.includes('mi')) return { name: 'MI ', color: 'error.main', Icon: ErrorIcon }; 
        if (lowerText.includes('history') || lowerText.includes('abnormal')) return { name: 'Abnormal', color: 'warning.main', Icon: WarningIcon };
        return { name: text, color: 'info.main', Icon: InfoIcon };
    };

    const { name, color, Icon } = getClassificationStyle(result);

    return (
        <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 4 }}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Icon sx={{ fontSize: { xs: 40, md: 52 }, color: color }} />
                <Box>
                    <Typography variant="overline" color="text.secondary">
                        ECG Classification
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: color }}>
                        {name}
                    </Typography>
                </Box>
            </Stack>
        </Paper>
    );
};