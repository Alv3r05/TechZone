import { Grid, Typography } from "@mui/material";

import ProductCard from "./ProductCard";
import Loading from "../../../components/ui/Loading";
import EmptyState from "../../../components/ui/EmptyState";

import type { Product } from "../../../types/product";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  error?: string;
}

const ProductGrid = ({
  products,
  loading = false,
  error = "",
}: ProductGridProps): React.ReactElement => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No results"
        message="No products were found for the selected filters."
      />
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid
          key={product.id}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
