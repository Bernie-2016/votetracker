import fs from 'fs-extra';

fs.copy('src/index.html', 'public/index.html');
fs.copy('src/fixtures/test-data.json', 'public/fixtures/test-data.json');
