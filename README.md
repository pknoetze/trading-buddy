# Trading Buddy - Professional Trading Journal Application

![Trading Buddy Screenshot](https://via.placeholder.com/800x400.png?text=Trading+Buddy+Screenshot)

Trading Buddy is a professional trading journal application designed to help traders track, analyze, and optimize their trading performance. Built with modern web technologies, it provides a clean and intuitive interface for managing trades and analyzing performance metrics.

## Features

### Trade Management
- **Add New Trades**: Easily add new trades with all relevant details
- **Edit Existing Trades**: Modify trade details as needed
- **Delete Trades**: Remove unwanted or incorrect trades
- **Trade Details**:
  - Instrument (DE40, F40, STOXX50)
  - Entry/Exit Date & Time
  - Entry/Exit Price
  - Trade Direction (Long/Short)
  - Stake Amount
  - Fees
  - Automatic Profit/Loss Calculation

### Performance Analytics
- **Key Metrics**:
  - Win Rate
  - Average Profit
  - Average Loss
  - Expectancy
  - Accumulative P/L
  - Risk/Reward Ratio
- **Real-time Updates**: Metrics update instantly as trades are added or modified
- **Color-coded Indicators**: Quick visual feedback on performance

### User Interface
- **Modern Design**: Clean and professional interface
- **Responsive Layout**: Works on both desktop and mobile devices
- **Dark/Light Mode**: Choose your preferred theme
- **Interactive Charts**: Visualize performance trends
- **Modal Dialogs**: Smooth transitions for adding/editing trades

## Technologies Used

### Frontend
- **React**: Component-based UI development
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Beautiful SVG icons
- **Vite**: Fast development build tool

### Data Management
- **Context API**: State management for trades and settings
- **Local Storage**: Persistent data storage
- **Date-fns**: Date formatting and manipulation

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/trading-buddy.git
   ```
2. Navigate to the project directory:
   ```bash
   cd trading-buddy
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Building for Production
To create a production build:
```bash
npm run build
```

### Running Tests
To run unit tests:
```bash
npm test
```

To generate test coverage report:
```bash
npm run coverage
```

## Usage

### Adding a New Trade
1. Click the "Add New Trade" button
2. Fill out the trade details in the modal dialog
3. Click "Add Trade" to save

### Editing a Trade
1. Click the "Edit" button next to the trade in the history table
2. Modify the trade details in the modal dialog
3. Click "Update Trade" to save changes

### Deleting a Trade
1. Click the "Remove" button next to the trade in the history table
2. Confirm the deletion

### Viewing Analytics
- The dashboard automatically updates with key performance metrics
- Use the dark/light mode toggle in the navigation bar to switch themes

## Data Management
- All trade data is stored in the browser's local storage
- Data persists across page refreshes
- To clear all data, use your browser's developer tools to clear local storage

## Future Enhancements
- [ ] Export/Import trade data
- [ ] CSV export functionality
- [ ] Advanced charting and visualization
- [ ] Multi-user support with authentication
- [ ] Cloud sync and backup

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch for your feature/bugfix
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Inspired by professional trading journals
- Built with the help of the React and Tailwind CSS communities
- Special thanks to all open-source contributors

## Contact
For questions or feedback, please contact:
- [Your Name] - [your.email@example.com]
- Project Link: [https://github.com/yourusername/trading-buddy](https://github.com/yourusername/trading-buddy)
