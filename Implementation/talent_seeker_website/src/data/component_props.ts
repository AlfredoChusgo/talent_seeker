import { AutocompleteChangeReason } from "@mui/material/Autocomplete";
import { ResourceItem, SearchHomeItem, SearchItem, TeamItem } from "./models";

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

export interface SearchTeamComponentProps {
    searchItems : SearchItem[];    
    selectedValue : SearchItem | null;
    handleAutoCompleteChange : (event: any, value: SearchItem | null, reason : AutocompleteChangeReason) => void;
}

export interface TeamDetailComponentProps{
    team : TeamItem;
}