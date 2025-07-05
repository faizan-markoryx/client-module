
const createClient = require('./createClient')
const updateClient = require('./updateClient')
const deleteClient = require('./deleteClient')
const allInOneClientSearch = require('./allInOneClientSearch')
const getClients = require('./getClients')
const importClient = require('./importClient')
const upload = require('./uplode')
const { trimInput } = require('../contact/trimInput')


module.exports = {
    createClient,
    updateClient,
    deleteClient,
    allInOneClientSearch,
    upload,
    getClients,
    importClient,
    trimInput
}
