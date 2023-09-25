import { AutocompleteChangeReason } from "@mui/material/Autocomplete";
import { ResourceItem, SearchHomeItem, SearchItem, TeamItem } from "./models";

export interface ResourceListComponentProps{
    resourcesItems : ResourceItem[];
    infoButtonConfiguration : ResourceInfoButtonConfiguration;
    addButtonConfiguration : AddResourceToTeamButtonConfiguration;
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

export interface ResourceInfoButtonConfiguration {
    isEnabled : boolean;    
    action : (resourceId:ResourceItem)=>void;
}

export interface AddResourceToTeamButtonConfiguration {
    isEnabled : boolean;    
    action : (resourceId:string)=>void;
}

export interface SearchTeamComponentProps {
    searchItems : SearchItem[];    
    selectedValue : SearchItem | null;
    handleAutoCompleteChange : (event: any, value: SearchItem | null, reason : AutocompleteChangeReason) => void;
}

export interface TeamDetailComponentProps{
    team : TeamItem;
}

export interface AddTeamDialogProps {
    open: boolean;
    setOpen : (value:boolean)=> void;
    selectedValue: string;
    setSelectedValue : (newValue : string) => void; 
    onSave: (value: string) => void;
  }
  