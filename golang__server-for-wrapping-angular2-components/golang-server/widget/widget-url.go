package widget

import "net/http"
import "strings"
import "strconv"


func GetWidgetDataFromRequest(r *http.Request)(widgetClass string, widgetId int) {
    urlParts := getUrlParts(r)
    widgetClass, widgetId = withdrawWidgetData(urlParts)
    return
}


func getUrlParts(r *http.Request)(urlParts []string) {
    url := strings.Trim(r.URL.Path, "/ \n");
    urlParts = strings.Split(url, "/")
    if len(urlParts) != 4 || urlParts[0] != "getwidgeturl" || urlParts[2] != "id" {
        panic("Incorrect url format. Expected: '/getwidgeturl/<Ang2-Component>/id/<widget-ID>'")
    }
    return
}


func withdrawWidgetData(urlParts []string)(widgetClass string, widgetId int) {
    widgetClass = strings.Trim(urlParts[1], " ")
    widgetId, err := strconv.Atoi(urlParts[3])
    if err != nil {
        panic(err)
    }
    if widgetClass == ""  {
        panic("invalid widget class!")
    }
    if widgetId < 1  {
        panic("invalid widget ID!")
    }
    return
}
