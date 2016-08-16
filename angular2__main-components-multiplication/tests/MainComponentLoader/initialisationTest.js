describe("Initialisation:", function() {

    var validModuleData = null;


    beforeEach(function() {
        validModuleData = {
            tagName: FIRST_COMPONENT_TAG_NAME,
            module: squareComponentModule
        };
    });


    it("Throws error when 'MainComponentLoader' receives an invalid or empty array with modules' information", function() {
        var modulesData = [null, undefined, "abc", 1, {}, [], validModuleData];
        for (var idx = 0; idx < modulesData.length; idx++) {
            expect(function() {
                new MainComponentLoader(bootstrap, modulesData[idx]);
            }).toThrow(MainComponentLoader.prototype.MODULES_DATA_ARRAY_REQUIRED);
        }
    });

    
    it("Throws error when 'MainComponentLoader' does not receive a valid tag name (non-empty string)", function() {
        var tagNames = [null, undefined, 1, "", "\t"];
        for (var idx = 0; idx < tagNames.length; idx++) {
            var modulesData = [{
                tagName: tagNames[idx],
                module: squareComponentModule
            }];
            expect(function() {
                new MainComponentLoader(bootstrap, modulesData);
            }).toThrow(MainComponentLoader.prototype.TAG_NAME_REQUIRED);
        }
    });


    it("Throws error when 'MainComponentLoader' does not receive a valid bootstrap (function)", function() {
        var bootstraps = [null, undefined, 1, "", "\t", "abc", {}, [1]],
            modulesData = [validModuleData];
        for (var idx = 0; idx < bootstraps.length; idx++) {
            var _bootstrap = bootstraps[idx];
            expect(function() {
                new MainComponentLoader(_bootstrap, modulesData);
            }).toThrow(MainComponentLoader.prototype.BOOTSTRAP_REQUIRED);
        }
    });


    it("Throws error when 'MainComponentLoader' does not receive a valid module (function)", function() {
        var modules = [null, undefined, 1, "", "\t", "abc", {}, [1]];
        for (var idx = 0; idx < modules.length; idx++) {
            var modulesData = [{
                tagName: FIRST_COMPONENT_TAG_NAME,
                module: modules[idx]
            }];
            expect(function() {
                new MainComponentLoader(bootstrap, modulesData);
            }).toThrow(MainComponentLoader.prototype.MODULE_REQUIRED);
        }
    });


    it("Initializes 'MainComponentLoader' when valid tag name, bootstrap and module have been provided", function() {
        var modulesData = [validModuleData];
        expect(function() {
            new MainComponentLoader(bootstrap, modulesData);
        }).not.toThrow();
    });


    it("Returns correct initialization complete signal name", function() {
        var modulesData = [validModuleData],
            expectedInitEndEventName = "components-init-complete";

        var loader = new MainComponentLoader(bootstrap, modulesData),
            givenEventName = loader.getInitEndSignalName();

        expect(givenEventName).toEqual(expectedInitEndEventName);
    });
});
