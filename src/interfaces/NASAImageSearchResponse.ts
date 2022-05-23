export default interface NASAImageSearchResponse {
  collection: {
    href: string;
    items: {
      data: {
        center: string;
        date_created: string;
        description: string;
        keywords: string[];
        location: string;
        media_type: string;
        nasa_id: string;
        photographer: string;
        title: string;
      }[];
      href: string;
      links: { href: string; rel: string; render: string }[];
    }[];
    links: { rel: string; prompt: string; href: string }[];
  };
}
