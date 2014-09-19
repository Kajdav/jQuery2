$(document).ready(function(){
	$('#newTaskForm').hide();
	var populateLists = function () {
		var storedList = JSON.parse(localStorage.getItem('listo'));
		for (var i = 0; i < storedList.length; i++) {
			if (storedList[i].id === 'new') {
				$('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + storedList[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
			} else if (storedList[i].id === 'inProgress') {
				$('#currentList').append('<a href="#finish" class="" id="inProgress"><li class="list-group-item">' + storedList[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
			} else if (storedList[i].id === 'archived') {
				$('#archivedList').append('<a href="#finish" class="" id="archived"><li class="list-group-item">' + storedList[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-remove"></i></span></li></a>');
			}
		}
	}
	var listo = [];
	if(localStorage['listo']) {
		listo = JSON.parse(localStorage['listo']);
	}
	populateLists();
	var Task = function(task) {
		this.task = task;
		this.id = 'new';
	}
	function save() {
		localStorage['listo'] = JSON.stringify(listo);
	}
	function addTask(task) {
		if(task) {
			task = new Task(task);
			listo.push(task);
			save();
			$('#newItemInput').val('');
			$('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
		}
        $('#newListItem').fadeToggle(80, 'linear');
        $('#newTaskForm').hide();
	};
	 $('#saveNewItem').on('click', function (e) {
        e.preventDefault();
        var task = $('#newItemInput').val().trim();
        addTask(task);
    });
	 //Opens form
    $('#newListItem').on('click', function () {
        $('#newTaskForm').fadeToggle(80, 'linear');
        $('#newListItem').hide();
    });
    //closes form
    $('#cancel').on('click', function (e) {
        e.preventDefault();
        $('#newListItem').fadeToggle(80, 'linear');
        $('#newTaskForm').hide();
        $('#newItemInput').val('');
    });
    $(document).on('click', '#item', function(e) { //advances an item to 'inProgress'
		e.preventDefault();
        var task = this;		
        advanceTask(task);
        this.id = 'inProgress';
        $('#currentList').append(this.outerHTML);
	});
    $(document).on('click', '#inProgress', function (e) { //advances an item to 'archived'
        e.preventDefault();
        var task = this;
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        advanceTask(task);
        $('#archivedList').append(changeIcon);
    });
    $(document).on('click', '#archived', function (e) { //deletes an item
        e.preventDefault();
        var task = this;
        advanceTask(task);
    });
    var advanceTask = function(task) {
    	var modified = task.innerText.trim();
    	for (var i = 0; i < listo.length; i++) {
    		if (listo[i].task === modified) {
    			if (listo[i].id === 'new') {
    				listo[i].id = 'inProgress';
    			} else if (listo[i].id === 'inProgress') {
    				listo[i].id = 'archived';
    			} else {
    				listo.splice(i, 1);
    			}
    			save();
    			break;
    		}
    	}
    	task.remove();
    }
});
