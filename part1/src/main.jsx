import ReactDom from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';

ReactDom.createRoot(document.getElementById('root'))
.render(
<StrictMode>
    <App/>
</StrictMode>)