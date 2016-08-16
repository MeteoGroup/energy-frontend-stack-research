package widget

import "testing"
import "flag"
import "os"
import "io/ioutil"
import "github.com/stretchr/testify/assert"


var widgetClass string = "TestWidget"
var widgetId int = 10


func afterEach() {
    removeWidgetFile()
}


func TestMain(m *testing.M) {
    flag.Parse()
    res := m.Run()
    afterEach()
    os.Exit(res)
}


func TestWidgetFileDoesNotExistOnFirstCall(t *testing.T) {
    // arrange
    widgetPath := ComposeWidgetFilePath(widgetClass, widgetId)
    // act
    fileExists := widgetFileExists(widgetPath)
    // assert
    assert.Equal(t, fileExists, false)
}


func TestWidgetFileExistsAfterInit(t *testing.T) {
    // arrange
    widgetPath := ComposeWidgetFilePath(widgetClass, widgetId)
    // act
    prepareWidgetFile(widgetClass, widgetId)
    fileExists := widgetFileExists(widgetPath)
    // assert
    assert.Equal(t, fileExists, true)
}


func TestReturnsCorrectWidgetUrl(t *testing.T) {
    // arrange
    expectedUrl := "/asset/widgets/TestWidget10.js"
    // act
    givernUrl := ComposeWidgetUrl(widgetClass, widgetId)
    // assert
    assert.Equal(t, givernUrl, expectedUrl)
}


type SelectorTestCase struct {
    WidgetClass string
    SelectorTag string
}


func TestCreatesCorrectWidgetSelectorTag(t *testing.T) {
    // arrange
    testSelectorTags := []SelectorTestCase {
        SelectorTestCase {
            WidgetClass: "",
            SelectorTag: "",
        },
        SelectorTestCase {
            WidgetClass: "test",
            SelectorTag: "test",
        },
        SelectorTestCase {
            WidgetClass: "Test",
            SelectorTag: "test",
        },
        SelectorTestCase {
            WidgetClass: "TestWidget",
            SelectorTag: "test-widget",
        },
        SelectorTestCase {
            WidgetClass: "TestWidget10",
            SelectorTag: "test-widget10",
        },
        SelectorTestCase {
            WidgetClass: "TestWidgetA",
            SelectorTag: "test-widget-a",
        },
    }
    for _, testCase := range testSelectorTags {
        // act
        givenSelectorTag := getWidgetSelectorTag(testCase.WidgetClass)
        // assert
        assert.Equal(t, givenSelectorTag, testCase.SelectorTag)
    }
}


func TestWritesCorrectCodeIntoWidgetFile(t *testing.T) {
    // arrange
    widgetPath := ComposeWidgetFilePath(widgetClass, widgetId)
    expectedWidgetCode := 
        "\"use strict\";\n" +
        "var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n" +
            "var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n" +
            "if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n" +
            "else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n" +
            "return c > 3 && r && Object.defineProperty(target, key, r), r;\n" +
        "};\n" +
        "var __metadata = (this && this.__metadata) || function (k, v) {\n" +
            "if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n" +
        "};\n" +
        "var core_1 = require('@angular/core');\n" +
        "var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');\n" +
        "var tmp_TestWidget_10 = require('app/TestWidget');\n" +
        "var TestWidget_10 = (function () {\n" +
            "function TestWidget_10() {\n" +
            "}\n" +
            "TestWidget_10 = __decorate([\n" +
                "core_1.Component({\n" +
                    "selector: 'test-widget-10',\n" +
                    "template: '<test-widget></test-widget>',\n" +
                    "directives: [tmp_TestWidget_10.TestWidget]\n" +
                "}), \n" +
                "__metadata('design:paramtypes', [])\n" +
            "], TestWidget_10);\n" +
            "return TestWidget_10;\n" +
        "}());\n" +
        "exports.TestWidget_10 = TestWidget_10;\n" +
        "platform_browser_dynamic_1.bootstrap(TestWidget_10);\n";
    // act
    prepareWidgetFile(widgetClass, widgetId)
    givenWidgetCode, _ := ioutil.ReadFile(widgetPath)
    // assert
    assert.Equal(t, string(givenWidgetCode), expectedWidgetCode)
}


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
func removeWidgetFile() {
    widgetPath := ComposeWidgetFilePath(widgetClass, widgetId)
    err := os.Remove(widgetPath)
    if err != nil {
        panic(err)
    }
}