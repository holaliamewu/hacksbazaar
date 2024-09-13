

// set() : for saving data to a specific reference, replacing any existing data at that path.

// onValue() : for observing events and viewing static snapshots.

// get() : used when accessing data only once.

// once() : used when accessing data once with an observer.

export const getTimeAgo = (timestamp) => {
    const now = new Date();
    const postedDate = new Date(timestamp);
    const secondsAgo = Math.floor((now - postedDate) / 1000);

    if (secondsAgo < 60) {
        return `${secondsAgo} sec${secondsAgo !== 1 ? 's' : ''} ago`;
    }

    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
        return `${minutesAgo} min${minutesAgo !== 1 ? 's' : ''} ago`;
    }

    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
        return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
    }

    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 30) {
        return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
    }

    const monthsAgo = Math.floor(daysAgo / 30);
    if (monthsAgo < 12) {
        return `${monthsAgo} month${monthsAgo !== 1 ? 's' : ''} ago`;
    }

    const yearsAgo = Math.floor(monthsAgo / 12);
    return `${yearsAgo} year${yearsAgo !== 1 ? 's' : ''} ago`;
}; 