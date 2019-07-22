import gravatar from '../gravatar';

describe('Gravatar function test', () => {
  it('It Should return gravatar image url', () => {
    const email = 's@mpol.com';
    const gravatarPlaceholder = 'https://gravatar.com/avatar/e4ffaa3f7035953e40b6786736fbe544';
    expect(gravatarPlaceholder).toEqual(gravatar(email));
  });
});
