const { useContext, createContext, useState } = require("react");

//1. Create Context in a file with Provider component, which provides context to parent file
//Eg - Parent file - ChildA, Consumer file - ChildC
const ThemeContext = createContext();

const ThemeProvider = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }

    const value = {
        theme,
        toggleTheme
    }

    return (
        <ThemeContext.Provider value={value} >
            <ChildA />
        </ThemeContext.Provider>
    );
}
export default ThemeProvider;

//Consumer file
//suppose ChildC is called in ChildB which is called in ChildA

//ChildC :-
const ThemedButton = () => {
    const {theme, toggleTheme} = useContext(ThemeContext); //using the context - import context file and use useContext hook

    return (
        <button onClick={toggleTheme}>
            Current Theme: {theme}
        </button>
    )
}