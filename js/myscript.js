 $(document).ready(function(){
 
$( "#inlineFormCustomSelect" ).change(function() {
 var pollutant = $(".btn-dark").text();
 var year = "";
    $( "select option:selected" ).each(function() {
      year += $( this ).text() + "";
    });
});
});