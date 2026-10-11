import { Box, TextField, InputAdornment, IconButton } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const ProductSearch = ({
  value,
  onChange,
}: ProductSearchProps): React.ReactElement => {
  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        fullWidth
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products..."
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: value && (
              <InputAdornment position="end">
                <IconButton onClick={() => onChange("")} edge="end">
                  ✕
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default ProductSearch;
