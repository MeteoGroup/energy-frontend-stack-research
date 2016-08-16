package url

import "strings"
import "net/url"


func FormatPath(filePath string)(string) {
    formatedFilePath, _ := url.QueryUnescape(filePath)
    if trimFilePath(formatedFilePath) == "" {
        panic("path is missing!")
    }
    return filePath
}


func IsIndexFile(filePath string)(bool) {
    trimmedFilePath := trimFilePath(filePath)
    expectedIndex := len(trimmedFilePath) - len("index.html")
    if strings.LastIndex(trimmedFilePath, "index.html") == expectedIndex {
        return true
    }
    return false
}


func trimFilePath(filePath string)(string) {
    return strings.Trim(filePath, " \n\t")
}