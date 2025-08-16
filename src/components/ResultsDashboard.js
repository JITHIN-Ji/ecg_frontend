// src/components/ResultsDashboard.js
import React from 'react';
import { Grid, Paper, Typography, Box, Button, Stack, Alert, AlertTitle } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the back icon
import { PatientCard } from './PatientCard';
import { ClassificationCard } from './ClassificationCard';
import { ParametersGrid } from './ParametersGrid';
import { downloadReport } from '../api/analyzeApi';

// Accept the 'onReset' prop to handle going back
export function ResultsDashboard({ data, onReset }) {
  if (!data) {
    return null;
  }

  const handleDownload = () => {
    if (data) {
      downloadReport(data);
    }
  };



  const extractionTimeParam = data.ecgParameters.find(
    (param) => param.parameter === 'Extraction Time (s)'
  );
  const extractionTime = extractionTimeParam ? extractionTimeParam.value : 'N/A';


  return (
    // Main container with increased spacing for a cleaner look
    <Grid container spacing={4} sx={{ p: { xs: 2, md: 3 } }}>

      {/* LEFT COLUMN: Uploaded ECG Report */}
      <Grid item xs={12} lg={7}>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 4 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
            Uploaded ECG Report
          </Typography>
           <Box sx={{
            mb: 2,
            px: 1, // Add some horizontal padding to align with the title
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline' // Aligns text baselines for a cleaner look
          }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                fontStyle: 'italic'
              }}
            >
              Extraction Time
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main', // Use the theme's primary color for emphasis
                fontFamily: 'monospace' // Give it a more technical feel
              }}
            >
              {extractionTime} s
            </Typography>
          </Box>
          <Box sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'grey.100', // A light background for the image to stand out
          }}>
            {data.uploadedImage && (
              <img
                src={`data:image/png;base64,${data.uploadedImage}`}
                alt="Uploaded ECG"
                style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
              />
            )}
          </Box>
        </Paper>
      </Grid>

      {/* RIGHT COLUMN: Summary & Details Panel */}
      <Grid item xs={12} lg={5}>
        {/* Stack component provides consistent vertical spacing */}
        <Stack spacing={3}>

          {/* Caution Alert */}
          <Alert severity="warning" sx={{ borderRadius: 2 }}>
            <AlertTitle>Caution: For Research & Educational Use Only</AlertTitle>
            This AI-generated analysis is not a medical diagnosis. It is intended solely for research and educational purposes. — <strong>Please consult a qualified doctor for confirmation.</strong>
          </Alert>

          {/* Patient Details */}
          <PatientCard patient={data.patientInfo} />

          {/* AI Classification */}
          <ClassificationCard result={data.aiClassification.result} />

          {/* ECG Analysis Results (using the new grid) */}
          <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 4 }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
              ECG Analysis Results
            </Typography>
            <ParametersGrid data={data.ecgParameters} />
          </Paper>

          {/* Action Buttons: Use a Stack to place buttons side-by-side */}
          <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={onReset} // This calls the function in App.js to reset the state
              size="large"
              fullWidth
              sx={{ py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
            >
              Analyze Another
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              size="large"
              fullWidth
              sx={{ py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
            >
              Download Report
            </Button>
          </Stack>

        </Stack>
      </Grid>
    </Grid>
  );
}