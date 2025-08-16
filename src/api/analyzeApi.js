// src/api/analyzeApi.js
import axios from 'axios';

const API_URL = 'https://ecg-backend.onrender.com'; // Your FastAPI backend URL

/**
 * Uploads a file for ECG analysis.
 * @param {File} file The image or PDF file to analyze.
 * @returns {Promise<Object>} The analysis data from the API.
 */
export const analyzeECG = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_URL}/analyze/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Requests a PDF report from the backend using the analysis data.
 * @param {Object} analysisData The data returned from the analyzeECG call.
 */
export const downloadReport = async (analysisData) => {
    try {
        // *** CHANGE: We now send a simple JSON POST request, not FormData ***
        const response = await axios.post(`${API_URL}/generate-report/`, analysisData, {
            responseType: 'blob', // Important: expect a binary file response
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
        });

        // Create a URL for the returned blob and trigger a download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ECG_Analysis_Report.pdf');
        document.body.appendChild(link);
        link.click();
        
        // Clean up the URL and link
        window.URL.revokeObjectURL(url);
        link.remove();

    } catch (error) {
        console.error("Failed to download report:", error);
        alert("Sorry, the PDF report could not be generated. Please check the console for details.");
    }
};