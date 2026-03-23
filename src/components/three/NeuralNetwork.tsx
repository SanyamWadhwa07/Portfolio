"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Trail } from "@react-three/drei";
import * as THREE from "three";

// Neural Node component
function NeuralNode({ 
  position, 
  connections, 
  nodeIndex,
  hoveredNode,
  setHoveredNode 
}: { 
  position: [number, number, number];
  connections: number[];
  nodeIndex: number;
  hoveredNode: number | null;
  setHoveredNode: (index: number | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const isConnected = hoveredNode !== null && 
    (hoveredNode === nodeIndex || connections.includes(hoveredNode));

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + nodeIndex) * 0.1;
      
      // Pulse effect when hovered or connected
      const targetScale = hovered ? 1.5 : isConnected ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => {
        setHovered(true);
        setHoveredNode(nodeIndex);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        setHoveredNode(null);
        document.body.style.cursor = 'default';
      }}
    >
      <sphereGeometry args={[0.08, 32, 32]} />
      <meshStandardMaterial
        color={hovered ? "#8b5cf6" : isConnected ? "#6366f1" : "#4f46e5"}
        emissive={hovered ? "#8b5cf6" : isConnected ? "#6366f1" : "#312e81"}
        emissiveIntensity={hovered ? 2 : isConnected ? 1 : 0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Connection line component
function Connection({ 
  start, 
  end, 
  isActive 
}: { 
  start: THREE.Vector3; 
  end: THREE.Vector3;
  isActive: boolean;
}) {
  const lineRef = useRef<THREE.Line>(null);
  
  const geometry = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      start,
      new THREE.Vector3(
        (start.x + end.x) / 2,
        (start.y + end.y) / 2 + 0.2,
        (start.z + end.z) / 2
      ),
      end
    );
    const points = curve.getPoints(20);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [start, end]);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: isActive ? "#8b5cf6" : "#6366f1",
      transparent: true,
      opacity: 0.3,
    });
  }, [isActive]);

  useFrame((state) => {
    if (lineRef.current && lineRef.current.material) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = isActive 
        ? 0.8 + Math.sin(state.clock.elapsedTime * 3) * 0.2
        : 0.15 + Math.sin(state.clock.elapsedTime + Math.random()) * 0.05;
      mat.color.set(isActive ? "#8b5cf6" : "#6366f1");
    }
  });

  return <primitive object={new THREE.Line(geometry, material)} ref={lineRef} />;
}

// Flying data particles
function DataParticle({ 
  startPos, 
  endPos, 
  speed 
}: { 
  startPos: THREE.Vector3; 
  endPos: THREE.Vector3;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const progress = useRef(Math.random());

  useFrame((state, delta) => {
    if (meshRef.current) {
      progress.current += delta * speed;
      if (progress.current > 1) progress.current = 0;
      
      // Create curved path
      const t = progress.current;
      const midPoint = new THREE.Vector3(
        (startPos.x + endPos.x) / 2,
        (startPos.y + endPos.y) / 2 + 0.3,
        (startPos.z + endPos.z) / 2
      );
      
      // Quadratic bezier interpolation
      const pos = new THREE.Vector3();
      pos.x = Math.pow(1 - t, 2) * startPos.x + 2 * (1 - t) * t * midPoint.x + Math.pow(t, 2) * endPos.x;
      pos.y = Math.pow(1 - t, 2) * startPos.y + 2 * (1 - t) * t * midPoint.y + Math.pow(t, 2) * endPos.y;
      pos.z = Math.pow(1 - t, 2) * startPos.z + 2 * (1 - t) * t * midPoint.z + Math.pow(t, 2) * endPos.z;
      
      meshRef.current.position.copy(pos);
    }
  });

  return (
    <Trail
      width={0.03}
      length={6}
      color="#8b5cf6"
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#c4b5fd" />
      </mesh>
    </Trail>
  );
}

// Main neural network scene
function NeuralNetworkScene() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const { mouse, viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Generate network structure
  const network = useMemo(() => {
    const layers = [4, 6, 8, 6, 4];
    const nodes: { position: [number, number, number]; layer: number; connections: number[] }[] = [];
    const spacing = 1.2;
    let nodeIndex = 0;
    
    layers.forEach((nodeCount, layerIndex) => {
      const layerX = (layerIndex - (layers.length - 1) / 2) * spacing;
      
      for (let i = 0; i < nodeCount; i++) {
        const nodeY = (i - (nodeCount - 1) / 2) * 0.4;
        const nodeZ = (Math.random() - 0.5) * 0.5;
        
        // Connect to nodes in next layer
        const connections: number[] = [];
        if (layerIndex < layers.length - 1) {
          const nextLayerStart = layers.slice(0, layerIndex + 1).reduce((a, b) => a + b, 0);
          const nextLayerNodes = layers[layerIndex + 1];
          for (let j = 0; j < Math.min(3, nextLayerNodes); j++) {
            connections.push(nextLayerStart + Math.floor(Math.random() * nextLayerNodes));
          }
        }
        
        nodes.push({
          position: [layerX, nodeY, nodeZ],
          layer: layerIndex,
          connections
        });
        nodeIndex++;
      }
    });
    
    return nodes;
  }, []);

  // Generate connections data
  const connections = useMemo(() => {
    const conns: { start: THREE.Vector3; end: THREE.Vector3; nodeIndices: [number, number] }[] = [];
    
    network.forEach((node, nodeIndex) => {
      node.connections.forEach(targetIndex => {
        if (targetIndex < network.length) {
          conns.push({
            start: new THREE.Vector3(...node.position),
            end: new THREE.Vector3(...network[targetIndex].position),
            nodeIndices: [nodeIndex, targetIndex]
          });
        }
      });
    });
    
    return conns;
  }, [network]);

  // Generate particles
  const particles = useMemo(() => {
    return connections.slice(0, 15).map((conn, i) => ({
      startPos: conn.start,
      endPos: conn.end,
      speed: 0.3 + Math.random() * 0.3
    }));
  }, [connections]);

  // Rotate based on mouse
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.3,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.1,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connections */}
      {connections.map((conn, i) => (
        <Connection
          key={`conn-${i}`}
          start={conn.start}
          end={conn.end}
          isActive={
            hoveredNode !== null && 
            (conn.nodeIndices[0] === hoveredNode || conn.nodeIndices[1] === hoveredNode)
          }
        />
      ))}
      
      {/* Nodes */}
      {network.map((node, i) => (
        <NeuralNode
          key={`node-${i}`}
          position={node.position}
          connections={node.connections}
          nodeIndex={i}
          hoveredNode={hoveredNode}
          setHoveredNode={setHoveredNode}
        />
      ))}
      
      {/* Data particles */}
      {particles.map((particle, i) => (
        <DataParticle
          key={`particle-${i}`}
          startPos={particle.startPos}
          endPos={particle.endPos}
          speed={particle.speed}
        />
      ))}
    </group>
  );
}

// Main component
export default function NeuralNetwork() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#030014"]} />
        <fog attach="fog" args={["#030014", 4, 10]} />
        
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
        
        <Float
          speed={1}
          rotationIntensity={0.1}
          floatIntensity={0.2}
        >
          <NeuralNetworkScene />
        </Float>
        
        <Stars
          radius={50}
          depth={50}
          count={2000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}
