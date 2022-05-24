const astronomicalBodies: {
  id: string;
  scale: number;
  rotationSpeed: number;
  orbitingSpeed: number;
  position: [number, number, number];
  color: THREE.ColorRepresentation;
  isLightSource?: boolean;
  title: string;
  description: string;
}[] = [
  {
    id: "sun",
    scale: 3,
    rotationSpeed: 0.01,
    orbitingSpeed: 0,
    position: [0, 0, 0],
    color: "Orange",
    isLightSource: true,
    title: "The Sun",
    description: "Very, very, very hot",
  },
  {
    id: "mercury",
    scale: 0.6,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.01,
    position: [9, 0, 0],
    color: "Brown",
    title: "Mercury",
    description: "Very hot, but also very cold",
  },
  {
    id: "venus",
    scale: 0.7,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.003,
    position: [12, 0, 0],
    color: "Khaki",
    title: "Venus",
    description: "Air so heavy it can kill you",
  },
  {
    id: "earth",
    scale: 1,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.008,
    position: [16, 0, 0],
    color: "SkyBlue",
    title: "Earth",
    description: "Where you are right now... Probably...",
  },
  {
    id: "mars",
    scale: 0.8,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.01,
    position: [19, 0, 0],
    color: "DarkRed",
    title: "Mars",
    description: "THE RED PLANET.",
  },
  {
    id: "jupiter",
    scale: 1.6,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.004,
    position: [24, 0, 0],
    color: "LightSalmon",
    title: "Jupiter",
    description: "The biggest planet.",
  },
  {
    id: "saturn",
    scale: 1.4,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.002,
    position: [29, 0, 0],
    color: "Bisque",
    title: "Saturn",
    description:
      "The planet known for a giant ring of ice that hasn't been implemented...",
  },
  {
    id: "uranus",
    scale: 1.2,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.009,
    position: [34, 0, 0],
    color: "Green",
    title: "Uranus",
    description: "...",
  },
  {
    id: "neptune",
    scale: 1.3,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.01,
    position: [39, 0, 0],
    color: "Blue",
    title: "Neptune",
    description: "The other blue planet",
  },
  {
    id: "pluto",
    scale: 0.4,
    rotationSpeed: 0.01,
    orbitingSpeed: 0.001,
    position: [47, 0, 0],
    color: "RebeccaPurple",
    title: "Pluto",
    description: "Some would argue that this one shouldn't be here",
  },
];

export default astronomicalBodies;
