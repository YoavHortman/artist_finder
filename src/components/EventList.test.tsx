import * as React from "react";
import * as renderer from "react-test-renderer";
import { EventList } from "./EventList";

it('Should render empty event list error', () => {
    const tree = renderer
        .create(
            <EventList
                events={[]}
            />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Should render a list of events', () => {
    const tree = renderer
        .create(
            <EventList
                events={[
                    {
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
                    },
                    {
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
                    }
                ]}
            />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
