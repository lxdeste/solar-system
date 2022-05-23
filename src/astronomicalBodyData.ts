const astronomicalBodies: {
  id: string;
  scale: number;
  rotationSpeed: number;
  orbitingSpeed: number;
  position: [number, number, number];
  color: THREE.ColorRepresentation;
  isLightSource?: boolean;
}[] = [
  {
    id: "sun",
    scale: 3,
    rotationSpeed: 0.01,
    orbitingSpeed: 0,
    position: [0, 0, 0],
    color: "Orange",
    isLightSource: true,
  },
  {
    id: "mercury",
    scale: 0.6,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.01,
    position: [9, 0, 0],
    color: "Brown",
  },
  {
    id: "venus",
    scale: 0.7,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.003,
    position: [12, 0, 0],
    color: "Khaki",
  },
  {
    id: "earth",
    scale: 1,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.008,
    position: [16, 0, 0],
    color: "SkyBlue",
  },
  {
    id: "mars",
    scale: 0.8,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.01,
    position: [19, 0, 0],
    color: "DarkRed",
  },
  {
    id: "jupiter",
    scale: 1.6,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.004,
    position: [24, 0, 0],
    color: "LightSalmon",
  },
  {
    id: "saturn",
    scale: 1.4,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.002,
    position: [29, 0, 0],
    color: "Bisque",
  },
  {
    id: "uranus",
    scale: 1.2,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.009,
    position: [34, 0, 0],
    color: "green",
  },
  {
    id: "neptune",
    scale: 1.3,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.01,
    position: [39, 0, 0],
    color: "blue",
  },
  {
    id: "pluto",
    scale: 0.4,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.001,
    position: [47, 0, 0],
    color: "RebeccaPurple",
  },
];

export default astronomicalBodies;