var bananas = function (s) {
    var r = [];
    for (var a = 0; a < s.length; a++)
        if (s[a] == 'b')
            for (var b = a + 1; b < s.length; b++)
                if (s[b] == 'a')
                    for (var c = b + 1; c < s.length; c++)
                        if (s[c] == 'n')
                            for (var d = c + 1; d < s.length; d++)
                                if (s[d] == 'a')
                                    for (var e = d + 1; e < s.length; e++)
                                        if (s[e] == 'n')
                                            for (var f = e + 1; f < s.length; f++)
                                                if (s[f] == 'a')
                                                    r.push('-'.repeat(a) + "b" + '-'.repeat(b - a - 1) + "a" +
                                                        '-'.repeat(c - b - 1) + "n" + '-'.repeat(d - c - 1) + "a" +
                                                        '-'.repeat(e - d - 1) + "n" + '-'.repeat(f - e - 1) + "a" +
                                                        '-'.repeat(s.length - f - 1));
    return r;
}

console.log(bananas("bbananana"));