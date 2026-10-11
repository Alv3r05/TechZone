import { BrowserRouter } from "react-router-dom";

import RouteLoader from "./components/ui/RouteLoader";
import AppRoutes from "./routes/AppRoutes";

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <RouteLoader>
        <AppRoutes />
      </RouteLoader>
    </BrowserRouter>
  );
};

export default App;
