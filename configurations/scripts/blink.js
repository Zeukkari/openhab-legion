'use strict';
var timer;

print("\n################# Using lights as visual feedback ##################\n");
oh.getLogger("LEGION - VISUAL FEEDBACK ---");

var testButtonBehaviour = new Rule(){
    getEventTrigger: function(){
        return [
            new CommandEventTrigger("TestButton", null)
        ];
    },

    execute: function(event){
        oh.logInfo("Event triggered!", "Fuubar buubasd");
        blinkRed("Color_1");
        oh.createTimer(DateTime.now().plusSeconds(2), function() {
            blinkGreen("Color_1");
        });
        blinkRed("Color_2");
        oh.createTimer(DateTime.now().plusSeconds(2), function() {
            blinkGreen("Color_2");
        });
        blinkRed("Color_3");
        oh.createTimer(DateTime.now().plusSeconds(2), function() {
            blinkGreen("Color_3");
        });
    }
};

var doorSensorTrigger = new Rule(){
    getEventTrigger: function(){
        return [
            new ChangedEventTrigger("Door1", null, null)
        ];
    },

    execute: function(event){
        oh.logInfo("Event triggered!", "Door sensor");
        blinkRed("Color_2");
    }
};

var proximitySensorTrigger = new Rule(){
    getEventTrigger: function(){
        return [
            new ChangedEventTrigger("ProximitySensor", null, null)
        ];
    },

    execute: function(event){
        oh.logInfo("Event triggered!", "Door sensor");
        blinkRed("Color_3");
    }
};

// This doesn't work.. transformations missing?
function setColor(hueName, colorString) {
    var colorMapping = {
        green: "125,100,100",
        black: "0,0,0",
        red: "255,100,100",
        blue: "0,100,100"
    }
    if(colorMapping[colorString]) {
        var hue = ir.getItemByPattern(hueName);
        be.sendCommand(colorMapping[colorString]);
    }
}

function blinkRed(hueName) {
    oh.logInfo("Blink Hue: ", hueName);
    var hue = ir.getItemByPattern(hueName);
    var orginalColor = hue.state
    be.sendCommand(hue, "0,100,100");
    timer = oh.createTimer(DateTime.now().plusSeconds(2), function() {
        oh.logInfo("Blink Hue Up", hue);
        be.sendCommand(hue, orginalColor);
    });
}

function blinkGreen(hueName) {
    oh.logInfo("Blink Hue: ", hueName);
    var hue = ir.getItemByPattern(hueName);
    var orginalColor = hue.state
    be.sendCommand(hue, "125,100,100");
    timer = oh.createTimer(DateTime.now().plusSeconds(2), function() {
        oh.logInfo("Blink Hue Up", hue);
        be.sendCommand(hue, orginalColor);
    });
}

function getRules(){return new RuleSet([testButtonBehaviour, proximitySensorTrigger, doorSensorTrigger]);}
