import { Grid, Image, Button } from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";
import "./App.css";

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data");
    error.message = `Something went wrong... (Service responded with a status of ${response.status})`;
    throw error;
  }

  return response.json();
};

interface NASAImageSearchResponse {
  collection: {
    href: string;
    items: {
      data: {
        center: string;
        date_created: string;
        description: string;
        keywords: string[];
        location: string;
        media_type: string;
        nasa_id: string;
        photographer: string;
        title: string;
      }[];
      href: string;
      links: { href: string; rel: string; render: string }[];
    }[];
    links: { rel: string; prompt: string; href: string }[];
  };
}

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
  const [planet, setPlanet] = useState("mars");
  const { images, isLoading, isError } = useAstronomicalBodyImages(planet);

  return (
    <Grid>
      <Grid.Col span={4}>
        {images?.map((image) => {
          return (
            <Image
              key={image.href}
              radius="md"
              src={image.href}
              alt="TODO"
            ></Image>
          );
        })}
      </Grid.Col>
      <Grid.Col span={8}>
        <Button
          onClick={() => {
            setPlanet("mercury");
          }}
        >
          Mercury
        </Button>
        <Button
          onClick={() => {
            setPlanet("venus");
          }}
        >
          Venus
        </Button>
        <Button
          onClick={() => {
            setPlanet("earth");
          }}
        >
          Earth
        </Button>
        <Button
          onClick={() => {
            setPlanet("mars");
          }}
        >
          Mars
        </Button>
        <Button
          onClick={() => {
            setPlanet("jupiter");
          }}
        >
          Jupiter
        </Button>
        <Button
          onClick={() => {
            setPlanet("saturn");
          }}
        >
          Saturn
        </Button>
        <Button
          onClick={() => {
            setPlanet("uranus");
          }}
        >
          Uranus
        </Button>
        <Button
          onClick={() => {
            setPlanet("neptune");
          }}
        >
          Neptune
        </Button>
        <Button
          onClick={() => {
            setPlanet("pluto");
          }}
        >
          Pluto
        </Button>
      </Grid.Col>
    </Grid>
  );
}

export default App;
