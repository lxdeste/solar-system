import { Grid, Button, Container, ScrollArea } from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";
import AstronomicalBodyList from "./components/AstronomicalBodyList";
import AstronomicalBodyInfo from "./components/AstronomicalBodyInfo";
import NASAImageSearchResponse from "./interfaces/NASAImageSearchResponse";
import SolarSystem from "./components/SolarSystem";
import astronomicalBodies from "./astronomicalBodyData";

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data");
    error.message = `Something went wrong... (Service responded with a status of ${response.status})`;
    throw error;
  }

  return response.json();
};

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
                  mb={"md"}
                  onClick={() => {
                    setBodyId("");
                    setListMode("list");
                  }}
                >
                  Back
                </Button>
                <AstronomicalBodyInfo
                  loading={isLoading}
                  bodyDetails={astronomicalBodies.find(
                    (body) => body.id === bodyId
                  )}
                  images={images!}
                />
              </>
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
