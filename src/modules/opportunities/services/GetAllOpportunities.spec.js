const AppError = require('../../../shared/errors/AppError');
const FakeOpportunityRepository = require('../repositories/fakes/FakeOpportunityRepository');
const GetAllOpportunitiesService = require('./GetAllOpportunitiesService');

const { create } = require('./mocks/OpportunityMock');

let opportunitiesRepository;
let getAllOpportunities;

describe('GetAllOpportunitiesService', () => {
  beforeEach(() => {
    opportunitiesRepository = new FakeOpportunityRepository();
    getAllOpportunities = new GetAllOpportunitiesService(
      opportunitiesRepository,
    );
  });

  afterEach(() => {
    opportunitiesRepository = null;
  });

  it('should be able to get all registered opportunities', async () => {
    await opportunitiesRepository.create(create);
    await opportunitiesRepository.create(create);

    const response = await getAllOpportunities.run();

    const expectedResponse = {
      error: false,
      statusCode: 200,
      data: response.data,
    };

    expect(response).toEqual(expectedResponse);
    expect(response.data[0]).toHaveProperty('_id');
    expect(response.data[0]).toHaveProperty('deals');
    expect(response.data[0]).toHaveProperty('createdAt');
    expect(response.data[0]).toHaveProperty('updatedAt');
    expect(response.data).toHaveLength(2);
  });

  it('should not to get all opportunities by date if date is invalid', async () => {
    await opportunitiesRepository.create(create);

    const expectedResponse = {
      error: true,
      statusCode: 400,
      message: 'The provided date is invalid',
    };

    await getAllOpportunities.run('date').catch(err => {
      expect(err).toEqual(expectedResponse);
    });
  });

  it('should not be able to get all opportunities by date if not found', async () => {
    await opportunitiesRepository.create(create);

    const date = '2021-01-01';

    const expectedResponse = {
      error: true,
      statusCode: 404,
      message: 'No saved opportunities found',
    };

    await getAllOpportunities.run(date).catch(err => {
      expect(err).toBeInstanceOf(AppError);
      expect(err).toEqual(expectedResponse);
    });
  });
});
