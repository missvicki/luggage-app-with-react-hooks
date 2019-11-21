import chai from "chai";
import chaiHttp from "chai-http";

import { mockAsync } from "../common/asyncMock";
import { User } from "../../models/user";
import { AppTest } from "../common";
import { removeCollection, createUser } from "../common/base";
import responseMessages from "../../constants/responseMessages";

chai.use(chaiHttp);
chai.should();
const { expect } = chai;

describe("User profile", () => {
  beforeEach(
    mockAsync(async () => {
      await removeCollection(User);
      const user = await createUser();
      await AppTest.loginRandom(user);
    })
  );
  describe("Get users", () => {
    it(
      "should fetch all users successfully",
      mockAsync(async () => {
        const response = await AppTest.get("/users").send();
        expect(response.status).to.equal(200);
      })
    );
    it(
      "should fetch one user successfully ",
      mockAsync(async () => {
        const response = await AppTest.get("/users/vicki@mail.com").send();
        expect(response.status).to.equal(200);
      })
    );
  });

  describe("Edit and delete profile", () => {
    it(
      "should delete a user",
      mockAsync(async () => {
        const response = await AppTest.delete("/users/vicki@mail.com").send();
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal(
          responseMessages.DELETE_SUCCESSFUL
        );
      })
    );
    it(
      "should not delete a user if user does not exist",
      mockAsync(async () => {
        const response = await AppTest.delete("/users/vici@mail.com").send();
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal(responseMessages.USER_NOT_FOUND);
      })
    );
    it(
      "should update user profile",
      mockAsync(async () => {
        const response = await AppTest.patch("/users/vicki@mail.com").send({
          firstname: "victory",
          lastname: "tori",
          phoneNumber: 130535343
        });
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal(
          responseMessages.UPDATED_SUCCESSFULLY
        );
      })
    );
    it(
      "should not update user profile if user email can not be found",
      mockAsync(async () => {
        const response = await AppTest.patch("/users/vici@mail.com").send({
          firstname: "victory",
          lastname: "tori",
          phoneNumber: 130535343
        });
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal(responseMessages.USER_NOT_FOUND);
      })
    );
    it(
      "should not update user profile if user firstname is not provided",
      mockAsync(async () => {
        const response = await AppTest.patch("/users/vicki@mail.com").send({
          lastname: "tori",
          phoneNumber: 130535343
        });
        expect(response.status).to.equal(400);
      })
    );
    it(
      "should not update user profile if user lastname is not provided",
      mockAsync(async () => {
        const response = await AppTest.patch("/users/vicki@mail.com").send({
          fistname: "tori",
          phoneNumber: 130535343
        });
        expect(response.status).to.equal(400);
      })
    );
    it(
      "should not update user profile if user phoneNumber is not provided",
      mockAsync(async () => {
        const response = await AppTest.patch("/users/vicki@mail.com").send({
          fistname: "tori",
          lastname: "130535343"
        });
        expect(response.status).to.equal(400);
      })
    );
    it(
      "should not update user profile if user firstname is not string",
      mockAsync(async () => {
        const response = await AppTest.patch("/users/vicki@mail.com").send({
          fistname: 3002044,
          lastname: "130535343",
          phoneNumber: 93924002
        });
        expect(response.status).to.equal(400);
      })
    );
  });
  describe("Change user password", () => {
    it(
      "should not change a user's password if passwords don't match",
      mockAsync(async () => {
        const response = await AppTest.put("/users/change-password").send({
          password: "hey92034",
          confirmPassword: "he 2034"
        });
        expect(response.status).to.equal(400);
      })
    );
    it(
      "should not change a user's password if confirm password is not provided",
      mockAsync(async () => {
        const response = await AppTest.put("/users/change-password").send({
          password: "hey034950"
        });
        expect(response.status).to.equal(400);
      })
    );
    it(
      "should not change a user's password if password is not provided",
      mockAsync(async () => {
        const response = await AppTest.put("/users/change-password").send({
          confirmPassword: "hey456034"
        });
        expect(response.status).to.equal(400);
      })
    );
    it(
      "should not change a user's password if password is too short",
      mockAsync(async () => {
        const response = await AppTest.put("/users/change-password").send({
          password: "hey034",
          confirmPassword: "hey034"
        });
        expect(response.status).to.equal(400);
      })
    );
  });
});
