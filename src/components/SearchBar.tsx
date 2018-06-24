import * as React from "react";
import "./SearchBar.css";

export interface DateQuery {
    from: string;
    to: string;
}

export interface SearchBarProps {
    onSearchQueryChange: (query: string | null) => void;
    onDatesChange: (dates: DateQuery | null) => void;

    // onOrderByChange: (val: "RATING" | "PRICE") => void;

    searchQuery: string | null;
    dateQuery: DateQuery | null;
    // orderBy: "RATING" | "PRICE"
}

export interface SearchBarState {
    showAdvancedOptions: boolean;
}


export class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    constructor(props: SearchBarProps) {
        super(props);
        this.state = {
            showAdvancedOptions: props.dateQuery !== null
        }
    }

    toggleAdvancedOptions = () => {
        this.setState((prevState) => {
            return {
                showAdvancedOptions: !prevState.showAdvancedOptions
            }
        })
    }

    handleTextChange(newVal: string) {
        let toSet: string | null = newVal;
        if (newVal.length === 0) {
            toSet = null;
        }

        this.props.onSearchQueryChange(toSet);
    }

    handleFromChange(newVal: string) {
        if (newVal.length === 0) {
            this.props.onDatesChange(null)
        } else if (this.props.dateQuery === null) {
            this.props.onDatesChange({ from: newVal, to: newVal })
        } else {
            this.props.onDatesChange({ from: newVal, to: this.props.dateQuery.to })
        }
    }

    handleToChange(newVal: string) {
        if (newVal.length === 0) {
            this.props.onDatesChange(null)
        } else if (this.props.dateQuery === null) {
            this.props.onDatesChange({ from: newVal, to: newVal })
        } else {
            this.props.onDatesChange({ from: this.props.dateQuery.from, to: newVal })
        }
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
                <div
                    className={"SearchBar__advancedOptionsButton " + (this.state.showAdvancedOptions ? "SearchBar__advancedOptionsButtonOpen" : "")}
                    onClick={this.toggleAdvancedOptions}
                >
                    {this.state.showAdvancedOptions ? "Hide" : "Show"} advanced options
                </div>
                {
                    this.state.showAdvancedOptions ?
                        <div className={"SearchBar__advancedOptionsContainer"}>
                            <div>
                                From:
                                <input
                                    type={"date"}
                                    value={this.props.dateQuery === null ? "" : this.props.dateQuery.from}
                                    max={this.props.dateQuery === null ? "" : this.props.dateQuery.to}
                                    onChange={(e) => this.handleFromChange(e.target.value)}
                                />
                            </div>
                            <div> To:
                                <input
                                    type={"date"}
                                    value={this.props.dateQuery === null ? "" : this.props.dateQuery.to}
                                    onChange={(e) => this.handleToChange(e.target.value)}
                                    min={this.props.dateQuery === null ? "" : this.props.dateQuery.from}
                                />
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}