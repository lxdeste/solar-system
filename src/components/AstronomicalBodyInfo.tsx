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

function AstronomicalBodyInfo({
  bodyDetails,
}: {
  bodyDetails: { id: string; title: string; description: string } | undefined;
}) {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, images, pageTotal } = useNASAAstronomicalBodyImages(
    bodyDetails?.id,
    pageNumber
  );

  useEffect(() => {
    setPageNumber(1);
  }, [bodyDetails?.id]);

  return (
    <Grid>
      <Grid.Col span={12}>
        <Card radius="md">
          <Title order={1}>{bodyDetails?.title}</Title>
          <Text>{bodyDetails?.description}</Text>
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
