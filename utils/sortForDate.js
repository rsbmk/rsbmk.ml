export const sortDate = array => array.sort((a, b) => (a.attributes.date < b.attributes.date ? 1 : -1))
