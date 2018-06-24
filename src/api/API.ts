import { HttpRequest } from "./HttpRequest";
import { ArtistEventData } from "../models/Models";
import { parseServerJsonToArtist, parseServerJsonToEvent } from "../models/ModelParser";
import { ArtistState } from "../App";
import { DateQuery } from "../components/SearchBar";


const API_BASE_URL = "http://rest.bandsintown.com/";
const APP_ID = "?app_id=just_a_string";

function parseArtistNameForRequest(name: string): string {
    /**
     * Copied from the api docs:
     * for / use %252F
     * for ? use %253F
     * for * use %252A
     * for " use %27C
     *
     * !!!IMPORTANT!!!
     * That just seems wrong.
     * Characters like * work fine but characters like # fail, use regular uri encoder
     *
     */
    return encodeURIComponent(name);

}

async function getRequest(endpoint: string) {
    const req = new HttpRequest("GET", API_BASE_URL + endpoint);
    const rsp = await req.fetch();

    if (rsp.status >= 200 && rsp.status < 300) {
        return rsp.responseText;
    } else {
        throw new Error("" + rsp.status);
    }
}

function parseArtist(artistStr: string): ArtistState.FoundArtist | ArtistState.NotFound {
    const json = JSON.parse(artistStr);
    // Sometimes returns str with len of 2 sometimes return json with error
    if (json.error || artistStr.length === 2) {
        return { type: "NotFound" };
    }
    return { type: "FoundArtist", artist: parseServerJsonToArtist(JSON.parse(artistStr)) };
}

export async function getArtistInfoByName(name: string): Promise<ArtistState.FoundArtist | ArtistState.NotFound> {
    const parsedName = parseArtistNameForRequest(name);
    const result = await getRequest(`artists/${parsedName}${APP_ID}`);
    return parseArtist(result);
}

export async function getArtistEventsByName(name: string, dateQuery: DateQuery | null): Promise<ArtistEventData[]> {
    const parsedName = parseArtistNameForRequest(name);
    let dateStr = "";
    if (dateQuery !== null) {
        dateStr = `&date=${dateQuery.from},${dateQuery.to}`
    }

    const result = await getRequest(`artists/${parsedName}/events${APP_ID}${dateStr}`);
    return parseServerJsonToEvent(JSON.parse(result));
}