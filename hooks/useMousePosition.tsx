import React, { useEffect, useRef } from 'react'

const useMousePosition = () => {
    const [position, setPosition] = React.useState({x: 0, y: 0})
    const raf = useRef<number | null>(null);
    const latestRef = useRef(position)
    
    useEffect(() => {
        function handler (e: MouseEvent) {
            latestRef.current = { x: e.clientX, y: e.clientY }

            if(raf.current == null) {
                raf.current = requestAnimationFrame(() => {
                    setPosition(latestRef.current);
                    raf.current = null;
                })
            }
        }

        window.addEventListener('mousemove', handler)

        return () => {
            window.removeEventListener('mousemove', handler)
            if (raf.current) cancelAnimationFrame(raf.current);
        }
    }, [])
  
    return position
}

export default useMousePosition