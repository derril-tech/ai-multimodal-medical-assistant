'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ZoomIn,
  ZoomOut,
  Ruler,
  Download,
  Share2,
  Settings,
  Heart,
  Activity
} from 'lucide-react'

interface ECGViewerProps {
  patientId?: string
  recordingId?: string
  onMeasurement?: (measurement: any) => void
  onRhythmDetection?: (rhythm: any) => void
}

interface WaveformData {
  timestamp: number
  value: number
  lead: string
}

export default function ECGViewer({
  patientId,
  recordingId,
  onMeasurement,
  onRhythmDetection
}: ECGViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(30) // seconds
  const [zoom, setZoom] = useState(1)
  const [selectedLead, setSelectedLead] = useState('II')
  const [measurements, setMeasurements] = useState<any[]>([])
  const [rhythmAnalysis, setRhythmAnalysis] = useState<any>(null)

  const leads = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6']

  useEffect(() => {
    // TODO: Initialize WFDB library and load ECG data
    console.log('ECG Viewer initialized')
    loadECGData()
  }, [])

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 0.1
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying, duration])

  const loadECGData = async () => {
    try {
      // TODO: Implement actual WFDB data loading
      console.log('Loading ECG data for patient:', patientId)
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Error loading ECG data:', error)
    }
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const skipBackward = () => {
    setCurrentTime(prev => Math.max(0, prev - 5))
  }

  const skipForward = () => {
    setCurrentTime(prev => Math.min(duration, prev + 5))
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 5))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.1))
  }

  const addMeasurement = () => {
    const measurement = {
      id: Date.now(),
      type: 'RR_interval',
      value: 0.8,
      unit: 'seconds',
      timestamp: currentTime,
      lead: selectedLead
    }
    setMeasurements(prev => [...prev, measurement])
    if (onMeasurement) {
      onMeasurement(measurement)
    }
  }

  const analyzeRhythm = () => {
    // TODO: Implement rhythm analysis
    const analysis = {
      rhythm: 'Normal Sinus Rhythm',
      heartRate: 72,
      confidence: 0.95,
      abnormalities: []
    }
    setRhythmAnalysis(analysis)
    if (onRhythmDetection) {
      onRhythmDetection(analysis)
    }
  }

  const drawWaveform = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height)

    // Draw waveform (simulated)
    drawSimulatedWaveform(ctx, canvas.width, canvas.height)
  }

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1

    // Vertical lines (time)
    for (let x = 0; x <= width; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // Horizontal lines (amplitude)
    for (let y = 0; y <= height; y += 25) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }
  }

  const drawSimulatedWaveform = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 2
    ctx.beginPath()

    const centerY = height / 2
    const timeScale = width / (duration * zoom)

    for (let x = 0; x < width; x++) {
      const time = (x / timeScale) + currentTime
      const amplitude = Math.sin(time * 2 * Math.PI) * 0.3 + 
                       Math.sin(time * 4 * Math.PI) * 0.1 +
                       Math.sin(time * 8 * Math.PI) * 0.05
      const y = centerY + amplitude * height * 0.3
      
      if (x === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.stroke()
  }

  useEffect(() => {
    drawWaveform()
  }, [currentTime, zoom, selectedLead])

  return (
    <Card className="medical-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>ECG Viewer</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Lead Selection */}
          <div className="flex flex-wrap gap-2">
            {leads.map(lead => (
              <Button
                key={lead}
                variant={selectedLead === lead ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLead(lead)}
              >
                {lead}
              </Button>
            ))}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button variant="outline" size="sm" onClick={skipBackward}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={togglePlayback}
              className="w-12 h-12 rounded-full"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={skipForward}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Time Display */}
          <div className="text-center">
            <span className="text-sm text-gray-600">
              {Math.floor(currentTime)}s / {duration}s
            </span>
          </div>

          {/* Waveform Display */}
          <div className="relative bg-white border rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-64"
            />
            
            {/* Measurements Overlay */}
            {measurements.map(measurement => (
              <div
                key={measurement.id}
                className="absolute bg-blue-500 text-white px-2 py-1 rounded text-xs"
                style={{
                  left: `${(measurement.timestamp / duration) * 100}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {measurement.value}s
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={addMeasurement}>
              <Ruler className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={analyzeRhythm}>
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Rhythm Analysis */}
          {rhythmAnalysis && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Rhythm Analysis</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-blue-700">Rhythm:</label>
                  <p className="text-blue-900">{rhythmAnalysis.rhythm}</p>
                </div>
                <div>
                  <label className="text-blue-700">Heart Rate:</label>
                  <p className="text-blue-900">{rhythmAnalysis.heartRate} bpm</p>
                </div>
                <div>
                  <label className="text-blue-700">Confidence:</label>
                  <p className="text-blue-900">{(rhythmAnalysis.confidence * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <label className="text-blue-700">Abnormalities:</label>
                  <p className="text-blue-900">
                    {rhythmAnalysis.abnormalities.length > 0 
                      ? rhythmAnalysis.abnormalities.join(', ')
                      : 'None detected'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Measurements List */}
          {measurements.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Measurements</h4>
              <div className="space-y-2">
                {measurements.map(measurement => (
                  <div key={measurement.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">
                      {measurement.type}: {measurement.value} {measurement.unit}
                    </span>
                    <span className="text-xs text-gray-500">
                      {measurement.timestamp.toFixed(1)}s - {measurement.lead}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
