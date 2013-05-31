var daggy = require('daggy'),
    IO = daggy.tagged('unsafePerform');

// Methods
IO.of = function(x) {
    return IO(function() {
        return x;
    });
};
IO.prototype.chain = function(g) {
    var io = this;
    return IO(function() {
        return g(io.unsafePerform()).unsafePerform();
    });
};

// Derived
IO.prototype.map = function(f) {
    return this.chain(function(a) {
        return IO.of(f(a));
    });
};
IO.prototype.ap = function(a) {
    return this.chain(function(f) {
        return a.map(f);
    });
};

// Export
if(typeof module != 'undefined')
    module.exports = IO;
