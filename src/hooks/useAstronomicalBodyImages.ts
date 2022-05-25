import useSWR from "swr";
import NASAImageSearchResponse from "../interfaces/NASAImageSearchResponse";
import fetcher from "../util/fetcher";

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
