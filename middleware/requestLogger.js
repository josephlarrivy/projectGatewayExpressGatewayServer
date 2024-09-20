const requestLogger = (req, res, next) => {
    const currentTime = new Date();
    const readableTime = currentTime.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });

    const body = req.body && Object.keys(req.body).length ? JSON.stringify(req.body, null, 2) : 'No body';

    console.log(' ')
    console.log('########### start request ###########')
    console.log(`${readableTime}`);
    console.log(`${req.method} "${req.url}"`);
    console.log(`Body: ${body}`);
    console.log('############ end request ############')
    console.log(' ')

    next(); // Proceed to the next middleware or route handler
};

module.exports = requestLogger;