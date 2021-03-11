$(function(){
	var box = $('.js_target');//検索対象のDOMを格納する
	var conditions = $('.js_conditions');//現在の条件の選択状況を保持するオブジェクト
	var findConditions;//各data-typeの子要素(input)を格納する
	var currentType;//現在のdata-typeを示す
	var count = 0;//検索ヒット数
	var checkcount = 0;//各data-typeのチェックボックス選択数
	var data_check = 0;//対象項目のデータがどれだけチェック状態と一致しているか
   
	var condition ={};//チェックボックスの入力状態を保持するオブジェクト
   
   
	for(var i = 0; i < conditions.length; i++){//文字列の長さや配列の要素数などを取得するためのプロパティlengthを使用
	  currentType = conditions[i].getAttribute('data-type');　//属性値を取得
	  condition[currentType] = [];
	}
   
	function setConditions(){//条件設定
   
	  count = 0;
	  box.removeClass('js_selected');
   
	  for(var i = 0; i < conditions.length; i++){//data-typeごとの処理
   
		currentType = conditions[i].getAttribute('data-type');
   
		findConditions = conditions[i].querySelectorAll('input');
   
		for(var n = 0; n< findConditions.length; n++){//inputごとの処理
   
		  if(findConditions[n].checked){//現在選択中のインプットが選択されている場合
			condition[currentType][findConditions[n].value] = true;
			checkcount++
		  } else {
			condition[currentType][findConditions[n].value] = false;
		  }
		  if(findConditions.length === n+1){//ループが最後の場合
			if(checkcount === 0){
			  for(var t = 0; t < findConditions.length; t++){
				condition[currentType][findConditions[t].value] = true;
			  }
			}
			checkcount = 0;
		  }
		}
	  }
   
   
	  for(var m = 0, len = box.length; m< len; ++m){//最初に取得したターゲットの情報と、現在のinputの選択状態を比較して処理を行う
   
		for(var i = 0; i < conditions.length; i++){//ターゲットのdata-typeを参照し、メソッドとしてconditionに個別に代入する
		  currentType = conditions[i].getAttribute('data-type');
		  //現在のターゲットのtype情報をカンマ区切りで分割し、配列に代入
		  var currentBoxTypes = $(box[m]).data(currentType).split(',');
  
		  for(var j = 0; j < currentBoxTypes.length; j++){
			if(condition[currentType][currentBoxTypes[j]]){
			  data_check++;//選択した条件のうちひとつでもマッチしてたらdata_checkを加算してループを抜ける
			  break;
			} else {
	 
			}
		  }
  
		}
   
		  if(data_check === conditions.length){
			count++;
			$(box[m]).addClass('js_selected');
		  }else{
   
		  }
		  data_check = 0;
   
	  }
   
	}
   
	setConditions();
   
	$(document).on('click','input',function(){
   
	  setConditions();
   
	});
   
	$(document).on('click','.js_release',function(){
   
	  $('.bl_selectBlock_check input').attr("checked", false);
   
	  setConditions();
   
	});
  });





// $('button').click(function(){
// 	var cnt = $('input[name="friend[]"]:checked').length
// 	if (cnt == 0){
// 		   $('#p01').text('チェックなし')
// 	}else{
// 		$('#p01').text(cnt +'匹チェックしました')
// 	}
// })