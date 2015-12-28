'use strict';

//
//https://wiki.openjdk.java.net/display/Nashorn/Nashorn+extensions
// load Java Objects
//var anArrayList = new Java.type("java.util.ArrayList")
// or
//var ArrayList = Java.type("java.util.ArrayList");         

//load("foo.js");                       // loads script from file "foo.js" from current directory
//load("http://www.example.com/t.js");  // loads script file from given URL

print("\n################# E X A M P L E S ##################\n");
oh.getLogger("E X A M P L E S");

var actionsTest = new Rule(){
    getEventTrigger: function(){
        oh.logDebug("getEventTrigger", "self:"+this);
        return [
            new TimerTrigger("0/15 * * * * ?")
        ];
    },
    execute: function(event){

        var action = oh.getActions();
        oh.logInfo("execute:"+__LINE__, "available actions: " + action.keySet());

        var action = oh.getActions();
        var actionArr = Java.from(action.keySet());
        oh.logInfo("execute:"+__LINE__, "available actions: " + action.keySet());

        for (var i=0; i<actionArr.length; i++) {
             oh.logInfo("execute:"+__LINE__, "Action: " +  oh.getAction(actionArr[i]));
        }

        var exec = oh.getAction("Exec");
        var tran = oh.getAction("Transformation");
        var mail = oh.getAction("Mail");
        var ping = oh.getAction("Ping");
        var transform = oh.getAction("Transformation").static.transform;
        var http = oh.getAction("HTTP");
        var audi = oh.getAction("Audio");
        var xmpp = oh.getAction("XMPP");

        oh.logInfo("execute:"+__LINE__, "Exec: " +  exec);
        oh.logInfo("execute:"+__LINE__, "Transformation: " + tran);
        oh.logInfo("execute:"+__LINE__, "Mail: " + mail);
        oh.logInfo("execute:"+__LINE__, "Ping: " + ping);
        oh.logInfo("execute:"+__LINE__, "HTTP: " + http);
        oh.logInfo("execute:"+__LINE__, "Audio: " + audi);
        oh.logInfo("execute:"+__LINE__, "XMPP: " + xmpp);

        oh.logInfo("TestRule", "internet reachable: " + (ping.static.checkVitality("google.com", 80, 100) ? "yes" : "no"));
        oh.logInfo("TestRule", "internet reachable: " + tran.static.transform("EXEC", "ls configurations/scripts",""));
        oh.logInfo("TestRule", "transform EXEC: " + tran.static.transform("EXEC", "ping 192.168.0.20",""));
        oh.logInfo("TestRule", "transform EXEC: " + transform("EXEC", "ping 192.168.0.20",""));
        oh.logInfo("TestRule", "transform EXEC: " + transform("EXEC", "ls configurations/scripts",""));

    }
};

var ohExample = new Rule(){
    getEventTrigger: function(){
        return [

            // E X A M P L E   T R I G G E R S
            //new ChangedEventTrigger("Heating_GF_Corridor", OnOffType.OFF, OnOffType.ON),
            //new ChangedEventTrigger("Heating_GF_Corridor"),
            //new CommandEventTrigger("Heating_GF_Corridor", OnOffType.ON),
            //new EventTrigger(),
            //new ShutdownTrigger(),
            //new StartupTrigger(),
            //new TimerTrigger("0 0/15 * * * ?")

            new TimerTrigger("0/15 * * * * ?")
        ];
    },
    execute: function(event){

        // E X A M P L E S   L O G G I N G
        print("\n################# E X A M P L E S   L O G G I N G ##################\n");
        oh.logDebug("execute::"+__LINE__,"event received "+event);
        oh.logInfo("execute:"+__LINE__, ir.getItem("Temperature_GF_Kitchen").toString());
        oh.logInfo("execute:"+__LINE__, ir.getItem("Heating_GF_Corridor").toString());
        oh.logInfo("execute::DateTime:"+__LINE__, DateTime.now().minusMinutes(30));

        // E X A M P L E S   I T E M S
        var Temperature_GF_Kitchen = ir.getItem('Temperature_GF_Kitchen');
        be.postUpdate("Temperature_GF_Kitchen", getRanTemp());
        be.postUpdate("Temperature_GF_Kitchen", getRanTemp());
        be.sendCommand("Temperature_GF_Kitchen", getRanTemp());
        oh.logInfo("execute:"+__LINE__, Temperature_GF_Kitchen.toString());
        oh.logInfo("execute::item:"+__LINE__, Temperature_GF_Kitchen);
        oh.logInfo("execute::PersistenceExtensions :"+__LINE__, "Temperature_GF_Kitchen in the past: "+pe.changedSince(Temperature_GF_Kitchen,DateTime.now().minusMinutes(10)));

        var Heating_GF_Corridor = ir.getItem('Heating_GF_Corridor');
        if(Heating_GF_Corridor.state.toString() == "Uninitialized"){
            oh.logInfo("execute:"+__LINE__, "Heating_GF_Corridor is 'Uninitialized' "+Heating_GF_Corridor.toString());
        }
        be.postUpdate("Heating_GF_Corridor", randomIntFromInterval(0,1) < 1 ? "OFF":"ON");
    }
};

// E X A M P L E   T O   G E T   A L L   I T E M S
var autoOffRule = new Rule() {
    getEventTrigger: function() {
        return [
            new TimerTrigger("0/15 * * * * ?")
        ];
    }, 
    execute: function(event) {
        oh.logDebug("execute"+__LINE__,"autoOffRule");
        var allItems = ir.getItems();
        for each(var nextItem in allItems) {
            if (nextItem.getState() == OnOffType.ON) {
                var dt = DateTime.now().minusMinutes(5);
                print(" #### 1. nextItem changedSince:" + pe.changedSince(nextItem, dt));
                if (!(pe.changedSince(nextItem, dt))) {
                    print(" #### 2. Do something with " + nextItem.getName());
                }
            }else{
                print(" #### 3. nextItem Name: " + nextItem.getName());
            }
        }
    }
};

// H E L P E R S 
var getRanTemp = function(){
    return randomIntFromInterval(-20,40);
}
function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// E N A B L E   R U L E S 
//function getRules(){return new RuleSet([ohExample, actionsTest]);}