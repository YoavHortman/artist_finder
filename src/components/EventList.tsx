import * as React from "react";
import "./EventList.css";
import {ArtistEventData} from "../models/Models";

export interface EventListProps {
    events: ArtistEventData[];
}

export class EventList extends React.Component<EventListProps, {}> {
    constructor(props: EventListProps) {
        super(props);
        this.state = {
            events: "LOADING"
        };
    }

    render() {
        return (
            <div className={"EventList__root"}>
                {this.props.events.length === 0 ?
                    <div className={"EventList__noResults"}>
                        No upcoming events
                    </div>
                    :
                    <div>
                        {this.props.events.map((event, index) => {
                            return <div key={index}>{event.lineup}</div>;
                        })}
                    </div>
                }
            </div>
        );
    }
}