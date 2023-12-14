import axios from 'axios';

 async function generateImage(prompt) {

    // Make request to Azure API
    const apiBase = "https://azureopenairc.openai.azure.com/";
    const apiVersion = "2023-06-01-preview";
    const apiKey = "2dfae56dca8c49f3bece25286d97bbbd";
    //const apiKey = "1d73a1981cb3426986ba0d80497f58a5";
    const url = `${apiBase}openai/images/generations:submit?api-version=${apiVersion}`;
    //const url = 'https://rcazureopenaiinstance.openai.azure.com/openai/images/generations:submit?api-version=2023-06-01-preview';
    const headers = {"api-key": apiKey, "Content-Type": "application/json"};
    const body = { prompt , size: '1024x1024', n: 1};

    try {

        const submission = await axios.post(
            url,
            body,
            {
                headers,
            }
        );

        const operationLocation = submission.headers['operation-location'];
        let status = "";
        let response;

        while(status !== "succeeded") {
            await new Promise(resolve => setTimeout(resolve, 1000));
            response = await axios.get(operationLocation,  {headers });
            status = response.data.status;
            console.log("Status:", status);
        }
        return response.data.result.data;
    } catch (error) {
        console.log("Error generating image:", error);
        throw error;
    }
}

export default generateImage;