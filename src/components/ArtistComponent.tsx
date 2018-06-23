import * as React from "react";
import {Artist} from "../models/Models";

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

            </div>
        );
    }
}