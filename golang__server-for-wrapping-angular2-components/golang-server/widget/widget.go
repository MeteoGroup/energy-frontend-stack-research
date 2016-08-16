package widget

import "os"
import "fmt"
import "net/http"
import "io/ioutil"
import "strconv"
import "strings"
import "flag"
import "unicode"
import "github.com/amisiuda/<<REPO_NAME>>/errors"


var widgetsPath = flag.String("widgetsPath", "public/widgets/", "...")


func ServeWidgetFilePath(w http.ResponseWriter, r *http.Request) {
    defer errors.CheckFor(w)
    widgetClass, widgetId := GetWidgetDataFromRequest(r)
    prepareWidgetFile(widgetClass, widgetId)
    widgetUrl := ComposeWidgetUrl(widgetClass, widgetId)
    w.Header().Set("Content-Type", "text/plain")
    fmt.Fprintf(w, widgetUrl)
}


func prepareWidgetFile(widgetClass string, widgetId int)(string) {
    widgetPath := ComposeWidgetFilePath(widgetClass, widgetId)
    if !widgetFileExists(widgetPath) {
        createWidgetFile(widgetClass, widgetId)
    }
    return widgetPath
}


func widgetFileExists(widgetPath string)(bool) {
    if _, err := os.Stat(widgetPath); os.IsNotExist(err) {
        return false;
    }
    return true
}


func createWidgetFile(widgetClass string, widgetId int) {
    widgetPath := ComposeWidgetFilePath(widgetClass, widgetId)
    widgetCode := GetWidgetWrapperCode(widgetClass, widgetId)
    writeWidgetFile(widgetPath, widgetCode)
}


func writeWidgetFile(widgetPath string, widgetCode []byte) {
    err := ioutil.WriteFile(widgetPath, widgetCode, 0644)
    if err != nil {
        panic(err)
    }
}


func ComposeWidgetFilePath(widgetClass string, widgetId int)(string) {
    return *widgetsPath + widgetClass + strconv.Itoa(widgetId) + ".js";
}


func ComposeWidgetUrl(widgetClass string, widgetId int)(string) {
    return "/asset/widgets/" + widgetClass + strconv.Itoa(widgetId) + ".js";
}


func getWidgetSelectorTag(widgetClass string)(string) {
    selectorTag := ""
    // solution based on code from http://grokbase.com/t/gg/golang-nuts/132h4ymg13/go-nuts-split-string-on-upper-case-characters
    l := 0
    for s := widgetClass; s != ""; s = s[l:] {
        l = strings.IndexFunc(s[1:], unicode.IsUpper) + 1
        if l <= 0 {
            l = len(s)
        }
        selectorTag = selectorTag + "-" + strings.ToLower(s[:l])
    }
    return strings.Trim(selectorTag, "-")
}


func GetWidgetWrapperCode(widgetClass string, widgetId int)([]byte) {
    wId := strconv.Itoa(widgetId)
    tmpClass := "tmp_" + widgetClass + "_" + wId
    wrapperClass := widgetClass + "_" + wId
    selectorTag := getWidgetSelectorTag(widgetClass)
    buff := []byte(
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
        "var " + tmpClass + " = require('app/" + widgetClass + "');\n" +
        "var " + wrapperClass + " = (function () {\n" +
            "function " + wrapperClass + "() {\n" +
            "}\n" +
            "" + wrapperClass + " = __decorate([\n" +
                "core_1.Component({\n" +
                    "selector: '" + selectorTag + "-" + wId + "',\n" +
                    "template: '<" + selectorTag + "></" + selectorTag + ">',\n" +
                    "directives: [" + tmpClass + "." + widgetClass + "]\n" +
                "}), \n" +
                "__metadata('design:paramtypes', [])\n" +
            "], " + wrapperClass + ");\n" +
            "return " + wrapperClass + ";\n" +
        "}());\n" +
        "exports." + wrapperClass + " = " + wrapperClass + ";\n" +
        "platform_browser_dynamic_1.bootstrap(" + wrapperClass + ");\n",
    );
    return buff
}
