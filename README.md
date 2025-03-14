# NodeJS CSV Toolkit

A powerful command-line tool for working with CSV files, providing comprehensive data manipulation and visualization capabilities.

## Features

- 📊 CSV file parsing and manipulation
- 🔍 CRUD operations on CSV data
- 📈 Data visualization with ASCII charts
- 💾 Data persistence and file management
- 🔄 In-memory data sorting
- 🎯 Interactive command-line interface
- ✅ Unit testing support

## Installation

1. Clone the repository:
```bash
git clone https://github.com/serge-mugisha/NodeJS-CSV-Toolkit.git
```

2. Navigate to the project directory:
```bash
cd NodeJS-CSV-Toolkit
```

3. Install dependencies:
```bash
npm install
```

## Usage

Start the application:
```bash
npm start
```

The interactive menu system will guide you through the following operations:

- Load CSV data from file
- View records (single or multiple)
- Create new records
- Update existing records
- Delete records
- Sort data based on specific columns
- Generate visualizations
- Save data to new CSV file

## Testing

Run the test suite:
```bash
npm test
```

## Documentation

Generate JSDoc documentation:
```bash
npm run doc
```

## Dependencies

- `csv-parse`: CSV parsing
- `csv-stringify`: CSV generation
- `asciichart` & `ervy`: Terminal-based data visualization
- `prompt`: Interactive CLI interface
- `nodemon`: Development server
- `jasmine`: Testing framework
- `jsdoc`: Documentation generation

## Project Structure

```
NodeJS-CSV-Toolkit/
├── src/
│   ├── controllers/    # Business logic
│   ├── models/        # Data models
│   ├── views/         # User interface
│   └── app.js         # Application entry point
├── spec/              # Test files
├── out/              # Generated documentation
└── package.json      # Project configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

Serge Mugisha

## Issues and Support

Please report any issues or bugs on the [GitHub issues page](https://github.com/serge-mugisha/NodeJS-CSV-Toolkit/issues). 