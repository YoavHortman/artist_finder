import * as React from "react";
import {Artist} from "../models/Models";
import "./ArtistComponent.css";

export interface ArtistComponentProps {
    artist: Artist;
}

export class ArtistComponent extends React.Component<ArtistComponentProps, {}> {
    constructor(props: ArtistComponentProps) {
        super(props);
    }

    render() {
        return (
            <div className={"ArtistComponent__root"}>
                <div
                    className={"ArtistComponent__artistPhoto"}
                    style={{
                        background: `url(${this.props.artist.photoUrl})`
                    }}
                />
                {this.props.artist.name}
            </div>
        );
    }
}