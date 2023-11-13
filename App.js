// import * as React from 'react';
// import { FavoriteScreen, HomeScreen, ProfileScreen, SearchScreen, DetailTrip } from './src/screens';
// export default function App() {
//     return <DetailTrip />;
// };

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigation/Router';
import { GlobalStateProvider } from './src/context/GlobalStateProvider';
export default function App() {
    return (
        <GlobalStateProvider>
            <NavigationContainer>
                <Router />
            </NavigationContainer>
        </GlobalStateProvider>
    );
}