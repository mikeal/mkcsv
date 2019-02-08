const { createObjectCsvStringifier } = require('csv-writer')

const uniqueKeys = arr => {
  let keys = new Set()
  for (let obj of arr) {
    Object.keys(obj).forEach(key => keys.add(key))
  }
  return Array.from(keys)
}

const mkcsv = records => {
  let keys = uniqueKeys(records)
  for (let record of records) {
    for (let key of keys) {
      if (!record[key]) record[key] = 0
    }
  }
  let header = []
  for (let key of Object.keys(records[0])) {
    header.push({id: key, title: key.toUpperCase()})
  }

  const csvStringifier = createObjectCsvStringifier({header})
  return [
    csvStringifier.getHeaderString(),
    csvStringifier.stringifyRecords(records)
  ].join('')
}

module.exports = mkcsv

