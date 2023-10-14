import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SearchResourceComponentProps } from '../../data/component_props';
import i18next from 'i18next';

export default function SearchResourceComponent({searchItems,selectedValues,searchButtonConfiguration,handleAutoCompleteChange } : SearchResourceComponentProps) {

  const sortedOptions = [...searchItems].sort((a, b) =>
    -b.objectType.localeCompare(a.objectType)
  );
  return (
      <Autocomplete
        id="grouped-demo"
        multiple
        options={sortedOptions}
        groupBy={(option) => option.objectType}
        getOptionLabel={(option) => option.displayName}
        onChange={handleAutoCompleteChange}
        value={selectedValues}
        renderInput={(params) => (
          <div style={{ display: 'flex' }}>
            <TextField {...params} label={i18next.t('resources.searchResource')} />
             {searchButtonConfiguration.isEnabled && (
                searchButtonConfiguration.searchButtonComponent
            )}
          </div>
        )}
      />
  );
}
