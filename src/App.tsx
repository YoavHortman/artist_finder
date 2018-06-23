import * as React from 'react';
import './App.css';
import {Artist} from "./models/Models";
import {SearchBarWrapperBar} from "./wrappers/SearchBarWrapper";

// Artist can be in a few states, explicitly state them and force the programmer to handle them
export type ArtistState = Artist | "NO_VALUE" | "LOADING" | "NOT_FOUND";

interface AppState {
    artist: ArtistState;
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            artist: "NO_VALUE",
        };
    }

    handleArtistChange = (newState: ArtistState) => {
        this.setState({artist: newState});
    }

    renderArtist(artist: ArtistState) {
        switch (artist) {
            case "NO_VALUE": {
                return "Search something";
            }
            case "LOADING": {
                return "Loading";
            }
            case "NOT_FOUND": {
                return "No results";
            }
            default: {
                return artist.facebookUrl;
            }
        }
    }

    public render() {
        return (
            <div className="App__root">
                <div className={"App__bodyContainer"}>
                    <SearchBarWrapperBar onArtistStateChange={this.handleArtistChange}/>
                    {this.renderArtist(this.state.artist)}
                </div>
            </div>
        );
    }
}

export default App;
