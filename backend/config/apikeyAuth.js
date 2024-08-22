const bcrypt = require('bcrypt');

async function authenticateApikey(providedKey, storageApikey) {
    const compareApikey = await bcrypt.compareSync(providedKey, storageApikey);
    return compareApikey;
};

module.exports = authenticateApikey;