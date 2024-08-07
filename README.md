# ReactNativeRaptorsApp

## Overview

The **ReactNativeRaptorsApp** is a mobile application developed using React Native. This application allows users to view and manage information about Toronto Raptors players. The app includes features such as viewing player details, adding new players, and updating player information.

## Features

- **View Players**: Browse through the list of Toronto Raptors players.
- **Add New Players**: Add information about new players to the app.
- **Update Player Information**: Modify existing player details.

## File Structure

### `app` Directory

- **`_layout.js`**: Contains the layout configuration for the application.
- **`addPlayer.js`**: Implements the functionality to add a new player.
- **`index.js`**: The main entry point of the application.
- **`update.js`**: Provides the functionality to update player information.

### `assets` Directory

- Contains various assets such as images and JSON data files.
  - **Images**: `adaptive-icon.png`, `favicon.png`, `icon.png`, `mattthomas.jpg`, `raptorsArena.jpg`, `rhj.jpg`, `splash.png`, `t2.jpg`, `titanic.jpg`, `yutaw.jpg`
  - **JSON Files**: `movies.json`, `players.json` (used for storing player data and other related information)

### `components` Directory

- **`button.js`**: Custom button component used throughout the app.
- **`navbar.js`**: Navigation bar component for the app.
- **`player.js`**: Component to display player details.
- **`PlayerContext.js`**: Context API implementation to manage player data state across the app.

## Setup and Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/jmwoodrow33/ReactNativeRaptorsApp.git
    cd ReactNativeRaptorsApp
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the application**:
    ```bash
    npm start
    ```

## Usage

- **Viewing Players**: On the main screen, users can view the list of all players.
- **Adding a Player**: Navigate to the add player screen to input and save new player information.
- **Updating a Player**: Select a player and navigate to the update screen to modify their details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

