// src/components/FileUpload.js
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Box, useTheme, alpha } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export function FileUpload({ onFileUpload }) {
  const theme = useTheme();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => onFileUpload(acceptedFiles[0]),
    accept: { 'image/*': ['.jpeg', '.png'], 'application/pdf': ['.pdf'] },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        p: 4,
        textAlign: 'center',
        cursor: 'pointer',
        border: `2px dashed ${isDragActive ? alpha(theme.palette.primary.main, 0.8) : 'rgba(255, 255, 255, 0.2)'}`,
        borderRadius: 4,
        backgroundColor: isDragActive ? alpha(theme.palette.primary.main, 0.2) : 'rgba(10, 25, 41, 0.6)',
        backdropFilter: 'blur(8px)',
        color: '#fff',
        transition: 'border .24s ease-in-out, background-color .24s ease-in-out',
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, 0.9),
          backgroundColor: 'rgba(10, 25, 41, 0.7)',
        },
      }}
    >
      <input {...getInputProps()} />
      {/* --- UPDATED ICON COLOR TO BE BRIGHTER --- */}
      <CloudUploadIcon sx={{ fontSize: 48, mb: 2, color: '#a6d4fa' }} />
      <Typography variant="h6" fontWeight="bold">
        Upload Your ECG Report
      </Typography>
      <Typography variant="body1">
        Drag and drop or click to select a file
      </Typography>
      <Typography variant="caption" display="block" sx={{ mt: 1, opacity: 0.7 }}>
        Supports PDF, PNG, JPG
      </Typography>
    </Box>
  );
}