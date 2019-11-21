// export const filterTrips = (trips, filterObject) => {
//   const {
//     destination = null,
//     departure = null,
//     busDriver = null
//   } = filterObject;

//   if (Object.keys(filterObject).length) {
//     let tripsData = [];
//     for (let i = 0; i < trips.length; i++) {
//       const j = trips[i];
//       if (destination && j.destination !== destination) {
//         continue;
//       }
//       if (departure && j.departure !== departure) {
//         continue;
//       }
//       if (busDriver && j.busDriver !== busDriver) {
//         continue;
//       }
//       return tripsData.push(j);
//     }
//     return tripsData;
//   }
//   return trips;
// };
