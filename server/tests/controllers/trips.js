import chai from "chai";
import chaiHttp from "chai-http";

import { mockAsync } from "../common/asyncMock";
import { User } from "../../models/user";
import { Trips } from "../../models/trips";
import { AppTest } from "../common";
import {
  removeCollection,
  createUser,
  createUserNotAdmin
} from "../common/base";
import responseMessages from "../../constants/responseMessages";

chai.use(chaiHttp);
chai.should();
const { expect } = chai;

describe("Trips", () => {
  beforeEach(async () => {
    await removeCollection(User);
    await removeCollection(Trips);
    const user = await createUser();
    await AppTest.loginRandom(user);
  });

  describe("Create Trips", () => {
    it(
      "should successfully create a trip",
      mockAsync(async () => {
        const res = await AppTest.post("/trips").send({
          busNumber: "UAG 728Y",
          busDriver: "Paul Kayinu",
          busConductor: "Victor Gonzalex",
          destination: "Mbarara",
          departure: "Kampala",
          numberOfPassengers: 65,
          price: 200000
        });
        expect(res.body.message).to.equal(responseMessages.TRIP_CREATED);
      })
    );
    it(
      "should not create a trip if busNumber is not provided",
      mockAsync(async () => {
        const res = await AppTest.post("/trips").send({
          busDriver: "Paul Kayinu",
          busConductor: "Victor Gonzalex",
          destination: "Mbarara",
          departure: "Kampala",
          numberOfPassengers: 65,
          price: 200000
        });
        expect(res.status).to.equal(400);
      })
    );
    it(
      "should not create a trip if busDriver is not provided",
      mockAsync(async () => {
        const res = await AppTest.post("/trips").send({
          busNumber: "UAE 129N",
          busConductor: "Victor Gonzalex",
          destination: "Mbarara",
          departure: "Kampala",
          numberOfPassengers: 65,
          price: 200000
        });
        expect(res.status).to.equal(400);
      })
    );
    it(
      "should not create a trip if busDriver is not provided",
      mockAsync(async () => {
        const res = await AppTest.post("/trips").send({
          busNumber: "UAE 129N",
          busConductor: "Victor Gonzalex",
          destination: "Mbarara",
          departure: "Kampala",
          numberOfPassengers: 65,
          price: 200000
        });
        expect(res.status).to.equal(400);
      })
    );
    it(
      "should not create a trip if busConductor is not provided",
      mockAsync(async () => {
        const res = await AppTest.post("/trips").send({
          busNumber: "UAE 129N",
          busDriver: "Victor Gonzalex",
          destination: "Mbarara",
          departure: "Kampala",
          numberOfPassengers: 65,
          price: 200000
        });
        expect(res.status).to.equal(400);
      })
    );
    it(
      "should not create a trip if destination is not provided",
      mockAsync(async () => {
        const res = await AppTest.post("/trips").send({
          busNumber: "UAE 129N",
          busConductor: "Victor Gonzalex",
          busDriver: "pip",
          departure: "Kampala",
          numberOfPassengers: 65,
          price: 200000
        });
        expect(res.status).to.equal(400);
      })
    );
    it(
      "should not create a trip if departure is not provided",
      mockAsync(async () => {
        const res = await AppTest.post("/trips").send({
          busNumber: "UAE 129N",
          busConductor: "Victor Gonzalex",
          busDriver: "pip",
          destination: "Kampala",
          numberOfPassengers: 65,
          price: 200000
        });
        expect(res.status).to.equal(400);
      })
    );
    it(
      "should not create a trip if numberOfPassengers is not provided",
      mockAsync(async () => {
        const res = await AppTest.post("/trips").send({
          busNumber: "UAE 129N",
          busConductor: "Victor Gonzalex",
          busDriver: "pip",
          departure: "Kampala",
          destination: "jjdakd",
          price: 200000
        });
        expect(res.status).to.equal(400);
      })
    );
    it(
      "should not create a trip if price is not provided",
      mockAsync(async () => {
        const res = await AppTest.post("/trips").send({
          busNumber: "UAE 129N",
          busConductor: "Victor Gonzalex",
          busDriver: "pip",
          departure: "Kampala",
          destination: "jjdakd"
        });
        expect(res.status).to.equal(400);
      })
    );
  });

  describe("delete trip", () => {
    beforeEach(
      mockAsync(async () => {
        await AppTest.createTrip();
      })
    );
    it(
      "should delete trip if it exists",
      mockAsync(async () => {
        const response = await AppTest.delete(
          `/trips/${AppTest.trip._id}`
        ).send();
        expect(response.status).to.equal(200);
      })
    );
    it(
      "should not delete trip if it does not exists",
      mockAsync(async () => {
        const response = await AppTest.delete("/trips/dmdjsj340040").send();
        expect(response.status).to.equal(400);
      })
    );
  });

  describe("get trips", () => {
    beforeEach(
      mockAsync(async () => {
        await AppTest.createTrip();
      })
    );

    it(
      "should fetch all trips",
      mockAsync(async () => {
        const response = await AppTest.get("/trips/").send();
        expect(response.status).to.equal(200);
      })
    );
    it(
      "should fetch trips with destination kampala ",
      mockAsync(async () => {
        const response = await AppTest.get(
          "/trips/?destination=Kampala"
        ).send();
        expect(response.status).to.equal(200);
      })
    );
    it(
      "should fetch trips with departure Mbarara ",
      mockAsync(async () => {
        const response = await AppTest.get("/trips/?departure=Mbarara").send();
        expect(response.status).to.equal(200);
      })
    );
    it(
      "should fetch trips with busDriver Jackson ",
      mockAsync(async () => {
        const response = await AppTest.get("/trips/?busDriver=Jackson").send();
        expect(response.status).to.equal(200);
      })
    );
    it(
      "should fetch trips with this id ",
      mockAsync(async () => {
        const response = await AppTest.get(`/trips/${AppTest.trip._id}`).send();
        expect(response.status).to.equal(200);
      })
    );
    it(
      "should not fetch trips with this unknown id ",
      mockAsync(async () => {
        const response = await AppTest.get("/trips/992jsjjdjd").send();
        expect(response.body).to.have.property("message");
      })
    );
  });

  describe("edit trips", () => {
    beforeEach(
      mockAsync(async () => {
        await AppTest.createTrip();
      })
    );
    it(
      "should edit a trip",
      mockAsync(async () => {
        const response = await AppTest.patch(`/trips/${AppTest.trip._id}`).send(
          {
            busNumber: "UDP 239A",
            busDriver: "Julius",
            busConductor: "Gomez",
            destination: "Kampala",
            departure: "Mbarara",
            price: 200000
          }
        );
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal(
          responseMessages.UPDATED_SUCCESSFULLY
        );
      })
    );
    it(
      "should not edit a trip if busNumber is not provided",
      mockAsync(async () => {
        const response = await AppTest.patch(`/trips/${AppTest.trip._id}`).send(
          {
            busNumer: "UDP239A",
            busDriver: "Julius",
            busConductor: "Gomez",
            destination: "Kampala",
            departure: "Mbarara",
            price: 200000
          }
        );
        expect(response.status).to.equal(400);
      })
    );
    it(
      "should not edit a trip busDriver is not provided",
      mockAsync(async () => {
        const response = await AppTest.patch(`/trips/${AppTest.trip._id}`).send(
          {
            busNumber: "UDP 239A",
            busDrver: "Julius",
            busConductor: "Gomez",
            destination: "Kampala",
            departure: "Mbarara",
            price: 200000
          }
        );
        expect(response.status).to.equal(400);
      })
    );
    it(
      "should not edit a trip busConductor is not provided",
      mockAsync(async () => {
        const response = await AppTest.patch(`/trips/${AppTest.trip._id}`).send(
          {
            busNumber: "UDP 239A",
            busDriver: "Julius",
            busCondctor: "Gomez",
            destination: "Kampala",
            departure: "Mbarara",
            price: 200000
          }
        );
        expect(response.status).to.equal(400);
      })
    );
    it(
      "should not edit a trip destination is not provided",
      mockAsync(async () => {
        const response = await AppTest.patch(`/trips/${AppTest.trip._id}`).send(
          {
            busNumber: "UDP 239A",
            busDriver: "Julius",
            busConductor: "Gomez",
            desination: "Kampala",
            departure: "Mbarara",
            price: 200000
          }
        );
        expect(response.status).to.equal(400);
      })
    );
    it(
      "should not edit a trip departure is not provided",
      mockAsync(async () => {
        const response = await AppTest.patch(`/trips/${AppTest.trip._id}`).send(
          {
            busNumber: "UDP 239A",
            busDriver: "Julius",
            busCondctor: "Gomez",
            destination: "Kampala",
            deparure: "Mbarara",
            price: 200000
          }
        );
        expect(response.status).to.equal(400);
      })
    );
    it(
      "should not edit a trip price is not provided",
      mockAsync(async () => {
        const response = await AppTest.patch(`/trips/${AppTest.trip._id}`).send(
          {
            busNumber: "UDP 239A",
            busDriver: "Julius",
            busCondctor: "Gomez",
            destination: "Kampala",
            departure: "Mbarara",
            prie: 200000
          }
        );
        expect(response.status).to.equal(400);
      })
    );
  });
});

describe("Trips, Fail", () => {
  beforeEach(
    mockAsync(async () => {
      await removeCollection(User);
      await removeCollection(Trips);
      const user = await createUserNotAdmin();
      await AppTest.loginRandom(user);
    })
  );
  describe("creating", () => {
    it(
      "Should fail create trip if user is not admin",
      mockAsync(async () => {
        const res = await AppTest.post("/trips").send({
          busNumber: "UAG 728Y",
          busDriver: "Paul Kayinu",
          busConductor: "Victor Gonzalex",
          destination: "Mbarara",
          departure: "Kampala",
          numberOfPassengers: 65,
          price: 20000
        });
        expect(res.body.message).to.equal(responseMessages.FORBIDDEN);
      })
    );
  });

  describe("edit and delete", () => {
    beforeEach(
      mockAsync(async () => {
        await AppTest.createTrip();
      })
    );
    it(
      "Should fail delete trip if user is not admin",
      mockAsync(async () => {
        const res = await AppTest.delete(`/trips/${AppTest.trip._id}`).send({
          busNumber: "UAG 728Y",
          busDriver: "Paul Kayinu",
          busConductor: "Victor Gonzalex",
          destination: "Mbarara",
          departure: "Kampala",
          numberOfPassengers: 65,
          price: 200000
        });
        expect(res.body.message).to.equal(responseMessages.FORBIDDEN);
      })
    );
    it(
      "should not edit a trip if user is not admin",
      mockAsync(async () => {
        const res = await AppTest.patch(`/trips/${AppTest.trip._id}`).send({
          busNumber: "UDP 239A",
          busDriver: "Julius",
          busConductor: "Gomez",
          destination: "Kampala",
          departure: "Mbarara",
          price: 200000
        });
        expect(res.body.message).to.equal(responseMessages.FORBIDDEN);
      })
    );
  });
});
