$(function(){
	var box = $('.js_target');//検索対象
	var conditions = $('.js_conditions');//現在の条件の選択状況を保持するオブジェクト
	var findConditions;//各data-typeの子要素(input)を格納する
	var currentType;//現在のdata-typeを示す
	var count = 0;//検索ヒット数
	var checkcount = 0;//各data-typeのチェックボックス選択数 初期値は0
	var data_check = 0;//対象項目のデータがどれだけチェック状態と一致しているか。初期値は0
   
	var condition ={};//チェックボックスの入力状態を保持するオブジェクト
   
   
	for(var i = 0; i < conditions.length; i++){//文字列の長さや配列の要素数などを取得するためのプロパティlengthを使用
	  currentType = conditions[i].getAttribute('data-type');　//getAttributeで対象のdata-typeを取得  current typeは現在のdata-type(term shikakuなど)
	  condition[currentType] = [];  //対象のデータタイプを配列で渡す
	//   console.log([currentType]);
	//   console.log(conditions.length);  // 現状のdata typeは５つのため、５と表示される。
	}
   
	function setConditions(){//条件設定
   
	  count = 0;
	  box.removeClass('js_selected');   //ヒット数が0の場合はjs_selectedのクラスを除外する。その場合js_targetクラスはdisplay:noneとなる。
   
	  for(var i = 0; i < conditions.length; i++){//data-typeごとの処理
   
		currentType = conditions[i].getAttribute('data-type');
   
		findConditions = conditions[i].querySelectorAll('input');  //inputタグの要素data-type毎に取得。querySelectorAllを使っているため、全部の要素が出力される。
		
		// console.log(findConditions)
   
		for(var n = 0; n< findConditions.length; n++){//inputごとの処理
   
		  if(findConditions[n].checked){//input要素にチェックが入っている場合の処理。
			condition[currentType][findConditions[n].value] = true;  //⇦input要素に対して、チェックボックスの数が追加される。処理
			checkcount++

			// console.log([findConditions[n].value]);  //input要素のvalueを返す
			// console.log([currentType]);  //選択したtypeの値のdata-typeを返す。

		  } else {
			condition[currentType][findConditions[n].value] = false;
		  }




		  if(findConditions.length === n+1){//ループが最後のときの処理
			if(checkcount === 0){
			  for(var t = 0; t < findConditions.length; t++){    
				condition[currentType][findConditions[t].value] = true;
			  }
			}
			checkcount = 0;
		  }
		}
	  }
   
   
	  for(var m = 0, len = box.length; m< len; ++m){//最初に取得した検索情報と、現在のinputの選択状態を比較して処理を行う
   
		for(var i = 0; i < conditions.length; i++){//ターゲットのdata-typeを参照し、メソッドとしてconditionに個別に代入する
		  currentType = conditions[i].getAttribute('data-type');//data-typeごとに要素を取得
		  var currentBoxTypes = $(box[m]).data(currentType).split(',');  //datatypeをカンマで区切って配列にする

		  console.log(currentBoxTypes);  

  
		  for(var j = 0; j < currentBoxTypes.length; j++){
			if(condition[currentType][currentBoxTypes[j]]){
			  data_check++;//選択した条件のうちひとつでもマッチしてたらdata_checkを加算してループを抜ける
			  break
			} else {
	 
			}
		  }
		}
   
		  if(data_check === conditions.length){   //対象項目のチェック状態と
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
  });





// let x  = document.querySelector(".test");
// let y = document.querySelector("p");

// x.innerHTML = "文章の内容を変更しました。";
// y.innerHTML = "文章変更パート２";

// // for(let i = 0; i < y.length; ++i){
// // 	y[i].innerHTML = "文章変更パート２";
// // }

// let spanText = document.getElementById('spanText');
// console.log(spanText);
// console.log(spanText.textContent);
