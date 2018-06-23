import {Artist, ArtistEventData, EventOfferData, EventVenueData} from "./Models";

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


export function parseServerJsonToEvent(data: any): ArtistEventData[] {
    const toReturn: ArtistEventData[] = [];
    for (const datum of data) {
        toReturn.push({
            id: datum.id,
            artistId: datum.artist_id,
            url: datum.url,
            onSaleDatetime: new Date(datum.on_sale_datetime),
            dateTime: new Date(datum.datetime),
            description: datum.description,
            venue: parseServerJsonToVenuData(datum.venue),
            offers: parseServerJsonToOfferData(datum.offers),
            lineup: datum.lineup,
        });
    }

    return toReturn;
}

export function parseServerJsonToOfferData(data: any): EventOfferData[] {
    const toReturn: EventOfferData[] = [];
    for (const datum of data) {
        toReturn.push({
            type: datum.type,
            url: datum.url,
            status: datum.status
        })
    }
    return toReturn;
}

export function parseServerJsonToVenuData(data: any): EventVenueData {
    return {
        name: data.name,
        city: data.city,
        country: data.country,
        geo: {lat: data.latitude, lng: data.longitude},
        region: data.region
    }
}