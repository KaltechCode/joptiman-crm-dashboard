import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import './style.scss'
import { useEffect } from 'react';

export default function PoliciesDropdown(props) {
 
 
  const [value, setValue] = React.useState(null);

  const handleAutocompleteChange = (event,newValue)=>{
   setValue(newValue)
   props.onSelectValue(newValue)  
  }

  useEffect(() => {
    console.log("props.value",props.value); 
   
  }, [])
  

  return (
    <Stack spacing={1} sx={{ width:props.label === 'Agent Title:' ? 225 : 293, marginLeft: '22px' }} className="Policy-textfield">
      <Autocomplete
      // className="Policy-textfield"
        // {...defaultProps}
        // {...props.options}
        options={props.options}
        onChange={handleAutocompleteChange}
        id="select-on-focus"
        renderInput={(params) => (
          <TextField {...params} value={props.value} label={props.label} variant={props.origin === "approvePolicy" ? "outlined" : "filled"} />
        )}
      />
    </Stack>
  );
}
