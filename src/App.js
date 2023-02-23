import React, { useRef, useState } from 'react';
import './index.css';

const PaintCanvas = () => {
  const canvasRef = useRef(null);
  const colorPickerRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [colorPickerPosition, setColorPickerPosition] = useState({
    x: 0,
    y: 0
  });
  const [brushSize, setBrushSize] = useState(1);

  const startPaint = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsPainting(true);
  };
  
  const paint = ({ nativeEvent }) => {
    if (!isPainting) return;
    const { offsetX, offsetY } = nativeEvent;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };
  
  const stopPaint = () => {
    setIsPainting(false);
  };

  const handleColorChange = (event) => {
    setBrushColor(event.target.value);
  };

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setColorPickerPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setColorPickerPosition({ x: 0, y: 0 });
  };

  const handleBrushSizeChange = (event) => {
    setBrushSize(event.target.value);
  };

  return (
    <div className='container'>
      <canvas
        ref={canvasRef}
        width={1440}
        height={720}
        onMouseDown={startPaint}
        onMouseUp={stopPaint}
        onMouseMove={paint}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => colorPickerRef.current.focus()}
        style={{ cursor: 'crosshair'}}
      />
      <div
        ref={colorPickerRef}
        tabIndex={-1}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <input
          id="pickerStyle"
          type="color"
          value={brushColor}
          onChange={handleColorChange}
        />
      </div>
      <input
        type="range"
        min=".5"
        max="30"
        step="0.5"
        value={brushSize}
        onChange={handleBrushSizeChange}
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          width: '13rem',
          zIndex: 100
        }}
      />
    </div>
  );
};

export default PaintCanvas;