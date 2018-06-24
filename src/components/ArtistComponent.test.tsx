import * as React from "react";
import * as renderer from "react-test-renderer";
import { ArtistComponent } from "./ArtistComponent";

it('Should render an artist correctly', () => {
    const tree = renderer
        .create(
            <ArtistComponent
                artist={{
                    id: 1,
                    name: "Yoav Hortman",
                    url: "url",
                    photoUrl: "url",
                    thumbUrl: "url",
                    facebookUrl: "https://www.facebook.com/yoav.hortman",
                    mbid: "1",
                    tracker_counter: 123,
                    upcomingEventCount: 123
                }}
            />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
