import {HttpRequest} from "./HttpRequest";
import {Artist} from "./Models";

const API_BASE_URL = "http://rest.bandsintown.com/";
const APP_ID = "?app_id=just_a_string";

async function getRequest(endpoint: string) {
    const req = new HttpRequest("GET", API_BASE_URL + endpoint);
    const rsp = await req.fetch();

    if (rsp.status >= 200 && rsp.status < 300) {
        return rsp.responseText;
    } else {
        throw new Error("" + rsp.status);
    }
}

function parseArtist(artistStr: string) {
    if (artistStr.length === 2) {
        return "NOT_FOUND";
    }
    return JSON.parse(artistStr);

}

export async function getArtistInfoByName(name: string): Promise<Artist | "NOT_FOUND"> {
    const result = await getRequest(`artists/${name}${APP_ID}` );
    return parseArtist(result);
}