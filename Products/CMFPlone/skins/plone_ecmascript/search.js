(function($) { $(function() {
    var container = $('#search-results');

    $("form.searchPage").submit(function() {
        var data = $("form.searchPage").serialize();
        $(container).fadeOut('fast');
        updateResults(data);
        return false;
    }); 
    $("#search-filter input, #search-filter select").bind('change', function() {
        var data = $("form.searchPage").serialize();
        $(container).fadeOut('fast');
        updateResults(data);
        return false;
    });

    $('#searchResultsHeading').click(function(event) {
       //$("#search-results").fadeOut(300);
       if ($(event.target).is('#sorting-options a')) {
           if ($(event.target).attr('rel')) {
               rel = $(event.target).attr('rel');                               
               $("form.searchPage input[name='sort_on']").val(rel);                               
           }
           else {           
               $("form.searchPage input[name='sort_on']").val('');
           }
           var data = $("form.searchPage").serialize();   
           updateResults(data);
           // $("#search-results").before($("#kssPortalMessage"));
           // $("#kssPortalMessage dd").html("Your search results have been updated");
           // 
           // $("#kssPortalMessage").delay(500).animate({
           //     height: ['toggle', 'swing'],
           //     opacity: 1,
           //     marginBottom: 'toggle',
           //     marginTop: 'toggle'
           // }, 500, function(){
           //     $("*").click(function(){
           //         $("#kssPortalMessage").fadeOut('slow');
           //     })
           // })
           return false;
       }
     });


    function updateResults(data){
        console.log(data);
        $.ajax({
            url: '@@updated_search',
            data: data,
            success: function(data){
                container.hide();
                container.html(data);
                $(container).fadeIn('medium');
                $("#search-results-number").text(function(){
                    str = $("#updated-search-results-number").text();
                    $("#updated-search-results-number").remove();
                    return str;
                });
                $("#searchResultsHeading #sorting-options").html(function(){
                    struct = $("#updated-sorting-options").html();
                    $("#updated-sorting-options").remove();
                    return struct;
                });  
            },
            error: function(req,error){
                if(error === 'error'){error = req.statusText;}
                var errormsg = 'There was a communication error: ' + error;
                container.html(errormsg);
            }
        });
    }                    

    $('#show-search-options').click(function () {                        
        $("#search-results-wrapper").css({"width":"97.75%", "margin-left":"-98.875%"});
        $("#search-results-wrapper").removeClass("width-16");
        $("#search-results-wrapper").removeClass("position-0");
        $('#search-filter').hide();
        $('#search-filter').removeClass('hiddenStructure');

        $("#search-results-wrapper").animate({
            width: '72.75%',
            marginLeft: '-73.875%'
        }, 500, function(){
            $('#search-filter').fadeIn('medium');
            $("#show-search-options").delay(500).fadeOut();
        });
        $("#search-results-wrapper").addClass("position-1:4");
        $("#search-results-wrapper").addClass("width-12");                        
        return false;
    });
    
    $("#close-search-options").click(function () {
        $("#search-results-wrapper").removeClass("width-12");
        $("#search-results-wrapper").removeClass("position-1:4");
        $('#search-filter').fadeOut('fast', function(){
            $('#search-filter').addClass('hiddenStructure');            
            $("#search-results-wrapper").animate({
                width: '97.75%',
                marginLeft: '-98.875%'
            }, 500, function(){
                $("#show-search-options").delay(300).fadeIn();
            });            
        });
        $("#search-results-wrapper").addClass("position-0");
        $("#search-results-wrapper").addClass("width-16");                        
        return false;
    });
    
}); })(jQuery);

