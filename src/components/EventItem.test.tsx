import * as React from "react";
import * as renderer from "react-test-renderer";
import { EventItem } from "./EventItem";

it('Should render an event item with no offers', () => {
    const tree = renderer
        .create(
            <EventItem
                event={{
                    id: "1",
                    artistId: "1",
                    url: "url",
                    onSaleDatetime: new Date(2012, 1, 1),
                    dateTime: new Date(2012, 1, 1),
                    description: "Hello",
                    venue: {
                        name: "Venue",
                        geo: { lat: 1, lng: 1 },
                        city: "Berlin",
                        region: "Region",
                        country: "Country"
                    },
                    offers: [],
                    lineup: ["1", "2"]
                }}
            />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Should render an event item with offers', () => {
    const tree = renderer
        .create(
            <EventItem
                event={{
                    id: "1",
                    artistId: "1",
                    url: "url",
                    onSaleDatetime: new Date(2012, 1, 1),
                    dateTime: new Date(2012, 1, 1),
                    description: "Hello",
                    venue: {
                        name: "Venue",
                        geo: { lat: 1, lng: 1 },
                        city: "Berlin",
                        region: "Region",
                        country: "Country"
                    },
                    offers: [
                        {
                            type: "offer",
                            status: "Active",
                            url: "hello.com"
                        },
                        {
                            type: "offer",
                            status: "Active",
                            url: "hello.com"
                        }
                    ],
                    lineup: ["1", "2"]
                }}
            />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
