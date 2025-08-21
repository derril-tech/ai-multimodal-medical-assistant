'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Move,
  Layers,
  Settings,
  Download,
  Share2,
  Eye,
  EyeOff
} from 'lucide-react'

interface DICOMViewerProps {
  imageUrl?: string
  patientId?: string
  studyId?: string
  onAnnotation?: (annotation: any) => void
  showPHI?: boolean
  onPHIToggle?: (show: boolean) => void
}

export default function DICOMViewer({
  imageUrl,
  patientId,
  studyId,
  onAnnotation,
  showPHI = false,
  onPHIToggle
}: DICOMViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [windowLevel, setWindowLevel] = useState({ window: 400, level: 40 })
  const [showAnnotations, setShowAnnotations] = useState(true)

  useEffect(() => {
    // TODO: Initialize CornerstoneJS when the component mounts
    // This is a placeholder for the actual CornerstoneJS integration
    console.log('DICOM Viewer initialized')
  }, [])

  useEffect(() => {
    if (imageUrl) {
      loadDICOMImage(imageUrl)
    }
  }, [imageUrl])

  const loadDICOMImage = async (url: string) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual DICOM loading with CornerstoneJS
      console.log('Loading DICOM image:', url)
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Error loading DICOM image:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 5))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.1))
  }

  const handleRotateClockwise = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const handleRotateCounterClockwise = () => {
    setRotation(prev => (prev - 90 + 360) % 360)
  }

  const handleWindowLevelChange = (type: 'window' | 'level', value: number) => {
    setWindowLevel(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const handleAnnotation = () => {
    if (onAnnotation) {
      onAnnotation({
        type: 'measurement',
        position: { x: 100, y: 100 },
        value: 'Measurement value'
      })
    }
  }

  const togglePHI = () => {
    if (onPHIToggle) {
      onPHIToggle(!showPHI)
    }
  }

  return (
    <Card className="medical-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>DICOM Viewer</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePHI}
              className={showPHI ? 'bg-blue-100' : ''}
            >
              {showPHI ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              PHI
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg">
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleRotateClockwise}>
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleRotateCounterClockwise}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Move className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={showAnnotations ? 'bg-blue-100' : ''}
            >
              <Layers className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleAnnotation}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          {/* Image Display Area */}
          <div className="relative bg-black rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-96 object-contain"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transition: 'transform 0.2s ease-in-out'
              }}
            />
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-white">Loading DICOM image...</div>
              </div>
            )}

            {/* Window/Level Controls */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded">
              <div className="text-xs space-y-1">
                <div>
                  <label className="block">Window:</label>
                  <input
                    type="range"
                    min="1"
                    max="2000"
                    value={windowLevel.window}
                    onChange={(e) => handleWindowLevelChange('window', parseInt(e.target.value))}
                    className="w-20"
                  />
                  <span className="ml-2">{windowLevel.window}</span>
                </div>
                <div>
                  <label className="block">Level:</label>
                  <input
                    type="range"
                    min="-1000"
                    max="1000"
                    value={windowLevel.level}
                    onChange={(e) => handleWindowLevelChange('level', parseInt(e.target.value))}
                    className="w-20"
                  />
                  <span className="ml-2">{windowLevel.level}</span>
                </div>
              </div>
            </div>

            {/* PHI Overlay */}
            {!showPHI && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-xs">
                PHI HIDDEN
              </div>
            )}
          </div>

          {/* Image Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <label className="font-medium text-gray-600">Patient ID:</label>
              <p className="text-gray-900">{patientId || 'N/A'}</p>
            </div>
            <div>
              <label className="font-medium text-gray-600">Study ID:</label>
              <p className="text-gray-900">{studyId || 'N/A'}</p>
            </div>
            <div>
              <label className="font-medium text-gray-600">Zoom:</label>
              <p className="text-gray-900">{zoom.toFixed(1)}x</p>
            </div>
            <div>
              <label className="font-medium text-gray-600">Rotation:</label>
              <p className="text-gray-900">{rotation}°</p>
            </div>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setWindowLevel({ window: 400, level: 40 })}>
              Abdomen
            </Button>
            <Button variant="outline" size="sm" onClick={() => setWindowLevel({ window: 1500, level: -600 })}>
              Lung
            </Button>
            <Button variant="outline" size="sm" onClick={() => setWindowLevel({ window: 80, level: 40 })}>
              Brain
            </Button>
            <Button variant="outline" size="sm" onClick={() => setWindowLevel({ window: 250, level: 50 })}>
              Bone
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
