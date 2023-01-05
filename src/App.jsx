import React, {lazy, Suspense} from 'react';
import useWindowDimensions from "./hooks/useWindowDimensions";
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from "stylis";
import "./styles.css";

const myCache = createCache({
    key: 'simple',
    stylesPlugins: [
        prefixer
    ],
})
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'))

const App = () => {
    const {width, height} = useWindowDimensions();
    return (
        <CacheProvider value={myCache}>
            <Suspense fallback={''}>
                <Dashboard width={width} height={height}/>
            </Suspense>
        </CacheProvider>
    )};
export default App;
