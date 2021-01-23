describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('https://ships-the-game.herokuapp.com/');
    var browser2 = browser.forkNewDriverInstance(true);
    expect(browser.getTitle()).toEqual('Ships: The Game');
    browser.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_1');
    browser2.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_2');
    browser.findElement(by.id('buttonAddPlayer')).click();
    browser2.findElement(by.id('buttonAddPlayer')).click();
    expect(browser.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_1');
    expect(browser2.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_2');
    browser.close();
    browser2.sleep(120000);
    expect(browser2.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/landing/win');
  });
});
