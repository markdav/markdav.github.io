var table = {
    "One": ".ColumnOne",
    "Two": ".ColumnTwo",
    "Three": ".ColumnThree",
    "Four": ".ColumnFour",
    "Five": ".ColumnFive",
    "Six": ".ColumnSix",
    "Seven": ".ColumnSeven",
    "Eight": ".ColumnEight",
    "Nine": ".ColumnNine",
    "Ten": ".ColumnTen",
    "Eleven": ".ColumnEleven",
    "Twelve": ".ColumnTwelve",
    "Thirteen": ".ColumnThirteen",
    "Fourteen": ".ColumnFourteen",
    "Fifteen": ".ColumnFifteen",
     "Sixteen": ".ColumnSixteen",
     "Seventeen": ".ColumnSeventeen",
     "Eighteen": ".ColumnEighteen",
     "Nineteen": ".ColumnNineteen",
    "Twenty": ".ColumnTwenty",
    "Twentyone": ".ColumnTwentyone",
    "Twentytwo": ".ColumnTwentytwo",
    "Twentythree": ".ColumnTwentythree",
    "Twentyfour": ".ColumnTwentyfour",
    "Twentyfive": ".ColumnTwentyfive",
    "Twentysix": ".ColumnTwentysix",
    "Twentyseven": ".ColumnTwentyseven",
    "Twentyeight": ".ColumnTwentyeight",
    "Twentynine": ".ColumnTwentynine",
    "Thirty": ".ColumnThirty",
    "Empty": ".Empty"
};

var firstSelect = ".ColumnOne";
var secondSelect = ".Empty";
var cellText1 = [];
var cellText2 = [];
var start;

window.onload = function() {
    for(var i in table){
        if(table[i] != firstSelect && table[i] != secondSelect){
            $(table[i]).hide();
        }
    }
};

$(document).ready(function() {
    var prev1;
    var prev2;
    var count = 0;
    var count2 = 0;
    for(var i in table){
        if(table[i] == firstSelect){
            start = i;
        }
    }

    $("option[value=" + start + "]").hide();
    $("#one").on("change", function(){
        count++;
        if(count == 1){
            $("option[value=" + start + "]").show();
        }
        if(count != 1){
            reset(cellText1, cellText2, firstSelect, secondSelect);
            $("option[value=" + prev1 + "]").show();
        }
        $(firstSelect).hide();
        firstSelect = table[this.value];
        $("option[value=" + this.value + "]").hide();
        $(firstSelect).show();
        prev1 = this.value;
        order(firstSelect, secondSelect);
    });

    $("#two").on("change", function(){
        count2++;
        if(count2 != 1){
            reset(cellText1, cellText2, firstSelect, secondSelect);
            $("option[value=" + prev2 + "]").show();
        }
        $(secondSelect).hide();
        secondSelect = table[this.value];
        $("option[value=" + this.value + "]").hide();
        $(secondSelect).show();
        prev2 = this.value;
        order(firstSelect, secondSelect);
    });

    var checked = 0;
    $('input[type="checkbox"], #one, #two').on("change", function(){
        if($(this).prop("checked") == true){
            checked = 1;
        }
        else if($(this).prop("checked") == false){
            checked = 0;
        }
        if(checked == 1){
            same(firstSelect, secondSelect);
        }
        else{
            same(firstSelect, secondSelect);
            reset(cellText1, cellText2, firstSelect, secondSelect);
        }
        changed = 1;
    });

    function order(first, second){ //this function was used to order the columns
        $("table tr").each(function() {
            var tr = $(this);
            var col1 = tr.find(first);
            var col2 = tr.find(second);
            col2.detach().insertAfter(col1);
        });
    }
    
    function same(first, second){
        var setCount = 0;
        cellText1 = [];
        cellText2 = [];
        $(first).each(function(){
            cellText1.push($(this).text());
        });

        $(second).each(function(){
            cellText2.push($(this).text());
            setCount++;
        });

        var arrComparison = new Array(setCount).fill(0);
        for(var i = 0; i < setCount; i++){
            if(cellText1[i] == cellText2[i]){
                arrComparison[i] = 1;
            }
        }
        var count2 = 0;
        var higher = 0;
            
        if(secondSelect != ".Empty"){
            $(first).each(function(){
                var check = $(this).text();
                if(arrComparison[count2] == 0 && check != " " && /*!check.includes("Not i")*/ !check.includes("—") && count2 != 0){
                    $(this).text(cellText1[count2]).css("font-weight", 900);
                }
                count2++;
            });
            $(second).each(function(){
                var check = $(this).text();
                if(arrComparison[higher] == 0 && check != " " && /*!check.includes("Not i")*/ !check.includes("—") && higher != 0){
                    $(this).text(cellText2[higher]).css("font-weight", 900);
                }
                higher++;
            });
        }

    }

    function reset(arr1, arr2, first, second){
        var cntr = 0;
        var cntr2 = 0;
        $(first).each(function() {
            if($(this).text() != " " && cntr != 0){
                $(this).text(arr1[cntr]).css("font-weight", "");
            }
            cntr++;
        });
        $(second).each(function() {
            if($(this).text() != " " && cntr2 != 0){
                $(this).text(arr2[cntr2]).css("font-weight", "");
            }
            cntr2++;
        });
    } 

});
