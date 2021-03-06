import * as React from "react";
import {getArtistEventsByName} from "../api/API";
import assertNever from "assert-never";
import {Artist, ArtistEventData} from "../models/Models";
import "./EventListWrapper.css";
import {EventList} from "../components/EventList";
import {ArtistState} from "../App";
import { DateQuery } from "../components/SearchBar";

export interface EventListWrapperProps {
    artistState: ArtistState;
    dateQuery: DateQuery | null;
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
        switch (artistState.type) {
            case "FoundArtist": {
                return artistState.artist;
            }
            case "Loading":
            case "NotFound":
            case "NoValue":
                return null;
            default: {
                return assertNever(artistState);
            }
        }
    }

    // When we receive a new artist we get his events
    componentWillReceiveProps(nextProps: EventListWrapperProps) {
        this.setState({events: "LOADING"});
        const artist = this.getArtist(nextProps.artistState);
        if (artist !== null) {
            this.getEventsForArtist(artist, nextProps.dateQuery);
        }
    }

    async getEventsForArtist(artist: Artist, dateQuery: DateQuery | null) {
        this.setState({events: await getArtistEventsByName(artist.name, dateQuery)});
    }

    render() {
        const artist = this.getArtist(this.props.artistState);
        if (artist === null) {
            return null;
        }

        if (this.state.events === "LOADING") {
            return (
                <div className={"EventListWrapper__loading"}>
                    Loading events...
                </div>
            );
        }

        return (
            <EventList events={this.state.events}/>
        );
    }
}