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
var TITLE_POSITION_X = 130;
var TITLE_POSITION_Y = 25;
var LINE_HEIGHT = 20;

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

  function showTitle(text, x, y) {
    ctx.fillText(text, x, y);
  }

  function getRandomColor() {
    return 'rgb(0,' + Math.floor(255 - 60.5 * i) + ',' + Math.floor(255 - 23.5 * i) + ')';
  }

  function renderPlayersColumn(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barSpace = BAR_X + (BAR_WIDTH + BAR_GAP) * i;
    var dynamicBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var currentColor = players[i] === 'Вы' ? USER_COLUMN_COLOR : getRandomColor();

    getRandomColor();
    renderPlayersColumn(barSpace, BAR_Y, BAR_WIDTH, dynamicBarHeight, currentColor);

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(players[i], barSpace, 250);
    ctx.fillText(Math.round(times[i]), barSpace, dynamicBarHeight + 225);
  }

  defineFontStyle(TEXT_FONT, TEXT_COLOR, 'hanging');
  showTitle('Ура вы победили!', TITLE_POSITION_X, TITLE_POSITION_Y);
  showTitle('Список результатов:', TITLE_POSITION_X, TITLE_POSITION_Y + LINE_HEIGHT);
};
