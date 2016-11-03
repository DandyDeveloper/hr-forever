import { HrForeverClientPage } from './app.po';

describe('hr-forever-client App', function() {
  let page: HrForeverClientPage;

  beforeEach(() => {
    page = new HrForeverClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
