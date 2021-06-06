// The dates of arrival and departure of each guest are given. For each guest,
// the check-in date is strictly earlier than the check-out date (that is,
// every guest stays at least one night). Within one day, it is considered,
// that first old guests leave, and then new ones enter. Find the maximum number
// of guests who simultaneously lived in the hotel (we assume that the measurement of the number of guests occurs at the end of the day).
// sample = [(1, 2), (1, 3), (2, 4), (2, 3)]
import assert from 'assert';

class GuestStay {
    constructor(arrivalDate, departureDate) {
        this.arrivalDate = arrivalDate;
        this.departureDate = departureDate;
    }

    getArrivalDate() {
        return this.arrivalDate;
    }

    getDepartureDate() {
        return this.departureDate;
    }
}

const getDateWithMaxGuests = () => {
    var occurrenceMap = sampleGuests.reduce((map, guestStay) => {
        const arrivalDate = guestStay.getArrivalDate();
        const departureDate = guestStay.getDepartureDate();

        map.set(arrivalDate, getIncreasedOccurenceCount(map, arrivalDate));
        map.set(departureDate, getIncreasedOccurenceCount(map, departureDate));

        return map;
    }, new Map());

    return getDateWithMaxGuestsFromOccurenceMap(occurrenceMap);
}

const getIncreasedOccurenceCount = (occurrenceMap, date) => {
    const occurrenceCount = occurrenceMap.get(date);

    return !occurrenceCount ? 1 : occurrenceCount + 1;
}

// will get the last out of dates with equal max guests number
const getDateWithMaxGuestsFromOccurenceMap = (occurrenceMap) => {
    let dateWithMaxGuests = null;
    let maxGuestsPerDay = 0;

    for (let [date, occurrenceCount] of occurrenceMap) {
        if (occurrenceCount > maxGuestsPerDay) {
            dateWithMaxGuests = date;
            maxGuestsPerDay = occurrenceCount;
        }
    }

    return dateWithMaxGuests;
}

// tests
const sampleGuests = [
    new GuestStay(1, 3),
    new GuestStay(2, 5),
    new GuestStay(3, 7),
    new GuestStay(4, 10),
    new GuestStay(4, 9),
    new GuestStay(1, 4),
    new GuestStay(5, 9),
];

assert.strictEqual(getDateWithMaxGuests(sampleGuests), 4);
