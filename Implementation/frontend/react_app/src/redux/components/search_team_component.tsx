import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SearchTeamComponentProps } from '../../data/component_props';
import i18next from 'i18next';

export default function SearchTeamComponent({searchItems,selectedValue,handleAutoCompleteChange } : SearchTeamComponentProps) {

  const sortedOptions = [...searchItems].sort((a, b) =>
    -b.objectType.localeCompare(a.objectType)
  );

  return (
      <Autocomplete
        id="grouped-demo"
        disablePortal
        options={sortedOptions}
        groupBy={(option) => option.objectType}
        getOptionLabel={(option) => option.displayName}
        onChange={handleAutoCompleteChange}
        value={selectedValue}
        renderInput={(params) => (
          <div style={{ display: 'flex' }}>
            <TextField {...params} label={i18next.t("teams.searchTeam")} />
          </div>
        )}
      />
  );
}
