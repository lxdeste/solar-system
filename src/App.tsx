import { Grid, Button, Container } from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";
import AstronomicalBodyList from "./components/AstronomicalBodyList";
import AstronomicalBodyInfo from "./components/AstronomicalBodyInfo";
import NASAImageSearchResponse from "./interfaces/NASAImageSearchResponse";

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data");
    error.message = `Something went wrong... (Service responded with a status of ${response.status})`;
    throw error;
  }

  return response.json();
};

const astronomicalBodies = [
  { id: "mercury", title: "Mercury", description: "Yet to be written..." },
  { id: "venus", title: "Venus", description: "Yet to be written..." },
  { id: "earth", title: "Earth", description: "Yet to be written..." },
  { id: "mars", title: "Mars", description: "Yet to be written..." },
  { id: "jupiter", title: "Jupiter", description: "Yet to be written..." },
  { id: "saturn", title: "Saturn", description: "Yet to be written..." },
  { id: "uranus", title: "Uranus", description: "Yet to be written..." },
  { id: "neptune", title: "Neptune", description: "Yet to be written..." },
  { id: "pluto", title: "Pluto", description: "Yet to be written..." },
];

function useAstronomicalBodyImages(
  astronomicalBody: string,
  pageNumber: number = 1
) {
  const { data, error } = useSWR<NASAImageSearchResponse, Error>(
    `https://images-api.nasa.gov/search?q=${astronomicalBody}&media_type=image&page=${pageNumber}`,
    fetcher
  );

  const images = data?.collection.items
    .map((item) =>
      item.links.map((link) => ({
        href: link.href,
      }))
    )
    .flat();

  return {
    images,
    isLoading: !error && !data,
    isError: error,
  };
}

function App() {
  const [listMode, setListMode] = useState<"list" | "view">("list");
  const [planetId, setPlanetId] = useState("");
  const { images, isLoading, isError } = useAstronomicalBodyImages(planetId);
  // TODO: loading state

  return (
    <Grid sx={() => ({ margin: 0 })}>
      <Grid.Col span={3}>
        <Container p="md">
          {listMode === "list" ? (
            <AstronomicalBodyList
              options={astronomicalBodies}
              onClick={(id) => {
                setPlanetId(id);
                setListMode("view");
              }}
            />
          ) : (
            <>
              <Button
                onClick={() => {
                  setListMode("list");
                }}
              >
                Back
              </Button>
              <AstronomicalBodyInfo images={images!} />
            </>
          )}
        </Container>
      </Grid.Col>
      <Grid.Col span={9}>
        <Container p="md">
          {/* TODO: this is where my three-js-fiber is going */}

          {astronomicalBodies.map((astronomicalBody) => {
            return (
              <Button
                color={
                  planetId === astronomicalBody.id && listMode === "view"
                    ? "red"
                    : undefined
                }
                id={astronomicalBody.id}
                onClick={() => {
                  setPlanetId(astronomicalBody.id);
                  if (listMode === "list") {
                    setListMode("view");
                  }
                }}
              >
                {astronomicalBody.title}
              </Button>
            );
          })}
        </Container>
      </Grid.Col>
    </Grid>
  );
}

export default App;
