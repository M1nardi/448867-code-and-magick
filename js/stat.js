'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = -150;
var BAR_X = 160;
var BAR_Y = 230;
var BAR_GAP = 50;
var TEXT_FONT = '16px PT Mono';
var TEXT_COLOR = '#000';
var USER_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  function defineFontStyle(fontFamily, textColor, baseline) {
    ctx.font = fontFamily;
    ctx.fillStyle = textColor;
    ctx.textBaseline = baseline;
  }

  function showText(text, x, y) {
    ctx.fillText(text, x, y);
  }

  function getRandomColor() {
    if (players[i] === 'Вы') {
      ctx.fillStyle = USER_COLUMN_COLOR;
    } else {
      ctx.fillStyle = 'rgb(0,' + Math.floor(255 - 60.5 * i) + ',' + Math.floor(255 - 23.5 * i) + ')';
    }
  }

  function renderPlayersColumns(x, y, width, height) {
    ctx.fillRect(x, y, width, height);
  }

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barSpace = BAR_X + (BAR_WIDTH + BAR_GAP) * i;
    var dynamicBarHeight = (BAR_HEIGHT * times[i]) / maxTime;

    getRandomColor();
    renderPlayersColumns(barSpace, BAR_Y, BAR_WIDTH, dynamicBarHeight);

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(players[i], barSpace, 250);
    ctx.fillText(Math.round(times[i]), barSpace, dynamicBarHeight + 225);
  }

  defineFontStyle(TEXT_FONT, TEXT_COLOR, 'hanging');
  showText('Ура вы победили!', 130, 25);
  showText('Список результатов:', 130, 45);
};
