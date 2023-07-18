import axios from 'axios';
import * as rssParser from 'react-native-rss-parser';
import { EpisodeType, PodcastType } from '../types/PodcastType';

export const handlerAuth = async (token: string) => {
    const testUrl = 'https://apisacocheiotv.herokuapp.com/rss/5849';
    const headers = {
        Authorization: token,
    }

    try {
        await axios.get(testUrl, { headers });
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const getPodcast = async (link: string, token: string) => {
    const headers = {
        Authorization: token,
    }

    try {
        const { data } = await axios.get(link, { headers });
        const feed = await rssParser.parse(data);
        const episodes: EpisodeType[] = feed.items.map(episode => ({
            title: episode.title,
            creator: episode.authors.map(e => e ? e.name : '').toString().replaceAll(',', ', '),
            url: episode.enclosures.map(e => e.url).toString(),
            pubDate: episode.published,
            content: episode.description,
        }));

        const podcast: PodcastType = {
            title: feed.title,
            description: feed.description,
            image: feed.image.url,
            copyright: feed.copyright ? feed.copyright : '',
            rss: feed.links.map(e => e.url).toString(),
            episodes,
        }

        return podcast;
    } catch (err) {
        console.error
    }
}