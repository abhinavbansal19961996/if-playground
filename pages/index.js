import { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { rows } from './constants/plugins.js'
import { css } from './css/index.js'
console.log(rows)
Chart.register(...registerables);

// LineChart component
const LineChart = ({ data }) => {
  console.log(data)
  return (
    <div>
      <h2>Line Graph of {data.datasets[0].label} over Time</h2>
      <Line data={data} options={{ scales: { xAxes: [{ type: 'time' }] } }} />
    </div>
  );
};

// BarChart component
const BarChart = ({ data }) => {
  return (
    <div>
      <h2>Bar Graph of {data.datasets[0].label} and time</h2>
      <Bar data={data} />
    </div>
  );
};
const LineChartWithAnnotations = ({ data }) => {
  return (
    <div>
      <h2>Line Graph of {data.datasets[0].label} over Time with Annotations</h2>
      <Line data={data} />
    </div>
  );
};

function generateChartData(formattedOutputValue) {
  try {
      // Parse the formatted output value as JSON
      const data = JSON.parse(formattedOutputValue);

      // Extract outputs from the data
      const outputs = data.tree.children.child.outputs;

      // Extract timestamps and energy-CPU values from the outputs
      const timestamps = outputs.map(output => output.timestamp); // Convert timestamps to Date objects
    
      let text = ''
      const energyCPUValues = outputs.map(output => {
        if('energy-cpu' in output) {
          text ="Energy CPU"
          return output['energy-cpu']
        }
        else if('energy' in output) {
          text ="Energy"
          return output['energy']
        }
        else if('cpu/thermal-design-power' in output) {
          text ="CPU TDP"
          return output['cpu/thermal-design-power']
        }
        else if('network/energy' in output) {
          text ="CPU TDP"
          return output['network/energy']
        }

    });
   

      // Prepare the dataset for the chart
      const dataset = {
          labels: timestamps,
          datasets: [
              {
                  label: text,
                  data: energyCPUValues,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
              },
          ],
      };
      console.log(dataset);
      return dataset;
  } catch (error) {
      console.error('Error generating chart data:', error);
      return null;
  }
}
export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [graphData, setGraphData] = useState('');
  const [currentGraph, setCurrentGraph] = useState(0); // State to track current graph index
  const [showGraphs, setShowGraphs] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleRowClick = (row) => {
    setInputValue(row.content);
  };

  const handleRunClick = async () => {
    try {
      const response = await axios.post("/api/output/", {
        input: inputValue
      });

      const cleanedOutputValue = response.data.substring(response.data.indexOf('{'));
      const formattedOutputValue = JSON.stringify(JSON.parse(cleanedOutputValue), null, 2);

      setOutputValue(formattedOutputValue);
      setGraphData(generateChartData(formattedOutputValue))
      setShowGraphs(true); // Show graphs after fetching output
    } catch (error) {
      console.error('Error fetching data:', error);
      setOutputValue('Error fetching data. Please check your network connection.');
    }
  };

  const handleNextGraph = () => {
    setCurrentGraph(current => (current + 1) % 3); // Wrap around if currentGraph exceeds number of graphs
  };

  const handlePrevGraph = () => {
    setCurrentGraph(current => (current + 2) % 3); // Wrap around if currentGraph becomes negative
  };

  const renderGraph = () => {
    switch (currentGraph) {
      case 0:
        return <LineChart data={graphData} />;
      case 1:
        return <BarChart data={graphData} />;
      case 2:
        return <LineChartWithAnnotations data={graphData} />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h1>IF Playground</h1>
        <div className="row-list">
        <h5><u>Select Sample Manifest File </u>⬇️</h5>
          {rows.map((row, index) => (
            <div key={index} className="row" onClick={() => handleRowClick(row)}>
              {row.title}
            </div>
          ))}
        </div>
      </div>
      <div className="main-content">
        <div className="input-container">
          <div className='ffolp'>
          <b className='sdsdsds'>INPUT</b>
          <button className="input-container-run" onClick={handleRunClick}>Run</button>
          </div> 
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your input here"
            className="text-container tter"
          />
          
        </div>
        <div className="output-graph-container">
          <div className="output-container">
          <b className="input-container sjddj">OUTPUT</b>
            <textarea
              value={outputValue}
              readOnly
              placeholder="Output will appear here"
              className="text-container "
            />
             {!showGraphs && <b>GRAPHS</b>}
          </div>
         
          {showGraphs && (
            <div className="graph-container">
              {renderGraph()}
              <div className="graph-nav">
                <button onClick={handlePrevGraph}>&lt; Prev</button>
                <button onClick={handleNextGraph}>Next &gt;</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{css}</style>
    </div>
  );
}
