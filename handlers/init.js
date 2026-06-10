const { db } = require('../handlers/db.js');
const config = require('../config.json');
const { v4: uuidv4 } = require('uuid');
const CatLoggr = require('cat-loggr');
const log = new CatLoggr();

async function init() {
    const skyport = await db.get('ogactyl_instance');
    if (!skyport) {
        log.init('this is probably your first time starting ogactyl, welcome!');
        log.init('you can find documentation for the panel at github.com/ogactyl');

        let imageCheck = await db.get('images');
        if (!imageCheck) {
            log.error('before starting ogactyl for the first time, you didn\'t run the seed command!');
            log.error('please run: npm run seed');
            log.error('if you didn\'t do it already, make a user for yourself: npm run createUser');
            process.exit();
        }

        let ogactylId = uuidv4();
        let setupTime = Date.now();
        
        let info = {
            ogactylId: ogactylId,
            setupTime: setupTime,
            originalVersion: config.version
        }

        await db.set('ogactyl_instance', info)
        log.info('initialized ogactyl panel with id: ' + ogactylId)
    }        

    log.info('init complete!')
}

module.exports = { init }