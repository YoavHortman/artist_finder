import * as React from "react";
import "./SearchBar.css";

export interface SearchBarProps {
    onSearchQueryChange: (query: string | null) => void;
    // onOrderByChange: (val: "RATING" | "PRICE") => void;

    searchQuery: string | null;
    // orderBy: "RATING" | "PRICE"
}

export class SearchBar extends React.Component<SearchBarProps, {}> {
    constructor(props: SearchBarProps) {
        super(props);
    }

    handleTextChange(newVal: string) {
        let toSet: string | null = newVal;
        if (newVal.length === 0) {
            toSet = null;
        }

        this.props.onSearchQueryChange(toSet);
    }

    render() {
        return (
            <div className={"SearchBar__root"}>
                <input
                    type={"text"}
                    onChange={(e) => this.handleTextChange(e.target.value)}
                    value={this.props.searchQuery === null ? "" : this.props.searchQuery}
                    placeholder={"Artist name, EG: Maroon 5"}
                    className={"SearchBar__input"}
                />
            </div>
        );
    }
}