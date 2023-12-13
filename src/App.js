import React from 'react';
import analyzeImage from './azure-image-analysis';


function App() {
  const value = 'World';
  const [imageUrl, setImageUrl] = React.useState('');
  const [result, setResult] = React.useState('');

  const handleImageAnalysis = async () => {
    try {
      const result = await analyzeImage(imageUrl);
      console.log(result);
      setResult(result);
    }catch (error) {
      console.log("Error analyzing image:", error);
      throw error;
    }
  }
  
  const displayResult = () => { 
    if (result) {
      return <div>
        <h2>Image Analysis Result</h2>
        <img 
          width="500"
        src={result?.url ? result.url : imageUrl} 
        alt="Image Uploaded" />
  
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    }
  }


  return <div>
            <h1>Hello {value} Renzo!</h1>
               {/* whenClicked is a property not an event, per se. */}
            <input type="text" placeholder="Enter URL or textual prompt" 
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
             >
            </input>
            <button onClick={handleImageAnalysis}>Analyze Image</button>
            <button>Generate Image</button>
            {displayResult()}
          </div>;


}

export default App;
