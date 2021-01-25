const { browser } = require("protractor");

describe('Ships the game', function() {
  it('should navigate to correct sites after clicking end the game button', function() {
    browser.get('https://ships-the-game.herokuapp.com/');
    var browser2 = browser.forkNewDriverInstance(true);
    expect(browser.getTitle()).toEqual('Ships: The Game');
    browser.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_1');
    browser2.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_2');
    browser.findElement(by.id('buttonAddPlayer')).click();
    browser2.findElement(by.id('buttonAddPlayer')).click();
    expect(browser.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_1/nothing');
    expect(browser2.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_2');
    browser.findElement(by.id('endGameButton')).click();
    expect(browser.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/landing/loose');
    browser2.sleep(4000);
    expect(browser2.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/landing/win');
    browser.close();
    browser2.close();
  });


  it('should navigate third player to waiting room', function() {
    browser.get('https://ships-the-game.herokuapp.com/');
    var browser2 = browser.forkNewDriverInstance(true);
    var browser3 = browser.forkNewDriverInstance(true);
    expect(browser.getTitle()).toEqual('Ships: The Game');
    browser.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_1');
    browser.findElement(by.id('buttonAddPlayer')).click();

    browser2.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_2');
    browser2.findElement(by.id('buttonAddPlayer')).click();

    browser3.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_3');
    browser3.findElement(by.id('buttonAddPlayer')).click();

    expect(browser.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_1');
    expect(browser2.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_2');
    expect(browser3.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/waiting-room/DUMMY_PLAYER_3');
    browser.close();
    browser2.close();
    browser3.close();
  });


  it('should navigate 4 players to game', function() {
    browser.get('https://ships-the-game.herokuapp.com/');
    var browser2 = browser.forkNewDriverInstance(true);
    var browser3 = browser.forkNewDriverInstance(true);
    var browser4 = browser.forkNewDriverInstance(true);
    expect(browser.getTitle()).toEqual('Ships: The Game');
    browser.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_1');
    browser.findElement(by.id('buttonAddPlayer')).click();

    browser2.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_2');
    browser2.findElement(by.id('buttonAddPlayer')).click();

    browser3.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_3');
    browser3.findElement(by.id('buttonAddPlayer')).click();

    browser4.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_4');
    browser4.findElement(by.id('buttonAddPlayer')).click();

    expect(browser.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_1');
    expect(browser2.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_2');
    expect(browser3.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_3');
    expect(browser4.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_4');
    });
});
