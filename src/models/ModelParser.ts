import {Artist} from "./Models";

/**
 * Ideally we would want to create a generic parser that would also validate the json
 * but for such a small app parsing by hand is ok
 */

export function parseServerJsonToArtist(data: any): Artist {
    return {
        id: data.id,
        name: data.name,
        url: data.url,
        photoUrl: data.image_url,
        thumbUrl: data.thumb_url,
        facebookUrl: data.facebook_page_url,
        mbid: data.mbid,
        tracker_counter: data.tracker_count,
        upcomingEventCount: data.upcoming_event_counter
    }
}
