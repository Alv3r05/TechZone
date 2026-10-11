import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

export type SortOption = "relevance" | "price-low" | "price-high" | "name";

interface ProductSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const ProductSort = ({
  value,
  onChange,
}: ProductSortProps): React.ReactElement => {
  const handleChange = (event: SelectChangeEvent<SortOption>): void => {
    onChange(event.target.value as SortOption);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 220 }}>
      <InputLabel>Sort by</InputLabel>

      <Select value={value} label="Sort by" onChange={handleChange}>
        <MenuItem value="relevance">Relevance</MenuItem>

        <MenuItem value="price-low">Price: low to high</MenuItem>

        <MenuItem value="price-high">Price: high to low</MenuItem>

        <MenuItem value="name">Name</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ProductSort;
