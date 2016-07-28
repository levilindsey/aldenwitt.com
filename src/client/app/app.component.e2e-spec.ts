describe('App', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Alden Witt');
  });

  it('should have <nav>', () => {
    expect(element(by.css('alden-app alden-side-menu nav')).isPresent()).toEqual(true);
  });

  it('should have correct nav text for Home', () => {
    expect(element(by.css('alden-app alden-side-menu nav a:first-child')).getText()).toEqual('Home');
  });

  it('should have correct nav text for Bio', () => {
    expect(element(by.css('alden-app alden-side-menu nav a:nth-child(2)')).getText()).toEqual('Bio');
  });

  it('should have correct nav text for Bio', () => {
    expect(element(by.css('alden-app alden-side-menu nav a:last-child')).getText()).toEqual('Contact');
  });
});
