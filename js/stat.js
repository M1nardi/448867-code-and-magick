'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;
var COLUMN_X = 160;
var COLUMN_Y = 230;
var COLUMN_GAP = 50;
var PLAYER_NAME_Y = 250;
var FONT_STYLE = '16px PT Mono';
var TEXT_COLOR = '#000';
var USER_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';
var TITLE_POSITION_X = 130;
var TITLE_POSITION_Y = 25;
var LINE_HEIGHT = 20;
var cloudShadowX = CLOUD_X + GAP;
var cloudShadowY = CLOUD_Y + GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, cloudShadowX, cloudShadowY, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  function showText(text, x, y, fontFamily, textColor, baseline) {
    ctx.font = fontFamily;
    ctx.fillStyle = textColor;
    ctx.textBaseline = baseline;
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
    var columnSpace = COLUMN_X + (COLUMN_WIDTH + COLUMN_GAP) * i;
    var dynamicColumnHeight = (COLUMN_HEIGHT * times[i]) / maxTime * -1;
    var playerTimeY = dynamicColumnHeight + 225;
    var currentColor = players[i] === 'Вы' ? USER_COLUMN_COLOR : getRandomColor();

    getRandomColor();
    renderPlayersColumn(columnSpace, COLUMN_Y, COLUMN_WIDTH, dynamicColumnHeight, currentColor);
    showText(players[i], columnSpace, PLAYER_NAME_Y, FONT_STYLE, TEXT_COLOR);
    showText(Math.round(times[i]), columnSpace, playerTimeY, FONT_STYLE, TEXT_COLOR);
  }

  showText('Ура вы победили!', TITLE_POSITION_X, TITLE_POSITION_Y, FONT_STYLE, TEXT_COLOR, 'hanging');
  showText('Список результатов:', TITLE_POSITION_X, TITLE_POSITION_Y + LINE_HEIGHT, FONT_STYLE, TEXT_COLOR, 'hanging');
};
