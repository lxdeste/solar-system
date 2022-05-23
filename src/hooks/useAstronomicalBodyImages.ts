import useSWR from "swr";
import NASAImageSearchResponse from "../interfaces/NASAImageSearchResponse";

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

export default useAstronomicalBodyImages;
