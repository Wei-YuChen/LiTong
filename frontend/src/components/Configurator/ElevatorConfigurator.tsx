import React, { useState } from 'react';
import ElevatorViewer from '../3DPreview/ElevatorViewer';

interface ConfiguratorState {
  width: number;
  height: number;
  depth: number;
  color: string;
  material: string;
  capacity: number;
  speed: number;
  doors: number;
  price: number;
}

const ElevatorConfigurator: React.FC = () => {
  const [config, setConfig] = useState<ConfiguratorState>({
    width: 2.0,
    height: 2.5,
    depth: 1.5,
    color: '#0066cc',
    material: 'stainless',
    capacity: 1000,
    speed: 1.0,
    doors: 2,
    price: 50000,
  });

  const calculatePrice = (newConfig: Partial<ConfiguratorState>) => {
    let basePrice = 40000;
    const updatedConfig = { ...config, ...newConfig };

    basePrice += (updatedConfig.width * updatedConfig.height * updatedConfig.depth) * 1000;

    if (updatedConfig.material === 'stainless') basePrice += 5000;
    if (updatedConfig.material === 'titanium') basePrice += 10000;

    basePrice += (updatedConfig.capacity - 1000) * 10;
    basePrice += updatedConfig.speed * 2000;
    basePrice += (updatedConfig.doors - 1) * 3000;

    return Math.round(basePrice);
  };

  const handleChange = (key: keyof ConfiguratorState, value: any) => {
    const newConfig = { ...config, [key]: value };
    newConfig.price = calculatePrice(newConfig);
    setConfig(newConfig);
  };

  const handleSaveConfiguration = () => {
    const configData = JSON.stringify(config);
    localStorage.setItem('savedConfig', configData);
    alert('Configuration saved successfully!');
  };

  const handleLoadConfiguration = () => {
    const saved = localStorage.getItem('savedConfig');
    if (saved) {
      setConfig(JSON.parse(saved));
      alert('Configuration loaded!');
    } else {
      alert('No saved configuration found.');
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Elevator Configurator</h1>
        
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <ElevatorViewer config={config} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Customize Your Elevator</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Width: {config.width.toFixed(1)}m
                </label>
                <input
                  type="range"
                  min="1.5"
                  max="3"
                  step="0.1"
                  value={config.width}
                  onChange={(e) => handleChange('width', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Height: {config.height.toFixed(1)}m
                </label>
                <input
                  type="range"
                  min="2"
                  max="4"
                  step="0.1"
                  value={config.height}
                  onChange={(e) => handleChange('height', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Depth: {config.depth.toFixed(1)}m
                </label>
                <input
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.1"
                  value={config.depth}
                  onChange={(e) => handleChange('depth', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <input
                  type="color"
                  value={config.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                  className="w-full h-10 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Material</label>
                <select
                  value={config.material}
                  onChange={(e) => handleChange('material', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="stainless">Stainless Steel</option>
                  <option value="titanium">Titanium</option>
                  <option value="aluminum">Aluminum</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Capacity: {config.capacity}kg
                </label>
                <input
                  type="range"
                  min="1000"
                  max="3000"
                  step="100"
                  value={config.capacity}
                  onChange={(e) => handleChange('capacity', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Speed: {config.speed.toFixed(1)}m/s
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="4"
                  step="0.1"
                  value={config.speed}
                  onChange={(e) => handleChange('speed', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Number of Doors</label>
                <select
                  value={config.doors}
                  onChange={(e) => handleChange('doors', parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                >
                  <option value="1">1 Door</option>
                  <option value="2">2 Doors</option>
                  <option value="4">4 Doors</option>
                </select>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-lg">
                <p className="text-sm">Estimated Price</p>
                <p className="text-3xl font-bold">${config.price.toLocaleString()}</p>
              </div>

              <button
                onClick={handleSaveConfiguration}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
              >
                Save Configuration
              </button>

              <button
                onClick={handleLoadConfiguration}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                Load Configuration
              </button>

              <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition">
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElevatorConfigurator;