import axios from 'axios';

 async function analyzeImage(imageUrl) {

    // Make request to Azure API
    try {
        const endpoint = "https://azureaiservicerc.cognitiveservices.azure.com/";
        const apiKey = "fa3ec284006d42fa845d286b468a4b6e";
        const url = `${endpoint}computervision/imageanalysis:analyze?api-version=2023-10-01`;

        const response = await axios.post(
            url,
            { url: imageUrl },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': apiKey
                },
                params: {
                    "features": "caption,read",
                    "model-version": "latest",
                    "language": "en"
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log("Error analyzing image:", error);
        throw error;
    }
}

export default analyzeImage;