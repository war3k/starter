import { ApplicaPage } from './app.po';

describe('applica App', function() {
  let page: ApplicaPage;

  beforeEach(() => {
    page = new ApplicaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
