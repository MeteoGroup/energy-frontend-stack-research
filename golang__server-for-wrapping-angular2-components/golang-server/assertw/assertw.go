package assertw

import "testing"
import "github.com/stretchr/testify/assert"


func ExpectRecover(t *testing.T, msgOnError string) {
    r := recover();
    if r == nil {
        assert.Equal(t, true, false, msgOnError);
    }
    return
}