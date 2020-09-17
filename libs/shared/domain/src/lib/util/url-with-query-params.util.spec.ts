import { urlWithQueryParams } from '@pimp-my-pr/shared/domain';

describe('#urlWithQueryParams', () => {
  it('should return correct url with params', () => {
    expect(
      urlWithQueryParams('url.com', {
        a: 1,
        b: 'test',
        c: true
      })
    ).toBe('url.com?a=1&b=test&c=true');
  });
});
