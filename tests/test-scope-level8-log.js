scope(function(context){
  var
    test = context.test,
    assert = context.assert,
    stubLog = context['stub-log'];

  var result = test(function(){
    var
      code1 = function code1(){},
      code2 = function code2(context){
        context.needs1 = true;
      },
      code3 = function code3(context){
        context.needs2 = true;
      },
      needs1 = ["needs1"],
      needs2 = ["needs2"],
      name1 = "name1",

      stubLogCalls = stubLog.getLogRecords();

    stubLogCalls.length = 0;

    scope(code1,needs1,name1);
    assert(
      stubLogCalls.length === 1 &&
      stubLogCalls[0].length === 7 &&
      stubLogCalls[0][0] === 'scope(' &&
      stubLogCalls[0][1] === code1 &&
      stubLogCalls[0][2] === ',' &&
      stubLogCalls[0][3] === needs1 &&
      stubLogCalls[0][4] === ',' &&
      stubLogCalls[0][5] === name1 &&
      stubLogCalls[0][6] === ')',
                              "call to scope(code,needs,name) must be logged");

    scope(code2,needs2);
    assert(
      stubLogCalls.length === 2 &&
      stubLogCalls[1].length === 7 &&
      stubLogCalls[1][0] === 'scope(' &&
      stubLogCalls[1][1] === code2 &&
      stubLogCalls[1][2] === ',' &&
      stubLogCalls[1][3] === needs2 &&
      stubLogCalls[1][4] === ',' &&
      stubLogCalls[1][5] === undefined &&
      stubLogCalls[1][6] === ')',
                                   "call to scope(code,needs) must be logged");

    scope(code3);
    assert(
      stubLogCalls.length >= 3 &&
      stubLogCalls[2].length === 7 &&
      stubLogCalls[2][0] === 'scope(' &&
      stubLogCalls[2][1] === code3 &&
      stubLogCalls[2][2] === ',' &&
      stubLogCalls[2][3] === undefined &&
      stubLogCalls[2][4] === ',' &&
      stubLogCalls[2][5] === undefined &&
      stubLogCalls[2][6] === ')',
                                         "call to scope(code) must be logged");

    assert(
      stubLogCalls.length >= 4 &&
      stubLogCalls[3].length === 7 &&
      stubLogCalls[3][0] === 'code(' &&
      stubLogCalls[3][1] === code3 &&
      stubLogCalls[3][2] === ',' &&
      stubLogCalls[3][3] === undefined &&
      stubLogCalls[3][4] === ',' &&
      stubLogCalls[3][5] === undefined &&
      stubLogCalls[3][6] === ')',
                                          "call to code(code) must be logged");

    assert(
      stubLogCalls.length >= 5 &&
      stubLogCalls[4].length === 7 &&
      stubLogCalls[4][0] === 'code(' &&
      stubLogCalls[4][1] === code2 &&
      stubLogCalls[4][2] === ',' &&
      stubLogCalls[4][3] === needs2 &&
      stubLogCalls[4][4] === ',' &&
      stubLogCalls[4][5] === undefined &&
      stubLogCalls[4][6] === ')',
                                    "call to code(code,needs) must be logged");

    assert(
      stubLogCalls.length === 6 &&
      stubLogCalls[5].length === 7 &&
      stubLogCalls[5][0] === 'code(' &&
      stubLogCalls[5][1] === code1 &&
      stubLogCalls[5][2] === ',' &&
      stubLogCalls[5][3] === needs1 &&
      stubLogCalls[5][4] === ',' &&
      stubLogCalls[5][5] === name1 &&
      stubLogCalls[5][6] === ')',
                               "call to code(code,needs,name) must be logged");
  });

  stubLog.print( result );

},["test","assert","stub-log"],"test-scope-level8-log");
