$(".js-filter-form :checkbox").on("click", function(){
	var checked = [];
	$(".js-filter-form :checked").each(function(){
		checked.push($(this).val()); // push()は配列に値を追加します
	});

	var count = 0;
	$(".js-filter-items li").each(function(){
		var term = $(this).data("term");
		var is_exist = $.inArray( term, checked ); // inArray()は配列内に値があるかどうかを調べます
		if (is_exist != -1) {
			$(this).removeClass("hidden");
			count++;
		} else {
			$(this).addClass("hidden");
		}
	});

});