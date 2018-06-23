import * as React from "react";
import {getArtistEventsByName} from "../api/API";
import {Artist, ArtistEventData} from "../models/Models";
import {EventList} from "../components/EventList";
import {ArtistState} from "../App";

export interface EventListWrapperProps {
    artistState: ArtistState;
}

export interface EventListWrapperState {
    events: ArtistEventData[] | "LOADING";
}

export class EventListWrapper extends React.Component<EventListWrapperProps, EventListWrapperState> {
    constructor(props: EventListWrapperProps) {
        super(props);
        this.state = {
            events: "LOADING"
        }
    }

    // Null means no artist yet
    getArtist(artistState: ArtistState): Artist | null {
        if (artistState.type === "FoundArtist") {
            return artistState.artist;
        }

        return null;
    }

    // When we receive a new artist we get his events
    componentWillReceiveProps(nextProps: EventListWrapperProps) {
        this.setState({events: "LOADING"});
        const artist = this.getArtist(nextProps.artistState);
        if (artist !== null) {
            this.getEventsForArtist(artist);
        }
    }

    async getEventsForArtist(artist: Artist) {
        this.setState({events: await getArtistEventsByName(artist.name)});
    }

    render() {
        const artist = this.getArtist(this.props.artistState);
        if (artist === null) {
            return null;
        }

        if (this.state.events === "LOADING") {
            return (
                <div>
                    Loading events...
                </div>
            );
        }

        return (
            <EventList events={this.state.events}/>
        );
    }
}