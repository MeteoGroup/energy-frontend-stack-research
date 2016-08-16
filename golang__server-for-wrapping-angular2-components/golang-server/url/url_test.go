package url

import "testing"
import "github.com/amisiuda/<<REPO_NAME>>/assertw"
import "github.com/stretchr/testify/assert"


func TestPanicsOnEmptyFilePath(t *testing.T) {
    testCases := []string { "", " ", "\n", " \t", "%20" }
    for i := 0; i < len(testCases); i++ {
        __panicsOnEmptyFilePath(t, testCases[i])
    }
}


func __panicsOnEmptyFilePath(t *testing.T, testCase string) {
    defer assertw.ExpectRecover(t, "Error for: '"+ testCase +"'")
    FormatPath(testCase)
}


func TestIsIndexFile(t *testing.T) {
    testCases := []string { "index.html", " index.html", " index.html ", " app/index.html " }
    for i := 0; i < len(testCases); i++ {
        __isIndexFile(t, testCases[i])
    }
}


func __isIndexFile(t *testing.T, testCase string) {
    isIndexFile := IsIndexFile(testCase)
    assert.Equal(t, isIndexFile, true, "Error for: '"+ testCase +"'")
}
