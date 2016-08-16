describe("Dynamically added elements initialisation:", function() {
        
    var firstElementId100 = null,
        secondElementId200 = null,
        containerElem = null,
        firstElementId101 = null,
        secondElementId201 = null,
        innerContainerElem = null,
        loader = null,
        endEventName = null;
        
        
    beforeEach(function() {
        clearTestDom();
        containerElem = document.getElementById("container");

        firstElementId100 = document.createElement(FIRST_COMPONENT_TAG_NAME);
        firstElementId101 = document.createElement(FIRST_COMPONENT_TAG_NAME);
        firstElementId100.id = "elem-100";
        firstElementId101.id = "elem-101";

        secondElementId200 = document.createElement(SECOND_COMPONENT_TAG_NAME);
        secondElementId201 = document.createElement(SECOND_COMPONENT_TAG_NAME);
        secondElementId200.id = "elem-200";
        secondElementId201.id = "elem-201";
    });
    
    
    describe("Added into an empty DOM", function() {
        
        
        it("New element added dynamically will be sucessfully initialized", function(done) {
            loader = getFirstComponentLoader();
            
            loader.addComponent({
                element: firstElementId100,
                parentElem: containerElem,
                tagName: FIRST_COMPONENT_TAG_NAME,
                module: squareComponentModule
            });

            waitForSignal(loader.getInitEndSignalName())
                .on(document)
                .then(function() {
                    expect(firstElementId100.innerHTML).toEqual(INITIALIZED_FIRST_COMPONENT_HTML);
                    done();
                });
        });
    
    
        it("Multiple new elements with different tag names added dynamically \"at the same time\" will be sucessfully initialized in the proper parents and at the proper positions", function(done) {
            loader = getFirstAndSecondComponentsLoader();

            loader.addComponent({
                element: firstElementId100,
                parentElem: containerElem,
                tagName: FIRST_COMPONENT_TAG_NAME,
                module: squareComponentModule,
                pos: 0 // will be added at position 3 (because three elements afert this one will be added)
            });
            loader.addComponent({
                element: secondElementId200,
                parentElem: containerElem,
                tagName: SECOND_COMPONENT_TAG_NAME,
                module: circleComponentModule,
                pos: 0 // will be added at position 2
            });
            loader.addComponent({
                element: firstElementId101,
                parentElem: containerElem,
                tagName: FIRST_COMPONENT_TAG_NAME,
                module: squareComponentModule,
                pos: 0 // will be added at position 1
            });
            loader.addComponent({
                element: secondElementId201,
                parentElem: containerElem,
                tagName: SECOND_COMPONENT_TAG_NAME,
                module: circleComponentModule,
                pos: 0
            });

            waitForSignal(loader.getInitEndSignalName())
                .on(document)
                .then(function() {
                    expect(firstElementId100.innerHTML).toEqual(INITIALIZED_FIRST_COMPONENT_HTML);
                    expect(firstElementId100.parentNode).toEqual(containerElem);
                    expect(getPos(firstElementId100)).toEqual(3);
                    
                    expect(firstElementId101.innerHTML).toEqual(INITIALIZED_FIRST_COMPONENT_HTML);
                    expect(firstElementId101.parentNode).toEqual(containerElem);
                    expect(getPos(firstElementId101)).toEqual(1);
                    
                    expect(secondElementId200.innerHTML).toEqual(INITIALIZED_SECOND_COMPONENT_HTML);
                    expect(secondElementId200.parentNode).toEqual(containerElem);
                    expect(getPos(secondElementId200)).toEqual(2);
                    
                    expect(secondElementId201.innerHTML).toEqual(INITIALIZED_SECOND_COMPONENT_HTML);
                    expect(secondElementId201.parentNode).toEqual(containerElem);
                    expect(getPos(secondElementId201)).toEqual(0);
                    
                    done();
                });
        });
        
    });
    
    
    describe("Added into a DOM with initial elements which are already initialised", function() {
            
    
        beforeEach(function(done) {
            initSingleComponentTestDom();
            containerElem = document.getElementById("container");
            innerContainerElem = document.getElementById("inner-container");
            
            loader = getFirstAndSecondComponentsLoader();
            endEventName = loader.getInitEndSignalName();
            
            // init existing elements and wait untill initialisation end
            loader.initAlreadyAppended();
            waitForSignal(endEventName)
                .on(document)
                .then(function() {
                    done();
                });
        });
        
        
        it("Multiple new elements with different tag name added dynamically \"at the same time\" will be sucessfully initialized in the proper parent and at the proper positions", function(done) {
            loader.addComponent({
                element: firstElementId100,
                parentElem: containerElem,
                tagName: FIRST_COMPONENT_TAG_NAME,
                module: squareComponentModule,
                pos: 0
            });
            loader.addComponent({
                element: secondElementId200,
                parentElem: containerElem,
                tagName: SECOND_COMPONENT_TAG_NAME,
                module: circleComponentModule,
                pos: 0
            });
            loader.addComponent({
                element: firstElementId101,
                parentElem: innerContainerElem,
                tagName: FIRST_COMPONENT_TAG_NAME,
                module: squareComponentModule,
                pos: 0
            });
            loader.addComponent({
                element: secondElementId201,
                parentElem: containerElem,
                tagName: SECOND_COMPONENT_TAG_NAME,
                module: circleComponentModule,
                pos: 0
            });

            waitForSignal(endEventName)
                .on(document)
                .then(function() {
                    expect(firstElementId100.innerHTML).toEqual(INITIALIZED_FIRST_COMPONENT_HTML);
                    expect(firstElementId100.parentNode).toEqual(containerElem);
                    expect(getPos(firstElementId100)).toEqual(2);
                    
                    expect(firstElementId101.innerHTML).toEqual(INITIALIZED_FIRST_COMPONENT_HTML);
                    expect(firstElementId101.parentNode).toEqual(innerContainerElem);
                    expect(getPos(firstElementId101)).toEqual(0);
                    
                    expect(secondElementId200.innerHTML).toEqual(INITIALIZED_SECOND_COMPONENT_HTML);
                    expect(secondElementId200.parentNode).toEqual(containerElem);
                    expect(getPos(secondElementId200)).toEqual(1);
                    
                    expect(secondElementId201.innerHTML).toEqual(INITIALIZED_SECOND_COMPONENT_HTML);
                    expect(secondElementId201.parentNode).toEqual(containerElem);
                    expect(getPos(secondElementId201)).toEqual(0);
                    
                    done();
                });
        });
        
        
        it("Correctly initializes new elements at a given position where each element is being added AFTER previous one is fully initialized", function(done) {
            loader.addComponent({
                element: firstElementId100,
                parentElem: containerElem,
                tagName: FIRST_COMPONENT_TAG_NAME,
                module: squareComponentModule,
                pos: 0
            });
            waitForSignal(endEventName)
                .on(document)
                .then(function() {
                    loader.addComponent({
                        element: secondElementId200,
                        parentElem: containerElem,
                        tagName: SECOND_COMPONENT_TAG_NAME,
                        module: circleComponentModule,
                        pos: 0
                    });
                    waitForSignal(endEventName)
                        .on(document)
                        .then(function() {
                            loader.addComponent({
                                element: firstElementId101,
                                parentElem: innerContainerElem,
                                tagName: FIRST_COMPONENT_TAG_NAME,
                                module: squareComponentModule,
                                pos: 0
                            });
                            waitForSignal(endEventName)
                                .on(document)
                                .then(function() {
                                    loader.addComponent({
                                        element: secondElementId201,
                                        parentElem: containerElem,
                                        tagName: SECOND_COMPONENT_TAG_NAME,
                                        module: circleComponentModule,
                                        pos: 0
                                    });
                                    // wait for new component init end
                                    waitForSignal(endEventName)
                                        .on(document)
                                        .then(function() {
                                            expect(firstElementId100.innerHTML).toEqual(INITIALIZED_FIRST_COMPONENT_HTML);
                                            expect(firstElementId100.parentNode).toEqual(containerElem);
                                            expect(getPos(firstElementId100)).toEqual(2);

                                            expect(firstElementId101.innerHTML).toEqual(INITIALIZED_FIRST_COMPONENT_HTML);
                                            expect(firstElementId101.parentNode).toEqual(innerContainerElem);
                                            expect(getPos(firstElementId101)).toEqual(0);

                                            expect(secondElementId200.innerHTML).toEqual(INITIALIZED_SECOND_COMPONENT_HTML);
                                            expect(secondElementId200.parentNode).toEqual(containerElem);
                                            expect(getPos(secondElementId200)).toEqual(1);

                                            expect(secondElementId201.innerHTML).toEqual(INITIALIZED_SECOND_COMPONENT_HTML);
                                            expect(secondElementId201.parentNode).toEqual(containerElem);
                                            expect(getPos(secondElementId201)).toEqual(0);

                                            done();
                                    });
                            });
                    });
            });
        });
    });
    
    
    describe("Added into a DOM with initial elements which are not yet initialised", function() {
        
        
        beforeEach(function() {
            initSingleComponentTestDom();
            containerElem = document.getElementById("container");
            innerContainerElem = document.getElementById("inner-container");
            
            loader = getFirstAndSecondComponentsLoader();
            endEventName = loader.getInitEndSignalName();
        });
        
        
        it("Multiple new elements with different tag name added dynamically \"at the same time\" will be sucessfully initialized in the proper parent and at the proper positions", function(done) {
            loader.initAlreadyAppended();
            
            loader.addComponent({
                element: firstElementId100,
                parentElem: containerElem,
                tagName: FIRST_COMPONENT_TAG_NAME,
                module: squareComponentModule,
                pos: 0
            });
            loader.addComponent({
                element: secondElementId200,
                parentElem: containerElem,
                tagName: SECOND_COMPONENT_TAG_NAME,
                module: circleComponentModule,
                pos: 0
            });
            loader.addComponent({
                element: firstElementId101,
                parentElem: innerContainerElem,
                tagName: FIRST_COMPONENT_TAG_NAME,
                module: squareComponentModule,
                pos: 0
            });
            loader.addComponent({
                element: secondElementId201,
                parentElem: containerElem,
                tagName: SECOND_COMPONENT_TAG_NAME,
                module: circleComponentModule,
                pos: 0
            });

            waitForSignal(endEventName)
                .on(document)
                .then(function() {
                    expect(firstElementId100.innerHTML).toEqual(INITIALIZED_FIRST_COMPONENT_HTML);
                    expect(firstElementId100.parentNode).toEqual(containerElem);
                    expect(getPos(firstElementId100)).toEqual(2);
                    
                    expect(firstElementId101.innerHTML).toEqual(INITIALIZED_FIRST_COMPONENT_HTML);
                    expect(firstElementId101.parentNode).toEqual(innerContainerElem);
                    expect(getPos(firstElementId101)).toEqual(0);
                    
                    expect(secondElementId200.innerHTML).toEqual(INITIALIZED_SECOND_COMPONENT_HTML);
                    expect(secondElementId200.parentNode).toEqual(containerElem);
                    expect(getPos(secondElementId200)).toEqual(1);
                    
                    expect(secondElementId201.innerHTML).toEqual(INITIALIZED_SECOND_COMPONENT_HTML);
                    expect(secondElementId201.parentNode).toEqual(containerElem);
                    expect(getPos(secondElementId201)).toEqual(0);
                    
                    done();
                });
        });
    });
});