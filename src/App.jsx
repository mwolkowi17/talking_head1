import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei'


function Head() {
  const model = useGLTF('head.glb')

  const animation = useAnimations(model.animations, model.scene)
  const action = animation.actions.Animation
  const [talk, setTalk] = useState(false)
  let timer

  useEffect(() => {
    console.log(model)
    console.log(talk)

    if (talk) {
      action.play()
      console.log('inside code')
      timer = setTimeout(() => {
        action.fadeOut(2);
        action.stop()
        setTalk(false)
      }, 5000);
    }
  })



  return (
    <primitive object={model.scene} scale={5} rotation-z={0.2} onClick={() => { if (talk === false) { clearTimeout(timer); setTalk(!talk) } }} />

  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 0, 0]} />
      <directionalLight position={[-1, 0, -1]} />
      <pointLight position={[-2, 0, 2]} />
      <Head />
      <OrbitControls />
    </Canvas>
  )
}
