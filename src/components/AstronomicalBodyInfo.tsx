import {
  Card,
  Center,
  Grid,
  Image,
  Loader,
  Pagination,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";

import useNASAAstronomicalBodyImages from "../hooks/useAstronomicalBodyImages";
import useWikipediaExtract from "../hooks/useWikipediaExtract";
import AstronomicalBody from "../interfaces/AstronomicalBody";

function AstronomicalBodyInfo({
  bodyDetails,
}: {
  bodyDetails: AstronomicalBody | undefined;
}) {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, images, pageTotal } = useNASAAstronomicalBodyImages(
    bodyDetails?.id,
    pageNumber
  );

  const { isLoading: wikiLoading, extract } = useWikipediaExtract(
    bodyDetails?.wikipediaPageId
  );

  useEffect(() => {
    setPageNumber(1);
  }, [bodyDetails?.id]);

  return (
    <Grid>
      <Grid.Col span={12}>
        <Card radius="md">
          <Title mb="md" order={1}>
            {bodyDetails?.title}
          </Title>
          {!wikiLoading ? (
            <Text>{extract}</Text>
          ) : (
            <Center mb={"md"}>
              <Loader />
            </Center>
          )}
        </Card>
      </Grid.Col>
      {!isLoading ? (
        <>
          {images?.map((image) => {
            return (
              <Grid.Col key={image.href} span={6}>
                <Image
                  height={250}
                  radius="md"
                  src={image.href}
                  alt={image.alt}
                  withPlaceholder
                ></Image>
              </Grid.Col>
            );
          })}
        </>
      ) : (
        <Grid.Col span={12}>
          <Center>
            <Loader />
          </Center>
        </Grid.Col>
      )}
      <Grid.Col span={12}>
        {!isLoading && (
          <Center>
            <Pagination
              page={pageNumber}
              onChange={setPageNumber}
              total={pageTotal}
              radius={"md"}
            />
          </Center>
        )}
      </Grid.Col>
    </Grid>
  );
}

export default AstronomicalBodyInfo;
