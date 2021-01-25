function delay(ms) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('Ships the game', function() {
  it('should navigate to correct sites after clicking end the game button', function() {
    browser.waitForAngularEnabled(false);
    var log4js = require("log4js");
    var logger = log4js.getLogger();
    logger.level = "debug";
    browser.get('https://ships-the-game.herokuapp.com/');
    var browser2 = browser.forkNewDriverInstance(true);
    browser.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_1');
    browser2.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_2');
    browser.findElement(by.id('buttonAddPlayer')).click();
    browser2.findElement(by.id('buttonAddPlayer')).click();

    browser.wait(protractor.ExpectedConditions.urlIs("https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_1"), 3000).then(function(){   
     browser.findElement(by.id('endGameButton')).click();
    });

    browser.sleep(8000).then(function(){
      Promise.all([
        expect(browser.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/landing/loose'),
        expect(browser2.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/landing/win')])
        .then(function() {
          logger.debug("Promise fullfilled");
          done();
        }).catch(function() {
          logger.debug("Promise error");
          done.fail('somehow the Url is incorrect');
         });
    });

    logger.debug("Before promise")

  });

  // it('should navigate third player to waiting room', function(done) {
  //   browser.get('https://ships-the-game.herokuapp.com/');
  //   var browser2 = browser.forkNewDriverInstance(true);
  //   var browser3 = browser.forkNewDriverInstance(true);
  //   expect(browser.getTitle()).toEqual('Ships: The Game');
  //   browser.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_1');
  //   browser.findElement(by.id('buttonAddPlayer')).click();

  //   browser2.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_2');
  //   browser2.findElement(by.id('buttonAddPlayer')).click();

  //   browser3.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_3');
  //   browser3.findElement(by.id('buttonAddPlayer')).click();

  //   Promise.all([
  //   expect(browser.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_1'),
  //   expect(browser2.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_2'),
  //   expect(browser3.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/waiting-room/DUMMY_PLAYER_3')])
  //     .then(function() {
  //       done();
  //     }).catch(function() {
  //       done.fail('somehow the Url is incorrect');
  //      });
  // });


  // it('should navigate the player that left to win page if the other player left', function() {
  //   browser.get('https://ships-the-game.herokuapp.com/');
  //   var browser2 = browser.forkNewDriverInstance(true);

  //   browser.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_1');
  //   browser.findElement(by.id('buttonAddPlayer')).click();

  //   browser2.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_2');
  //   browser2.findElement(by.id('buttonAddPlayer')).click();
  //   browser2.close();

  //   expect(browser.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/landing/win');
  // });


  // it('should wait for the player if he closes the browser and return quickly', function() {
  //   browser.get('https://ships-the-game.herokuapp.com/');
  //   var browser2 = browser.forkNewDriverInstance(true);
  //   browser.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_1');
  //   browser.findElement(by.id('buttonAddPlayer')).click();

  //   browser2.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_2');
  //   browser2.findElement(by.id('buttonAddPlayer')).click();

  //   browser2.close();
  //   browser2.get('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_2');

  //   Promise.all[
  //     expect(browser.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_1'),
  //     expect(browser2.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_2')]
  //     .then(function() {
  //       done();
  //     });
  //   });

  // it('should navigate 4 players to game', function() {
  //   browser.get('https://ships-the-game.herokuapp.com/');
  //   var browser2 = browser.forkNewDriverInstance(true);
  //   var browser3 = browser.forkNewDriverInstance(true);
  //   var browser4 = browser.forkNewDriverInstance(true);

  //   browser.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_1');
  //   browser.findElement(by.id('buttonAddPlayer')).click();

  //   browser2.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_2');
  //   browser2.findElement(by.id('buttonAddPlayer')).click();

  //   browser3.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_3');
  //   browser3.findElement(by.id('buttonAddPlayer')).click();

  //   browser4.findElement(by.id('name')).sendKeys('DUMMY_PLAYER_4');
  //   browser4.findElement(by.id('buttonAddPlayer')).click();
  //   Promise.all[
  //   expect(browser.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_1'),
  //   expect(browser2.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_2'),
  //   expect(browser3.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_3'),
  //   expect(browser4.getCurrentUrl()).toEqual('https://ships-the-game.herokuapp.com/game/DUMMY_PLAYER_4')]
  //   .then(function() {
  //     done();
  //   });
  // });


});