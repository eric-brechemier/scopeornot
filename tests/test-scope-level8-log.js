(function(){

  test("calls to scope() and code() must be logged",function(){

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

      stubLogCalls;

    scope(function(context){
      var getLogRecords = context["stub-log"];
      stubLogCalls = getLogRecords();
    },["stub-log"]);

    stubLogCalls.length = 0;

    scope(code1,needs1,name1);
    deepEqual(
      [
        stubLogCalls[0][0],
        stubLogCalls[0][1],
        stubLogCalls[0][2],
        stubLogCalls[0][3],
        stubLogCalls[0][4],
        stubLogCalls[0][5],
        stubLogCalls[0][6]
      ],
      [
        "scope(",code1,",",needs1,",",name1,")"
      ],
      "call to scope(code,needs,name) must be logged"
    );

    scope(code2,needs2);
    deepEqual(
      [
        stubLogCalls[1][0],
        stubLogCalls[1][1],
        stubLogCalls[1][2],
        stubLogCalls[1][3],
        stubLogCalls[1][4],
        stubLogCalls[1][5],
        stubLogCalls[1][6]
      ],
      [
        "scope(",code2,",",needs2,",",undefined,")"
      ],
      "call to scope(code,needs) must be logged"
    );

    scope(code3);
    deepEqual(
      [
        stubLogCalls[2][0],
        stubLogCalls[2][1],
        stubLogCalls[2][2],
        stubLogCalls[2][3],
        stubLogCalls[2][4],
        stubLogCalls[2][5],
        stubLogCalls[2][6]
      ],
      [
        "scope(",code3,",",undefined,",",undefined,")"
      ],
      "call to scope(code) must be logged"
    );

    deepEqual(
      [
        stubLogCalls[3][0],
        stubLogCalls[3][1],
        stubLogCalls[3][2],
        stubLogCalls[3][3],
        stubLogCalls[3][4],
        stubLogCalls[3][5],
        stubLogCalls[3][6]
      ],
      [
        "code(",code3,",",undefined,",",undefined,")"
      ],
      "call to code(code) must be logged"
    );

    deepEqual(
      [
        stubLogCalls[4][0],
        stubLogCalls[4][1],
        stubLogCalls[4][2],
        stubLogCalls[4][3],
        stubLogCalls[4][4],
        stubLogCalls[4][5],
        stubLogCalls[4][6]
      ],
      [
        "code(",code2,",",needs2,",",undefined,")"
      ],
      "call to code(code,needs) must be logged"
    );

    deepEqual(
      [
        stubLogCalls[5][0],
        stubLogCalls[5][1],
        stubLogCalls[5][2],
        stubLogCalls[5][3],
        stubLogCalls[5][4],
        stubLogCalls[5][5],
        stubLogCalls[5][6]
      ],
      [
        "code(",code1,",",needs1,",",name1,")"
      ],
      "call to code(code,needs,name) must be logged"
    );
  });

}());
