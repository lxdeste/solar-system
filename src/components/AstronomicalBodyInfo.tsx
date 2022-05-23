import { Card, Center, Grid, Image, Loader, Text, Title } from "@mantine/core";

function AstronomicalBodyInfo({
  bodyDetails,
  images,
  loading,
}: {
  bodyDetails: { id: string; title: string; description: string } | undefined;
  images: { href: string; alt: string }[];
  loading: boolean;
}) {
  return (
    <Grid>
      <Grid.Col span={12}>
        <Card radius="md">
          <Title order={1}>{bodyDetails?.title}</Title>
          <Text>{bodyDetails?.description}</Text>
        </Card>
      </Grid.Col>
      {!loading ? (
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
    </Grid>
  );
}

export default AstronomicalBodyInfo;
