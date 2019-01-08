String.prototype.bin_split = function(size) {
	var str = this;
	var mod = str.length % size; 
	if (mod != 0)
	{
		mod = size - mod;
		for (var i = 0; i < mod; i++)
		{
			str = '0'+str;
		}
	}
	
	var numchunks = str.length/size;
	
	var arr = [];
	for (i = 0; i < numchunks; i++)
	{
		arr.push(str.substr(i*size,size));
	}
	return arr;
}

var rand = {
    range: function(min,max) {
        min = parseInt(min);
        max = parseInt(max);
        
        var num = Math.floor(Math.random() * (max-min+1));
        num += min;
        return num;
    },
    pick: function(arr,splice) {
    	if (typeof splice == 'undefined')
    	{
    		splice = true;
    	}
    	var key = this.range(0,arr.length-1);
    	var choice = arr[key];
    	if (splice)
    	{
    		arr.splice(key,1);
    	}
    	return choice;
    }
};

var fingers = {
	toggle: function(f) {
		var el = $("#finger-"+f);
		el.toggleClass('on');
		
		var type = 'off';
		if (el.hasClass('on'))
		{
			type = 'on';
		}
		
		el.attr('src','images/'+f+type+'.png');
	},
	set_all: function() {
		$(".finger").each(function() {
			var id = $(this).attr('finger');
			$(this).addClass('on');
			$(this).find('img').attr('src','images/'+id+'on.png');
		});
	},
	reset: function() {
		$(".finger").each(function() {
			if (!$(this).hasClass('finger')) { return; }
			
			$(this).removeClass('on');
			
			var id  = $(this).parent().attr('finger');
			$(this).attr('src','images/'+id+'off.png');
		});
	},
	lock: function() {
		$("#hand > div").unbind();
	},
	unlock: function() {
		$("#hand > div").unbind().click(function() {
			var el = $(this).find('.finger');
			
			rules.render(el.parent().attr('finger'));
			
			if ($(".on").length == 5)
			{
				game.solved();
			}
		}).hover(function() {
			var finger = $(this).attr('finger');
			
			$(".indicator").hide();
			
			for (var i in rules.data[finger])
			{
				if (rules.data[finger][i] == 1)
				{
					$("#indicator-"+i).show();
				}
			}
		}, function() {
			$(".indicator").hide();
		});
	},
	next: function() { 
		$("#handone").fadeIn(500,function() {
			tally.inc('score');
			
			$("#hand").hide();			
			fingers.reset();
			
			$("#handone").animate({"top": '-=500'},{ duration: 1200, complete: function() {
				$(this).hide();
				$(this).css('top','0');
			
				game.set_seed();
			
				$("#hand").fadeIn();
			
				fingers.unlock();
			}});
		});
	}
};

var rules = {
	data: {},
	reset: function() {
		this.data = {};
		for (var a = 1; a <= 5; a++)
		{
			this.data[a] = {};
			for (var b = 1; b <= 5; b++)
			{
				this.data[a][b] = 0;
			}
		}
	},
	seed: function(num) {
		num = parseInt(num);
		if (num > 33554431 || num == NaN)
		{
			return this.randomize();	
		}
		
		var bin = (num).toString(2).bin_split(5);
		var b, arr;
		for (var a in bin)
		{
			arr = {};
			for (b = 1; b <= 5; b++)
			{
				arr[b] = parseInt(bin[a][b-1]);	
			}
			
			this.data[parseInt(a)+1] = arr;
		}
	},
	get_seed: function() {
		var num = '';
		for (var a in this.data)
		{
			for (var b in this.data[a])
			{
				num += (this.data[a][b]).toString();;
			}
		}
		num = parseInt(num,2);
		return num;
	},
	solution: [],
	randomize: function() {
		$("#solution").html('');
		$("#puzzle-solution").closest('tr').show();
		$(".solution").hide();
		this.solution = [];
		
		this.reset();
		
		var effect, trigger, amt_fingers, effect_fingers;
		var trigger_fingers = [1,2,3,4,5];
		var triggers = [];
		for (var a = 1; a <= 4; a++)
		{
			trigger = rand.pick(trigger_fingers);
			triggers.push(trigger);
			
			amt_fingers = rand.range(1,4);
			effect_fingers = [1,2,3,4,5];
			
			for (var b = 0; b < amt_fingers; b++)	
			{
				effect = rand.pick(effect_fingers);
				this.data[trigger][effect] = 1;
			}
		}
		var solver = trigger_fingers[0];
		
		fingers.set_all();
		var shuffle = rand.range(3,10);
		var finger, last_finger;
		var solution = [];
		for (a = 1; a <= shuffle; a++)
		{
			if (last_finger)
			{
				triggers.push(last_finger);
			}
			last_finger = finger;
			finger = rand.pick(triggers);
			this.solution.push(finger);
			this.render(finger);
		}
		
		$(".finger").each(function() {
			if (!$(this).hasClass('on')) { return; }
			var finger = $(this).parent().attr('finger');
			rules.data[solver][finger] = 1;
		});
		
		this.solution.push(solver);
		fingers.reset();
	},
	render: function(f) {
		for (var a in this.data[f])
		{
			if (this.data[f][a] == 1)
			{
				fingers.toggle(a);
			}
		}
	}
};

var tally = {
	add: function(el,amt) {
		var total = parseInt($('#'+el).html());
		$('#'+el).html(total+amt);
	},
	inc: function(el) {
		this.add(el,1);
	},
	reset: function(el) { 
		$('#'+el).html('0');
	}
};

var game = {
	new_game: function() {
		rules.randomize();
		this.set_seed();
	},
	reset: function() {
		fingers.reset();
	},
	solved: function() {		
		fingers.lock();
		rules.randomize();
		fingers.next();
	},
	set_seed: function() {
		var seed = rules.get_seed();
		$("#puzzle-id").val(_url+'?seed='+seed);
	}
};

$("#puzzle-reset").click(function() {
	game.reset();
});

$("#puzzle-new").click(function() {
	$("#hand").fadeOut(200,function() { 
		$("#hand").fadeIn(100);
	});
	game.reset();
	game.new_game();
});

$("#puzzle-solution").click(function() {
	$(this).closest('tr').hide();
	tally.add('score',-2);
	fingers.reset();
	$(".solution").show();
	$("#solution").html(rules.solution.join(', '));
});

$("#puzzle-id").click(function() {
	$(this).focus().select();
});

$("#help-close").click(function(e) {
	e.preventDefault();
	$("#help").fadeOut('fast');
});

game.new_game();
fingers.unlock();