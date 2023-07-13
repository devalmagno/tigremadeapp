import axios from 'axios';

export const handlerAuth = async (token: string) => {
    const testUrl = 'https://apisacocheiotv.herokuapp.com/rss/5849';
    const headers = {
        Authorization: token,
    }

    try {
        await axios.get(testUrl, { headers });
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}