import * as React from 'react';
import './App.css';
import assertNever from "assert-never";
import {Artist} from "./models/Models";
import {SearchBarWrapperBar} from "./wrappers/SearchBarWrapper";
import {EventListWrapper} from "./wrappers/EventListWrapper";
import {ArtistComponent} from "./components/ArtistComponent";

// Artist can be in a few states, explicitly state them and force the programmer to handle them
export type ArtistState = ArtistState.FoundArtist | ArtistState.NotFound | ArtistState.NoValue | ArtistState.Loading;
export namespace ArtistState {
    export interface NoValue {
        type: "NoValue";
    }

    export interface Loading {
        type: "Loading";
    }

    export interface NotFound {
        type: "NotFound";
    }

    export interface FoundArtist {
        type: "FoundArtist";
        artist: Artist;
    }
}

interface AppState {
    artistState: ArtistState;
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            artistState: {
                type: "NoValue"
            }
        };
    }

    handleArtistChange = (newState: ArtistState) => {
        this.setState({artistState: newState});
    }

    renderArtist(artistState: ArtistState) {
        switch (artistState.type) {
            case "NoValue": {
                return (
                    <div className={"App__artistSearchState"}>Search for an artist!</div>
                );
            }
            case "Loading": {
                return (
                    <div className={"App__artistSearchState"}>Loading...</div>
                );
            }
            case "NotFound": {
                return (
                    <div className={"App__artistSearchState"}>Sorry, couldn't find anything...</div>
                );
            }
            case "FoundArtist": {
                return (
                    <ArtistComponent artist={artistState.artist}/>
                )
            }
            default: {
                // This is for exhaustive checks, if we add a state to ArtistState this will not compile
                // So it'll be easy to fix all the errors caused by changing the state
                return assertNever(artistState);
            }
        }
    }

    public render() {
        return (
            <div className="App__root">
                <div className={"App__bodyContainer"}>
                    <SearchBarWrapperBar onArtistStateChange={this.handleArtistChange}/>
                    {this.renderArtist(this.state.artistState)}
                    <EventListWrapper artistState={this.state.artistState}/>
                </div>
            </div>
        );
    }
}

export default App;
