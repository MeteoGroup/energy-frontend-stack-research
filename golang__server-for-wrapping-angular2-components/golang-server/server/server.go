package server

import "net/http"
import "log"
import "github.com/amisiuda/<<REPO_NAME>>/widget"


func Run() {
    fs := http.FileServer(http.Dir("public"))
    http.HandleFunc("/getwidgeturl/", widget.ServeWidgetFilePath)
    http.Handle("/asset/", http.StripPrefix("/asset/", fs))
    err := http.ListenAndServe(":9090", nil)
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}
