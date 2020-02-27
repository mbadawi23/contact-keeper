const PORT = process.env.PORT || 7878;

// the following line brings in `express`. This syntax called common js.
// This is different from REACT which uses ES7 or something like that.
const express = require('express');

const app = express();

app.listen(PORT, () => console.log(`Server started listening on port ${PORT}`));
