import { searchBook } from '../../api/book';
import { BASE_URL, SEARCH_BOOK } from '../../constant/constants';

describe('searchBook', () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = jest.spyOn(window, 'fetch');
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  test('should make a GET request with the correct URL and headers', async () => {
    const searchQuery = 'test';
    const token = 'token123';
    localStorage.setItem('token', token);

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ data: 'mocked data' }),
    });

    await searchBook(searchQuery);

    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}${SEARCH_BOOK}${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });

  test('should return the response data if the request is successful', async () => {
    const searchQuery = 'test';
    const responseData = { data: 'mocked data' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(responseData),
    });

    const result = await searchBook(searchQuery);

    expect(result).toEqual(responseData);
  });

 
});
