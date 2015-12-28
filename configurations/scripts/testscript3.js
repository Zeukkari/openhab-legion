'use strict';


print("\n################# Legion rules ##################\n");
oh.getLogger("LEGION - TESTING ---");

var actionsTest = new Rule(){
    getEventTrigger: function(){
        oh.logDebug("getEventTrigger", "self:"+this);
        return [
            new TimerTrigger("* * * * * ?"),
            new StartupTrigger()
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
        var ping = oh.getAction("Ping");
        var transform = oh.getAction("Transformation").static.transform;
        var http = oh.getAction("HTTP");

        oh.logInfo("execute:"+__LINE__, "Exec: " +  exec);
        oh.logInfo("execute:"+__LINE__, "Transformation: " + tran);
        oh.logInfo("execute:"+__LINE__, "Ping: " + ping);
        oh.logInfo("execute:"+__LINE__, "HTTP: " + http);

        oh.logInfo("TestRule", "Internet reachable: " + (ping.static.checkVitality("google.com", 80, 100) ? "yes" : "no"));
        oh.logInfo("TestRule", "LAN reachable: " + (ping.static.checkVitality("192.168.1.1", 80, 100) ? "yes" : "no"));
        oh.logInfo("TestRule", "transform EXEC: " + tran.static.transform("EXEC", "ping 192.168.1.1",""));
        oh.logInfo("TestRule", "transform EXEC: " + transform("EXEC", "ping 192.168.1.1",""));
        oh.logInfo("TestRule", "transform EXEC: " + transform("EXEC", "ls configurations/scripts",""));

        oh.logInfo("TestRule", "transform EXEC: " + transform("EXEC", "/opt/castnow_control/castnow_watchdog.sh",""));

    }
};


var ohExample = new Rule(){
    getEventTrigger: function(){
        return [

            // E X A M P L E   T R I G G E R S
            new CommandEventTrigger("gLights", OnOffType.ON),
            new CommandEventTrigger("gLights", OnOffType.OFF),
        ];
    },
    execute: function(event){

        // E X A M P L E S   L O G G I N G
        print("\n################# Legion test rule results: ##################\n");
        oh.logDebug("execute::"+__LINE__,"event received "+event);
        //oh.logInfo("execute:"+__LINE__, ir.getItem("Temperature_GF_Kitchen").toString());
        //oh.logInfo("execute:"+__LINE__, ir.getItem("Heating_GF_Corridor").toString());
        //oh.logInfo("execute::DateTime:"+__LINE__, DateTime.now().minusMinutes(30));

        // E X A M P L E S   I T E M S
        // var Temperature_GF_Kitchen = ir.getItem('Temperature_GF_Kitchen');
        // be.postUpdate("Temperature_GF_Kitchen", getRanTemp());
        // be.postUpdate("Temperature_GF_Kitchen", getRanTemp());
        // be.sendCommand("Temperature_GF_Kitchen", getRanTemp());
        // oh.logInfo("execute:"+__LINE__, Temperature_GF_Kitchen.toString());
        // oh.logInfo("execute::item:"+__LINE__, Temperature_GF_Kitchen);
        // oh.logInfo("execute::PersistenceExtensions :"+__LINE__, "Temperature_GF_Kitchen in the past: "+pe.changedSince(Temperature_GF_Kitchen,DateTime.now().minusMinutes(10)));

        // var Heating_GF_Corridor = ir.getItem('Heating_GF_Corridor');
        // if(Heating_GF_Corridor.state.toString() == "Uninitialized"){
        //     oh.logInfo("execute:"+__LINE__, "Heating_GF_Corridor is 'Uninitialized' "+Heating_GF_Corridor.toString());
        // }
        // be.postUpdate("Heating_GF_Corridor", randomIntFromInterval(0,1) < 1 ? "OFF":"ON");
    }
};

function getRules(){return new RuleSet([actionsTest,ohExample]);}