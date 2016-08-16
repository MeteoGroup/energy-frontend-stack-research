package errors

import "fmt"
import "net/http"


func CheckFor(w http.ResponseWriter) {
    if r := recover(); r != nil {
 	w.WriteHeader(http.StatusBadRequest)
        fmt.Println("ERROR:", r)
        fmt.Fprintf(w, "400 %s", r)
    }
}