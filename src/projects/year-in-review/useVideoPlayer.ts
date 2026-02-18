import { useRef, useEffect, useState, useCallback } from 'react'

export function useVideoPlayer(inView: boolean) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [muted, setMuted] = useState(true)
  const [barLevels, setBarLevels] = useState([0.15, 0.15, 0.15, 0.15, 0.15])
  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const rafRef = useRef<number>(0)

  // Start loading video when section is ~400px from viewport
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = 'auto'
          video.load()
          observer.disconnect()
        }
      },
      { rootMargin: '400px' }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  // Play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoReady) return
    if (inView) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [inView, videoReady])

  const handleCanPlay = useCallback(() => setVideoReady(true), [])

  const initAudio = useCallback(() => {
    if (audioCtxRef.current || !videoRef.current) return
    const ctx = new AudioContext()
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 64
    analyser.smoothingTimeConstant = 0.3
    const source = ctx.createMediaElementSource(videoRef.current)
    source.connect(analyser)
    analyser.connect(ctx.destination)
    audioCtxRef.current = ctx
    analyserRef.current = analyser
  }, [])

  const updateBars = useCallback(function updateBars() {
    const analyser = analyserRef.current
    if (!analyser) return
    const data = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(data)
    const bands = [2, 4, 7, 11, 16]
    const levels = bands.map(i => {
      const raw = (data[i] ?? 0) / 255
      return Math.max(0.05, raw * raw * 1.8)
    })
    setBarLevels(levels)
    rafRef.current = requestAnimationFrame(updateBars)
  }, [])

  useEffect(() => {
    if (!muted && analyserRef.current) {
      rafRef.current = requestAnimationFrame(updateBars)
    } else {
      cancelAnimationFrame(rafRef.current)
      setBarLevels([0.15, 0.15, 0.15, 0.15, 0.15])
    }
    return () => cancelAnimationFrame(rafRef.current)
  }, [muted, updateBars])

  const toggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    initAudio()
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    video.muted = !video.muted
    setMuted(video.muted)
  }, [initAudio])

  return { videoRef, videoReady, muted, barLevels, handleCanPlay, toggleMute }
}
