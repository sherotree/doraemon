'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';
import { dataURL2Unit8Array } from '../utils/data-url-to-unit8-array';
import { emit } from '../emit';

export default function Three() {
  const ref = useRef<any>(null!);
  const stateRef = useRef<any>(null!);

  return (
    <div className="flex justify-center items-center h-screen">
      <Canvas
        className="h-2xl w-2xl"
        gl={{ preserveDrawingBuffer: true }}
        ref={ref}
        onCreated={state => {
          stateRef.current = state;
        }}
        onClick={() => {
          const gl = stateRef.current.gl;
          const scene = stateRef.current.scene;
          const camera = stateRef.current.camera;
          gl.domElement.getContext('webgl', { preserveDrawingBuffer: true });
          gl.render(scene, camera);

          gl.domElement.toBlob((blob: any) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob!);
            reader.onloadend = () => {
              const bytes = dataURL2Unit8Array(reader.result as string);

              emit('create-from-bytes', bytes);
            };
          });
        }}
      >
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MeshComponent />
      </Canvas>
    </div>
  );
}

function MeshComponent() {
  const fileUrl = '/doraemon/shiba/scene.gltf';
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={mesh}
      onClick={e => {
        console.log(mesh.current, 'mesh');
      }}
    >
      <primitive object={gltf.scene} />
    </mesh>
  );
}
