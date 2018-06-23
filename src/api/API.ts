import {HttpRequest} from "./HttpRequest";
import {Artist, ArtistEventData} from "../models/Models";
import {parseServerJsonToArtist, parseServerJsonToEvent} from "../models/ModelParser";

const API_BASE_URL = "http://rest.bandsintown.com/";
const APP_ID = "?app_id=just_a_string";

/**
 * Copied from the api docs:
 * for / use %252F
 * for ? use %253F
 * for * use %252A
 * for " use %27C
 */
function parseArtistNameForRequest(name: string): string {
    const slashRegex = new RegExp("/", "g"); // %253F
    const questionMarkRegex = new RegExp("\\?", "g"); // %252A
    const doubleQuotesRegex = new RegExp("\"", "g"); // %27C
    const starRegex = new RegExp("\\*", "g"); // %252A

    return name
        .replace(slashRegex, "%253F")
        .replace(questionMarkRegex, "%252A")
        .replace(doubleQuotesRegex, "%27C")
        .replace(starRegex, "%252A");

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

function parseArtist(artistStr: string): "NOT_FOUND" | Artist {
    // For some reason length of 2 means empty
    if (artistStr.length === 2) {
        return "NOT_FOUND";
    }
    return parseServerJsonToArtist(JSON.parse(artistStr));
}

export async function getArtistInfoByName(name: string): Promise<Artist | "NOT_FOUND"> {
    const parsedName = parseArtistNameForRequest(name);
    const result = await getRequest(`artists/${parsedName}${APP_ID}`);
    return parseArtist(result);
}

function parseEvents(eventStr: string) {
    return parseServerJsonToEvent(JSON.parse(eventStr));
}

export async function getArtistEventsByName(name: string | undefined): Promise<ArtistEventData[]> {
    // TODO temp if for quick tests, REMOVE!!
    if (name !== undefined) {
        const parsedName = parseArtistNameForRequest(name);
        const result = await getRequest(`artists/${parsedName}/events${APP_ID}`);
        const parsed = parseEvents(result);
        console.log(parsed);
        return parsed;
    }
    return [];
}