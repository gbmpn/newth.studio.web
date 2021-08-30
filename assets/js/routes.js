import config from 'config'

/* ----------
all routes needs to be defined inline
see https://github.com/bigwheel-framework/documentation/blob/master/routes-defining.md#as-section-standard-form
---------- */
module.exports = {
	[`${config.BASE}`]: require('./sections/chanels'),
	[`${config.BASE}home`]: { section: require('./sections/chanels') },
	[`${config.BASE}about`]: { section: require('./sections/chanels') },
	[`${config.BASE}projects`]: { section: require('./sections/chanels') },
	[`${config.BASE}contact`]: { section: require('./sections/chanels') },
	[`${config.BASE}case/:id`]: { section: require('./sections/chanels'), duplicate: true },
	[`${config.BASE}section/:id`]: { section: require('./sections/section'), duplicate: true },
    [`${config.BASE}gallery`]: { section: require('./sections/gallery'), duplicate: true, routes: {
            '/:id': { section: require('./sections/sub'), duplicate: true }
        }
    }
}