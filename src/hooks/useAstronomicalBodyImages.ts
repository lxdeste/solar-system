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

function useNASAAstronomicalBodyImages(
  astronomicalBody: string | undefined,
  pageNumber: number = 1
) {
  const queryString = !!astronomicalBody
    ? `https://images-api.nasa.gov/search?q=${astronomicalBody}&media_type=image&page=${pageNumber}`
    : null;

  const { data, error } = useSWR<NASAImageSearchResponse, Error>(
    queryString,
    fetcher
  );

  let pageTotal = Math.ceil(
    (data?.collection?.metadata?.total_hits ?? 0) / 100
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
    pageTotal,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useNASAAstronomicalBodyImages;
