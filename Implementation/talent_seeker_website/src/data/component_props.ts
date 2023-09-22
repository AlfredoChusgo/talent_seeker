import { ResourceItem, SearchHomeItem } from "./models";

export interface ResourceListComponentProps{
    resourcesItems : ResourceItem[];
}

export interface SearchResourceComponentProps {
    searchItems : SearchHomeItem[];
    searchButtonConfiguration : SearchButtonConfiguration;
    selectedValues : SearchHomeItem[];
    handleAutoCompleteChange : (event: any, newValue: SearchHomeItem[]) => void;
}

export interface SearchButtonConfiguration {
    isEnabled : boolean;
    searchButtonComponent : React.ReactNode;
}