$(document).ready(function(){

    //키보드의 키를 누를 때
    $(document).bind("keydown", function(event){
        KeyPress();
    });

    //버튼 위에서 엔터 눌렀을 때 이벤트 발생 금지
    $("button").bind("keypress keydown", function(e){
        e.preventDefault();
    });

    $("[name='equal']").click(function(){
        Calculation();
    });

    $("[name='percent']").click(function(){
        Percent();
    });

    $("[name='dot']").click(function(){
        Dot();
    });

    //괄호삽입
    var parentheses_count = 0;
    $("[name='parentheses']").click(function(){
        Parentheses();
    });

    //+/- 기호
    $("[name='plus_minus']").click(function(){
        Plus_Minus();
    });

    //화면의 문자 전체 삭제
    $("[name='clean']").click(function(){
        Clean();
    });

    //화면의 문자 끝에서부터 하나 삭제
    $("[name='delete']").click(function(){
        Delete();
    });

    const numbers = ["[name='zero']", "[name='one']", "[name='two']", "[name='three']", "[name='four']", "[name='five']", "[name='six']", "[name='seven']", "[name='eight']", "[name='nine']"];

    for(i = 0 ; i < numbers.length ; i++){
        Numbers(numbers[i]);
    }

    const functions = ["[name='plus']", "[name='minus']", "[name='multiplication']", "[name='division']"];

    for(i = 0 ; i < functions.length ; i++){
        Functions(functions[i]);
    }
});
