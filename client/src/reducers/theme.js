const theme = (theme="dark",action) => {
    switch (action.type) {
        case "CHANGE_MODE":
            return theme === "light" ? "dark" : "light"
        default:
            return theme
    }
}

export default theme;