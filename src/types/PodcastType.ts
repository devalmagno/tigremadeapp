export interface PodcastType {
    title: string;
    rss: string;
    image: string;
    description: string;
    copyright: string;
    episodes: EpisodeType[];
}

export interface EpisodeType {
    title: string;
    creator: string;
    url: string;
    pubDate: string;
    content: string;
}