import { Grid, Image } from "@mantine/core";

function AstronomicalBodyInfo({
  images,
}: {
  images: { href: string; alt: string }[];
}) {
  return (
    <>
      <Grid grow>
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
      </Grid>
    </>
  );
}

export default AstronomicalBodyInfo;
