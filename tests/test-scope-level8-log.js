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
      name1 = "name1";

    stubLogCalls = [];

    scope(code1,needs1,name1);
    deepEqual(
      [
        stubLogCalls[0][2],
        stubLogCalls[0][3],
        stubLogCalls[0][4],
        stubLogCalls[0][5],
        stubLogCalls[0][6],
        stubLogCalls[0][7],
        stubLogCalls[0][8]
      ],
      [
        "scope(",code1,",",needs1,",",name1,")"
      ],
      "call to scope(code,needs,name) must be logged to the console"
    );

    scope(code2,needs2);
    deepEqual(
      [
        stubLogCalls[1][2],
        stubLogCalls[1][3],
        stubLogCalls[1][4],
        stubLogCalls[1][5],
        stubLogCalls[1][6],
        stubLogCalls[1][7],
        stubLogCalls[1][8]
      ],
      [
        "scope(",code2,",",needs2,",",undefined,")"
      ],
      "call to scope(code,needs) must be logged to the console"
    );

    scope(code3);
    deepEqual(
      [
        stubLogCalls[2][2],
        stubLogCalls[2][3],
        stubLogCalls[2][4],
        stubLogCalls[2][5],
        stubLogCalls[2][6],
        stubLogCalls[2][7],
        stubLogCalls[2][8]
      ],
      [
        "scope(",code3,",",undefined,",",undefined,")"
      ],
      "call to scope(code) must be logged to the console"
    );

    deepEqual(
      [
        stubLogCalls[3][2],
        stubLogCalls[3][3],
        stubLogCalls[3][4],
        stubLogCalls[3][5],
        stubLogCalls[3][6],
        stubLogCalls[3][7],
        stubLogCalls[3][8]
      ],
      [
        "code(",code3,",",undefined,",",undefined,")"
      ],
      "call to code(code) must be logged to the console"
    );

    deepEqual(
      [
        stubLogCalls[4][2],
        stubLogCalls[4][3],
        stubLogCalls[4][4],
        stubLogCalls[4][5],
        stubLogCalls[4][6],
        stubLogCalls[4][7],
        stubLogCalls[4][8]
      ],
      [
        "code(",code2,",",needs2,",",undefined,")"
      ],
      "call to code(code,needs) must be logged to the console"
    );

    deepEqual(
      [
        stubLogCalls[5][2],
        stubLogCalls[5][3],
        stubLogCalls[5][4],
        stubLogCalls[5][5],
        stubLogCalls[5][6],
        stubLogCalls[5][7],
        stubLogCalls[5][8]
      ],
      [
        "code(",code1,",",needs1,",",name1,")"
      ],
      "call to code(code,needs,name) must be logged to the console"
    );
  });

}());
