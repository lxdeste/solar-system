import {
  Grid,
  Button,
  Container,
  ScrollArea,
  Loader,
  Center,
} from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";
import AstronomicalBodyList from "./components/AstronomicalBodyList";
import AstronomicalBodyInfo from "./components/AstronomicalBodyInfo";
import NASAImageSearchResponse from "./interfaces/NASAImageSearchResponse";
import SolarSystem from "./components/SolarSystem";

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
  { id: "sun", title: "Sun", description: "Yet to be written..." },
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

  console.log(data);

  const images = data?.collection.items
    .map((item) =>
      item.links.map((link, index) => ({
        href: link.href,
        alt: item.data[index].title,
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
  const [bodyId, setBodyId] = useState("");
  const { images, isLoading, isError } = useAstronomicalBodyImages(bodyId);

  return (
    <Grid sx={() => ({ margin: 0, height: "100vh" })}>
      <Grid.Col span={4} sx={() => ({ height: "100%" })}>
        <Container p="md" sx={() => ({ height: "100%" })}>
          <ScrollArea sx={() => ({ height: "100%" })}>
            {!isLoading ? (
              <>
                {listMode === "list" ? (
                  <AstronomicalBodyList
                    options={astronomicalBodies}
                    onClick={(id) => {
                      setBodyId(id);
                      setListMode("view");
                    }}
                  />
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setBodyId("");
                        setListMode("list");
                      }}
                    >
                      Back
                    </Button>
                    <AstronomicalBodyInfo images={images!} />
                  </>
                )}
              </>
            ) : (
              <Center>
                <Loader />
              </Center>
            )}
          </ScrollArea>
        </Container>
      </Grid.Col>
      <Grid.Col span={8} sx={() => ({ height: "100vh" })}>
        <SolarSystem
          bodyClicked={(id) => {
            setBodyId(id);
            setListMode("view");
          }}
          selectedBody={bodyId}
        />
      </Grid.Col>
    </Grid>
  );
}

export default App;
