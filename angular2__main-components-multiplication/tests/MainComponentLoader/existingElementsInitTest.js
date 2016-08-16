describe("Existing elements initialisation:", function() {
    
    var loader = null,
        containerElem = null,
        innerContainerElem = null;
    
    
    describe("For a single component", function() {
        
        beforeEach(function(done) {
            initSingleComponentTestDom();
            containerElem = document.getElementById("container"),
            innerContainerElem = document.getElementById("inner-container"),
            
            // init existing components and wait untill they are fully initialised
            loader = getFirstComponentLoader();
            loader.initAlreadyAppended();
            waitForSignal(loader.getInitEndSignalName())
                .on(document)
                .then(function() {
                    done();
                });
        });
        
        
        it("All already attached 'first component' elements are correctly initialized", function() {
            var elems = document.getElementsByTagName(FIRST_COMPONENT_TAG_NAME);
            expect(elems.length).toEqual(3);
            for (var idx = 0; idx < elems.length; idx++) {
                expect(elems[idx].innerHTML).toEqual(INITIALIZED_FIRST_COMPONENT_HTML);
            }
        });


        it("All already attached 'first component' elements are initialized in proper parent and on proper children position", function() {
            var expectedParents = [containerElem, innerContainerElem, containerElem],
                expectedPositions = [1, 0, 3],
                expectedAttrIds = ["1", "2", "3"];

            var elems = document.getElementsByTagName(FIRST_COMPONENT_TAG_NAME);
            expect(elems.length).toEqual(3);
            for (var idx = 0; idx < elems.length; idx++) {
                var el = elems[idx];
                expect(el.id).toEqual(expectedAttrIds[idx]);
                expect(el.parentNode).toEqual(expectedParents[idx]);
                expect(getPos(el)).toEqual(expectedPositions[idx]);
            }
        });
    });
    
    
    describe("For multiple component", function() {
        
        beforeEach(function(done) {
            initMultipleComponentTestDom();
            containerElem = document.getElementById("container");
            innerContainerElem = document.getElementById("inner-container");
            
            // init existing components and wait untill they are fully initialised
            loader = getFirstAndSecondComponentsLoader();
            loader.initAlreadyAppended();
            waitForSignal(loader.getInitEndSignalName())
                .on(document)
                .then(function() {
                    done();
                });
        });
    
    
        it("All already attached elements (from different components) are correctly initialized", function() {
            var elems = document.getElementsByTagName(FIRST_COMPONENT_TAG_NAME);
            expect(elems.length).toEqual(3);
            for (var idx = 0; idx < elems.length; idx++) {
                expect(elems[idx].innerHTML).toEqual(INITIALIZED_FIRST_COMPONENT_HTML);
            }
            elems = document.getElementsByTagName(SECOND_COMPONENT_TAG_NAME);
            expect(elems.length).toEqual(3);
            for (var idx = 0; idx < elems.length; idx++) {
                expect(elems[idx].innerHTML).toEqual(INITIALIZED_SECOND_COMPONENT_HTML);
            }
        });


        it("All already attached elements (from different components) are initialized in proper parent and on proper children position", function() {
            var expectedFirstComponentParents = [containerElem, innerContainerElem, containerElem],
                expectedFirstComponentPositions = [2, 0, 4],
                expectedFirstComponentAttrIds = ["f1", "f2", "f3"],
                expectedSecondComponentParents = [containerElem, innerContainerElem, containerElem],
                expectedSecondComponentPositions = [1, 2, 5],
                expectedSecondComponentAttrIds = ["s1", "s2", "s3"];
                
            var elems = document.getElementsByTagName(FIRST_COMPONENT_TAG_NAME);
            for (var idx = 0; idx < elems.length; idx++) {
                var el = elems[idx];
                expect(el.id).toEqual(expectedFirstComponentAttrIds[idx]);
                expect(el.parentNode).toEqual(expectedFirstComponentParents[idx]);
                expect(getPos(el)).toEqual(expectedFirstComponentPositions[idx]);
            }
            elems = document.getElementsByTagName(SECOND_COMPONENT_TAG_NAME);
            expect(elems.length).toEqual(3);
            for (var idx = 0; idx < elems.length; idx++) {
                var el = elems[idx];
                expect(el.id).toEqual(expectedSecondComponentAttrIds[idx]);
                expect(el.parentNode).toEqual(expectedSecondComponentParents[idx]);
                expect(getPos(el)).toEqual(expectedSecondComponentPositions[idx]);
            }
        });
    });
});