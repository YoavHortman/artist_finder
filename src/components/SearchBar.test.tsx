import * as React from "react";
import * as renderer from "react-test-renderer";
import { SearchBar } from "./SearchBar";

it('Should render empty search bar and advanced search should be closed', () => {
    const tree = renderer
        .create(
            <SearchBar
                dateQuery={null}
                searchQuery={null}
                onDatesChange={() => {}}
                onSearchQueryChange={() => {}}
            />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Should render empty search bar and advanced search should be open', () => {
    const tree = renderer
        .create(
            <SearchBar
                dateQuery={{from: "12-12-2012", to: "12-12-2012"}}
                searchQuery={null}
                onDatesChange={() => {}}
                onSearchQueryChange={() => {}}
            />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Should render full search bar and advanced search should be closed', () => {
    const tree = renderer
        .create(
            <SearchBar
                dateQuery={null}
                searchQuery={"A query"}
                onDatesChange={() => {}}
                onSearchQueryChange={() => {}}
            />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Should render full search bar and advanced search should be open', () => {
    const tree = renderer
        .create(
            <SearchBar
                dateQuery={{from: "12-12-2012", to: "12-12-2012"}}
                searchQuery={"A query"}
                onDatesChange={() => {}}
                onSearchQueryChange={() => {}}
            />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});