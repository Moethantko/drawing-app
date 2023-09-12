import ReactDOM from "react-dom";
import App from "./App"
import { BrowserRouter } from 'react-router-dom'
import { AppContentProvider } from "./providers/AppContentProvider";

ReactDOM.render(
<BrowserRouter>
    <AppContentProvider>
        <App />
    </AppContentProvider>
</BrowserRouter>,
 document.getElementById("root"));
