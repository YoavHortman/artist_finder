import * as React from "react";
import "./EventList.css";
import {Artist, ArtistEventData} from "../models/Models";
import {getArtistEventsByName} from "../api/API";

export interface EventListProps {
    artist: Artist;
}

interface EventListState {
    events: ArtistEventData[] | "LOADING";
}

export class EventList extends React.Component<EventListProps, EventListState> {
    constructor(props: EventListProps) {
        super(props);
        this.state = {
            events: "LOADING"
        }
    }

    componentDidUpdate(prevProps: EventListProps) {
        this.getEventsForArtist(this.props.artist);
    }

    async getEventsForArtist(artist: Artist) {
        await getArtistEventsByName(artist.name);
    }

    render() {
        return (
            <div className={"EventList__root"}>
                {this.state.events.length === 0 ?
                    <div className={"EventList__noResults"}>
                        No results
                    </div>
                    :
                    <div>
                    </div>
                }
            </div>
        );
    }
}