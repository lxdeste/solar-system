const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data");
    error.message = `Something went wrong... (Service responded with a status of ${response.status})`;
    throw error;
  }

  return response.json();
};

export default fetcher;
