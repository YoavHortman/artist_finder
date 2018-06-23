import * as React from "react";
import {Artist} from "../models/Models";
import "./ArtistComponent.css";
import {openExternalUrl} from "../ExternalLinks";

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
                <div className={"ArtistComponent__titleContainer"}>
                    <div className={"ArtistComponent__titleContainer"}>
                        <div
                            className={"ArtistComponent__artistPhoto"}
                            style={{
                                background: `url(${this.props.artist.thumbUrl})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain"
                            }}
                        />
                        <div className={"ArtistComponent__artistName"}>{this.props.artist.name}</div>
                    </div>
                    <div
                        className={"ArtistComponent__facebookIcon"}
                        onClick={() => openExternalUrl(this.props.artist.facebookUrl)}
                    />
                </div>
            </div>
        );
    }
}