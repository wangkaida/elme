function Suan() {
	/*进来先拿到当前店铺的id*/
	var data_id = $('.back').attr('data_id')
	
	/*判断id下有没有内容，有就付给arr，没有就为空*/
	if (localStorage.getItem(data_id)) {
		var arr = JSON.parse(localStorage.getItem(data_id));
	}else{
		var arr  = []
	}
    // console.log(arr)
    /*内容区的加减*/
	$('.shangpin').on('click', 'span', function () {
		var name = $(this).parent().parent().parent().find('.name').html();
		var qian = $(this).parent().parent().find('.qian').attr('data_qian')
		var da = $(this).parent().parent().parent().parent().parent().find('.ti').html()
		if ($(this).hasClass('jian')) {
			var num = $(this).next().html();
			if (num <= 0) {
                num = 0
			} else {
				num--
			};
			bian(name, num, qian, da);
		};
		if ($(this).hasClass('jia')) {
			var num = $(this).prev().html();
			num++;
			if (num >= 20) {
				num = 20;
			};
			bian(name, num, qian, da);
		};
	});
    /*购物车里的加减*/
	$('.item').on('click', 'div', function () {
		var name = $(this).parent().parent().find('.item-name').html();
		var qian = $(this).parent().attr('data_dan')
		var num = 0;
		if ($(this).hasClass('minus')) {
			num = $(this).next().html();
			if (num <= 0) {
				num = 0
			} else {
				num--
			};
			bian(name, num, qian)
		};
		if ($(this).hasClass('plus')) {
			num = $(this).prev().html();
			num++;
			if (num >= 20) {
				num = 20;
			};
			$('.item').html('')
			bian(name, num, qian)

		};
	})
	function bian(name, num, qian, da) {
		var pan = 0
		var leng = arr.length;
		if (arr.length == 0 && num != 0) {
			arr.push({ Name: name, Num: num, qian: qian * num, dan: qian, Da: da })
		} else {
			$(arr).each(function (i,item) {
				pan++;
				if (item.Name == name) {
					item.Num = num;
					item.qian = num * qian;
					if (item.Num <= 0) {
						arr.splice(i, 1)
					};
					return false;
				} else if (pan >= leng && num != 0) {

					arr.push({ Name: name, Num: num, qian: qian * num, dan: qian, Da: da })
				}
			})
		}
		
		/*每次修改完的值存本地*/
		localStorage.setItem(data_id,JSON.stringify(arr))
		// 每次修改完刷新页面数据
		ran()
	}
	//内容渲染
	ran()
	// 更改页面数据
	function ran(){
		var data_id = $('.back').attr('data_id')
		if (localStorage.getItem(data_id)) {
			var arr = JSON.parse(localStorage.getItem(data_id))

			var N = 0;
			var M = 0;
			$(arr).each(function (i, item) {
				M += Number(item.qian)
				N += item.Num;
			})
			$('.dot-num').html(N)
			$('.total-price-span').html(M)
			if (N >= 1) {
				$('.dot-num').css('display', 'block')
			} else {
				$('.dot-num').css('display', 'none')
			}
			// 内容改变
			$(arr).each(function(i,item){
				
				$('.right-list .name').each(function (I, Item) {
					if (item.Name==$(Item).html()) {
						
						$(Item).parent().find('.ling').html(item.Num);
					};
				})
			})
				
			$('.item').html('')
			$(arr).each(function (i, item) {
				var Html = `<div class="choose-item" data-id="96985433">
								<div class="item-name">${item.Name}</div>
								<div class="price">¥<span class="total">${item.qian}</span></div>
								<div class="select-content" data_dan="${item.dan}">
									<div class="minus"></div>
									<div class="count">${item.Num}</div>
									<div class="plus"></div>
								</div>
							</div>`
				$('.item').append(Html)
			})
			// console.log(arr)
			//某个大类下的数量
			var str = {};
			$(arr).each(function (i, item) {
				key = item.Da

				if (str[key]) {
					str[key] += item.Num
				} else {
					str[key] = item.Num
				}

			})
			//显示某个大类下的数量
			$.each(str, function (i, item) {
				$('.mains-inner .can_div1').each(function (I, Item) {

					if ($(Item).text() == i) {
						// console.log($(Item).text(), i)
						$(Item).next().css('display', 'block').html(item);
					};
				})
			})
		};
			
	}
	// 购物车点击显示
	$('.price-content').on('click', function () {
		fn();
	})
	$('.shop-icon').on('click', function () {
		fn();
	})

	function fn() {
		$('.mask').toggle();
		$('.choose-content').toggle();
	}
	// 清空购物车
	$('.clear-car').on('click', function () {
		arr = [];
		localStorage.setItem(data_id,JSON.stringify(arr))
		fn();
		ran();
		$('.ling').html(0)
		$('.dot-num').html(0)
		$('.total-price-span').html(0)
		$('.item').html('')
		$('.dot-num').css('display', 'none')
		$('.mains-inner span').html('').css('display','none')
	})
}
