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
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DataContextType {
    podcastsSource: PodcastSourceType[];
    setPodcastsSource: Dispatch<SetStateAction<PodcastSourceType[]>>;
    getPodcastData: (rss: string, token: string) => void;
    removePodcast: (rss: string) => void;

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
            setPodcastList(list => {
                async function setAsyncStorage() {
                    await AsyncStorage.setItem('mypodcasts', JSON.stringify(podcastList));
                }
                setAsyncStorage();
                return list;
            })
            await AsyncStorage.setItem('mypodcasts', JSON.stringify(podcastList));
        } else console.log('An error ocurred');

        setIsFetching(false);
    }

    async function removePodcast(rss: string) {
        const list = [...podcastList];
        const podcast = list.find(e => e.rss === rss);
        const index = list.indexOf(podcast!);
        list.splice(index, 1);
        setPodcastList([...list]);
        await AsyncStorage.setItem('mypodcasts', JSON.stringify(list));
    }

    useEffect(() => {
        async function getPodcastSource() {
            try {
                const value = await AsyncStorage.getItem('podcastsource');
                if (value !== null) {
                    setPodcastsSource(JSON.parse(value))
                } else {
                    const docSnap = await getDocs(podcastsRef);
                    const data = docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id, isActive: false, } as PodcastSourceType))

                    setPodcastsSource(data);
                    await AsyncStorage.setItem('podcastsource', JSON.stringify(data));
                }
            } catch (e) {
                console.log(e);
            }
        }

        async function getMyPodcastsList() {
            try {
                const value = await AsyncStorage.getItem('mypodcasts');
                if (value !== null) {
                    setPodcastList(JSON.parse(value));
                    console.log(podcastsSource);

                }
            } catch (e) {
                console.log(e);
            }
        }

        getPodcastSource();
        getMyPodcastsList();
    }, []);

    useEffect(() => {
        function updatePodcastSource() {
            podcastsSource.forEach((e, index) => {
                if (podcastList.some(pod => pod.title === e.name)) {
                    const podcastSourceList = [...podcastsSource];

                    if (!podcastSourceList[index].isActive) {
                        podcastSourceList[index].isActive = true;
                        setPodcastsSource([...podcastSourceList]);
                    }
                }
            })
        }

        updatePodcastSource();
    }, [podcastList]);

    return (
        <DataContext.Provider
            value={{
                podcastsSource,
                setPodcastsSource,
                getPodcastData,
                podcastList,
                isFetching,
                removePodcast,
            }}
        >
            {props.children}
        </DataContext.Provider>
    )
}