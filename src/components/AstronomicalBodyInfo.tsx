import { Image } from "@mantine/core";

function AstronomicalBodyInfo({ images }: { images: { href: string }[] }) {
  return (
    <>
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
    </>
  );
}

export default AstronomicalBodyInfo;
