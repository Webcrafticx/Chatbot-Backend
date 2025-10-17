const {customAlphabet} = require('nanoid')
const nano = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6);

const slugify = (companyName) => {
    if(!companyName) return nano();
    const base = companyName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return `${base}-${nano()}`;
}

module.exports = slugify;