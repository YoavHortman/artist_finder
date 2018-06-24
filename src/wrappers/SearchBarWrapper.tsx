import * as React from "react";
import {ArtistState} from "../App";
import {SearchBar} from "../components/SearchBar";
import {getArtistInfoByName} from "../api/API";

const LOCAL_STORAGE_LAST_SEARCH_KEY = "last_search";


export interface SearchBarWrapperProps {
    onArtistStateChange: (newState: ArtistState) => void;
}

export interface SearchBarWrapperState {
    searchQuery: string | null;
}

export class SearchBarWrapperBar extends React.Component<SearchBarWrapperProps, SearchBarWrapperState> {
    constructor(props: SearchBarWrapperProps) {
        super(props);

        const lastSearch = localStorage.getItem(LOCAL_STORAGE_LAST_SEARCH_KEY);

        this.state = {
            searchQuery: lastSearch
        };

        if (lastSearch !== null) {
            this.getArtist(lastSearch);
        }
    }

    private requestDebounce: NodeJS.Timer;

    handleSearchQueryChange = (newVal: string | null) => {
        clearTimeout(this.requestDebounce);

        this.setState({searchQuery: newVal});
        this.props.onArtistStateChange({type: "Loading"});

        if (newVal === null) {
            localStorage.removeItem(LOCAL_STORAGE_LAST_SEARCH_KEY);
            this.props.onArtistStateChange({type: "NoValue"});
        } else {
            this.requestDebounce = setTimeout(() => {
                this.getArtist(newVal);
            }, 250);
        }
    }

    async getArtist(name: string) {
        localStorage.setItem(LOCAL_STORAGE_LAST_SEARCH_KEY, name);
        const artist = await getArtistInfoByName(name);
        this.props.onArtistStateChange(artist);
    }

    render() {
        return (
            <SearchBar
                onSearchQueryChange={this.handleSearchQueryChange}
                searchQuery={this.state.searchQuery}
            />
        );
    }
}