import { login } from '../../api/login';
import { BASE_URL, LOGIN_URL, CONTENT_TYPE_APPLICATION_JSON } from "../../constant/constants";

describe('login', () => {
  

  it('should throw an error on unsuccessful login', async () => {
    const errorResponse = { statusText: 'Unauthorized' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: 'Unauthorized',
    });

    const username = 'testuser';
    const password = 'testpassword';

    await expect(login(username, password)).rejects.toThrowError('Unauthorized');

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${LOGIN_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': CONTENT_TYPE_APPLICATION_JSON,
      },
      body: JSON.stringify({ username, password }),
    });
  });
});
