const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Books API", () => {
  let bookId;

  // Verify posting a book
  it("should POST a book", (done) => {
    const book = { id: "1", title: "Test Book", author: "Test Author" };
    chai
      .request(server)
      .post("/books")
      .send(book)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("title");
        expect(res.body).to.have.property("author");
        bookId = res.body.id;
        done();
      });
  });

  // Verify Getting All Books
  it("should GET all books", (done) => {
    chai
      .request(server)
      .get("/books")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("array");
        done();
      });
  });

  // Verify Getting a Single Book
  it("should GET a single book", (done) => {
    chai
      .request(server)
      .get(`/books/${bookId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // Verify Updating a Book
  it("should PUT a book", (done) => {
    const updatedBook = {
      id: "1",
      title: "Updated Test Book",
      author: "Updated Test Author",
    };
    chai
      .request(server)
      .put(`/books/${bookId}`)
      .send(updatedBook)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body.title).to.equal("Updated Test Book");
        expect(res.body.author).to.equal("Updated Test Author");
        done();
      });
  });

  // Verify Deleting a Book
  it("should DELETE a book", (done) => {
    chai
      .request(server)
      .delete(`/books/${bookId}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

  // Verify Non-Existing Book
  it("Should return 404 when trying to GET, PUT or DELETE a non-existing book", (done) => {
    chai
      .request(server)
      .get("/books/999")
      .end((err, res) => {
        expect(res).to.have.status(404);
      });

    chai
      .request(server)
      .put("/books/999")
      .send({ id: "999", title: "Test Book", author: "Test Author" })
      .end((err, res) => {
        expect(res).to.have.status(404);
      });

    chai
      .request(server)
      .delete("/books/999")
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
