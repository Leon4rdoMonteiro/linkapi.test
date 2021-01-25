const FakePipeDriveProvider = require('../../../shared/providers/CRMProvider/fakes/FakePipeDriveProvider');
const FakeBlingProvider = require('../../../shared/providers/ERPProvider/fakes/FakeBlingProvider');
const CreateOrderService = require('../../../shared/services/CreateOrderService');
const SearchForDealsService = require('../../../shared/services/SearchForDealsService');
const FakeOpportunityRepository = require('../repositories/fakes/FakeOpportunityRepository');
const CreateOpportunitiesService = require('./CreateOpportunitiesService');

let opportunitiesRepository;
let createOpportunitiesService;
let searchForDealsService;
let createOrderService;
let pipeDriveProvider;
let blingProvider;

describe('CreateOpportunityService', () => {
  beforeEach(() => {
    pipeDriveProvider = new FakePipeDriveProvider();
    blingProvider = new FakeBlingProvider();
    opportunitiesRepository = new FakeOpportunityRepository();
    searchForDealsService = new SearchForDealsService(pipeDriveProvider);
    createOrderService = new CreateOrderService(blingProvider);
    createOpportunitiesService = new CreateOpportunitiesService(
      searchForDealsService,
      createOrderService,
      opportunitiesRepository,
      pipeDriveProvider,
    );
  });

  afterEach(() => {
    opportunitiesRepository = null;
  });

  it('should be able to find and get new opportunities', async () => {
    const response = await createOpportunitiesService.run();

    const expectedResponse = {
      error: false,
      statusCode: 200,
      data: response.data,
    };

    expect(response).toEqual(expectedResponse);
    expect(response.data).toHaveProperty('_id');
    expect(response.data).toHaveProperty('deals');
    expect(response.data.deals).toHaveLength(3);
    expect(response.data).toHaveProperty('createdAt');
    expect(response.data).toHaveProperty('updatedAt');
  });

  it('should be able to find and update new opportunities if day record already exists', async () => {
    await createOpportunitiesService.run();
    const response = await createOpportunitiesService.run();

    const expectedResponse = {
      error: false,
      statusCode: 200,
      data: response.data,
    };

    expect(response).toEqual(expectedResponse);
    expect(response.data).toHaveProperty('_id');
    expect(response.data).toHaveProperty('deals');
    expect(response.data.deals).toHaveLength(3);
    expect(response.data).toHaveProperty('createdAt');
    expect(response.data).toHaveProperty('updatedAt');
  });
});
