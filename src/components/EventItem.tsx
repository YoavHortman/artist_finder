import * as React from "react";
import "./EventItem.css";
import {ArtistEventData} from "../models/Models";
import {openExternalUrl} from "../ExternalLinks";

export interface EventItemProps {
    event: ArtistEventData;
}

interface EventItemState {
    showSpecialOffers: boolean;
}

export class EventItem extends React.Component<EventItemProps, EventItemState> {
    constructor(props: EventItemProps) {
        super(props);
        this.state = {
            showSpecialOffers: false
        }
    }

    getFormattedDateText(date: Date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    toggleMoreDetails = () => {
        this.setState((prevState: EventItemState) => {
            return {
                showSpecialOffers: !prevState.showSpecialOffers
            };
        })
    }

    render() {
        return (
            <div className={"EventItem__root"}>
                <div>
                    <div className={"EventItem__locationContainer"}><span
                        className={"EventItem__label EvenItem_venueLabel"}>Venue: </span>{this.props.event.venue.name}
                        <span className={"EventItem__date"}>
                            {this.getFormattedDateText(this.props.event.dateTime)}
                        </span>
                    </div>
                    <div><span className={"EventItem__label"}>In: </span>{this.props.event.venue.city}, {this.props.event.venue.country}
                    </div>
                    {this.props.event.offers.length === 0 ?
                        null
                        :
                        <div>
                            <div
                                className={"EventItem__moreDetails " + (this.state.showSpecialOffers ? "EventItem__moreDetailsOpen" : "")}
                                onClick={this.toggleMoreDetails}>
                                {this.state.showSpecialOffers ? "Hide" : "Show"} special offers
                            </div>
                            {this.state.showSpecialOffers ? this.renderSpecialOffers() : null}
                        </div>
                    }
                </div>
            </div>
        );
    }

    renderSpecialOffers() {
        return (
            <div>
                {this.props.event.offers.map((offer, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => openExternalUrl(offer.url)}
                            className={"EventItem__specialOffer"}
                        >
                            <div>Offer {index + 1} - {offer.status}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}