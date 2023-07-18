import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from '../db/firebaseConfig';

import { getPodcast } from "../services/api";

import { PodcastSourceType } from "../types/PodcastSourceType";
import { PodcastType } from "../types/PodcastType";

interface DataContextType {
    podcastsSource: PodcastSourceType[];
    setPodcastsSource: Dispatch<SetStateAction<PodcastSourceType[]>>;
    getPodcastData: (rss: string, token: string) => void;

    podcastList: PodcastType[];

    isFetching: boolean;
}

interface Props {
    children: ReactNode;
}

const DataContext = createContext<DataContextType | null>(null);

export const useDataContext = () => {
    const dataContext = useContext(DataContext);

    if (!dataContext)
        throw new Error("DataContext has to be used within <DataContext.Provider>")

    return dataContext;
}

export default function DataProvider(props: Props) {
    const [podcastList, setPodcastList] = useState<PodcastType[]>([]);
    const [podcastsSource, setPodcastsSource] = useState<PodcastSourceType[]>([]);

    const [isFetching, setIsFetching] = useState(false);

    const podcastsRef = collection(db, "podcasts")

    async function getPodcastData(rss: string, token: string) {
        setIsFetching(true);
        const data = await getPodcast(rss, token);

        if (data !== undefined) {
            const list = [...podcastList];
            list.push(data);
            setPodcastList(list);
        } else console.log('An error ocurred');

        setIsFetching(false);
    }

    useEffect(() => {
        async function getPodcasts() {
            const docSnap = await getDocs(podcastsRef);
            const data = docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id, isActive: false, } as PodcastSourceType))

            setPodcastsSource(data);
        }

        getPodcasts();
    }, []);

    return (
        <DataContext.Provider
            value={{
                podcastsSource,
                setPodcastsSource,
                getPodcastData,
                podcastList,
                isFetching,
            }}
        >
            {props.children}
        </DataContext.Provider>
    )
}