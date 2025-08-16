  import React, { useState } from 'react';
  import {
    Container,
    Typography,
    Box,
    CircularProgress,
    Alert,
    Grid
  } from '@mui/material';
  import { FileUpload } from './components/FileUpload';
  import { ResultsDashboard } from './components/ResultsDashboard';
  import { analyzeECG } from './api/analyzeApi.js';

  const heroImageUrl = '/ecg-background.jpg';

  function App() {
    const [analysisData, setAnalysisData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Store both the image URL for display and the original file for download
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    const handleFileUpload = async (file) => {
      setIsLoading(true);
      setError('');
      setAnalysisData(null);
      setUploadedFile(file); // Keep the file object
      setUploadedImageUrl(URL.createObjectURL(file)); // Create a URL for display

      try {
        const data = await analyzeECG(file);
        setAnalysisData(data);
      } catch (err) {
        const errorMessage = err.response?.data?.detail || 'An unexpected error occurred. Please try again.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    
    // A dedicated loading screen for a better user experience
    const LoadingScreen = () => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <CircularProgress color="primary" />
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          Analyzing your ECG... This may take a moment.
        </Typography>
      </Box>
    );

    if (isLoading) {
      return <LoadingScreen />;
    }

    return (
      <Box>
        {/* If we have no data, show the homepage */}
        {!analysisData ? (
          <Box
            sx={{
              minHeight: '100vh',
              backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%), url(${heroImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={4} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6} sx={{ color: '#fff', textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography
                    variant="h2"
                    component="h1"
                    fontWeight="bold"
                    sx={{
                      background: 'linear-gradient(45deg, #4dabf7 30%, #a6d4fa 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0px 3px 15px rgba(77, 171, 247, 0.4)',
                    }}
                  >
                    BHARAT CARDIO
                  </Typography>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{ mt: 1, opacity: 0.95, color: '#e3f2fd', textShadow: '0px 2px 8px rgba(0,0,0,0.8)' }}
                  >
                    Bring Instant ECG Analysis Home
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FileUpload onFileUpload={handleFileUpload} />
                </Grid>
              </Grid>
            </Container>
          </Box>
        ) : (
          // If we have data, show the results dashboard
          <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 5 }}>
            <Container maxWidth="lg">
              <Box textAlign="center" mb={5}>
                  <Typography variant="h3" component="h1" sx={{
                    background: 'linear-gradient(45deg, #29b6f6 30%, #4dd0e1 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                      Your ECG Insights
                  </Typography>
              </Box>
              
              {error && (
                <Box mt={4}><Alert severity="error">{error}</Alert></Box>
              )}
              
              {analysisData && (
                <ResultsDashboard
  data={analysisData}
  imageUrl={uploadedImageUrl}
  onReset={() => {
    setAnalysisData(null);
    setUploadedFile(null);
    setUploadedImageUrl(null);
  }}
/>
              )}
            </Container>
          </Box>
        )}
      </Box>
    );
  }

  export default App;