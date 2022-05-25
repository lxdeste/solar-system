import useSWR from "swr";
import fetcher from "../util/fetcher";

interface WikipediaIntroductionResponse {
  query: {
    pages: { extract: string; title: string }[];
  };
}

function useWikipediaExtract(pageId: number | undefined) {
  const queryString = !!pageId
    ? `https://en.wikipedia.org/w/api.php?action=query&redirects=1&prop=extracts&exsentences=10&exlimit=1&pageids=${pageId}&explaintext=1&formatversion=2&format=json&origin=*`
    : null;

  const { data, error } = useSWR<WikipediaIntroductionResponse, Error>(
    queryString,
    fetcher
  );

  const wikipediaExtract = data?.query?.pages[0].extract;

  return {
    extract: wikipediaExtract,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useWikipediaExtract;
