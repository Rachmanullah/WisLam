import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import Router from './src/navigation/Router';
import { GlobalStateProvider } from './src/context/GlobalStateProvider';
import { EventRegister } from 'react-native-event-listeners';
import ThemeContext from './src/context/GlobalStateProvider';
import colors from './src/theme/colors';

export default function App() {
    const [mode, SetMode] = useState(false)
    useEffect(() => {
        let eventListener = EventRegister.addEventListener(
            "changeTheme",
            (data) => {
                SetMode(data)
            }
        )
        return () => {
            EventRegister.removeEventListener(eventListener)
        }
    })
    return (
        <ThemeContext.Provider value={mode === true ? colors.darkMode : colors.lightMode}>
            <GlobalStateProvider>
                <NavigationContainer theme={mode === true ? DarkTheme : DefaultTheme}>
                    <Router />
                </NavigationContainer>
            </GlobalStateProvider>
        </ThemeContext.Provider>
    );
}