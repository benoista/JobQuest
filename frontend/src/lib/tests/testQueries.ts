import { getCompanyById, createCompany, deleteCompany, updateCompany, getCompanyByName } from '../src/lib/controllers/companiesController';
import nock from 'nock';

describe('Companies Controller', () => {
    beforeEach(() => {
        nock.cleanAll();
    });

    it('gets company by id successfully', async () => {
        const mockData = { id: 1, name: 'Test', website: 'test.com' };
        nock('http://localhost:3000')
            .get('/companies?id=1')
            .reply(200, mockData);

        const data = await getCompanyById(1);
        expect(data).toEqual(mockData);
    });

    it('handles not found when getting company by id', async () => {
        nock('http://localhost:3000')
            .get('/companies?id=1')
            .reply(404);

        const data = await getCompanyById(1);
        expect(data).toBeUndefined();
    });

    it('creates a company successfully', async () => {
        const mockData = { name: 'Test', website: 'test.com' };
        nock('http://localhost:3000')
            .post('/companies/add', mockData)
            .reply(200);

        await createCompany('Test', 'test.com');
        expect(nock.isDone()).toBe(true);
    });

    it('deletes a company successfully', async () => {
        nock('http://localhost:3000')
            .delete('/companies/remove?id=1')
            .reply(200);

        await deleteCompany(1);
        expect(nock.isDone()).toBe(true);
    });

    it('updates a company successfully', async () => {
        const mockData = { name: 'Test Updated', website: 'test.com' };
        nock('http://localhost:3000')
            .put('/companies/update?id=1', mockData)
            .reply(200);

        await updateCompany(1, 'Test Updated', 'test.com');
        expect(nock.isDone()).toBe(true);
    });

    it('gets company by name successfully', async () => {
        const mockData = { id: 1, name: 'Test', website: 'test.com' };
        nock('http://localhost:3000')
            .get('/companies?name=Test')
            .reply(200, mockData);

        const data = await getCompanyByName('Test');
        expect(data).toEqual(mockData);
    });
});