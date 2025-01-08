System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);

        function DebugViewRuntimeControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));

          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct TRT', 'Env TRT', 'TRT All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'TRT', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }

        var _proto = DebugViewRuntimeControl.prototype;

        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);

          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }

          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
              y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
              height = 20; // new nodes

          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles'; // title

          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;

            var _labelComponent = newLabel.getComponent(Label);

            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }

          y -= height; // single

          var currentRow = 0;

          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }

            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }

          x += width; // buttons

          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent; // misc

          y -= 40;

          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);

            _newNode.setPosition(x, y - height * _i2, 0.0);

            _newNode.setScale(0.5, 0.5, 0.5);

            _newNode.parent = miscNode;

            var _textComponent = _newNode.getComponentInChildren(RichText);

            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;

            var toggleComponent = _newNode.getComponent(Toggle);

            toggleComponent.isChecked = _i2 ? true : false;

            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);

            this.miscModeToggleList[_i2] = _newNode;
          } // composite


          y -= 150;

          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;

            _newNode2.setPosition(x, y - height * _i3, 0.0);

            _newNode2.setScale(0.5, 0.5, 0.5);

            _newNode2.parent = this.compositeModeToggle.parent;

            var _textComponent2 = _newNode2.getComponentInChildren(RichText);

            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;

            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);

            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };

        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');

          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };

        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };

        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };

        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };

        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };

        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);

          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);

            _toggleComponent.isChecked = true;
          }

          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };

        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };

        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;

          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }

          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }

          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };

        _proto.onLoad = function onLoad() {};

        _proto.update = function update(deltaTime) {};

        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/game.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './gVariable.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Node, SpriteFrame, Prefab, profiler, Button, Sprite, instantiate, Color, Component, gVariable;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      SpriteFrame = module.SpriteFrame;
      Prefab = module.Prefab;
      profiler = module.profiler;
      Button = module.Button;
      Sprite = module.Sprite;
      instantiate = module.instantiate;
      Color = module.Color;
      Component = module.Component;
    }, function (module) {
      gVariable = module.gVariable;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

      cclegacy._RF.push({}, "08607C2N4xEfKHmx9Z3JsQ6", "game", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var btnStatus = {
        notChoose: 0,
        choose: 1
      };
      var errorTimes = 0;
      var blankArray = [];
      var checkBlockArray = [];
      var level = [gVariable.level1, gVariable.level2];
      var levelAns = [gVariable.level1Ans, gVariable.level2Ans];
      var nowNumMap = [];
      var game = exports('game', (_dec = ccclass('game'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Node), _dec9 = property({
        type: SpriteFrame
      }), _dec10 = property(Node), _dec11 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(game, _Component);

        function game() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "error", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "title", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "time", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "table", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "topicNum", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "tableBtn", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "checkBlock", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "numBtnSprite", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "UINode", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "popUp", _descriptor10, _assertThisInitialized(_this));

          _this.popUpNode = null;
          _this.elapsedTime = 0;
          return _this;
        }

        var _proto = game.prototype; // 計時器時間

        _proto.start = function start() {
          var _this2 = this;

          profiler.hideStats();
          this.popUpNode = null;
          this.elapsedTime = 0;
          this.createTopicNum();
          this.createTableBtn();
          this.createCheckBlock();
          gVariable.nowChooseNumber = 1;
          this.UINode.children[0].getComponent(Button).normalSprite = this.numBtnSprite[btnStatus.choose];
          this.UINode.children[9].getComponent(Sprite).type = Sprite.Type.SLICED;
          gVariable.eventTarget.on('closePop', function (arg1) {
            _this2.closePopUI();
          });
        };

        _proto.update = function update(deltaTime) {
          this.elapsedTime += deltaTime;
          var minutes = Math.floor(this.elapsedTime / 60);
          var seconds = Math.floor(this.elapsedTime % 60);
          var timeString = this.formatTime(minutes) + ":" + this.formatTime(seconds);

          if (this.time && this.popUpNode == null) {
            this.time.string = timeString;
          }
        };

        _proto.formatTime = function formatTime(time) {
          return time < 10 ? "0" + time : "" + time;
        };

        _proto.createTopicNum = function createTopicNum() {
          var gapX = -3;
          var gapY = 3;

          for (var i = 0; i < 9; i++) {
            //直
            if (i % 3 == 0) {
              gapY -= 3;
            }

            nowNumMap.push([]);

            for (var j = 0; j < 9; j++) {
              //橫
              if (j % 3 == 0) {
                gapX += 3;
              }

              var prefabInstance = instantiate(this.topicNum);
              prefabInstance.active = true;
              prefabInstance.getComponent(Label).string = level[gVariable.nowLevel][i][j];
              this.table.addChild(prefabInstance);
              prefabInstance.setPosition(-234 + 58 * j + gapX, 236 - 58 * i + gapY);
              nowNumMap[i].push(level[gVariable.nowLevel][i][j]);
            }

            gapX = -3;
          }
        };

        _proto.createTableBtn = function createTableBtn() {
          var gapX = -3;
          var gapY = 3;
          var index = 0;

          for (var i = 0; i < 9; i++) {
            //直
            if (i % 3 == 0) {
              gapY -= 3;
            }

            for (var j = 0; j < 9; j++) {
              //橫
              if (j % 3 == 0) {
                gapX += 3;
              }

              var prefabInstance = instantiate(this.tableBtn);
              prefabInstance.active = true;
              this.table.addChild(prefabInstance);
              prefabInstance.setPosition(-234 + 58 * j + gapX, 236 - 58 * i + gapY);
              prefabInstance.getComponent(Button).clickEvents[0].customEventData = index.toString();

              if (level[gVariable.nowLevel][i][j] == " ") {
                //空格才能按
                blankArray.push(prefabInstance);
                prefabInstance.getComponent(Button).interactable = true;
                prefabInstance.name = "blank"; //檢查獲勝機制一開始為空格
              } else {
                prefabInstance.getComponent(Button).interactable = false;
              }

              index++;
            }

            gapX = -3;
          }
        };

        _proto.createCheckBlock = function createCheckBlock() {
          var gapX = -3;
          var gapY = 3;
          var index = 0;

          for (var i = 0; i < 9; i++) {
            //直
            if (i % 3 == 0) {
              gapY -= 3;
            }

            checkBlockArray.push([]);

            for (var j = 0; j < 9; j++) {
              //橫
              if (j % 3 == 0) {
                gapX += 3;
              }

              var prefabInstance = instantiate(this.checkBlock);
              prefabInstance.active = false;
              this.table.addChild(prefabInstance);
              prefabInstance.setPosition(-234 + 58 * j + gapX, 236 - 58 * i + gapY);
              prefabInstance.getComponent(Button).clickEvents[0].customEventData = index.toString();
              prefabInstance.getComponent(Button).interactable = false;
              prefabInstance.getComponent(Sprite).color = new Color(255, 0, 0, 0);
              checkBlockArray[i].push(prefabInstance);
              index++;
            }

            gapX = -3;
          }
        };

        _proto.clickTable = function clickTable(event, customEventData) {
          //點擊桌面空格
          if (gVariable.checkModel == true) return; //檢查模式中

          console.log("桌面位置: " + customEventData);
          var btnNode = event.target;
          var btnLabelComponent = event.target.getChildByName("Label").getComponent(Label);

          if (btnLabelComponent.string == gVariable.nowChooseNumber) {
            //避免檢查獲勝機制錯誤
            console.log("這格已經是這個數字了");
            return;
          }

          btnLabelComponent.string = gVariable.nowChooseNumber;
          this.checkWin(customEventData, btnLabelComponent, btnNode);
        };

        _proto.chooseNum = function chooseNum(event, customEventData) {
          //選擇數字
          console.log("選擇數字: " + customEventData);

          for (var i = 0; i < 10; i++) {
            this.UINode.children[i].getComponent(Button).normalSprite = this.numBtnSprite[btnStatus.notChoose];
            this.UINode.children[i].getComponent(Sprite).type = Sprite.Type.SLICED;
          }

          this.UINode.children[customEventData - 1].getComponent(Button).normalSprite = this.numBtnSprite[btnStatus.choose];
          this.UINode.children[customEventData - 1].getComponent(Sprite).type = Sprite.Type.SLICED;
          gVariable.nowChooseNumber = customEventData;

          if (customEventData == 10) {
            gVariable.checkModel = true;
          } else {
            gVariable.checkModel = false;
          }

          this.checkModel();
        };

        _proto.checkWin = function checkWin(choosePos, btnLabel, btnNode) {
          //檢查按下去的這格對不對
          var Xpos = choosePos % 9;
          var Ypos = Math.floor(choosePos / 9);
          nowNumMap[Ypos][Xpos] = gVariable.nowChooseNumber;
          console.log("該格的解答: " + levelAns[gVariable.nowLevel][Ypos][Xpos]);

          if (levelAns[gVariable.nowLevel][Ypos][Xpos] == gVariable.nowChooseNumber) {
            //正確
            console.log("correct");
            btnLabel.color = new Color(0, 255, 0, 255);
            btnNode.name = "correct";
          } else {
            //錯誤
            console.log("error");
            btnLabel.color = new Color(255, 0, 0, 255);
            errorTimes++;
            this.error.string = "錯誤次數" + errorTimes.toString() + " / 3";
            btnNode.name = "error";

            if (errorTimes == 3) {
              //錯3次輸了
              console.log("you lose");
              this.popUpNode = instantiate(this.popUp);
              this.popUpNode.getChildByName("bg").getChildByName("Label").getComponent(Label).string = gVariable.popUpText.lose;
              this.popUpNode.getChildByName("bg").getChildByName("Time").getComponent(Label).string = "cost time: " + this.time.string;
              this.node.addChild(this.popUpNode);
            }
          }

          for (var i = 0; i < blankArray.length; i++) {
            if (blankArray[i].name == "blank" || blankArray[i].name == "error") {
              //空格或是填寫錯誤
              return;
            }

            if (i == blankArray.length - 1) {
              //贏了
              console.log("you win");
              this.popUpNode = instantiate(this.popUp);
              this.popUpNode.getChildByName("bg").getChildByName("Label").getComponent(Label).string = gVariable.popUpText.win;
              this.popUpNode.getChildByName("bg").getChildByName("Time").getComponent(Label).string = "cost time: " + this.time.string;
              this.node.addChild(this.popUpNode);
            }
          }
        };

        _proto.checkModel = function checkModel() {
          //檢查模式
          if (gVariable.checkModel == true) {
            for (var i = 0; i < checkBlockArray.length; i++) {
              for (var j = 0; j < checkBlockArray[i].length; j++) {
                checkBlockArray[i][j].active = true;
                checkBlockArray[i][j].getComponent(Button).interactable = true;
                checkBlockArray[i][j].getComponent(Sprite).color = new Color(255, 0, 0, 0);
              }
            }
          } else {
            for (var i = 0; i < checkBlockArray.length; i++) {
              for (var j = 0; j < checkBlockArray[i].length; j++) {
                checkBlockArray[i][j].active = false;
                checkBlockArray[i][j].getComponent(Button).interactable = false;
              }
            }
          }
        };

        _proto.clickCheckBtn = function clickCheckBtn(event, customEventData) {
          console.log("click check: " + customEventData);
          console.log("MAP: " + nowNumMap);
          var Xpos = customEventData % 9;
          var Ypos = Math.floor(customEventData / 9);
          var num = nowNumMap[Ypos][Xpos];

          for (var i = 0; i < checkBlockArray.length; i++) {
            for (var j = 0; j < checkBlockArray[i].length; j++) {
              checkBlockArray[i][j].getComponent(Sprite).color = new Color(255, 0, 0, 0);
            }
          }

          if (num == ' ') return;

          for (var i = 0; i < 9; i++) {
            checkBlockArray[Ypos][i].getComponent(Sprite).color = new Color(0, 0, 255, 138);
            checkBlockArray[i][Xpos].getComponent(Sprite).color = new Color(0, 0, 255, 138);
          }

          for (var i = 0; i < checkBlockArray.length; i++) {
            for (var j = 0; j < checkBlockArray[i].length; j++) {
              if (num == nowNumMap[i][j]) {
                checkBlockArray[i][j].getComponent(Sprite).color = new Color(255, 0, 0, 138);
              }
            }
          }
        };

        _proto.closePopUI = function closePopUI() {
          this.node.removeChild(this.popUpNode);
          this.popUpNode.destroy();
          this.popUpNode = null;
          this.nextLevel();
        };

        _proto.nextLevel = function nextLevel() {
          if (errorTimes != 3) {
            gVariable.nowLevel++;
            this.title.string = "Level" + (gVariable.nowLevel + 1);
          }

          this.reset();
        };

        _proto.reset = function reset() {
          blankArray = [];
          checkBlockArray = [];
          nowNumMap = [];
          errorTimes = 0;
          this.error.string = "錯誤次數" + errorTimes.toString() + " / 3";
          this.elapsedTime = 0;
          this.table.removeAllChildren();
          this.createTopicNum();
          this.createTableBtn();
          this.createCheckBlock();
        };

        return game;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "error", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "time", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "table", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "topicNum", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "tableBtn", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "checkBlock", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "numBtnSprite", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "UINode", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "popUp", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/gVariable.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, EventTarget, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EventTarget = module.EventTarget;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "6a2fd7XjLNHa5fzJEa6qfQO", "gVariable", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var gVariable = exports('gVariable', (_dec = ccclass('gVariable'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(gVariable, _Component);

        function gVariable() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = gVariable.prototype;

        _proto.start = function start() {};

        _proto.update = function update(deltaTime) {};

        return gVariable;
      }(Component), _class2.eventTarget = new EventTarget(), _class2.checkModel = false, _class2.nowLevel = 0, _class2.nowChooseNumber = null, _class2.popUpText = {
        win: "your great you win",
        lose: "you lose try again"
      }, _class2.level1Ans = [//解答檢查用
      ["5", "3", "4", "6", "7", "8", "9", "1", "2"], ["6", "7", "2", "1", "9", "5", "3", "4", "8"], ["1", "9", "8", "3", "4", "2", "5", "6", "7"], ["8", "5", "9", "7", "6", "1", "4", "2", "3"], ["4", "2", "6", "8", "5", "3", "7", "9", "1"], ["7", "1", "3", "9", "2", "4", "8", "5", "6"], ["9", "6", "1", "5", "3", "7", "2", "8", "4"], ["2", "8", "7", "4", "1", "9", "6", "3", "5"], ["3", "4", "5", "2", "8", "6", "1", "7", "9"]], _class2.level1 = [//題目
      ["5", "3", " ", " ", "7", " ", " ", " ", " "], ["6", " ", " ", "1", "9", "5", " ", " ", " "], [" ", "9", "8", " ", " ", " ", " ", "6", " "], ["8", " ", " ", " ", "6", " ", " ", " ", "3"], ["4", " ", " ", "8", " ", "3", " ", " ", "1"], ["7", " ", " ", " ", "2", " ", " ", " ", "6"], [" ", "6", " ", " ", " ", " ", "2", "8", " "], [" ", " ", " ", "4", "1", "9", " ", " ", "5"], [" ", " ", " ", " ", "8", " ", " ", "7", "9"]], _class2.level2Ans = [//解答檢查用
      ["1", "7", "4", "5", "9", "3", "8", "2", "6"], ["9", "5", "2", "8", "1", "6", "3", "4", "7"], ["6", "3", "8", "2", "4", "7", "5", "9", "1"], ["2", "8", "6", "1", "5", "9", "4", "7", "3"], ["5", "1", "9", "7", "3", "4", "2", "6", "8"], ["7", "4", "3", "6", "8", "2", "9", "1", "5"], ["4", "9", "1", "3", "7", "5", "6", "8", "2"], ["3", "6", "7", "4", "2", "8", "1", "5", "9"], ["8", "2", "5", "9", "6", "1", "7", "3", "4"]], _class2.level2 = [//題目
      ["1", "7", " ", "5", " ", " ", "8", " ", " "], [" ", "5", "2", " ", "1", " ", " ", " ", " "], [" ", " ", " ", " ", " ", "7", "5", "9", " "], [" ", "8", " ", " ", " ", "9", "4", " ", "3"], [" ", "1", "9", "7", " ", "4", " ", " ", "8"], ["7", " ", " ", " ", " ", " ", " ", "1", "5"], ["4", " ", "1", " ", " ", " ", "6", " ", " "], ["3", " ", " ", " ", "2", " ", " ", "5", "9"], [" ", " ", " ", "9", "6", " ", " ", "3", " "]], _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './gVariable.ts', './game.ts', './popUp.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/popUp.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './gVariable.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component, gVariable;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      gVariable = module.gVariable;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "187eaKljNxMWqQXEy4VNdCU", "popUp", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var popUp = exports('popUp', (_dec = ccclass('popUp'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(popUp, _Component);

        function popUp() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = popUp.prototype;

        _proto.start = function start() {};

        _proto.update = function update(deltaTime) {};

        _proto.closeUI = function closeUI() {
          gVariable.eventTarget.emit("closePop", " ");
        };

        return popUp;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});