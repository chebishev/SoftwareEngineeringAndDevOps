import * as chai from "chai";
import chaiHttp from "chai-http";
const server = import("../../server");

// const chai = import("chai");
// const chaiHttp = import("chai-http");
// const server = import("./server");
// const expect = chai.expect;

chai.use(chaiHttp);

describe("Books API", () => {
  let bookId;
  it("should create a new book", (done) => {
    const book = {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
    };
    chai
      .request(server)
      .post("/books")
      .send(book)
      .end((err, res) => {
        chai.expect(res).to.have.status(201);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body).to.have.property("id");
        chai.expect(res.body).to.have.property("title");
        chai.expect(res.body).to.have.property("author");
        bookId - res.body.id;
        done();
      });
  });
});
