/**
 * This file contains our model declarations
 * We don't need this to match the way it looks in the server, just to make it easy to work with
 * We declare the entire data set, even if we don't use everything
 */

export interface Artist {
    id: number,
    name: string;
    url: string;
    photoUrl: string;
    thumbUrl: string;
    facebookUrl: string;
    mbid: string;
    tracker_counter: number;
    upcomingEventCount: number;
}

export interface ArtistEventData {
    id: string;
    artistId: string;
    url: string;
    onSaleDatetime: Date;
    dateTime: Date;
    description: string;
    venue: EventVenueData;
    offers: EventOfferData[];
    lineup: string[];
}

export interface EventVenueData {
    name: string;
    geo: { lat: number, lng: number};
    city: string;
    region: string;
    country: string;
}

export interface EventOfferData {
    type: string;
    url: string;
    status: string;
}