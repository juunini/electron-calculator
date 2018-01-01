const $ = require('jquery');

//키보드의 키를 누를 때
function KeyPress(){
    let screen = $("[name='screen']").text();
    let last_string = screen.substring(screen.length - 1);
    let last_string_number = isNaN(Number(last_string)); //마지막 문자가 숫자인지 여부
    key = {}
    for(i = 48 ; i <= 57 ; i++){
        key[i] = i - 48;
    }
    for(i = 96 ; i <= 105 ; i++){
        key[i] = i - 96;
    }
    //번호키가 눌린 경우
    if((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105)){
        $("[name='screen']").text(screen + String(key[event.which]));

        Calculate();
    }
    //백스페이스나 del 키가 눌린 경우
    if(event.which == 8 || event.which == 46){
        Delete();
    }
    //엔터
    if(event.which == 13){
        Calculation();
    }
    //esc
    if(event.which == 27){
        $("[name='screen']").text("");
        $("[name='result']").val("");
    }
    //기호 입력
    function Func(func){
        if(screen.length == 0){     //아무것도 입력되지 않은 상태일 때
            alert("숫자를 입력하지 않고 수식기호를 입력하실 수 없습니다.");
        }else if (last_string == "+" || last_string == "-" || last_string == "×" || last_string == "÷") {   //마지막 문자가 숫자가 아니고 괄호나 점도 아닐 때
            alert("기호 뒤에 기호를 입력하실 수 없습니다.");
        }else if(last_string == "."){   //맨 마지막 기호가 점일 때
            alert("소수점 기호 뒤에 수식기호를 입력하실 수 없습니다.");
        }else{  //마지막 문자가 숫자이거나 괄호일 때
            $("[name='screen']").text(screen + func);
        }

        Calculate();
    }
    // *
    if(event.which == 106){
        Func("×");
    }
    // /
    if(event.which == 111){
        Func("÷");
    }
    // +
    if(event.which == 107){
        Func("+");
    }
    // -
    if(event.which == 109){
        Func("-");
    }
    // .
    if(event.which == 110 || event.which == 190){
        Dot();
    }
}

//연산
function Calculate(){
    let screen = $("[name='screen']").text();
    let last_string = screen.substring(screen.length - 1);  //마지막 문자
    let count = parentheses_count;
    screen = screen.replace("×", "*").replace("÷", "/");

    //%기호 먼저 연산.
    for(i = screen.length - 1 ; i >= 0 ; i--){
        if(screen[i] == "%"){
            for(j = i - 1 ; j >= 0 ; j--){
                if(screen[j] != "." && screen[j] == "+" || screen[j] == "-" || screen[j] == "×" || screen[j] == "÷"){
                    screen = screen.substring(0, j + 1) + String(parseFloat(screen.substring(j + 1, i)) / 100) + screen.substring(i + 1, screen.length);
                    break;
                }
                else if(j == 0){
                    screen = String(parseFloat(screen.substring(0, i)) / 100) + screen.substring(i + 1, screen.length);
                }
            }
        }
    }

    while(true){
        try{
            $("[name='result']").val(eval(screen));
            break;
        }catch(e){
            if(last_string == "+" || last_string == "-" || last_string == "×" || last_string == "÷" || last_string == "("){
                screen = screen.substring(0, screen.length - 1);
            }else if(count > 0){
                count--;
                screen += ")";
            }
        }
    }
}

//결과연산
function Calculation(){
    let screen = $("[name='screen']").text();
    screen = screen.replace("×", "*").replace("÷", "/");

    //%기호 먼저 연산.
    for(i = screen.length - 1 ; i >= 0 ; i--){
        if(screen[i] == "%"){
            for(j = i - 1 ; j >= 0 ; j--){
                if(screen[j] != "." && screen[j] == "+" || screen[j] == "-" || screen[j] == "×" || screen[j] == "÷"){
                    screen = screen.substring(0, j + 1) + String(parseFloat(screen.substring(j + 1, i)) / 100) + screen.substring(i + 1, screen.length);
                    break;
                }
                else if(j == 0){
                    screen = String(parseFloat(screen.substring(0, i)) / 100) + screen.substring(i + 1, screen.length);
                }
            }
        }
    }

    while(true){
        try{
            $("[name='screen']").text(eval(screen));
            $("[name='result']").val("");
            break;
        }catch(e){
            let last_string = screen.substring(screen.length - 1);  //마지막 문자
            if(last_string == "+" || last_string == "-" || last_string == "×" || last_string == "÷" || last_string == "("){
                screen = screen.substring(0, screen.length - 1);
            }else if(parentheses_count > 0){
                parentheses_count--;
                screen = screen + ")";
            }
        }
    }
    parentheses_count = 0;
}

//숫자
function Numbers(name){
    $(name).bind("click", function(){
        let screen = $("[name='screen']").text();
        let number = $(name).text();
        $("[name='screen']").text(screen + number);

        Calculate();
    });
}

//연산기호
function Functions(name){
    $(name).bind("click", function(){
        let screen = $("[name='screen']").text();   //입력된 문자들
        let last_string = screen.substring(screen.length - 1);  //마지막 문자
        let last_string_number = isNaN(Number(last_string)); //마지막 문자가 숫자인지 여부
        let functions = $(name).text();

        if(screen.length == 0){     //아무것도 입력되지 않은 상태일 때
            alert("숫자를 입력하지 않고 수식기호를 입력하실 수 없습니다.");
        }else if (last_string == "+" || last_string == "-" || last_string == "×" || last_string == "÷") {   //마지막 문자가 숫자가 아니고 괄호나 점도 아닐 때
            alert("기호 뒤에 기호를 입력하실 수 없습니다.");
        }else if(last_string == "."){   //맨 마지막 기호가 점일 때
            alert("소수점 기호 뒤에 수식기호를 입력하실 수 없습니다.");
        }else{  //마지막 문자가 숫자이거나 괄호일 때
            $("[name='screen']").text(screen + functions);
        }

        Calculate();
    });
}

//퍼센트 기호
function Percent(){
    let screen = $("[name='screen']").text();
    let last_string = screen.substring(screen.length - 1);
    let last_string_number = isNaN(Number(last_string)) //마지막 문자가 숫자인지 여부

    if(screen.length == 0){
        alert("숫자 없이 퍼센트 기호를 넣을 수 없습니다.");
    }else{
        if(last_string_number == true){
            alert("숫자 없이 퍼센트 기호를 넣을 수 없습니다.");
        }else{
            $("[name='screen']").text(screen + "%");
        }
    }

    Calculate();
}

//소수점 추가
function Dot(){
    let screen = $("[name='screen']").text();
    let last_string = screen.substring(screen.length - 1);
    let dot = []

    if(screen.length == 0){
        $("[name='screen']").text("0.");
    }else{
        for(i = screen.length - 1 ; i >= 0 ; i--){
            if(screen[i] == "."){
                dot.push("isdot");
            }
            if(screen[i] == "+" || screen[i] == "-" || screen[i] == "×" || screen[i] == "÷" || screen[i] == "(" || screen[i] == ")"){
                break;
            }
        }

        if(last_string == "." || dot.length != 0){
            alert("소수점 기호를 여러번 쓸 수 없습니다.");
        }else if(dot.length == 0 && last_string == "+" || last_string == "-" || last_string == "×" || last_string == "÷"){
            $("[name='screen']").text(screen + "0.");
        }else if(dot.length == 0 && last_string == "(" || last_string == ")"){
            $("[name='screen']").text(screen + "×0.");
        }else{
            $("[name='screen']").text(screen + ".");
        }
    }

    Calculate();
}

//괄호삽입
var parentheses_count = 0;
function Parentheses(){
    let screen = $("[name='screen']").text();
    let last_string = screen.substring(screen.length - 1);
    let last_string_number = isNaN(Number(last_string)) //마지막 문자가 숫자인지 여부

    if(parentheses_count == 0){ //여는 괄호가 없거나 여는 괄호와 닫는 괄호의 짝이 맞을 때
        parentheses_count++;
        if(screen.length == 0){ //입력된 문자가 없을 때
            $("[name='screen']").text("(");
        }else{  //입력된 문자가 있을 때
            if(last_string == "."){ //소수점 기호 뒤에 올 때
                alert("소수점 기호 뒤에 괄호가 올 수 없습니다.");
            }else if(last_string_number == false || last_string == "%"){ //숫자나 %기호 뒤에 왔을 때
                $("[name='screen']").text(screen + "×(");
            }else{  //숫자나 점이 아닌 기호 뒤에 올 때
                $("[name='screen']").text(screen + "(");
            }
        }

    }else{  //여는 괄호와 닫는 괄호의 짝이 안맞을 때
        if(last_string == "."){ //소수점 기호 뒤에 올 때
            alert("소수점 기호 뒤에 괄호가 올 수 없습니다.");
        }else{  //소수점 기호 뒤가 아닐 때
            if(last_string == "(" || last_string == "+" || last_string == "-" || last_string == "×" || last_string == "÷"){ //여는 괄호 뒤나 사칙연산 기호 뒤일 때
                parentheses_count++;
                $("[name='screen']").text(screen + "(");
            }else{  //숫자나 %기호 뒤에 올 때
                parentheses_count--;
                $("[name='screen']").text(screen + ")");    //닫는괄호 삽입
            }
        }
    }
    Calculate();
}

// +/- 기호 입력
function Plus_Minus(){
    let screen = $("[name='screen']").text();
    let last_string = screen.substring(screen.length - 1);
    let last_string_number = isNaN(Number(last_string)) //마지막 문자가 숫자인지 여부
    if(screen.length == 0){
        parentheses_count++;
        $("[name='screen']").text("(-");
    }else{
        let stop_point;
        for(i = screen.length - 1 ; i >= 0 ; i--){
            if(screen[i] == "+" || screen[i] == "-" || screen[i] == "×" || screen[i] == "÷" || screen[i] == "(" || screen[i] == ")"){
                stop_point = i;
                break;
            }
        }

        if(stop_point == null){ //앞에 기호가 없는 경우
            parentheses_count++;
            $("[name='screen']").text("(-" + screen);
        }else{  //앞에 기호가 있는 경우
            if(screen[stop_point] == "×" || screen[stop_point] == "÷"){   //곱셈 나눗셈 기호 뒤에 올 때
                parentheses_count++;
                $("[name='screen']").text(screen.substring(0, stop_point + 1) + "(-" + screen.substring(stop_point + 1, screen.length));
            }else if(screen[stop_point] == "-"){    //뺼셈 기호 뒤에 올 때
                if(screen[stop_point - 1] == "("){  //뺄셈 기호 뒤이고, 여는 괄호 뒤에 올 때
                    $("[name='screen']").text(screen.substring(0, stop_point) + screen.substring(stop_point + 1, screen.length));
                }else{  //뺄셈기호 뒤이고, 여는 괄호 뒤가 아닐 때
                    $("[name='screen']").text(screen.substring(0, stop_point) + "+" + screen.substring(stop_point + 1, screen.length));
                }
            }else if(screen[stop_point] == "+"){    //덧셈 기호 뒤에 올 때
                $("[name='screen']").text(screen.substring(0, stop_point) + "-" + screen.substring(stop_point + 1, screen.length));
            }else if(screen[stop_point] == "("){    //여는 괄호 뒤에 올 때
                $("[name='screen']").text(screen.substring(0, stop_point + 1) + "-" + screen.substring(stop_point + 1, screen.length));
            }else if(screen[stop_point] == ")"){    //닫는괄호 뒤에 올 때
                parentheses_count++;
                $("[name='screen']").text(screen.substring(0, stop_point + 1) + "×(-" + screen.substring(stop_point + 1, screen.length));
            }
        }
    }
    Calculate();
}

//화면의 문자 전체 삭제
function Clean(){
    parentheses_count = 0;
    $("[name='screen']").text("");
    $("[name='result']").val("");
}

//화면의 문자 끝에서부터 하나 삭제
function Delete(){
    let screen = $("[name='screen']").text();
    let last_string = screen.substring(screen.length - 1);
    if(last_string == "("){ //여는 괄호를 지울 때
        parentheses_count--;
    }else if(last_string == ")"){   //닫는 괄호를 지울 때
        parentheses_count++;
    }
    $("[name='screen']").text(screen.substring(0, screen.length - 1));

    Calculate();
}
