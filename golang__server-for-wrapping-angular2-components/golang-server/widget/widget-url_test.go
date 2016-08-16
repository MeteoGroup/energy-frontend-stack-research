package widget

import "testing"
import "net/http"
import "github.com/stretchr/testify/assert"
import "github.com/amisiuda/<<REPO_NAME>>/assertw"


func TestPanicsOnIncorrectUrl(t *testing.T) {
    failingTestCases := []string {
        "/",
        "/getwidgeturl/",
        "/getwidgeturl/WidgetA",
        "/getwidgeturl/WidgetA/id",
        "/getwidgeturl/WidgetA/id/a",
        "/getwidgeturl/WidgetA/abc/5",
        "/getwidget/WidgetA/id/5",
    }
    for _, testCase := range failingTestCases {
        defer assertw.ExpectRecover(t, "Failed for test case: '" + testCase + "'")
        request, _ := http.NewRequest("GET", testCase, nil)
        GetWidgetDataFromRequest(request)
    }
}


type CorrectTestCase struct {
    Url string
    WidgetClass string
    WidgetId int
}


func TestReturnsCorrectWidgetDataFromRequest(t *testing.T) {
    correctTestCases := []CorrectTestCase {
        CorrectTestCase {
            Url: "/getwidgeturl/WidgetA/id/5",
            WidgetClass: "WidgetA",
            WidgetId: 5,
        },
        CorrectTestCase {
            Url: "getwidgeturl/WidgetA/id/5/",
            WidgetClass: "WidgetA",
            WidgetId: 5,
        },
    }
    for _, testCase := range correctTestCases {
        request, _ := http.NewRequest("GET", testCase.Url, nil)
        givenWidgetClass, givenWidgetId := GetWidgetDataFromRequest(request)
        assert.Equal(t, givenWidgetClass, testCase.WidgetClass)
        assert.Equal(t, givenWidgetId, testCase.WidgetId)
    }
}
