// Define POS tags and their colors
	var poss = [{"text": "名詞", "short-text":"名", "color": "#e66da6"},
				{"text": "係り結び", "short-text":"係", "color": "#2da6e2"},
				{"text": "助動詞", "short-text":"助", "color": "#b8a8ff"},
				{"text": "動詞", "short-text":"動", "color": "#fd9720"},
				{"text": "副詞", "short-text":"副", "color": "#f55"},
				{"text": "助詞", "short-text":"助", "color": "#ddd"},
				{"text": "形容詞", "short-text":"形", "color": "#9f9"},
				{"text": "形容動詞", "short-text":"形動", "color": "#55f"}]
	// Create Style and checkboxes for each POS tags
	poss.forEach(function(value){
		let checkbox = $('<label for="{value}" class="d-input__option u-t-xs u-strong" style=""><input type="checkbox" id="{value}" value="{value}" class="d-input__option__box" checked> <span class="input-value">{value}</span></label>'.formatUnicorn({'value': value['text']}))
		$('.checkboxes').append(checkbox)
		let style = $('<style>[data-entity="{value}"][highlight="true"], [value={value}]:checked+.input-value {background-color: {color}});}</style>'.formatUnicorn({'value': value['text'], 'color': value['color']}))
		console.log(style)
		$('html').append(style)
	})
	$(".submit-button").click( function(){
		$(".container").empty();
		var text = $('#text')[0].value;
		$.post( "/analyse", {
		    text: text
		}, function(data) {
			let jsonData = $.parseJSON(data);
			jsonData.forEach(show);
		});
    });
	function show(word){
		console.log(word)
		if(["ぞ", "なむ", "や", "か", "こそ"].includes(word["text"])){
			word['hinshi_1'] = "係り結び"
		}
		if(word['hinshi_1'] == "BOS/EOS"){
			return
		}
		if(word['hinshi_1'] != "補助記号"){
			wordBlock = $('<mark data-entity="{hinshi}" highlight="true"></mark>'.formatUnicorn({hinshi:word['hinshi_1']})).text(word['text']);
		}else{
			wordBlock = $('<mark></mark>'.formatUnicorn({hinshi:word['hinshi_1']})).text(word['text']);
		}
		if(word['katsuyo_kei'] != "*"){
			wordBlock.append('<span class="tooltiptext"><div style="font-weight: 900;margin-bottom: 0.2rem; border-bottom: white dotted 2px;">活用</div>{katsuyo}</span>'.formatUnicorn({katsuyo:(word['katsuyo_kei']+ '-' + word['katsuyo_type']).split('-').join('<br>')}));
			wordBlock.attr("has_katsuyo", "true")
		}
		$('.container')[0].append(wordBlock[0]);
		
	}
	$("input[type='checkbox']").change(function() {
		let entities = $('[data-entity={value}]'.formatUnicorn({value: this.value}))
		if(this.checked){
	       entities
			.each(function(i, block){
 				$(block).attr("highlight","true")
			})
		}else{
			entities
			.each(function(i, block){
 				$(block).attr("highlight","false")
			})
		}
	});