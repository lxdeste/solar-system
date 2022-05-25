interface AstronomicalBody {
  id: string;
  scale: number;
  rotationSpeed: number;
  orbitingSpeed: number;
  position: [number, number, number];
  color: THREE.ColorRepresentation;
  isLightSource?: boolean;
  title: string;
  wikipediaPageId: number;
}

export default AstronomicalBody;
