const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Books API', () => {
    let bookId;

    it('should POST a book', async () => {
        const book = { id: "1", title: "Test Book", author: "Test Author" };
        const res = await chai.request(server).post('/books').send(book);
        
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('author');
        bookId = res.body.id;
    });

    it('should GET all books', async () => {
        const res = await chai.request(server).get('/books');
        
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
    });
});
