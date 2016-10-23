var requirejs = require('requirejs');
var Cpu6502 = requirejs('6502');
var SoundChip = requirejs('soundchip');
var Cmos = requirejs('cmos');
var Video = requirejs('video');
var dbgr = {
    setCpu: function () {
    }
};
var models = requirejs('models');
var video = new Video.FakeVideo();
var soundChip = new SoundChip.FakeSoundChip();
var cpu = new Cpu6502(models.TEST_65C12, dbgr, video, soundChip, new Cmos());

exports.bcd65c12sbc1 = function (test) {
    cpu.initialise().then(function () {
        cpu.p.reset();
        cpu.p.d = true;
        cpu.a = 0x90;
        cpu.sbc(0x0b);
        test.equals(cpu.p.v, false, "Expected V clear");
        test.equals(cpu.p.c, true, "Expected C set");
        test.equals(cpu.a, 126);
        test.done();
    });
};

exports.bcd65c12sbc2 = function (test) {
    cpu.initialise().then(function () {
        cpu.p.reset();
        cpu.p.d = true;
        cpu.a = 0x80;
        cpu.sbc(0x01);
        test.equals(cpu.p.v, true, "Expected V set");
        test.equals(cpu.p.c, true, "Expected C set");
        test.equals(cpu.a, 120);
        test.done();
    });
};