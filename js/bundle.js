/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
		function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
		
		__webpack_require__(1);
		
		var Todo = __webpack_require__(14).Todo;
		
		
		var ESCAPE_KEY = 27;
		var ENTER_KEY = 13;
		
		
		
		
		// custom tag type for todo that inherits from li
		tag$.defineTag('todo', 'li', function(tag){
			
			tag.prototype.render = function (){
				var t0, t1;
				return this.flag('completed',(this.object().completed())).setChildren([
					(t0 = this.$a=this.$a || tag$.$div().flag('view')).setContent([
						(t1 = t0.$$a=t0.$$a || tag$.$label().setHandler('dblclick','edit',this)).setContent(this.object().title(),3).end(),
						(t0.$$b = t0.$$b || tag$.$input().flag('toggle').setType('checkbox').setHandler('tap','toggle',this)).setChecked((this.object().completed())).end(),
						(t0.$$c = t0.$$c || tag$.$button().flag('destroy').setHandler('tap','drop',this)).end()
					],2).end(),
					(this._edit = this._edit || tag$.$input().setRef('edit',this).setType('text').setHandler('blur','save',this)).end()
				],2).synced();
			};
			
			tag.prototype.toggle = function (){
				return this.up(q$('._app',this)).toggle(this.object());
			};
			
			// triggered by doubleclicking the title
			// sets value if input to current title
			// and flags the <todo> with .editing.
			tag.prototype.edit = function (){
				this.flag('editing');
				this._edit.setValue(this.object().title());
				return this._edit.focus();
			};
			
			tag.prototype.save = function (){
				if (this.hasFlag('editing')) {
					this.unflag('editing');
					return this.up(q$('._app',this)).rename(this.object(),this._edit.value());
				};
			};
			
			tag.prototype.drop = function (){
				return this.up(q$('._app',this)).drop(this.object());
			};
			
			tag.prototype.onkeydown = function (e){
				switch (e.which()) {
					case ENTER_KEY:
						return this.save();break;
					
					case ESCAPE_KEY:
						return this.unflag('editing');break;
				
				};
			};
		});
		
		
		tag$.defineTag('app', function(tag){
			
			tag.prototype.todos = function(v){ return this._todos; }
			tag.prototype.setTodos = function(v){ this._todos = v; return this; };
			
			tag.prototype.hash = function (){
				return window.location.hash;
			};
			
			tag.prototype.build = function (){
				var self = this;
				self.load();
				window.addEventListener('hashchange',function() { return self.scheduler().mark(); });
				return self.schedule();
			};
			
			tag.prototype.render = function (){
				var t0, t1, t2, self = this, t3, t4, t5, t6, t7, t8, t9, t10;
				var items = this.todos();
				var active = this.remaining();
				var done = this.completed();
				
				
				if (this.hash() == '#/completed') {
					items = done;
				} else if (this.hash() == '#/active') {
					items = active;
				};
				
				return this.setChildren([
					(t0 = this.$a=this.$a || tag$.$header().flag('header')).setContent([
						(t0.$$a = t0.$$a || tag$.$h1()).setText("todos").end(),
						(t1 = t0.$$b=t0.$$b || tag$.$form()).setContent((this._adder = this._adder || tag$.$input().setRef('adder',this).flag('new-todo').setType('text').setPlaceholder('What needs to be done?')).end(),2).end()
					],2).end(),
					
					(this.todos().length > 0) ? (Imba.static([
						(t2 = self.$b=self.$b || tag$.$section().flag('main')).setContent([
							(t2.$$a = t2.$$a || tag$.$input().flag('toggle-all').setType('checkbox').setHandler('change','toggleAll',this)).setChecked((active.length == 0)).end(),
							(t3 = t2.$$b=t2.$$b || tag$.$ul().flag('todo-list')).setContent(
								(function(t3) {
									for (var i = 0, ary = iter$(items), len = ary.length, todo, res = []; i < len; i++) {
										todo = ary[i];
										res.push((t3['_' + todo.id()] = t3['_' + todo.id()] || tag$.$todo()).setObject(todo).end());
									};
									return res;
								})(t3)
							,3).end()
						],2).end(),
						
						(t4 = self.$c=self.$c || tag$.$footer().flag('footer')).setContent([
							(t5 = t4.$$a=t4.$$a || tag$.$span().flag('todo-count')).setContent([
								(t6 = t5.$$a=t5.$$a || tag$.$strong()).setContent(("" + (active.length) + " "),3).end(),
								active.length == 1 ? ('item left') : ('items left')
							],1).end(),
							(t7 = t4.$$b=t4.$$b || tag$.$ul().flag('filters')).setContent([
								(t8 = t7.$$a=t7.$$a || tag$.$li()).setContent((t8.$$a = t8.$$a || tag$.$a().setHref('#/')).flag('selected',(items == self.todos())).setText('All').end(),2).end(),
								(t9 = t7.$$b=t7.$$b || tag$.$li()).setContent((t9.$$a = t9.$$a || tag$.$a().setHref('#/active')).flag('selected',(items == active)).setText('Active').end(),2).end(),
								(t10 = t7.$$c=t7.$$c || tag$.$li()).setContent((t10.$$a = t10.$$a || tag$.$a().setHref('#/completed')).flag('selected',(items == done)).setText('Completed').end(),2).end()
							],2).end(),
							
							(done.length > 0) ? (
								(t4.$$c = t4.$$c || tag$.$button().flag('clear-completed').setHandler('tap','archive',self)).setText('Clear completed').end()
							) : void(0)
						],1).end()
					],2)) : void(0)
				],1).synced();
			};
			
			tag.prototype.remaining = function (){
				return this.todos().filter(function(todo) { return !todo.completed(); });
			};
			
			tag.prototype.completed = function (){
				return this.todos().filter(function(todo) { return todo.completed(); });
			};
			
			tag.prototype.dirty = function (){
				return this.persist();
			};
			
			tag.prototype.add = function (title){
				if (title.trim()) {
					this.todos().push(new Todo(title.trim()));
					return this.persist();
				};
			};
			
			tag.prototype.toggle = function (todo){
				todo.setCompleted(!todo.completed());
				return this.persist();
			};
			
			tag.prototype.toggleAll = function (e){
				for (var i = 0, ary = iter$(this.todos()), len = ary.length; i < len; i++) {
					ary[i].setCompleted(e.target().checked());
				};
				return this.persist();
			};
			
			// rename a todo
			// drops the todo if title is blank
			tag.prototype.rename = function (todo,title){
				todo.setTitle(title.trim());
				return todo.title() ? (this.persist()) : (this.drop(todo));
			};
			
			// remove a todo from collection
			tag.prototype.drop = function (todo){
				// simply removing it from the list of todos
				this.setTodos(this.todos().filter(function(t) { return t != todo; }));
				return this.persist();
			};
			
			// remove all completed todos from collection
			tag.prototype.archive = function (){
				this.setTodos(this.remaining());
				return this.persist();
			};
			
			// load todos from localstorage
			tag.prototype.load = function (){
				var items = JSON.parse(window.localStorage.getItem('todos-imba') || '[]');
				this.setTodos(items.map(function(item) { return new Todo(item.title,item.completed); }));
				return this;
			};
			
			// persist todos to localstorage
			tag.prototype.persist = function (){
				var json = JSON.stringify(this.todos());
				if (json != this._json) { window.localStorage.setItem('todos-imba',this._json = json) };
				return this;
			};
			
			tag.prototype.onsubmit = function (e){
				var v_;
				e.cancel().halt();
				this.add(this._adder.value());
				return (this._adder.setValue(v_ = ''),v_);
			};
		});
		
		
		var app = tag$.$app().setId('app').setTodos([]).end();
		return (q$$('.todoapp') || q$$('body')).append(app);
	
	})()

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
		var imba;
		return module.exports.imba = imba = __webpack_require__(2);
	
	})()

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
		
		if (typeof Imba === 'undefined') {
			__webpack_require__(3);
			__webpack_require__(4);
			__webpack_require__(5);
			__webpack_require__(6);
			__webpack_require__(7);
			__webpack_require__(8);
			__webpack_require__(9);
			
			if (false) {
				require('./dom.server');
			};
			
			if (true) {
				__webpack_require__(10);
				__webpack_require__(11);
				__webpack_require__(12);
			};
			
			return __webpack_require__(13);
		} else {
			return console.warn(("Imba v" + (Imba.VERSION) + " is already loaded"));
		};

	})()

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {(function(){
		if (typeof window !== 'undefined') {
			// should not go there
			global = window;
		};
		
		var isClient = (typeof window == 'object' && this == window);
		/*
		Imba is the namespace for all runtime related utilities
		@namespace
		*/
		
		Imba = {
			VERSION: '0.14.3',
			CLIENT: isClient,
			SERVER: !(isClient),
			DEBUG: false
		};
		
		var reg = /-./g;
		
		/*
		True if running in client environment.
		@return {bool}
		*/
		
		Imba.isClient = function (){
			return (true) == true;
		};
		
		/*
		True if running in server environment.
		@return {bool}
		*/
		
		Imba.isServer = function (){
			return (false) == true;
		};
		
		Imba.subclass = function (obj,sup){
			;
			for (var k in sup){
				if (sup.hasOwnProperty(k)) { obj[k] = sup[k] };
			};
			
			obj.prototype = Object.create(sup.prototype);
			obj.__super__ = obj.prototype.__super__ = sup.prototype;
			obj.prototype.initialize = obj.prototype.constructor = obj;
			return obj;
		};
		
		/*
		Lightweight method for making an object iterable in imbas for/in loops.
		If the compiler cannot say for certain that a target in a for loop is an
		array, it will cache the iterable version before looping.
		
		```imba
		# this is the whole method
		def Imba.iterable o
			return o ? (o:toArray ? o.toArray : o) : []
		
		class CustomIterable
			def toArray
				[1,2,3]
		
		# will return [2,4,6]
		for x in CustomIterable.new
			x * 2
		
		```
		*/
		
		Imba.iterable = function (o){
			return o ? ((o.toArray ? (o.toArray()) : (o))) : ([]);
		};
		
		/*
		Coerces a value into a promise. If value is array it will
		call `Promise.all(value)`, or if it is not a promise it will
		wrap the value in `Promise.resolve(value)`. Used for experimental
		await syntax.
		@return {Promise}
		*/
		
		Imba.await = function (value){
			if (value instanceof Array) {
				return Promise.all(value);
			} else if (value && value.then) {
				return value;
			} else {
				return Promise.resolve(value);
			};
		};
		
		Imba.toCamelCase = function (str){
			return str.replace(reg,function(m) { return m.charAt(1).toUpperCase(); });
		};
		
		Imba.toCamelCase = function (str){
			return str.replace(reg,function(m) { return m.charAt(1).toUpperCase(); });
		};
		
		Imba.indexOf = function (a,b){
			return (b && b.indexOf) ? (b.indexOf(a)) : ([].indexOf.call(a,b));
		};
		
		Imba.prop = function (scope,name,opts){
			if (scope.defineProperty) {
				return scope.defineProperty(name,opts);
			};
			return;
		};
		
		return Imba.attr = function (scope,name,opts){
			if (scope.defineAttribute) {
				return scope.defineAttribute(name,opts);
			};
			
			var getName = Imba.toCamelCase(name);
			var setName = Imba.toCamelCase('set-' + name);
			
			scope.prototype[getName] = function() {
				return this.getAttribute(name);
			};
			
			scope.prototype[setName] = function(value) {
				this.setAttribute(name,value);
				return this;
			};
			
			return;
		};

	})()
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	(function(){
		
		
		function emit__(event,args,node){
			// var node = cbs[event]
			var prev,cb,ret;
			
			while ((prev = node) && (node = node.next)){
				if (cb = node.listener) {
					if (node.path && cb[node.path]) {
						ret = args ? (cb[node.path].apply(cb,args)) : (cb[node.path]());
					} else {
						// check if it is a method?
						ret = args ? (cb.apply(node,args)) : (cb.call(node));
					};
				};
				
				if (node.times && --node.times <= 0) {
					prev.next = node.next;
					node.listener = null;
				};
			};
			return;
		};
		
		// method for registering a listener on object
		Imba.listen = function (obj,event,listener,path){
			var $1;
			var cbs,list,tail;
			cbs = obj.__listeners__ || (obj.__listeners__ = {});
			list = cbs[($1 = event)] || (cbs[$1] = {});
			tail = list.tail || (list.tail = (list.next = {}));
			tail.listener = listener;
			tail.path = path;
			list.tail = tail.next = {};
			return tail;
		};
		
		Imba.once = function (obj,event,listener){
			var tail = Imba.listen(obj,event,listener);
			tail.times = 1;
			return tail;
		};
		
		Imba.unlisten = function (obj,event,cb,meth){
			var node,prev;
			var meta = obj.__listeners__;
			if (!(meta)) { return };
			
			if (node = meta[event]) {
				while ((prev = node) && (node = node.next)){
					if (node == cb || node.listener == cb) {
						prev.next = node.next;
						// check for correct path as well?
						node.listener = null;
						break;
					};
				};
			};
			return;
		};
		
		Imba.emit = function (obj,event,params){
			var cb;
			if (cb = obj.__listeners__) {
				if (cb[event]) { emit__(event,params,cb[event]) };
				if (cb.all) { emit__(event,[event,params],cb.all) }; // and event != 'all'
			};
			return;
		};
		
		return Imba.observeProperty = function (observer,key,trigger,target,prev){
			if (prev && typeof prev == 'object') {
				Imba.unlisten(prev,'all',observer,trigger);
			};
			if (target && typeof target == 'object') {
				Imba.listen(target,'all',observer,trigger);
			};
			return this;
		};

	})()

/***/ },
/* 5 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {(function(){
		function idx$(a,b){
			return (b && b.indexOf) ? b.indexOf(a) : [].indexOf.call(a,b);
		};
		
		
		var raf; // very simple raf polyfill
		raf || (raf = global.requestAnimationFrame);
		raf || (raf = global.webkitRequestAnimationFrame);
		raf || (raf = global.mozRequestAnimationFrame);
		raf || (raf = function(blk) { return setTimeout(blk,1000 / 60); });
		
		Imba.tick = function (d){
			if (this._scheduled) { raf(Imba.ticker()) };
			Imba.Scheduler.willRun();
			this.emit(this,'tick',[d]);
			Imba.Scheduler.didRun();
			return;
		};
		
		Imba.ticker = function (){
			var self = this;
			return self._ticker || (self._ticker = function(e) { return self.tick(e); });
		};
		
		/*
		
		Global alternative to requestAnimationFrame. Schedule a target
		to tick every frame. You can specify which method to call on the
		target (defaults to tick).
		
		*/
		
		Imba.schedule = function (target,method){
			if(method === undefined) method = 'tick';
			this.listen(this,'tick',target,method);
			// start scheduling now if this was the first one
			if (!this._scheduled) {
				this._scheduled = true;
				raf(Imba.ticker());
			};
			return this;
		};
		
		/*
		
		Unschedule a previously scheduled target
		
		*/
		
		Imba.unschedule = function (target,method){
			this.unlisten(this,'tick',target,method);
			var cbs = this.__listeners__ || (this.__listeners__ = {});
			if (!cbs.tick || !cbs.tick.next || !cbs.tick.next.listener) {
				this._scheduled = false;
			};
			return this;
		};
		
		/*
		
		Light wrapper around native setTimeout that expects the block / function
		as last argument (instead of first). It also triggers an event to Imba
		after the timeout to let schedulers update (to rerender etc) afterwards.
		
		*/
		
		Imba.setTimeout = function (delay,block){
			return setTimeout(function() {
				block();
				return Imba.Scheduler.markDirty();
				// Imba.emit(Imba,'timeout',[block])
			},delay);
		};
		
		/*
		
		Light wrapper around native setInterval that expects the block / function
		as last argument (instead of first). It also triggers an event to Imba
		after every interval to let schedulers update (to rerender etc) afterwards.
		
		*/
		
		Imba.setInterval = function (interval,block){
			return setInterval(function() {
				block();
				return Imba.Scheduler.markDirty();
				// Imba.emit(Imba,'interval',[block])
			},interval);
		};
		
		/*
		Clear interval with specified id
		*/
		
		Imba.clearInterval = function (interval){
			return clearInterval(interval);
		};
		
		/*
		Clear timeout with specified id
		*/
		
		Imba.clearTimeout = function (timeout){
			return clearTimeout(timeout);
		};
		
		// should add an Imba.run / setImmediate that
		// pushes listener onto the tick-queue with times - once
		
		
		/*
		
		Instances of Imba.Scheduler manages when to call `tick()` on their target,
		at a specified framerate or when certain events occur. Root-nodes in your
		applications will usually have a scheduler to make sure they rerender when
		something changes. It is also possible to make inner components use their
		own schedulers to control when they render.
		
		@iname scheduler
		
		*/
		
		Imba.Scheduler = function Scheduler(target){
			var self = this;
			self._target = target;
			self._marked = false;
			self._active = false;
			self._marker = function() { return self.mark(); };
			self._ticker = function(e) { return self.tick(e); };
			
			self._events = true;
			self._fps = 1;
			
			self._dt = 0;
			self._timestamp = 0;
			self._ticks = 0;
			self._flushes = 0;
		};
		
		Imba.Scheduler.markDirty = function (){
			this._dirty = true;
			return this;
		};
		
		Imba.Scheduler.isDirty = function (){
			return !(!this._dirty);
		};
		
		Imba.Scheduler.willRun = function (){
			return this._active = true;
		};
		
		Imba.Scheduler.didRun = function (){
			this._active = false;
			return this._dirty = false;
		};
		
		Imba.Scheduler.isActive = function (){
			return !(!this._active);
		};
		
		/*
			Create a new Imba.Scheduler for specified target
			@return {Imba.Scheduler}
			*/
		
		/*
			Check whether the current scheduler is active or not
			@return {bool}
			*/
		
		Imba.Scheduler.prototype.active = function (){
			return this._active;
		};
		
		/*
			Delta time between the two last ticks
			@return {Number}
			*/
		
		Imba.Scheduler.prototype.dt = function (){
			return this._dt;
		};
		
		/*
			Configure the scheduler
			@return {self}
			*/
		
		Imba.Scheduler.prototype.configure = function (pars){
			if(!pars||pars.constructor !== Object) pars = {};
			var fps = pars.fps !== undefined ? pars.fps : 1;
			var events = pars.events !== undefined ? pars.events : true;
			if (events != null) { this._events = events };
			if (fps != null) { this._fps = fps };
			return this;
		};
		
		/*
			Mark the scheduler as dirty. This will make sure that
			the scheduler calls `target.tick` on the next frame
			@return {self}
			*/
		
		Imba.Scheduler.prototype.mark = function (){
			this._marked = true;
			return this;
		};
		
		/*
			Instantly trigger target.tick and mark scheduler as clean (not dirty/marked).
			This is called implicitly from tick, but can also be called manually if you
			really want to force a tick without waiting for the next frame.
			@return {self}
			*/
		
		Imba.Scheduler.prototype.flush = function (){
			this._marked = false;
			this._flushes++;
			this._target.tick();
			return this;
		};
		
		/*
			@fixme this expects raf to run at 60 fps 
		
			Called automatically on every frame while the scheduler is active.
			It will only call `target.tick` if the scheduler is marked dirty,
			or when according to @fps setting.
		
			If you have set up a scheduler with an fps of 1, tick will still be
			called every frame, but `target.tick` will only be called once every
			second, and it will *make sure* each `target.tick` happens in separate
			seconds according to Date. So if you have a node that renders a clock
			based on Date.now (or something similar), you can schedule it with 1fps,
			never needing to worry about two ticks happening within the same second.
			The same goes for 4fps, 10fps etc.
		
			@protected
			@return {self}
			*/
		
		Imba.Scheduler.prototype.tick = function (delta){
			this._ticks++;
			this._dt = delta;
			
			var fps = this._fps;
			
			if (fps == 60) {
				this._marked = true;
			} else if (fps == 30) {
				if (this._ticks % 2) { this._marked = true };
			} else if (fps) {
				// if it is less round - we trigger based
				// on date, for consistent rendering.
				// ie, if you want to render every second
				// it is important that no two renders
				// happen during the same second (according to Date)
				var period = ((60 / fps) / 60) * 1000;
				var beat = Math.floor(Date.now() / period);
				
				if (this._beat != beat) {
					this._beat = beat;
					this._marked = true;
				};
			};
			
			if (this._marked || (this._events && Imba.Scheduler.isDirty())) this.flush();
			// reschedule if @active
			return this;
		};
		
		/*
			Start the scheduler if it is not already active.
			**While active**, the scheduler will override `target.commit`
			to do nothing. By default Imba.tag#commit calls render, so
			that rendering is cascaded through to children when rendering
			a node. When a scheduler is active (for a node), Imba disables
			this automatic rendering.
			*/
		
		Imba.Scheduler.prototype.activate = function (){
			if (!this._active) {
				this._active = true;
				// override target#commit while this is active
				this._commit = this._target.commit;
				this._target.commit = function() { return this; };
				Imba.schedule(this);
				if (this._events) { Imba.listen(Imba,'event',this,'onevent') };
				this._target && this._target.flag  &&  this._target.flag('scheduled_');
				this.tick(0); // start ticking
			};
			return this;
		};
		
		/*
			Stop the scheduler if it is active.
			*/
		
		Imba.Scheduler.prototype.deactivate = function (){
			if (this._active) {
				this._active = false;
				this._target.commit = this._commit;
				Imba.unschedule(this);
				Imba.unlisten(Imba,'event',this);
				this._target && this._target.unflag  &&  this._target.unflag('scheduled_');
			};
			return this;
		};
		
		Imba.Scheduler.prototype.track = function (){
			return this._marker;
		};
		
		Imba.Scheduler.prototype.onevent = function (event){
			var $1;
			if (this._marked) { return this };
			
			if (this._events instanceof Function) {
				if (this._events(event)) this.mark();
			} else if (this._events instanceof Array) {
				if (idx$(($1 = event) && $1.type  &&  $1.type(),this._events) >= 0) this.mark();
			} else if (this._events) {
				if (event._responder) this.mark();
			};
			return this;
		};
		return Imba.Scheduler;
	
	})()
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports) {

	(function(){
		function idx$(a,b){
			return (b && b.indexOf) ? b.indexOf(a) : [].indexOf.call(a,b);
		};
		
		Imba.static = function (items,nr){
			items.static = nr;
			return items;
		};
		
		/*
		This is the baseclass that all tags in imba inherit from.
		@iname node
		*/
		
		Imba.Tag = function Tag(dom){
			this.setDom(dom);
		};
		
		Imba.Tag.createNode = function (){
			throw "Not implemented";
		};
		
		Imba.Tag.build = function (){
			return new this(this.createNode());
		};
		
		Imba.Tag.prototype.object = function(v){ return this._object; }
		Imba.Tag.prototype.setObject = function(v){ this._object = v; return this; };
		
		Imba.Tag.prototype.dom = function (){
			return this._dom;
		};
		
		Imba.Tag.prototype.setDom = function (dom){
			dom._tag = this;
			this._dom = dom;
			return this;
		};
		
		/*
			Setting references for tags like
			`<div@header>` will compile to `tag('div').setRef('header',this).end()`
			By default it adds the reference as a className to the tag.
			@return {self}
			*/
		
		Imba.Tag.prototype.setRef = function (ref,ctx){
			this.flag(this._ref = ref);
			return this;
		};
		
		/*
			Method that is called by the compiled tag-chains, for
			binding events on tags to methods etc.
			`<a :tap=fn>` compiles to `tag('a').setHandler('tap',fn,this).end()`
			where this refers to the context in which the tag is created.
			@return {self}
			*/
		
		Imba.Tag.prototype.setHandler = function (event,handler,ctx){
			var key = 'on' + event;
			
			if (handler instanceof Function) {
				this[key] = handler;
			} else if (handler instanceof Array) {
				var fn = handler.shift();
				this[key] = function(e) { return ctx[fn].apply(ctx,handler.concat(e)); };
			} else {
				this[key] = function(e) { return ctx[handler](e); };
			};
			return this;
		};
		
		Imba.Tag.prototype.setId = function (id){
			this.dom().id = id;
			return this;
		};
		
		Imba.Tag.prototype.id = function (){
			return this.dom().id;
		};
		
		/*
			Adds a new attribute or changes the value of an existing attribute
			on the specified tag. If the value is null or false, the attribute
			will be removed.
			@return {self}
			*/
		
		Imba.Tag.prototype.setAttribute = function (name,value){
			// should this not return self?
			var old = this.dom().getAttribute(name);
			
			if (old == value) {
				return value;
			} else if (value != null && value !== false) {
				return this.dom().setAttribute(name,value);
			} else {
				return this.dom().removeAttribute(name);
			};
		};
		
		/*
			removes an attribute from the specified tag
			*/
		
		Imba.Tag.prototype.removeAttribute = function (name){
			return this.dom().removeAttribute(name);
		};
		
		/*
			returns the value of an attribute on the tag.
			If the given attribute does not exist, the value returned
			will either be null or "" (the empty string)
			*/
		
		Imba.Tag.prototype.getAttribute = function (name){
			return this.dom().getAttribute(name);
		};
		
		/*
			Override this to provide special wrapping etc.
			@return {self}
			*/
		
		Imba.Tag.prototype.setContent = function (content,type){
			this.setChildren(content,type);
			return this;
		};
		
		/*
			Set the children of node. type param is optional,
			and should only be used by Imba when compiling tag trees. 
			@return {self}
			*/
		
		Imba.Tag.prototype.setChildren = function (nodes,type){
			throw "Not implemented";
		};
		
		/*
			Get text of node. Uses textContent behind the scenes (not innerText)
			[https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent]()
			@return {string} inner text of node
			*/
		
		Imba.Tag.prototype.text = function (v){
			return this._dom.textContent;
		};
		
		/*
			Set text of node. Uses textContent behind the scenes (not innerText)
			[https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent]()
			*/
		
		Imba.Tag.prototype.setText = function (txt){
			this._empty = false;
			this._dom.textContent = txt == null ? (txt = "") : (txt);
			return this;
		};
		
		
		/*
			Method for getting and setting data-attributes. When called with zero
			arguments it will return the actual dataset for the tag.
		
				var node = <div data-name='hello'>
				# get the whole dataset
				node.dataset # {name: 'hello'}
				# get a single value
				node.dataset('name') # 'hello'
				# set a single value
				node.dataset('name','newname') # self
		
		
			*/
		
		Imba.Tag.prototype.dataset = function (key,val){
			throw "Not implemented";
		};
		
		/*
			Empty placeholder. Override to implement custom render behaviour.
			Works much like the familiar render-method in React.
			@return {self}
			*/
		
		Imba.Tag.prototype.render = function (){
			return this;
		};
		
		/*
			Called implicitly through Imba.Tag#end, upon creating a tag. All
			properties will have been set before build is called, including
			setContent.
			@return {self}
			*/
		
		Imba.Tag.prototype.build = function (){
			this.render();
			return this;
		};
		
		/*
			Called implicitly through Imba.Tag#end, for tags that are part of
			a tag tree (that are rendered several times).
			@return {self}
			*/
		
		Imba.Tag.prototype.commit = function (){
			this.render();
			return this;
		};
		
		/*
		
			Called by the tag-scheduler (if this tag is scheduled)
			By default it will call this.render. Do not override unless
			you really understand it.
		
			*/
		
		Imba.Tag.prototype.tick = function (){
			this.render();
			return this;
		};
		
		/*
			
			A very important method that you will practically never manually.
			The tag syntax of Imba compiles to a chain of setters, which always
			ends with .end. `<a.large>` compiles to `tag('a').flag('large').end()`
			
			You are highly adviced to not override its behaviour. The first time
			end is called it will mark the tag as built and call Imba.Tag#build,
			and call Imba.Tag#commit on subsequent calls.
			@return {self}
			*/
		
		Imba.Tag.prototype.end = function (){
			if (this._built) {
				this.commit();
			} else {
				this._built = true;
				this.build();
			};
			return this;
		};
		
		/*
			This is called instead of Imba.Tag#end for `<self>` tag chains.
			Defaults to noop
			@return {self}
			*/
		
		Imba.Tag.prototype.synced = function (){
			return this;
		};
		
		// called when the node is awakened in the dom - either automatically
		// upon attachment to the dom-tree, or the first time imba needs the
		// tag for a domnode that has been rendered on the server
		Imba.Tag.prototype.awaken = function (){
			return this;
		};
		
		/*
			List of flags for this node. 
			*/
		
		Imba.Tag.prototype.flags = function (){
			return this._dom.classList;
		};
		
		/*
			Add speficied flag to current node.
			If a second argument is supplied, it will be coerced into a Boolean,
			and used to indicate whether we should remove the flag instead.
			@return {self}
			*/
		
		Imba.Tag.prototype.flag = function (name,toggler){
			// it is most natural to treat a second undefined argument as a no-switch
			// so we need to check the arguments-length
			if (arguments.length == 2 && !(toggler)) {
				this._dom.classList.remove(name);
			} else {
				this._dom.classList.add(name);
			};
			return this;
		};
		
		/*
			Remove specified flag from node
			@return {self}
			*/
		
		Imba.Tag.prototype.unflag = function (name){
			this._dom.classList.remove(name);
			return this;
		};
		
		/*
			Toggle specified flag on node
			@return {self}
			*/
		
		Imba.Tag.prototype.toggleFlag = function (name){
			this._dom.classList.toggle(name);
			return this;
		};
		
		/*
			Check whether current node has specified flag
			@return {bool}
			*/
		
		Imba.Tag.prototype.hasFlag = function (name){
			return this._dom.classList.contains(name);
		};
		
		/*
			Get the scheduler for this node. A new scheduler will be created
			if it does not already exist.
		
			@return {Imba.Scheduler}
			*/
		
		Imba.Tag.prototype.scheduler = function (){
			return this._scheduler == null ? (this._scheduler = new Imba.Scheduler(this)) : (this._scheduler);
		};
		
		/*
		
			Shorthand to start scheduling a node. The method will basically
			proxy the arguments through to scheduler.configure, and then
			activate the scheduler.
			
			@return {self}
			*/
		
		Imba.Tag.prototype.schedule = function (options){
			if(options === undefined) options = {};
			this.scheduler().configure(options).activate();
			return this;
		};
		
		/*
			Shorthand for deactivating scheduler (if tag has one).
			@deprecated
			*/
		
		Imba.Tag.prototype.unschedule = function (){
			if (this._scheduler) { this.scheduler().deactivate() };
			return this;
		};
		
		
		/*
			Get the parent of current node
			@return {Imba.Tag} 
			*/
		
		Imba.Tag.prototype.parent = function (){
			return tag$wrap(this.dom().parentNode);
		};
		
		/*
			Shorthand for console.log on elements
			@return {self}
			*/
		
		Imba.Tag.prototype.log = function (){
			var $0 = arguments, i = $0.length;
			var args = new Array(i>0 ? i : 0);
			while(i>0) args[i-1] = $0[--i];
			args.unshift(console);
			Function.prototype.call.apply(console.log,args);
			return this;
		};
		
		Imba.Tag.prototype.css = function (key,val){
			if (key instanceof Object) {
				for (var i = 0, keys = Object.keys(key), l = keys.length; i < l; i++){
					this.css(keys[i],key[keys[i]]);
				};
			} else if (val == null) {
				this.dom().style.removeProperty(key);
			} else if (val == undefined) {
				return this.dom().style[key];
			} else {
				if ((typeof val=='number'||val instanceof Number) && key.match(/width|height|left|right|top|bottom/)) {
					val = val + "px";
				};
				this.dom().style[key] = val;
			};
			return this;
		};
		
		Imba.Tag.prototype.setTransform = function (value){
			this.css('transform',value);
			return this;
		};
		
		Imba.Tag.prototype.transform = function (){
			return this.css('transform');
		};
		
		
		Imba.Tag.prototype.initialize = Imba.Tag;
		
		HTML_TAGS = "a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr".split(" ");
		HTML_TAGS_UNSAFE = "article aside header section".split(" ");
		SVG_TAGS = "circle defs ellipse g line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan".split(" ");
		
		
		function extender(obj,sup){
			for (var i = 0, keys = Object.keys(sup), l = keys.length; i < l; i++){
				obj[($1 = keys[i])] == null ? (obj[$1] = sup[keys[i]]) : (obj[$1]);
			};
			
			obj.prototype = Object.create(sup.prototype);
			obj.__super__ = obj.prototype.__super__ = sup.prototype;
			obj.prototype.initialize = obj.prototype.constructor = obj;
			if (sup.inherit) { sup.inherit(obj) };
			return obj;
		};
		
		function Tag(){
			return function(dom) {
				this.setDom(dom);
				return this;
			};
		};
		
		function TagSpawner(type){
			return function() { return type.build(); };
		};
		
		Imba.Tags = function Tags(){
			this;
		};
		
		Imba.Tags.prototype.__clone = function (ns){
			var clone = Object.create(this);
			clone._parent = this;
			return clone;
		};
		
		Imba.Tags.prototype.defineNamespace = function (name){
			var clone = Object.create(this);
			clone._parent = this;
			clone._ns = name;
			this[name.toUpperCase()] = clone;
			return clone;
		};
		
		Imba.Tags.prototype.baseType = function (name){
			return idx$(name,HTML_TAGS) >= 0 ? ('htmlelement') : ('div');
		};
		
		Imba.Tags.prototype.defineTag = function (name,supr,body){
			if(body==undefined && typeof supr == 'function') body = supr,supr = '';
			if(supr==undefined) supr = '';
			supr || (supr = this.baseType(name));
			var supertype = this[supr];
			var tagtype = Tag();
			var norm = name.replace(/\-/g,'_');
			
			
			tagtype._name = name;
			extender(tagtype,supertype);
			
			if (name[0] == '#') {
				this[name] = tagtype;
				Imba.SINGLETONS[name.slice(1)] = tagtype;
			} else {
				this[name] = tagtype;
				this['$' + norm] = TagSpawner(tagtype);
			};
			
			if (body) {
				if (body.length == 2) {
					// create clone
					if (!tagtype.hasOwnProperty('TAGS')) {
						tagtype.TAGS = (supertype.TAGS || this).__clone();
					};
				};
				
				body.call(tagtype,tagtype,tagtype.TAGS || this);
			};
			
			return tagtype;
		};
		
		Imba.Tags.prototype.defineSingleton = function (name,supr,body){
			return this.defineTag(name,supr,body);
		};
		
		Imba.Tags.prototype.extendTag = function (name,supr,body){
			if(body==undefined && typeof supr == 'function') body = supr,supr = '';
			if(supr==undefined) supr = '';
			var klass = ((typeof name=='string'||name instanceof String) ? (this[name]) : (name));
			// allow for private tags here as well?
			if (body) { body && body.call(klass,klass,klass.prototype) };
			return klass;
		};
		
		
		Imba.TAGS = new Imba.Tags();
		Imba.TAGS.element = Imba.Tag;
		
		var svg = Imba.TAGS.defineNamespace('svg');
		
		svg.baseType = function (name){
			return 'svgelement';
		};
		
		
		Imba.SINGLETONS = {};
		
		
		Imba.defineTag = function (name,supr,body){
			if(body==undefined && typeof supr == 'function') body = supr,supr = '';
			if(supr==undefined) supr = '';
			return Imba.TAGS.defineTag(name,supr,body);
		};
		
		Imba.defineSingletonTag = function (id,supr,body){
			if(body==undefined && typeof supr == 'function') body = supr,supr = 'div';
			if(supr==undefined) supr = 'div';
			return Imba.TAGS.defineTag(this.name(),supr,body);
		};
		
		Imba.extendTag = function (name,body){
			return Imba.TAGS.extendTag(name,body);
		};
		
		Imba.tag = function (name){
			var typ = Imba.TAGS[name];
			if (!(typ)) { throw new Error(("tag " + name + " is not defined")) };
			return new typ(typ.createNode());
		};
		
		Imba.tagWithId = function (name,id){
			var typ = Imba.TAGS[name];
			if (!(typ)) { throw new Error(("tag " + name + " is not defined")) };
			var dom = typ.createNode();
			dom.id = id;
			return new typ(dom);
		};
		
		// TODO: Can we move these out and into dom.imba in a clean way?
		// These methods depends on Imba.document.getElementById
		
		Imba.getTagSingleton = function (id){
			var klass;
			var dom,node;
			
			if (klass = Imba.SINGLETONS[id]) {
				if (klass && klass.Instance) { return klass.Instance };
				
				// no instance - check for element
				if (dom = Imba.document().getElementById(id)) {
					// we have a live instance - when finding it through a selector we should awake it, no?
					// console.log('creating the singleton from existing node in dom?',id,type)
					node = klass.Instance = new klass(dom);
					node.awaken(dom); // should only awaken
					return node;
				};
				
				dom = klass.createNode();
				dom.id = id;
				node = klass.Instance = new klass(dom);
				node.end().awaken(dom);
				return node;
			} else if (dom = Imba.document().getElementById(id)) {
				return Imba.getTagForDom(dom);
			};
		};
		
		var svgSupport = typeof SVGElement !== 'undefined';
		
		Imba.getTagForDom = function (dom){
			var m;
			if (!(dom)) { return null };
			if (dom._dom) { return dom }; // could use inheritance instead
			if (dom._tag) { return dom._tag };
			if (!dom.nodeName) { return null };
			
			var ns = null;
			var id = dom.id;
			var type = dom.nodeName.toLowerCase();
			var tags = Imba.TAGS;
			var native$ = type;
			var cls = dom.className;
			
			if (id && Imba.SINGLETONS[id]) {
				// FIXME control that it is the same singleton?
				// might collide -- not good?
				return Imba.getTagSingleton(id);
			};
			// look for id - singleton
			
			// need better test here
			if (svgSupport && (dom instanceof SVGElement)) {
				ns = "svg";
				cls = dom.className.baseVal;
				tags = tags.SVG;
			};
			
			var spawner;
			
			if (cls) {
				// there can be several matches here - should choose the last
				// should fall back to less specific later? - otherwise things may fail
				// TODO rework this
				if (m = cls.match(/\b_([a-z\-]+)\b(?!\s*_[a-z\-]+)/)) {
					type = m[1]; // .replace(/-/g,'_')
				};
				
				if (m = cls.match(/\b([A-Z\-]+)_\b/)) {
					ns = m[1];
				};
			};
			
			
			spawner = tags[type] || tags[native$];
			return spawner ? (new spawner(dom).awaken(dom)) : (null);
		};
		
		tag$ = Imba.TAGS;
		t$ = Imba.tag;
		tc$ = Imba.tagWithFlags;
		ti$ = Imba.tagWithId;
		tic$ = Imba.tagWithIdAndFlags;
		id$ = Imba.getTagSingleton;
		return tag$wrap = Imba.getTagForDom;
		

	})()

/***/ },
/* 7 */
/***/ function(module, exports) {

	(function(){
		function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
		
		Imba.document = function (){
			return window.document;
		};
		
		/*
		Returns the body element wrapped in an Imba.Tag
		*/
		
		Imba.root = function (){
			return tag$wrap(Imba.document().body);
		};
		
		tag$.defineTag('htmlelement', 'element', function(tag){
			
			/*
				Called when a tag type is being subclassed.
				*/
			
			tag.inherit = function (child){
				child.prototype._empty = true;
				child._protoDom = null;
				
				if (this._nodeType) {
					child._nodeType = this._nodeType;
					
					var className = "_" + child._name.replace(/_/g,'-');
					if (child._name[0] != '#') { return child._classes = this._classes.concat(className) };
				} else {
					child._nodeType = child._name;
					return child._classes = [];
				};
			};
			
			tag.buildNode = function (){
				var dom = Imba.document().createElement(this._nodeType);
				var cls = this._classes.join(" ");
				if (cls) { dom.className = cls };
				return dom;
			};
			
			tag.createNode = function (){
				var proto = (this._protoDom || (this._protoDom = this.buildNode()));
				return proto.cloneNode(false);
			};
			
			tag.dom = function (){
				return this._protoDom || (this._protoDom = this.buildNode());
			};
			
			tag.prototype.id = function(v){ return this.getAttribute('id'); }
			tag.prototype.setId = function(v){ this.setAttribute('id',v); return this; };
			tag.prototype.tabindex = function(v){ return this.getAttribute('tabindex'); }
			tag.prototype.setTabindex = function(v){ this.setAttribute('tabindex',v); return this; };
			tag.prototype.title = function(v){ return this.getAttribute('title'); }
			tag.prototype.setTitle = function(v){ this.setAttribute('title',v); return this; };
			tag.prototype.role = function(v){ return this.getAttribute('role'); }
			tag.prototype.setRole = function(v){ this.setAttribute('role',v); return this; };
			
			tag.prototype.width = function (){
				return this._dom.offsetWidth;
			};
			
			tag.prototype.height = function (){
				return this._dom.offsetHeight;
			};
			
			tag.prototype.setChildren = function (nodes,type){
				this._empty ? (this.append(nodes)) : (this.empty().append(nodes));
				this._children = null;
				return this;
			};
			
			/*
				Set inner html of node
				*/
			
			tag.prototype.setHtml = function (html){
				this._dom.innerHTML = html;
				return this;
			};
			
			/*
				Get inner html of node
				*/
			
			tag.prototype.html = function (){
				return this._dom.innerHTML;
			};
			
			/*
				Remove all content inside node
				*/
			
			tag.prototype.empty = function (){
				while (this._dom.firstChild){
					this._dom.removeChild(this._dom.firstChild);
				};
				this._children = null;
				this._empty = true;
				return this;
			};
			
			/*
				Remove specified child from current node.
				*/
			
			tag.prototype.remove = function (child){
				var par = this.dom();
				var el = child && child.dom();
				if (el && el.parentNode == par) { par.removeChild(el) };
				return this;
			};
			
			tag.prototype.emit = function (name,pars){
				if(!pars||pars.constructor !== Object) pars = {};
				var data = pars.data !== undefined ? pars.data : null;
				var bubble = pars.bubble !== undefined ? pars.bubble : true;
				Imba.Events.trigger(name,this,{data: data,bubble: bubble});
				return this;
			};
			
			tag.prototype.dataset = function (key,val){
				if (key instanceof Object) {
					for (var i = 0, keys = Object.keys(key), l = keys.length; i < l; i++){
						this.dataset(keys[i],key[keys[i]]);
					};
					return this;
				};
				
				if (arguments.length == 2) {
					this.setAttribute(("data-" + key),val);
					return this;
				};
				
				if (key) {
					return this.getAttribute(("data-" + key));
				};
				
				var dataset = this.dom().dataset;
				
				if (!(dataset)) {
					dataset = {};
					for (var i = 0, ary = iter$(this.dom().attributes), len = ary.length, atr; i < len; i++) {
						atr = ary[i];
						if (atr.name.substr(0,5) == 'data-') {
							dataset[Imba.toCamelCase(atr.name.slice(5))] = atr.value;
						};
					};
				};
				
				return dataset;
			};
			
			/*
				Get descendants of current node, optionally matching selector
				@return {Imba.Selector}
				*/
			
			tag.prototype.find = function (sel){
				return new Imba.Selector(sel,this);
			};
			
			/*
				Get the first matching child of node
			
				@return {Imba.Tag}
				*/
			
			tag.prototype.first = function (sel){
				return sel ? (this.find(sel).first()) : (tag$wrap(this.dom().firstElementChild));
			};
			
			/*
				Get the last matching child of node
			
					node.last # returns the last child of node
					node.last %span # returns the last span inside node
					node.last do |el| el.text == 'Hi' # return last node with text Hi
			
				@return {Imba.Tag}
				*/
			
			tag.prototype.last = function (sel){
				return sel ? (this.find(sel).last()) : (tag$wrap(this.dom().lastElementChild));
			};
			
			/*
				Get the child at index
				*/
			
			tag.prototype.child = function (i){
				return tag$wrap(this.dom().children[i || 0]);
			};
			
			tag.prototype.children = function (sel){
				var nodes = new Imba.Selector(null,this,this._dom.children);
				return sel ? (nodes.filter(sel)) : (nodes);
			};
			
			tag.prototype.orphanize = function (){
				var par;
				if (par = this.dom().parentNode) { par.removeChild(this._dom) };
				return this;
			};
			
			tag.prototype.matches = function (sel){
				var fn;
				if (sel instanceof Function) {
					return sel(this);
				};
				
				if (sel.query) { sel = sel.query() };
				if (fn = (this._dom.matches || this._dom.matchesSelector || this._dom.webkitMatchesSelector || this._dom.msMatchesSelector || this._dom.mozMatchesSelector)) {
					return fn.call(this._dom,sel);
				};
			};
			
			/*
				Get the first element matching supplied selector / filter
				traversing upwards, but including the node itself.
				@return {Imba.Tag}
				*/
			
			tag.prototype.closest = function (sel){
				if (!(sel)) { return this.parent() }; // should return self?!
				var node = this;
				if (sel.query) { sel = sel.query() };
				
				while (node){
					if (node.matches(sel)) { return node };
					node = node.parent();
				};
				return null;
			};
			
			/*
				Get the closest ancestor of node that matches
				specified selector / matcher.
			
				@return {Imba.Tag}
				*/
			
			tag.prototype.up = function (sel){
				if (!(sel)) { return this.parent() };
				return this.parent() && this.parent().closest(sel);
			};
			
			tag.prototype.path = function (sel){
				var node = this;
				var nodes = [];
				if (sel && sel.query) { sel = sel.query() };
				
				while (node){
					if (!(sel) || node.matches(sel)) { nodes.push(node) };
					node = node.parent();
				};
				return nodes;
			};
			
			tag.prototype.parents = function (sel){
				var par = this.parent();
				return par ? (par.path(sel)) : ([]);
			};
			
			
			
			tag.prototype.siblings = function (sel){
				var par, self = this;
				if (!(par = this.parent())) { return [] }; // FIXME
				var ary = this.dom().parentNode.children;
				var nodes = new Imba.Selector(null,this,ary);
				return nodes.filter(function(n) { return n != self && (!(sel) || n.matches(sel)); });
			};
			
			/*
				Get the immediately following sibling of node.
				*/
			
			tag.prototype.next = function (sel){
				if (sel) {
					var el = this;
					while (el = el.next()){
						if (el.matches(sel)) { return el };
					};
					return null;
				};
				return tag$wrap(this.dom().nextElementSibling);
			};
			
			/*
				Get the immediately preceeding sibling of node.
				*/
			
			tag.prototype.prev = function (sel){
				if (sel) {
					var el = this;
					while (el = el.prev()){
						if (el.matches(sel)) { return el };
					};
					return null;
				};
				return tag$wrap(this.dom().previousElementSibling);
			};
			
			tag.prototype.contains = function (node){
				return this.dom().contains(node && node._dom || node);
			};
			
			tag.prototype.index = function (){
				var i = 0;
				var el = this.dom();
				while (el.previousSibling){
					el = el.previousSibling;
					i++;
				};
				return i;
			};
			
			
			/*
				
				@deprecated
				*/
			
			tag.prototype.insert = function (node,pars){
				if(!pars||pars.constructor !== Object) pars = {};
				var before = pars.before !== undefined ? pars.before : null;
				var after = pars.after !== undefined ? pars.after : null;
				if (after) { before = after.next() };
				if (node instanceof Array) {
					node = (tag$.$fragment().setContent(node,0).end());
				};
				if (before) {
					this.dom().insertBefore(node.dom(),before.dom());
				} else {
					this.append(node);
				};
				return this;
			};
			
			/*
				Focus on current node
				@return {self}
				*/
			
			tag.prototype.focus = function (){
				this.dom().focus();
				return this;
			};
			
			/*
				Remove focus from current node
				@return {self}
				*/
			
			tag.prototype.blur = function (){
				this.dom().blur();
				return this;
			};
			
			tag.prototype.template = function (){
				return null;
			};
			
			/*
				@todo Should support multiple arguments like append
			
				The .prepend method inserts the specified content as the first
				child of the target node. If the content is already a child of 
				node it will be moved to the start.
				
			    	node.prepend <div.top> # prepend node
			    	node.prepend "some text" # prepend text
			    	node.prepend [<ul>,<ul>] # prepend array
			
				*/
			
			tag.prototype.prepend = function (item){
				var first = this._dom.childNodes[0];
				first ? (this.insertBefore(item,first)) : (this.appendChild(item));
				return this;
			};
			
			/*
				The .append method inserts the specified content as the last child
				of the target node. If the content is already a child of node it
				will be moved to the end.
				
				# example
				    var root = <div.root>
				    var item = <div.item> "This is an item"
				    root.append item # appends item to the end of root
			
				    root.prepend "some text" # append text
				    root.prepend [<ul>,<ul>] # append array
				*/
			
			tag.prototype.append = function (item){
				// possible to append blank
				// possible to simplify on server?
				if (!(item)) { return this };
				
				if (item instanceof Array) {
					for (var i = 0, ary = iter$(item), len = ary.length, member; i < len; i++) {
						member = ary[i];
						member && this.append(member);
					};
				} else if ((typeof item=='string'||item instanceof String) || (typeof item=='number'||item instanceof Number)) {
					var node = Imba.document().createTextNode(item);
					this._dom.appendChild(node);
					if (this._empty) { this._empty = false };
				} else {
					this._dom.appendChild(item._dom || item);
					if (this._empty) { this._empty = false };
				};
				
				return this;
			};
			
			/*
				Insert a node into the current node (self), before another.
				The relative node must be a child of current node. 
				*/
			
			tag.prototype.insertBefore = function (node,rel){
				if ((typeof node=='string'||node instanceof String)) { node = Imba.document().createTextNode(node) };
				if (node && rel) { this.dom().insertBefore((node._dom || node),(rel._dom || rel)) };
				return this;
			};
			
			/*
				Append a single item (node or string) to the current node.
				If supplied item is a string it will automatically. This is used
				by Imba internally, but will practically never be used explicitly.
				*/
			
			tag.prototype.appendChild = function (node){
				if ((typeof node=='string'||node instanceof String)) { node = Imba.document().createTextNode(node) };
				if (node) { this.dom().appendChild(node._dom || node) };
				return this;
			};
			
			/*
				Remove a single child from the current node.
				Used by Imba internally.
				*/
			
			tag.prototype.removeChild = function (node){
				if (node) { this.dom().removeChild(node._dom || node) };
				return this;
			};
			
			tag.prototype.toString = function (){
				return this._dom.toString(); // really?
			};
			
			/*
				@deprecated
				*/
			
			tag.prototype.classes = function (){
				console.log('Imba.Tag#classes is deprecated');
				return this._dom.classList;
			};
		});
		
		return tag$.defineTag('svgelement', 'htmlelement');
	
	})()

/***/ },
/* 8 */
/***/ function(module, exports) {

	(function(){
		
		// predefine all supported html tags
		tag$.defineTag('fragment', 'htmlelement', function(tag){
			
			tag.createNode = function (){
				return Imba.document().createDocumentFragment();
			};
		});
		
		tag$.defineTag('a', function(tag){
			tag.prototype.href = function(v){ return this.getAttribute('href'); }
			tag.prototype.setHref = function(v){ this.setAttribute('href',v); return this; };
		});
		
		tag$.defineTag('abbr');
		tag$.defineTag('address');
		tag$.defineTag('area');
		tag$.defineTag('article');
		tag$.defineTag('aside');
		tag$.defineTag('audio');
		tag$.defineTag('b');
		tag$.defineTag('base');
		tag$.defineTag('bdi');
		tag$.defineTag('bdo');
		tag$.defineTag('big');
		tag$.defineTag('blockquote');
		tag$.defineTag('body');
		tag$.defineTag('br');
		
		tag$.defineTag('button', function(tag){
			tag.prototype.autofocus = function(v){ return this.getAttribute('autofocus'); }
			tag.prototype.setAutofocus = function(v){ this.setAttribute('autofocus',v); return this; };
			tag.prototype.type = function(v){ return this.getAttribute('type'); }
			tag.prototype.setType = function(v){ this.setAttribute('type',v); return this; };
			tag.prototype.disabled = function(v){ return this.getAttribute('disabled'); }
			tag.prototype.setDisabled = function(v){ this.setAttribute('disabled',v); return this; };
		});
		
		tag$.defineTag('canvas', function(tag){
			tag.prototype.setWidth = function (val){
				if (this.width() != val) { this.dom().width = val };
				return this;
			};
			
			tag.prototype.setHeight = function (val){
				if (this.height() != val) { this.dom().height = val };
				return this;
			};
			
			tag.prototype.width = function (){
				return this.dom().width;
			};
			
			tag.prototype.height = function (){
				return this.dom().height;
			};
			
			tag.prototype.context = function (type){
				if(type === undefined) type = '2d';
				return this.dom().getContext(type);
			};
		});
		
		tag$.defineTag('caption');
		tag$.defineTag('cite');
		tag$.defineTag('code');
		tag$.defineTag('col');
		tag$.defineTag('colgroup');
		tag$.defineTag('data');
		tag$.defineTag('datalist');
		tag$.defineTag('dd');
		tag$.defineTag('del');
		tag$.defineTag('details');
		tag$.defineTag('dfn');
		tag$.defineTag('div');
		tag$.defineTag('dl');
		tag$.defineTag('dt');
		tag$.defineTag('em');
		tag$.defineTag('embed');
		tag$.defineTag('fieldset');
		tag$.defineTag('figcaption');
		tag$.defineTag('figure');
		tag$.defineTag('footer');
		
		tag$.defineTag('form', function(tag){
			tag.prototype.method = function(v){ return this.getAttribute('method'); }
			tag.prototype.setMethod = function(v){ this.setAttribute('method',v); return this; };
			tag.prototype.action = function(v){ return this.getAttribute('action'); }
			tag.prototype.setAction = function(v){ this.setAttribute('action',v); return this; };
		});
		
		tag$.defineTag('h1');
		tag$.defineTag('h2');
		tag$.defineTag('h3');
		tag$.defineTag('h4');
		tag$.defineTag('h5');
		tag$.defineTag('h6');
		tag$.defineTag('head');
		tag$.defineTag('header');
		tag$.defineTag('hr');
		tag$.defineTag('html');
		tag$.defineTag('i');
		
		tag$.defineTag('iframe', function(tag){
			tag.prototype.src = function(v){ return this.getAttribute('src'); }
			tag.prototype.setSrc = function(v){ this.setAttribute('src',v); return this; };
		});
		
		tag$.defineTag('img', function(tag){
			tag.prototype.src = function(v){ return this.getAttribute('src'); }
			tag.prototype.setSrc = function(v){ this.setAttribute('src',v); return this; };
		});
		
		tag$.defineTag('input', function(tag){
			// can use attr instead
			tag.prototype.name = function(v){ return this.getAttribute('name'); }
			tag.prototype.setName = function(v){ this.setAttribute('name',v); return this; };
			tag.prototype.type = function(v){ return this.getAttribute('type'); }
			tag.prototype.setType = function(v){ this.setAttribute('type',v); return this; };
			tag.prototype.required = function(v){ return this.getAttribute('required'); }
			tag.prototype.setRequired = function(v){ this.setAttribute('required',v); return this; };
			tag.prototype.disabled = function(v){ return this.getAttribute('disabled'); }
			tag.prototype.setDisabled = function(v){ this.setAttribute('disabled',v); return this; };
			tag.prototype.autofocus = function(v){ return this.getAttribute('autofocus'); }
			tag.prototype.setAutofocus = function(v){ this.setAttribute('autofocus',v); return this; };
			
			tag.prototype.value = function (){
				return this.dom().value;
			};
			
			tag.prototype.setValue = function (v){
				if (v != this.dom().value) { this.dom().value = v };
				return this;
			};
			
			tag.prototype.setPlaceholder = function (v){
				if (v != this.dom().placeholder) { this.dom().placeholder = v };
				return this;
			};
			
			tag.prototype.placeholder = function (){
				return this.dom().placeholder;
			};
			
			tag.prototype.checked = function (){
				return this.dom().checked;
			};
			
			tag.prototype.setChecked = function (bool){
				if (bool != this.dom().checked) { this.dom().checked = bool };
				return this;
			};
		});
		
		tag$.defineTag('ins');
		tag$.defineTag('kbd');
		tag$.defineTag('keygen');
		tag$.defineTag('label');
		tag$.defineTag('legend');
		tag$.defineTag('li');
		
		tag$.defineTag('link', function(tag){
			tag.prototype.rel = function(v){ return this.getAttribute('rel'); }
			tag.prototype.setRel = function(v){ this.setAttribute('rel',v); return this; };
			tag.prototype.type = function(v){ return this.getAttribute('type'); }
			tag.prototype.setType = function(v){ this.setAttribute('type',v); return this; };
			tag.prototype.href = function(v){ return this.getAttribute('href'); }
			tag.prototype.setHref = function(v){ this.setAttribute('href',v); return this; };
			tag.prototype.media = function(v){ return this.getAttribute('media'); }
			tag.prototype.setMedia = function(v){ this.setAttribute('media',v); return this; };
		});
		
		tag$.defineTag('main');
		tag$.defineTag('map');
		tag$.defineTag('mark');
		tag$.defineTag('menu');
		tag$.defineTag('menuitem');
		
		tag$.defineTag('meta', function(tag){
			tag.prototype.name = function(v){ return this.getAttribute('name'); }
			tag.prototype.setName = function(v){ this.setAttribute('name',v); return this; };
			tag.prototype.content = function(v){ return this.getAttribute('content'); }
			tag.prototype.setContent = function(v){ this.setAttribute('content',v); return this; };
			tag.prototype.charset = function(v){ return this.getAttribute('charset'); }
			tag.prototype.setCharset = function(v){ this.setAttribute('charset',v); return this; };
		});
		
		tag$.defineTag('meter');
		tag$.defineTag('nav');
		tag$.defineTag('noscript');
		tag$.defineTag('object');
		tag$.defineTag('ol');
		tag$.defineTag('optgroup');
		
		tag$.defineTag('option', function(tag){
			tag.prototype.value = function(v){ return this.getAttribute('value'); }
			tag.prototype.setValue = function(v){ this.setAttribute('value',v); return this; };
		});
		
		tag$.defineTag('output');
		tag$.defineTag('p');
		tag$.defineTag('param');
		tag$.defineTag('pre');
		tag$.defineTag('progress');
		tag$.defineTag('q');
		tag$.defineTag('rp');
		tag$.defineTag('rt');
		tag$.defineTag('ruby');
		tag$.defineTag('s');
		tag$.defineTag('samp');
		
		tag$.defineTag('script', function(tag){
			tag.prototype.src = function(v){ return this.getAttribute('src'); }
			tag.prototype.setSrc = function(v){ this.setAttribute('src',v); return this; };
			tag.prototype.type = function(v){ return this.getAttribute('type'); }
			tag.prototype.setType = function(v){ this.setAttribute('type',v); return this; };
			tag.prototype.async = function(v){ return this.getAttribute('async'); }
			tag.prototype.setAsync = function(v){ this.setAttribute('async',v); return this; };
			tag.prototype.defer = function(v){ return this.getAttribute('defer'); }
			tag.prototype.setDefer = function(v){ this.setAttribute('defer',v); return this; };
		});
		
		tag$.defineTag('section');
		
		tag$.defineTag('select', function(tag){
			tag.prototype.name = function(v){ return this.getAttribute('name'); }
			tag.prototype.setName = function(v){ this.setAttribute('name',v); return this; };
			tag.prototype.multiple = function(v){ return this.getAttribute('multiple'); }
			tag.prototype.setMultiple = function(v){ this.setAttribute('multiple',v); return this; };
			tag.prototype.required = function(v){ return this.getAttribute('required'); }
			tag.prototype.setRequired = function(v){ this.setAttribute('required',v); return this; };
			tag.prototype.disabled = function(v){ return this.getAttribute('disabled'); }
			tag.prototype.setDisabled = function(v){ this.setAttribute('disabled',v); return this; };
			
			tag.prototype.value = function (){
				return this.dom().value;
			};
			
			tag.prototype.setValue = function (v){
				if (v != this.dom().value) { this.dom().value = v };
				return this;
			};
		});
		
		
		tag$.defineTag('small');
		tag$.defineTag('source');
		tag$.defineTag('span');
		tag$.defineTag('strong');
		tag$.defineTag('style');
		tag$.defineTag('sub');
		tag$.defineTag('summary');
		tag$.defineTag('sup');
		tag$.defineTag('table');
		tag$.defineTag('tbody');
		tag$.defineTag('td');
		
		tag$.defineTag('textarea', function(tag){
			tag.prototype.name = function(v){ return this.getAttribute('name'); }
			tag.prototype.setName = function(v){ this.setAttribute('name',v); return this; };
			tag.prototype.disabled = function(v){ return this.getAttribute('disabled'); }
			tag.prototype.setDisabled = function(v){ this.setAttribute('disabled',v); return this; };
			tag.prototype.required = function(v){ return this.getAttribute('required'); }
			tag.prototype.setRequired = function(v){ this.setAttribute('required',v); return this; };
			tag.prototype.rows = function(v){ return this.getAttribute('rows'); }
			tag.prototype.setRows = function(v){ this.setAttribute('rows',v); return this; };
			tag.prototype.cols = function(v){ return this.getAttribute('cols'); }
			tag.prototype.setCols = function(v){ this.setAttribute('cols',v); return this; };
			tag.prototype.autofocus = function(v){ return this.getAttribute('autofocus'); }
			tag.prototype.setAutofocus = function(v){ this.setAttribute('autofocus',v); return this; };
			
			tag.prototype.value = function (){
				return this.dom().value;
			};
			
			tag.prototype.setValue = function (v){
				if (v != this.dom().value) { this.dom().value = v };
				return this;
			};
			
			tag.prototype.setPlaceholder = function (v){
				if (v != this.dom().placeholder) { this.dom().placeholder = v };
				return this;
			};
			
			tag.prototype.placeholder = function (){
				return this.dom().placeholder;
			};
		});
		
		tag$.defineTag('tfoot');
		tag$.defineTag('th');
		tag$.defineTag('thead');
		tag$.defineTag('time');
		tag$.defineTag('title');
		tag$.defineTag('tr');
		tag$.defineTag('track');
		tag$.defineTag('u');
		tag$.defineTag('ul');
		tag$.defineTag('video');
		return tag$.defineTag('wbr');
	
	})()

/***/ },
/* 9 */
/***/ function(module, exports) {

	(function(){
		function idx$(a,b){
			return (b && b.indexOf) ? b.indexOf(a) : [].indexOf.call(a,b);
		};
		
		
		tag$.SVG.defineTag('svgelement', function(tag){
			
			tag.namespaceURI = function (){
				return "http://www.w3.org/2000/svg";
			};
			
			var types = "circle defs ellipse g line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan".split(" ");
			
			tag.buildNode = function (){
				var dom = Imba.document().createElementNS(this.namespaceURI(),this._nodeType);
				var cls = this._classes.join(" ");
				if (cls) { dom.className.baseVal = cls };
				return dom;
			};
			
			tag.inherit = function (child){
				child._protoDom = null;
				
				if (idx$(child._name,types) >= 0) {
					child._nodeType = child._name;
					return child._classes = [];
				} else {
					child._nodeType = this._nodeType;
					var className = "_" + child._name.replace(/_/g,'-');
					return child._classes = this._classes.concat(className);
				};
			};
			
			
			Imba.attr(tag,'x');
			Imba.attr(tag,'y');
			
			Imba.attr(tag,'width');
			Imba.attr(tag,'height');
			
			Imba.attr(tag,'stroke');
			Imba.attr(tag,'stroke-width');
		});
		
		tag$.SVG.defineTag('svg', function(tag){
			Imba.attr(tag,'viewbox');
		});
		
		tag$.SVG.defineTag('g');
		
		tag$.SVG.defineTag('defs');
		
		tag$.SVG.defineTag('symbol', function(tag){
			Imba.attr(tag,'preserveAspectRatio');
			Imba.attr(tag,'viewBox');
		});
		
		tag$.SVG.defineTag('marker', function(tag){
			Imba.attr(tag,'markerUnits');
			Imba.attr(tag,'refX');
			Imba.attr(tag,'refY');
			Imba.attr(tag,'markerWidth');
			Imba.attr(tag,'markerHeight');
			Imba.attr(tag,'orient');
		});
		
		
		// Basic shapes
		
		tag$.SVG.defineTag('rect', function(tag){
			Imba.attr(tag,'rx');
			Imba.attr(tag,'ry');
		});
		
		tag$.SVG.defineTag('circle', function(tag){
			Imba.attr(tag,'cx');
			Imba.attr(tag,'cy');
			Imba.attr(tag,'r');
		});
		
		tag$.SVG.defineTag('ellipse', function(tag){
			Imba.attr(tag,'cx');
			Imba.attr(tag,'cy');
			Imba.attr(tag,'rx');
			Imba.attr(tag,'ry');
		});
		
		tag$.SVG.defineTag('path', function(tag){
			Imba.attr(tag,'d');
			Imba.attr(tag,'pathLength');
		});
		
		tag$.SVG.defineTag('line', function(tag){
			Imba.attr(tag,'x1');
			Imba.attr(tag,'x2');
			Imba.attr(tag,'y1');
			Imba.attr(tag,'y2');
		});
		
		tag$.SVG.defineTag('polyline', function(tag){
			Imba.attr(tag,'points');
		});
		
		tag$.SVG.defineTag('polygon', function(tag){
			Imba.attr(tag,'points');
		});
		
		tag$.SVG.defineTag('text', function(tag){
			Imba.attr(tag,'dx');
			Imba.attr(tag,'dy');
			Imba.attr(tag,'text-anchor');
			Imba.attr(tag,'rotate');
			Imba.attr(tag,'textLength');
			Imba.attr(tag,'lengthAdjust');
		});
		
		return tag$.SVG.defineTag('tspan', function(tag){
			Imba.attr(tag,'dx');
			Imba.attr(tag,'dy');
			Imba.attr(tag,'rotate');
			Imba.attr(tag,'textLength');
			Imba.attr(tag,'lengthAdjust');
		});

	})()

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
		function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
		// Extending Imba.Tag#css to work without prefixes by inspecting
		// the properties of a CSSStyleDeclaration and creating a map
		
		// var prefixes = ['-webkit-','-ms-','-moz-','-o-','-blink-']
		// var props = ['transform','transition','animation']
		
		if (true) {
			var styles = window.getComputedStyle(document.documentElement,'');
			
			Imba.CSSKeyMap = {};
			
			for (var i = 0, ary = iter$(styles), len = ary.length, prefixed; i < len; i++) {
				prefixed = ary[i];
				var unprefixed = prefixed.replace(/^-(webkit|ms|moz|o|blink)-/,'');
				var camelCase = unprefixed.replace(/-(\w)/g,function(m,a) { return a.toUpperCase(); });
				
				// if there exists an unprefixed version -- always use this
				if (prefixed != unprefixed) {
					if (styles.hasOwnProperty(unprefixed)) { continue; };
				};
				
				// register the prefixes
				Imba.CSSKeyMap[unprefixed] = Imba.CSSKeyMap[camelCase] = prefixed;
			};
			
			tag$.extendTag('element', function(tag){
				
				// override the original css method
				tag.prototype.css = function (key,val){
					if (key instanceof Object) {
						for (var i = 0, keys = Object.keys(key), l = keys.length; i < l; i++){
							this.css(keys[i],key[keys[i]]);
						};
						return this;
					};
					
					key = Imba.CSSKeyMap[key] || key;
					
					if (val == null) {
						this.dom().style.removeProperty(key);
					} else if (val == undefined) {
						return this.dom().style[key];
					} else {
						if ((typeof val=='number'||val instanceof Number) && key.match(/width|height|left|right|top|bottom/)) {
							val = val + "px";
						};
						this.dom().style[key] = val;
					};
					return this;
				};
			});
			
			if (!document.documentElement.classList) {
				tag$.extendTag('element', function(tag){
					
					tag.prototype.hasFlag = function (ref){
						return new RegExp('(^|\\s)' + ref + '(\\s|$)').test(this._dom.className);
					};
					
					tag.prototype.addFlag = function (ref){
						if (this.hasFlag(ref)) { return this };
						this._dom.className += (this._dom.className ? (' ') : ('')) + ref;
						return this;
					};
					
					tag.prototype.unflag = function (ref){
						if (!this.hasFlag(ref)) { return this };
						var regex = new RegExp('(^|\\s)*' + ref + '(\\s|$)*','g');
						this._dom.className = this._dom.className.replace(regex,'');
						return this;
					};
					
					tag.prototype.toggleFlag = function (ref){
						return this.hasFlag(ref) ? (this.unflag(ref)) : (this.flag(ref));
					};
					
					tag.prototype.flag = function (ref,bool){
						if (arguments.length == 2 && !(!(bool)) === false) {
							return this.unflag(ref);
						};
						return this.addFlag(ref);
					};
				});
				return true;
			};
		};

	})()

/***/ },
/* 11 */
/***/ function(module, exports) {

	(function(){
		function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
		var doc = document;
		var win = window;
		
		var hasTouchEvents = window && window.ontouchstart !== undefined;
		
		Imba.Pointer = function Pointer(){
			this.setButton(-1);
			this.setEvent({x: 0,y: 0,type: 'uninitialized'});
			return this;
		};
		
		Imba.Pointer.prototype.phase = function(v){ return this._phase; }
		Imba.Pointer.prototype.setPhase = function(v){ this._phase = v; return this; };
		Imba.Pointer.prototype.prevEvent = function(v){ return this._prevEvent; }
		Imba.Pointer.prototype.setPrevEvent = function(v){ this._prevEvent = v; return this; };
		Imba.Pointer.prototype.button = function(v){ return this._button; }
		Imba.Pointer.prototype.setButton = function(v){ this._button = v; return this; };
		Imba.Pointer.prototype.event = function(v){ return this._event; }
		Imba.Pointer.prototype.setEvent = function(v){ this._event = v; return this; };
		Imba.Pointer.prototype.dirty = function(v){ return this._dirty; }
		Imba.Pointer.prototype.setDirty = function(v){ this._dirty = v; return this; };
		Imba.Pointer.prototype.events = function(v){ return this._events; }
		Imba.Pointer.prototype.setEvents = function(v){ this._events = v; return this; };
		Imba.Pointer.prototype.touch = function(v){ return this._touch; }
		Imba.Pointer.prototype.setTouch = function(v){ this._touch = v; return this; };
		
		Imba.Pointer.prototype.update = function (e){
			this.setEvent(e);
			this.setDirty(true);
			return this;
		};
		
		// this is just for regular mouse now
		Imba.Pointer.prototype.process = function (){
			var e1 = this.event();
			
			if (this.dirty()) {
				this.setPrevEvent(e1);
				this.setDirty(false);
				
				// button should only change on mousedown etc
				if (e1.type == 'mousedown') {
					this.setButton(e1.button);
					
					// do not create touch for right click
					if (this.button() == 2 || (this.touch() && this.button() != 0)) {
						return;
					};
					
					// cancel the previous touch
					if (this.touch()) { this.touch().cancel() };
					this.setTouch(new Imba.Touch(e1,this));
					this.touch().mousedown(e1,e1);
				} else if (e1.type == 'mousemove') {
					if (this.touch()) { this.touch().mousemove(e1,e1) };
				} else if (e1.type == 'mouseup') {
					this.setButton(-1);
					
					if (this.touch() && this.touch().button() == e1.button) {
						this.touch().mouseup(e1,e1);
						this.setTouch(null);
					};
					// trigger pointerup
				};
			} else {
				if (this.touch()) { this.touch().idle() };
			};
			return this;
		};
		
		Imba.Pointer.prototype.cleanup = function (){
			return Imba.POINTERS;
		};
		
		Imba.Pointer.prototype.x = function (){
			return this.event().x;
		};
		Imba.Pointer.prototype.y = function (){
			return this.event().y;
		};
		
		// deprecated -- should remove
		Imba.Pointer.update = function (){
			// console.log('update touch')
			for (var i = 0, ary = iter$(Imba.POINTERS), len = ary.length; i < len; i++) {
				ary[i].process();
			};
			// need to be able to prevent the default behaviour of touch, no?
			win.requestAnimationFrame(Imba.Pointer.update);
			return this;
		};
		
		var lastNativeTouchTimeStamp = 0;
		var lastNativeTouchTimeout = 50;
		
		// Imba.Touch
		// Began	A finger touched the screen.
		// Moved	A finger moved on the screen.
		// Stationary	A finger is touching the screen but hasn't moved.
		// Ended	A finger was lifted from the screen. This is the final phase of a touch.
		// Canceled The system cancelled tracking for the touch.
		
		/*
		Consolidates mouse and touch events. Touch objects persist across a touch,
		from touchstart until end/cancel. When a touch starts, it will traverse
		down from the innermost target, until it finds a node that responds to
		ontouchstart. Unless the touch is explicitly redirected, the touch will
		call ontouchmove and ontouchend / ontouchcancel on the responder when appropriate.
		
			tag draggable
				# called when a touch starts
				def ontouchstart touch
					flag 'dragging'
					self
				
				# called when touch moves - same touch object
				def ontouchmove touch
					# move the node with touch
					css top: touch.dy, left: touch.dx
				
				# called when touch ends
				def ontouchend touch
					unflag 'dragging'
		
		@iname touch
		*/
		
		Imba.Touch = function Touch(event,pointer){
			// @native  = false
			this.setEvent(event);
			this.setData({});
			this.setActive(true);
			this._button = event && event.button || 0;
			this._suppress = false; // deprecated
			this._captured = false;
			this.setBubble(false);
			pointer = pointer;
			this.setUpdates(0);
			return this;
		};
		
		var touches = [];
		var count = 0;
		var identifiers = {};
		
		Imba.Touch.count = function (){
			return count;
		};
		
		Imba.Touch.lookup = function (item){
			return item && (item.__touch__ || identifiers[item.identifier]);
		};
		
		Imba.Touch.release = function (item,touch){
			var v_, $1;
			(((v_ = identifiers[item.identifier]),delete identifiers[item.identifier], v_));
			((($1 = item.__touch__),delete item.__touch__, $1));
			return;
		};
		
		Imba.Touch.ontouchstart = function (e){
			for (var i = 0, ary = iter$(e.changedTouches), len = ary.length, t; i < len; i++) {
				t = ary[i];
				if (this.lookup(t)) { continue; };
				var touch = identifiers[t.identifier] = new this(e); // (e)
				t.__touch__ = touch;
				touches.push(touch);
				count++;
				touch.touchstart(e,t);
			};
			return this;
		};
		
		Imba.Touch.ontouchmove = function (e){
			var touch;
			for (var i = 0, ary = iter$(e.changedTouches), len = ary.length, t; i < len; i++) {
				t = ary[i];
				if (touch = this.lookup(t)) {
					touch.touchmove(e,t);
				};
			};
			
			return this;
		};
		
		Imba.Touch.ontouchend = function (e){
			var touch;
			for (var i = 0, ary = iter$(e.changedTouches), len = ary.length, t; i < len; i++) {
				t = ary[i];
				if (touch = this.lookup(t)) {
					touch.touchend(e,t);
					this.release(t,touch);
					count--;
				};
			};
			
			// e.preventDefault
			// not always supported!
			// touches = touches.filter(||)
			return this;
		};
		
		Imba.Touch.ontouchcancel = function (e){
			var touch;
			for (var i = 0, ary = iter$(e.changedTouches), len = ary.length, t; i < len; i++) {
				t = ary[i];
				if (touch = this.lookup(t)) {
					touch.touchcancel(e,t);
					this.release(t,touch);
					count--;
				};
			};
			return this;
		};
		
		Imba.Touch.onmousedown = function (e){
			return this;
		};
		
		Imba.Touch.onmousemove = function (e){
			return this;
		};
		
		Imba.Touch.onmouseup = function (e){
			return this;
		};
		
		
		Imba.Touch.prototype.phase = function(v){ return this._phase; }
		Imba.Touch.prototype.setPhase = function(v){ this._phase = v; return this; };
		Imba.Touch.prototype.active = function(v){ return this._active; }
		Imba.Touch.prototype.setActive = function(v){ this._active = v; return this; };
		Imba.Touch.prototype.event = function(v){ return this._event; }
		Imba.Touch.prototype.setEvent = function(v){ this._event = v; return this; };
		Imba.Touch.prototype.pointer = function(v){ return this._pointer; }
		Imba.Touch.prototype.setPointer = function(v){ this._pointer = v; return this; };
		Imba.Touch.prototype.target = function(v){ return this._target; }
		Imba.Touch.prototype.setTarget = function(v){ this._target = v; return this; };
		Imba.Touch.prototype.handler = function(v){ return this._handler; }
		Imba.Touch.prototype.setHandler = function(v){ this._handler = v; return this; };
		Imba.Touch.prototype.updates = function(v){ return this._updates; }
		Imba.Touch.prototype.setUpdates = function(v){ this._updates = v; return this; };
		Imba.Touch.prototype.suppress = function(v){ return this._suppress; }
		Imba.Touch.prototype.setSuppress = function(v){ this._suppress = v; return this; };
		Imba.Touch.prototype.data = function(v){ return this._data; }
		Imba.Touch.prototype.setData = function(v){ this._data = v; return this; };
		Imba.Touch.prototype.__bubble = {chainable: true,name: 'bubble'};
		Imba.Touch.prototype.bubble = function(v){ return v !== undefined ? (this.setBubble(v),this) : this._bubble; }
		Imba.Touch.prototype.setBubble = function(v){ this._bubble = v; return this; };
		
		Imba.Touch.prototype.gestures = function(v){ return this._gestures; }
		Imba.Touch.prototype.setGestures = function(v){ this._gestures = v; return this; };
		
		/*
			
		
			@internal
			@constructor
			*/
		
		Imba.Touch.prototype.capture = function (){
			this._captured = true;
			this._event && this._event.preventDefault();
			return this;
		};
		
		Imba.Touch.prototype.isCaptured = function (){
			return !(!this._captured);
		};
		
		/*
			Extend the touch with a plugin / gesture. 
			All events (touchstart,move etc) for the touch
			will be triggered on the plugins in the order they
			are added.
			*/
		
		Imba.Touch.prototype.extend = function (plugin){
			// console.log "added gesture!!!"
			this._gestures || (this._gestures = []);
			this._gestures.push(plugin);
			return this;
		};
		
		/*
			Redirect touch to specified target. ontouchstart will always be
			called on the new target.
			@return {Number}
			*/
		
		Imba.Touch.prototype.redirect = function (target){
			this._redirect = target;
			return this;
		};
		
		/*
			Suppress the default behaviour. Will call preventDefault for
			all native events that are part of the touch.
			*/
		
		Imba.Touch.prototype.suppress = function (){
			// collision with the suppress property
			this._active = false;
			return this;
		};
		
		Imba.Touch.prototype.setSuppress = function (value){
			console.warn('Imba.Touch#suppress= is deprecated');
			this._supress = value;
			return this;
		};
		
		Imba.Touch.prototype.touchstart = function (e,t){
			this._event = e;
			this._touch = t;
			this._button = 0;
			this._x = t.clientX;
			this._y = t.clientY;
			this.began();
			if (e && this.isCaptured()) { e.preventDefault() };
			return this;
		};
		
		Imba.Touch.prototype.touchmove = function (e,t){
			this._event = e;
			this._x = t.clientX;
			this._y = t.clientY;
			this.update();
			if (e && this.isCaptured()) { e.preventDefault() };
			return this;
		};
		
		Imba.Touch.prototype.touchend = function (e,t){
			this._event = e;
			this._x = t.clientX;
			this._y = t.clientY;
			this.ended();
			
			lastNativeTouchTimeStamp = e.timeStamp;
			
			if (this._maxdr < 20) {
				var tap = new Imba.Event(e);
				tap.setType('tap');
				tap.process();
				if (tap._responder) { e.preventDefault() };
			};
			
			if (e && this.isCaptured()) {
				e.preventDefault();
			};
			
			return this;
		};
		
		Imba.Touch.prototype.touchcancel = function (e,t){
			return this.cancel();
		};
		
		Imba.Touch.prototype.mousedown = function (e,t){
			var self = this;
			self._event = e;
			self._button = e.button;
			self._x = t.clientX;
			self._y = t.clientY;
			self.began();
			
			self._mousemove = function(e) { return self.mousemove(e,e); };
			doc.addEventListener('mousemove',self._mousemove,true);
			return self;
		};
		
		Imba.Touch.prototype.mousemove = function (e,t){
			this._x = t.clientX;
			this._y = t.clientY;
			this._event = e;
			if (this.isCaptured()) { e.preventDefault() };
			this.update();
			this.move();
			return this;
		};
		
		Imba.Touch.prototype.mouseup = function (e,t){
			this._x = t.clientX;
			this._y = t.clientY;
			this.ended();
			doc.removeEventListener('mousemove',this._mousemove,true);
			this._mousemove = null;
			return this;
		};
		
		Imba.Touch.prototype.idle = function (){
			return this.update();
		};
		
		Imba.Touch.prototype.began = function (){
			this._maxdr = this._dr = 0;
			this._x0 = this._x;
			this._y0 = this._y;
			
			var dom = this.event().target;
			var node = null;
			
			this._sourceTarget = dom && tag$wrap(dom);
			
			while (dom){
				node = tag$wrap(dom);
				if (node && node.ontouchstart) {
					this._bubble = false;
					this.setTarget(node);
					this.target().ontouchstart(this);
					if (!this._bubble) { break; };
				};
				dom = dom.parentNode;
			};
			
			this._updates++;
			return this;
		};
		
		Imba.Touch.prototype.update = function (){
			var target_;
			if (!this._active) { return this };
			
			var dr = Math.sqrt(this.dx() * this.dx() + this.dy() * this.dy());
			if (dr > this._dr) { this._maxdr = dr };
			this._dr = dr;
			
			// catching a touch-redirect?!?
			if (this._redirect) {
				if (this._target && this._target.ontouchcancel) {
					this._target.ontouchcancel(this);
				};
				this.setTarget(this._redirect);
				this._redirect = null;
				if (this.target().ontouchstart) { this.target().ontouchstart(this) };
			};
			
			
			this._updates++;
			if (this._gestures) {
				for (var i = 0, ary = iter$(this._gestures), len = ary.length; i < len; i++) {
					ary[i].ontouchupdate(this);
				};
			};
			
			(target_ = this.target()) && target_.ontouchupdate  &&  target_.ontouchupdate(this);
			return this;
		};
		
		Imba.Touch.prototype.move = function (){
			var target_;
			if (!this._active) { return this };
			
			if (this._gestures) {
				for (var i = 0, ary = iter$(this._gestures), len = ary.length, g; i < len; i++) {
					g = ary[i];
					if (g.ontouchmove) { g.ontouchmove(this,this._event) };
				};
			};
			
			(target_ = this.target()) && target_.ontouchmove  &&  target_.ontouchmove(this,this._event);
			return this;
		};
		
		Imba.Touch.prototype.ended = function (){
			var target_;
			if (!this._active) { return this };
			
			this._updates++;
			
			if (this._gestures) {
				for (var i = 0, ary = iter$(this._gestures), len = ary.length; i < len; i++) {
					ary[i].ontouchend(this);
				};
			};
			
			(target_ = this.target()) && target_.ontouchend  &&  target_.ontouchend(this);
			
			return this;
		};
		
		Imba.Touch.prototype.cancel = function (){
			if (!this._cancelled) {
				this._cancelled = true;
				this.cancelled();
				if (this._mousemove) { doc.removeEventListener('mousemove',this._mousemove,true) };
			};
			return this;
		};
		
		Imba.Touch.prototype.cancelled = function (){
			var target_;
			if (!this._active) { return this };
			
			this._cancelled = true;
			this._updates++;
			
			if (this._gestures) {
				for (var i = 0, ary = iter$(this._gestures), len = ary.length, g; i < len; i++) {
					g = ary[i];
					if (g.ontouchcancel) { g.ontouchcancel(this) };
				};
			};
			
			(target_ = this.target()) && target_.ontouchcancel  &&  target_.ontouchcancel(this);
			return this;
		};
		
		/*
			The absolute distance the touch has moved from starting position 
			@return {Number}
			*/
		
		Imba.Touch.prototype.dr = function (){
			return this._dr;
		};
		
		/*
			The distance the touch has moved horizontally
			@return {Number}
			*/
		
		Imba.Touch.prototype.dx = function (){
			return this._x - this._x0;
		};
		
		/*
			The distance the touch has moved vertically
			@return {Number}
			*/
		
		Imba.Touch.prototype.dy = function (){
			return this._y - this._y0;
		};
		
		/*
			Initial horizontal position of touch
			@return {Number}
			*/
		
		Imba.Touch.prototype.x0 = function (){
			return this._x0;
		};
		
		/*
			Initial vertical position of touch
			@return {Number}
			*/
		
		Imba.Touch.prototype.y0 = function (){
			return this._y0;
		};
		
		/*
			Horizontal position of touch
			@return {Number}
			*/
		
		Imba.Touch.prototype.x = function (){
			return this._x;
		};
		
		/*
			Vertical position of touch
			@return {Number}
			*/
		
		Imba.Touch.prototype.y = function (){
			return this._y;
		};
		
		/*
			Horizontal position of touch relative to target
			@return {Number}
			*/
		
		Imba.Touch.prototype.tx = function (){
			this._targetBox || (this._targetBox = this._target.dom().getBoundingClientRect());
			return this._x - this._targetBox.left;
		};
		
		/*
			Vertical position of touch relative to target
			@return {Number}
			*/
		
		Imba.Touch.prototype.ty = function (){
			this._targetBox || (this._targetBox = this._target.dom().getBoundingClientRect());
			return this._y - this._targetBox.top;
		};
		
		/*
			Button pressed in this touch. Native touches defaults to left-click (0)
			@return {Number}
			*/
		
		Imba.Touch.prototype.button = function (){
			return this._button;
		}; // @pointer ? @pointer.button : 0
		
		Imba.Touch.prototype.sourceTarget = function (){
			return this._sourceTarget;
		};
		
		
		Imba.TouchGesture = function TouchGesture(){ };
		
		Imba.TouchGesture.prototype.__active = {'default': false,name: 'active'};
		Imba.TouchGesture.prototype.active = function(v){ return this._active; }
		Imba.TouchGesture.prototype.setActive = function(v){ this._active = v; return this; }
		Imba.TouchGesture.prototype._active = false;
		
		Imba.TouchGesture.prototype.ontouchstart = function (e){
			return this;
		};
		
		Imba.TouchGesture.prototype.ontouchupdate = function (e){
			return this;
		};
		
		Imba.TouchGesture.prototype.ontouchend = function (e){
			return this;
		};
		
		
		// A Touch-event is created on mousedown (always)
		// and while it exists, mousemove and mouseup will
		// be delegated to this active event.
		Imba.POINTER = new Imba.Pointer();
		Imba.POINTERS = [Imba.POINTER];
		
		
		// regular event stuff
		Imba.KEYMAP = {
			"8": 'backspace',
			"9": 'tab',
			"13": 'enter',
			"16": 'shift',
			"17": 'ctrl',
			"18": 'alt',
			"19": 'break',
			"20": 'caps',
			"27": 'esc',
			"32": 'space',
			"35": 'end',
			"36": 'home',
			"37": 'larr',
			"38": 'uarr',
			"39": 'rarr',
			"40": 'darr',
			"45": 'insert',
			"46": 'delete',
			"107": 'plus',
			"106": 'mult',
			"91": 'meta'
		};
		
		Imba.CHARMAP = {
			"%": 'modulo',
			"*": 'multiply',
			"+": 'add',
			"-": 'sub',
			"/": 'divide',
			".": 'dot'
		};
		
		/*
		Imba handles all events in the dom through a single manager,
		listening at the root of your document. If Imba finds a tag
		that listens to a certain event, the event will be wrapped 
		in an `Imba.Event`, which normalizes some of the quirks and 
		browser differences.
		
		@iname event
		*/
		
		Imba.Event = function Event(e){
			this.setEvent(e);
			this.setBubble(true);
		};
		
		/* reference to the native event */
		
		Imba.Event.prototype.event = function(v){ return this._event; }
		Imba.Event.prototype.setEvent = function(v){ this._event = v; return this; };
		
		/* reference to the native event */
		
		Imba.Event.prototype.prefix = function(v){ return this._prefix; }
		Imba.Event.prototype.setPrefix = function(v){ this._prefix = v; return this; };
		
		Imba.Event.prototype.data = function(v){ return this._data; }
		Imba.Event.prototype.setData = function(v){ this._data = v; return this; };
		
		/*
			should remove this alltogether?
			@deprecated
			*/
		
		Imba.Event.prototype.source = function(v){ return this._source; }
		Imba.Event.prototype.setSource = function(v){ this._source = v; return this; };
		
		/* A {Boolean} indicating whether the event bubbles up or not */
		
		Imba.Event.prototype.__bubble = {type: Boolean,chainable: true,name: 'bubble'};
		Imba.Event.prototype.bubble = function(v){ return v !== undefined ? (this.setBubble(v),this) : this._bubble; }
		Imba.Event.prototype.setBubble = function(v){ this._bubble = v; return this; };
		
		Imba.Event.wrap = function (e){
			return new this(e);
		};
		
		Imba.Event.prototype.setType = function (type){
			this._type = type;
			return this;
		};
		
		/*
			@return {String} The name of the event (case-insensitive)
			*/
		
		Imba.Event.prototype.type = function (){
			return this._type || this.event().type;
		};
		
		Imba.Event.prototype.name = function (){
			return this._name || (this._name = this.type().toLowerCase().replace(/\:/g,''));
		};
		
		// mimc getset
		Imba.Event.prototype.bubble = function (v){
			if (v != undefined) {
				this.setBubble(v);
				return this;
			};
			return this._bubble;
		};
		
		/*
			Prevents further propagation of the current event. Does not
			stop the event from being handled by other listeners outside
			of Imba.
			@return {self}
			*/
		
		Imba.Event.prototype.halt = function (){
			this.setBubble(false);
			return this;
		};
		
		/*
			Cancel the event (if cancelable). In the case of native events it
			will call `preventDefault` on the wrapped event object.
			@return {self}
			*/
		
		Imba.Event.prototype.cancel = function (){
			if (this.event().preventDefault) { this.event().preventDefault() };
			this._cancel = true;
			return this;
		};
		
		Imba.Event.prototype.silence = function (){
			this._silenced = true;
			return this;
		};
		
		Imba.Event.prototype.isSilenced = function (){
			return !(!this._silenced);
		};
		
		/*
			Indicates whether or not event.cancel has been called.
		
			@return {Boolean}
			*/
		
		Imba.Event.prototype.isPrevented = function (){
			return this.event() && this.event().defaultPrevented || this._cancel;
		};
		
		/*
			A reference to the initial target of the event.
			*/
		
		Imba.Event.prototype.target = function (){
			return tag$wrap(this.event()._target || this.event().target);
		};
		
		/*
			A reference to the object responding to the event.
			*/
		
		Imba.Event.prototype.responder = function (){
			return this._responder;
		};
		
		/*
			Redirect the event to new target
			*/
		
		Imba.Event.prototype.redirect = function (node){
			this._redirect = node;
			return this;
		};
		
		/*
			Get the normalized character for KeyboardEvent/TextEvent
			@return {String}
			*/
		
		Imba.Event.prototype.keychar = function (){
			if (this.event() instanceof KeyboardEvent) {
				var ki = this.event().keyIdentifier;
				var sym = Imba.KEYMAP[this.event().keyCode];
				
				if (!(sym) && ki.substr(0,2) == "U+") {
					sym = String.fromCharCode(parseInt(ki.substr(2),16));
				};
				return sym;
			} else if (this.event() instanceof (window.TextEvent || window.InputEvent)) {
				return this.event().data;
			};
			
			return null;
		};
		
		/*
			@deprecated
			*/
		
		Imba.Event.prototype.keycombo = function (){
			var sym;
			if (!(sym = this.keychar())) { return };
			sym = Imba.CHARMAP[sym] || sym;
			var combo = [],e = this.event();
			if (e.ctrlKey) { combo.push('ctrl') };
			if (e.shiftKey) { combo.push('shift') };
			if (e.altKey) { combo.push('alt') };
			if (e.metaKey) { combo.push('cmd') };
			combo.push(sym);
			return combo.join("_").toLowerCase();
		};
		
		
		Imba.Event.prototype.process = function (){
			var node;
			var meth = ("on" + (this._prefix || '') + this.name());
			var args = null;
			var domtarget = this.event()._target || this.event().target;
			// var node = <{domtarget:_responder or domtarget}>
			// need to clean up and document this behaviour
			
			var domnode = domtarget._responder || domtarget;
			// @todo need to stop infinite redirect-rules here
			
			var $1;while (domnode){
				this._redirect = null;
				if (node = tag$wrap(domnode)) { // not only tag 
					
					if ((typeof node[($1 = meth)]=='string'||node[$1] instanceof String)) {
						// should remember the receiver of the event
						meth = node[meth];
						continue; // should not continue?
					};
					
					if (node[meth] instanceof Array) {
						args = node[meth].concat(node);
						meth = args.shift();
						continue; // should not continue?
					};
					
					if (node[meth] instanceof Function) {
						this._responder || (this._responder = node);
						// should autostop bubble here?
						args ? (node[meth].apply(node,args)) : (node[meth](this,this.data()));
					};
				};
				
				// add node.nextEventResponder as a separate method here?
				if (!(this.bubble() && (domnode = (this._redirect || (node ? (node.parent()) : (domnode.parentNode)))))) {
					break;
				};
			};
			
			this.processed();
			return this;
		};
		
		
		Imba.Event.prototype.processed = function (){
			if (!this._silenced) { Imba.emit(Imba,'event',[this]) };
			return this;
		};
		
		/*
			Return the x/left coordinate of the mouse / pointer for this event
			@return {Number} x coordinate of mouse / pointer for event
			*/
		
		Imba.Event.prototype.x = function (){
			return this.event().x;
		};
		
		/*
			Return the y/top coordinate of the mouse / pointer for this event
			@return {Number} y coordinate of mouse / pointer for event
			*/
		
		Imba.Event.prototype.y = function (){
			return this.event().y;
		};
		
		/*
			Returns a Number representing a system and implementation
			dependent numeric code identifying the unmodified value of the
			pressed key; this is usually the same as keyCode.
		
			For mouse-events, the returned value indicates which button was
			pressed on the mouse to trigger the event.
		
			@return {Number}
			*/
		
		Imba.Event.prototype.which = function (){
			return this.event().which;
		};
		
		
		/*
		
		Manager for listening to and delegating events in Imba. A single instance
		is always created by Imba (as `Imba.Events`), which handles and delegates all
		events at the very root of the document. Imba does not capture all events
		by default, so if you want to make sure exotic or custom DOMEvents are delegated
		in Imba you will need to register them in `Imba.Events.register(myCustomEventName)`
		
		@iname manager
		
		*/
		
		Imba.EventManager = function EventManager(node,pars){
			var self = this;
			if(!pars||pars.constructor !== Object) pars = {};
			var events = pars.events !== undefined ? pars.events : [];
			self.setRoot(node);
			self.setCount(0);
			self.setListeners([]);
			self.setDelegators({});
			self.setDelegator(function(e) {
				// console.log "delegating event?! {e}"
				self.delegate(e);
				return true;
			});
			
			for (var i = 0, ary = iter$(events), len = ary.length; i < len; i++) {
				self.register(ary[i]);
			};
			
			return self;
		};
		
		Imba.EventManager.prototype.root = function(v){ return this._root; }
		Imba.EventManager.prototype.setRoot = function(v){ this._root = v; return this; };
		Imba.EventManager.prototype.count = function(v){ return this._count; }
		Imba.EventManager.prototype.setCount = function(v){ this._count = v; return this; };
		Imba.EventManager.prototype.__enabled = {'default': false,watch: 'enabledDidSet',name: 'enabled'};
		Imba.EventManager.prototype.enabled = function(v){ return this._enabled; }
		Imba.EventManager.prototype.setEnabled = function(v){
			var a = this.enabled();
			if(v != a) { this._enabled = v; }
			if(v != a) { this.enabledDidSet && this.enabledDidSet(v,a,this.__enabled) }
			return this;
		}
		Imba.EventManager.prototype._enabled = false;
		Imba.EventManager.prototype.listeners = function(v){ return this._listeners; }
		Imba.EventManager.prototype.setListeners = function(v){ this._listeners = v; return this; };
		Imba.EventManager.prototype.delegators = function(v){ return this._delegators; }
		Imba.EventManager.prototype.setDelegators = function(v){ this._delegators = v; return this; };
		Imba.EventManager.prototype.delegator = function(v){ return this._delegator; }
		Imba.EventManager.prototype.setDelegator = function(v){ this._delegator = v; return this; };
		
		Imba.EventManager.prototype.enabledDidSet = function (bool){
			bool ? (this.onenable()) : (this.ondisable());
			return this;
		};
		
		/*
		
			Tell the current EventManager to intercept and handle event of a certain name.
			By default, Imba.Events will register interceptors for: *keydown*, *keyup*, 
			*keypress*, *textInput*, *input*, *change*, *submit*, *focusin*, *focusout*, 
			*blur*, *contextmenu*, *dblclick*, *mousewheel*, *wheel*
		
			*/
		
		Imba.EventManager.prototype.register = function (name,handler){
			if(handler === undefined) handler = true;
			if (name instanceof Array) {
				for (var i = 0, ary = iter$(name), len = ary.length; i < len; i++) {
					this.register(ary[i],handler);
				};
				return this;
			};
			
			if (this.delegators()[name]) { return this };
			// console.log("register for event {name}")
			var fn = this.delegators()[name] = handler instanceof Function ? (handler) : (this.delegator());
			if (this.enabled()) { return this.root().addEventListener(name,fn,true) };
		};
		
		Imba.EventManager.prototype.listen = function (name,handler,capture){
			if(capture === undefined) capture = true;
			this.listeners().push([name,handler,capture]);
			if (this.enabled()) { this.root().addEventListener(name,handler,capture) };
			return this;
		};
		
		Imba.EventManager.prototype.delegate = function (e){
			this.setCount(this.count() + 1);
			var event = Imba.Event.wrap(e);
			event.process();
			return this;
		};
		
		Imba.EventManager.prototype.create = function (type,target,pars){
			if(!pars||pars.constructor !== Object) pars = {};
			var data = pars.data !== undefined ? pars.data : null;
			var source = pars.source !== undefined ? pars.source : null;
			var event = Imba.Event.wrap({type: type,target: target});
			if (data) { (event.setData(data),data) };
			if (source) { (event.setSource(source),source) };
			return event;
		};
		
		// use create instead?
		Imba.EventManager.prototype.trigger = function (){
			return this.create.apply(this,arguments).process();
		};
		
		Imba.EventManager.prototype.onenable = function (){
			for (var o = this.delegators(), i = 0, keys = Object.keys(o), l = keys.length; i < l; i++){
				this.root().addEventListener(keys[i],o[keys[i]],true);
			};
			
			for (var i = 0, ary = iter$(this.listeners()), len = ary.length, item; i < len; i++) {
				item = ary[i];
				this.root().addEventListener(item[0],item[1],item[2]);
			};
			return this;
		};
		
		Imba.EventManager.prototype.ondisable = function (){
			for (var o = this.delegators(), i = 0, keys = Object.keys(o), l = keys.length; i < l; i++){
				this.root().removeEventListener(keys[i],o[keys[i]],true);
			};
			
			for (var i = 0, ary = iter$(this.listeners()), len = ary.length, item; i < len; i++) {
				item = ary[i];
				this.root().removeEventListener(item[0],item[1],item[2]);
			};
			return this;
		};
		
		
		ED = Imba.Events = new Imba.EventManager(document,{events: [
			'keydown','keyup','keypress','textInput','input','change','submit',
			'focusin','focusout','blur','contextmenu','dblclick',
			'mousewheel','wheel','scroll'
		]});
		
		// should set these up inside the Imba.Events object itself
		// so that we can have different EventManager for different roots
		
		if (hasTouchEvents) {
			Imba.Events.listen('touchstart',function(e) {
				var Events_, v_;
				(((Events_ = Imba.Events).setCount(v_ = Events_.count() + 1),v_)) - 1;
				return Imba.Touch.ontouchstart(e);
			});
			
			Imba.Events.listen('touchmove',function(e) {
				var Events_, v_;
				(((Events_ = Imba.Events).setCount(v_ = Events_.count() + 1),v_)) - 1;
				return Imba.Touch.ontouchmove(e);
			});
			
			Imba.Events.listen('touchend',function(e) {
				var Events_, v_;
				(((Events_ = Imba.Events).setCount(v_ = Events_.count() + 1),v_)) - 1;
				return Imba.Touch.ontouchend(e);
			});
			
			Imba.Events.listen('touchcancel',function(e) {
				var Events_, v_;
				(((Events_ = Imba.Events).setCount(v_ = Events_.count() + 1),v_)) - 1;
				return Imba.Touch.ontouchcancel(e);
			});
		};
		
		Imba.Events.register('click',function(e) {
			// Only for main mousebutton, no?
			if ((e.timeStamp - lastNativeTouchTimeStamp) > lastNativeTouchTimeout) {
				var tap = new Imba.Event(e);
				tap.setType('tap');
				tap.process();
				if (tap._responder) {
					return e.preventDefault();
				};
			};
			// delegate the real click event
			return Imba.Events.delegate(e);
		});
		
		Imba.Events.listen('mousedown',function(e) {
			if ((e.timeStamp - lastNativeTouchTimeStamp) > lastNativeTouchTimeout) {
				if (Imba.POINTER) { return Imba.POINTER.update(e).process() };
			};
		});
		
		// Imba.Events.listen(:mousemove) do |e|
		// 	# console.log 'mousemove',e:timeStamp
		// 	if (e:timeStamp - lastNativeTouchTimeStamp) > lastNativeTouchTimeout
		// 		Imba.POINTER.update(e).process if Imba.POINTER # .process if touch # should not happen? We process through 
		
		Imba.Events.listen('mouseup',function(e) {
			// console.log 'mouseup',e:timeStamp
			if ((e.timeStamp - lastNativeTouchTimeStamp) > lastNativeTouchTimeout) {
				if (Imba.POINTER) { return Imba.POINTER.update(e).process() };
			};
		});
		
		
		Imba.Events.register(['mousedown','mouseup']);
		return (Imba.Events.setEnabled(true),true);
	
	})()

/***/ },
/* 12 */
/***/ function(module, exports) {

	(function(){
		function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
		var ImbaTag = Imba.TAGS.element;
		
		function removeNested(root,node,caret){
			// if node/nodes isa String
			// 	we need to use the caret to remove elements
			// 	for now we will simply not support this
			if (node instanceof ImbaTag) {
				root.removeChild(node);
			} else if (node instanceof Array) {
				for (var i = 0, ary = iter$(node), len = ary.length; i < len; i++) {
					removeNested(root,ary[i],caret);
				};
			} else {
				// what if this is not null?!?!?
				// take a chance and remove a text-elementng
				var next = caret ? (caret.nextSibling) : (root._dom.firstChild);
				if ((next instanceof Text) && next.textContent == node) {
					root.removeChild(next);
				} else {
					throw 'cannot remove string';
				};
			};
			
			return caret;
		};
		
		function appendNested(root,node){
			if (node instanceof ImbaTag) {
				root.appendChild(node);
			} else if (node instanceof Array) {
				for (var i = 0, ary = iter$(node), len = ary.length; i < len; i++) {
					appendNested(root,ary[i]);
				};
			} else if (node != null && node !== false) {
				root.appendChild(Imba.document().createTextNode(node));
			};
			
			return;
		};
		
		
		// insert nodes before a certain node
		// does not need to return any tail, as before
		// will still be correct there
		// before must be an actual domnode
		function insertNestedBefore(root,node,before){
			if (node instanceof ImbaTag) {
				root.insertBefore(node,before);
			} else if (node instanceof Array) {
				for (var i = 0, ary = iter$(node), len = ary.length; i < len; i++) {
					insertNestedBefore(root,ary[i],before);
				};
			} else if (node != null && node !== false) {
				root.insertBefore(Imba.document().createTextNode(node),before);
			};
			
			return before;
		};
		
		// after must be an actual domnode
		function insertNestedAfter(root,node,after){
			var before = after ? (after.nextSibling) : (root._dom.firstChild);
			
			if (before) {
				insertNestedBefore(root,node,before);
				return before.previousSibling;
			} else {
				appendNested(root,node);
				return root._dom.lastChild;
			};
		};
		
		function reconcileCollectionChanges(root,new$,old,caret){
			
			var newLen = new$.length;
			var lastNew = new$[newLen - 1];
			
			// This re-order algorithm is based on the following principle:
			// 
			// We build a "chain" which shows which items are already sorted.
			// If we're going from [1, 2, 3] -> [2, 1, 3], the tree looks like:
			//
			// 	3 ->  0 (idx)
			// 	2 -> -1 (idx)
			// 	1 -> -1 (idx)
			//
			// This tells us that we have two chains of ordered items:
			// 
			// 	(1, 3) and (2)
			// 
			// The optimal re-ordering then becomes two keep the longest chain intact,
			// and move all the other items.
			
			var newPosition = [];
			
			// The tree/graph itself
			var prevChain = [];
			// The length of the chain
			var lengthChain = [];
			
			// Keep track of the longest chain
			var maxChainLength = 0;
			var maxChainEnd = 0;
			
			for (var idx = 0, ary = iter$(old), len = ary.length, node; idx < len; idx++) {
				node = ary[idx];
				var newPos = new$.indexOf(node);
				newPosition.push(newPos);
				
				if (newPos == -1) {
					root.removeChild(node);
					prevChain.push(-1);
					lengthChain.push(-1);
					continue;
				};
				
				var prevIdx = newPosition.length - 2;
				
				// Build the chain:
				while (prevIdx >= 0){
					if (newPosition[prevIdx] == -1) {
						prevIdx--;
					} else if (newPos > newPosition[prevIdx]) {
						// Yay, we're bigger than the previous!
						break;
					} else {
						// Nope, let's walk back the chain
						prevIdx = prevChain[prevIdx];
					};
				};
				
				prevChain.push(prevIdx);
				
				var currLength = (prevIdx == -1) ? (0) : (lengthChain[prevIdx] + 1);
				
				if (currLength > maxChainLength) {
					maxChainLength = currLength;
					maxChainEnd = idx;
				};
				
				lengthChain.push(currLength);
			};
			
			var stickyNodes = [];
			
			// Now we can walk the longest chain backwards and mark them as "sticky",
			// which implies that they should not be moved
			var cursor = newPosition.length - 1;
			while (cursor >= 0){
				if (cursor == maxChainEnd && newPosition[cursor] != -1) {
					stickyNodes[newPosition[cursor]] = true;
					maxChainEnd = prevChain[maxChainEnd];
				};
				
				cursor -= 1;
			};
			
			// And let's iterate forward, but only move non-sticky nodes
			for (var idx1 = 0, ary = iter$(new$), len = ary.length; idx1 < len; idx1++) {
				if (!stickyNodes[idx1]) {
					var after = new$[idx1 - 1];
					insertNestedAfter(root,ary[idx1],(after && after._dom) || caret);
				};
			};
			
			// should trust that the last item in new list is the caret
			return lastNew && lastNew._dom || caret;
		};
		
		
		// expects a flat non-sparse array of nodes in both new and old, always
		function reconcileCollection(root,new$,old,caret){
			var k = new$.length;
			var i = k;
			var last = new$[k - 1];
			
			
			if (k == old.length && new$[0] === old[0]) {
				// running through to compare
				while (i--){
					if (new$[i] !== old[i]) { break; };
				};
			};
			
			if (i == -1) {
				return last && last._dom || caret;
			} else {
				return reconcileCollectionChanges(root,new$,old,caret);
			};
		};
		
		// the general reconciler that respects conditions etc
		// caret is the current node we want to insert things after
		function reconcileNested(root,new$,old,caret){
			
			// if new == null or new === false or new === true
			// 	if new === old
			// 		return caret
			// 	if old && new != old
			// 		removeNested(root,old,caret) if old
			// 
			// 	return caret
			
			// var skipnew = new == null or new === false or new === true
			var newIsNull = new$ == null || new$ === false;
			var oldIsNull = old == null || old === false;
			
			
			if (new$ === old) {
				// remember that the caret must be an actual dom element
				// we should instead move the actual caret? - trust
				if (newIsNull) {
					return caret;
				} else if (new$ && new$._dom) {
					return new$._dom;
				} else {
					return caret ? (caret.nextSibling) : (root._dom.firstChild);
				};
			} else if (new$ instanceof Array) {
				if (old instanceof Array) {
					if (new$.static || old.static) {
						// if the static is not nested - we could get a hint from compiler
						// and just skip it
						if (new$.static == old.static) {
							for (var i = 0, ary = iter$(new$), len = ary.length; i < len; i++) {
								// this is where we could do the triple equal directly
								caret = reconcileNested(root,ary[i],old[i],caret);
							};
							return caret;
						} else {
							removeNested(root,old,caret);
						};
						
						// if they are not the same we continue through to the default
					} else {
						return reconcileCollection(root,new$,old,caret);
					};
				} else if (old instanceof ImbaTag) {
					root.removeChild(old);
				} else if (!(oldIsNull)) {
					// old was a string-like object?
					root.removeChild(caret ? (caret.nextSibling) : (root._dom.firstChild));
				};
				
				return insertNestedAfter(root,new$,caret);
				// remove old
			} else if (new$ instanceof ImbaTag) {
				if (!(oldIsNull)) { removeNested(root,old,caret) };
				insertNestedAfter(root,new$,caret);
				return new$;
			} else if (newIsNull) {
				if (!(oldIsNull)) { removeNested(root,old,caret) };
				return caret;
			} else {
				// if old did not exist we need to add a new directly
				var nextNode;
				// if old was array or imbatag we need to remove it and then add
				if (old instanceof Array) {
					removeNested(root,old,caret);
				} else if (old instanceof ImbaTag) {
					root.removeChild(old);
				} else if (!(oldIsNull)) {
					// ...
					nextNode = caret ? (caret.nextSibling) : (root._dom.firstChild);
					if ((nextNode instanceof Text) && nextNode.textContent != new$) {
						nextNode.textContent = new$;
						return nextNode;
					};
				};
				
				// now add the textnode
				return insertNestedAfter(root,new$,caret);
			};
		};
		
		
		return tag$.extendTag('htmlelement', function(tag){
			
			tag.prototype.setChildren = function (new$,typ){
				var old = this._children;
				// var isArray = nodes isa Array
				if (new$ === old) {
					return this;
				};
				
				if (!(old)) {
					this.empty();
					appendNested(this,new$);
				} else if (typ == 2) {
					return this;
				} else if (typ == 1) {
					// here we _know _that it is an array with the same shape
					// every time
					var caret = null;
					for (var i = 0, ary = iter$(new$), len = ary.length; i < len; i++) {
						// prev = old[i]
						caret = reconcileNested(this,ary[i],old[i],caret);
					};
				} else if (typ == 3) {
					// this is possibly fully dynamic. It often is
					// but the old or new could be static while the other is not
					// this is not handled now
					// what if it was previously a static array? edgecase - but must work
					if (new$ instanceof ImbaTag) {
						this.empty();
						this.appendChild(new$);
					} else if (new$ instanceof Array) {
						if (old instanceof Array) {
							// is this not the same as setting staticChildren now but with the
							reconcileCollection(this,new$,old,null);
						} else {
							this.empty();
							appendNested(this,new$);
						};
					} else {
						this.setText(new$);
						return this;
					};
				} else if ((new$ instanceof Array) && (old instanceof Array)) {
					reconcileCollection(this,new$,old,null);
				} else {
					this.empty();
					appendNested(this,new$);
				};
				
				this._children = new$;
				return this;
			};
			
			
			// only ever called with array as argument
			tag.prototype.setStaticChildren = function (new$){
				var old = this._children;
				
				var caret = null;
				for (var i = 0, ary = iter$(new$), len = ary.length; i < len; i++) {
					// prev = old[i]
					caret = reconcileNested(this,ary[i],old[i],caret);
				};
				
				this._children = new$;
				return this;
			};
			
			tag.prototype.content = function (){
				return this._content || this.children().toArray();
			};
			
			tag.prototype.setText = function (text){
				if (text != this._children) {
					this._children = text;
					this.dom().textContent = text == null || text === false ? ('') : (text);
				};
				return this;
			};
		});

	})()

/***/ },
/* 13 */
/***/ function(module, exports) {

	(function(){
		function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
		
		/*
		The special syntax for selectors in Imba creates Imba.Selector
		instances.
		*/
		
		Imba.Selector = function Selector(sel,scope,nodes){
			
			this._query = sel instanceof Imba.Selector ? (sel.query()) : (sel);
			this._context = scope;
			
			if (nodes) {
				for (var i = 0, ary = iter$(nodes), len = ary.length, res = []; i < len; i++) {
					res.push(tag$wrap(ary[i]));
				};
				this._nodes = res;
			};
			
			this._lazy = !(nodes);
			return this;
		};
		
		Imba.Selector.one = function (sel,scope){
			var el = (scope || Imba.document()).querySelector(sel);
			return el && tag$wrap(el) || null;
		};
		
		Imba.Selector.all = function (sel,scope){
			return new Imba.Selector(sel,scope);
		};
		
		Imba.Selector.prototype.query = function(v){ return this._query; }
		Imba.Selector.prototype.setQuery = function(v){ this._query = v; return this; };
		
		Imba.Selector.prototype.reload = function (){
			this._nodes = null;
			return this;
		};
		
		Imba.Selector.prototype.scope = function (){
			var ctx;
			if (this._scope) { return this._scope };
			if (!(ctx = this._context)) { return Imba.document() };
			return this._scope = ctx.toScope ? (ctx.toScope()) : (ctx);
		};
		
		/*
			@returns {Imba.Tag} first node matching this selector
			*/
		
		Imba.Selector.prototype.first = function (){
			if (this._lazy) { return tag$wrap(this._first || (this._first = this.scope().querySelector(this.query()))) } else {
				return this.nodes()[0];
			};
		};
		
		/*
			@returns {Imba.Tag} last node matching this selector
			*/
		
		Imba.Selector.prototype.last = function (){
			return this.nodes()[this._nodes.length - 1];
		};
		
		/*
			@returns [Imba.Tag] all nodes matching this selector
			*/
		
		Imba.Selector.prototype.nodes = function (){
			if (this._nodes) { return this._nodes };
			var items = this.scope().querySelectorAll(this.query());
			for (var i = 0, ary = iter$(items), len = ary.length, res = []; i < len; i++) {
				res.push(tag$wrap(ary[i]));
			};
			this._nodes = res;
			this._lazy = false;
			return this._nodes;
		};
		
		/*
			The number of nodes matching this selector
			*/
		
		Imba.Selector.prototype.count = function (){
			return this.nodes().length;
		};
		
		Imba.Selector.prototype.len = function (){
			return this.nodes().length;
		};
		
		/*
			@todo Add support for block or selector?
			*/
		
		Imba.Selector.prototype.some = function (){
			return this.count() >= 1;
		};
		
		/*
			Get node at index
			*/
		
		Imba.Selector.prototype.at = function (idx){
			return this.nodes()[idx];
		};
		
		/*
			Loop through nodes
			*/
		
		Imba.Selector.prototype.forEach = function (block){
			this.nodes().forEach(block);
			return this;
		};
		
		/*
			Map nodes
			*/
		
		Imba.Selector.prototype.map = function (block){
			return this.nodes().map(block);
		};
		
		/*
			Returns a plain array containing nodes. Implicitly called
			when iterating over a selector in Imba `(node for node in $(selector))`
			*/
		
		Imba.Selector.prototype.toArray = function (){
			return this.nodes();
		};
		
		// Get the first element that matches the selector, 
		// beginning at the current element and progressing up through the DOM tree
		Imba.Selector.prototype.closest = function (sel){
			// seems strange that we alter this selector?
			this._nodes = this.map(function(node) { return node.closest(sel); });
			return this;
		};
		
		// Get the siblings of each element in the set of matched elements, 
		// optionally filtered by a selector.
		// TODO remove duplicates?
		Imba.Selector.prototype.siblings = function (sel){
			this._nodes = this.map(function(node) { return node.siblings(sel); });
			return this;
		};
		
		// Get the descendants of each element in the current set of matched 
		// elements, filtered by a selector.
		Imba.Selector.prototype.find = function (sel){
			this._nodes = this.__query__(sel.query(),this.nodes());
			return this;
		};
		
		Imba.Selector.prototype.reject = function (blk){
			return this.filter(blk,false);
		};
		
		/*
			Filter the nodes in selector by a function or other selector
			*/
		
		Imba.Selector.prototype.filter = function (blk,bool){
			if(bool === undefined) bool = true;
			var fn = (blk instanceof Function) && blk || function(n) { return n.matches(blk); };
			var ary = this.nodes().filter(function(n) { return fn(n) == bool; });
			// if we want to return a new selector for this, we should do that for
			// others as well
			return new Imba.Selector("",this._scope,ary);
		};
		
		Imba.Selector.prototype.__query__ = function (query,contexts){
			var nodes = [];
			var i = 0;
			var l = contexts.length;
			
			while (i < l){
				nodes.push.apply(nodes,contexts[i++].querySelectorAll(query));
			};
			return nodes;
		};
		
		Imba.Selector.prototype.__matches__ = function (){
			return true;
		};
		
		/*
			Add specified flag to all nodes in selector
			*/
		
		Imba.Selector.prototype.flag = function (flag){
			return this.forEach(function(n) { return n.flag(flag); });
		};
		
		/*
			Remove specified flag from all nodes in selector
			*/
		
		Imba.Selector.prototype.unflag = function (flag){
			return this.forEach(function(n) { return n.unflag(flag); });
		};
		
		
		// def Imba.querySelectorAll
		q$ = function(sel,scope) { return new Imba.Selector(sel,scope); };
		
		// def Imba.Selector.one
		q$$ = function(sel,scope) {
			var el = (scope || Imba.document()).querySelector(sel);
			return el && tag$wrap(el) || null;
		};
		
		
		// extending tags with query-methods
		// must be a better way to reopen classes
		return tag$.extendTag('element', function(tag){
			tag.prototype.querySelectorAll = function (q){
				return this._dom.querySelectorAll(q);
			};
			tag.prototype.querySelector = function (q){
				return this._dom.querySelector(q);
			};
			
			// should be moved to Imba.Tag instead?
			// or we should implement all of them here
			tag.prototype.find = function (sel){
				return new Imba.Selector(sel,this);
			};
		});
		

	})()

/***/ },
/* 14 */
/***/ function(module, exports) {

	(function(){
		
		function Todo(title,completed){
			if(completed === undefined) completed = false;
			this._id = id++;
			this._title = title;
			this._completed = completed;
		};
		
		exports.Todo = Todo; // export class 
		var id = 0;
		
		Todo.prototype.title = function(v){ return this._title; }
		Todo.prototype.setTitle = function(v){ this._title = v; return this; };
		Todo.prototype.completed = function(v){ return this._completed; }
		Todo.prototype.setCompleted = function(v){ this._completed = v; return this; };
		
		Todo.prototype.id = function (){
			return this._id;
		};
		
		Todo.prototype.toJSON = function (){
			return {title: this.title(),completed: this.completed()};
		};
		return Todo;
	
	})()

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2I0ZjIwM2JjNGNiNjU3ZTJlNjYiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAuaW1iYSIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL2ltYmEvaW5kZXguaW1iYSIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL2ltYmEvc3JjL2ltYmEvaW5kZXguaW1iYSIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL2ltYmEvc3JjL2ltYmEvaW1iYS5pbWJhIiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvaW1iYS9zcmMvaW1iYS9jb3JlLmV2ZW50cy5pbWJhIiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvaW1iYS9zcmMvaW1iYS9zY2hlZHVsZXIuaW1iYSIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL2ltYmEvc3JjL2ltYmEvdGFnLmltYmEiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy9pbWJhL3NyYy9pbWJhL2RvbS5pbWJhIiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvaW1iYS9zcmMvaW1iYS9kb20uaHRtbC5pbWJhIiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvaW1iYS9zcmMvaW1iYS9kb20uc3ZnLmltYmEiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy9pbWJhL3NyYy9pbWJhL2RvbS5jbGllbnQuaW1iYSIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL2ltYmEvc3JjL2ltYmEvZG9tLmV2ZW50cy5pbWJhIiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvaW1iYS9zcmMvaW1iYS9kb20uc3RhdGljLmltYmEiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy9pbWJhL3NyYy9pbWJhL3NlbGVjdG9yLmltYmEiLCJ3ZWJwYWNrOi8vL3NyYy9tb2RlbC5pbWJhIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNm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QUFFLFNBQVM7O1VBRVgsRUFBRSxFQUFFO0lBQ1QsTUFBTSxXQUFOLE1BQVksU0FBUyxLQUFLLGlCQUFpQjs7VUFDckM7OztFQUVSLEtBdklVOzs7Ozs7OztFQTZJVixLQTdJVTtlQThJVCw2QkFBZSxFQUFFLEtBQUs7Ozs7Ozs7RUFLdkIsS0FuSlU7ZUFvSlQsNkJBQWUsRUFBRSxPQUFPOzs7OztLQUl2QixtQ0FBaUIsS0FBSyxTQUFhLElBQUs7OztNQUd2QztPQUNDLEdBQUcsR0FBRyxNQUFNLEdBQUcsS0FBSyxZQUFVLGNBQWM7VUFDaEQsR0FBRyxZQUFPLElBQUk7Ozs7OztTQUtSO0dBQ047Z0JBQTBCLEtBQUssaUJBQWlCOztHQUNoRDtnQkFBdUIsS0FBSyxjQUFjOzs7OztHQUkxQztlQUFnQixLQUFLLFNBQWE7Ozs7Ozs7Ozs7Ozs7RUNyS2xDLFNBUFk7O1FBUVgsSUFBSSxFQUFFO1FBQ04sT0FBTyxFQUFFO1FBQ1QsV0FBVyxFQUFFOzs7VUFWRjtNQUVSLEdBQUcsRUFBRTs7RUFGRztFQUFBO0VBQUE7RUFBQTs7RUFZWjtlQUNDOzs7RUFFRDtrQkFDUyx3QkFBa0I7O1NBaEJmIiwiZmlsZSI6Ii4vanMvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3YjRmMjAzYmM0Y2I2NTdlMmU2NlxuICoqLyIsIlxucmVxdWlyZSAnaW1iYSdcblxuaW1wb3J0IFRvZG8gZnJvbSAnLi9tb2RlbCdcblxuXG52YXIgRVNDQVBFX0tFWSA9IDI3XG52YXIgRU5URVJfS0VZID0gMTNcblxuXG5cblxuIyBjdXN0b20gdGFnIHR5cGUgZm9yIHRvZG8gdGhhdCBpbmhlcml0cyBmcm9tIGxpXG50YWcgdG9kbyA8IGxpXG5cblx0ZGVmIHJlbmRlclxuXHRcdDxzZWxmIC5jb21wbGV0ZWQ9KG9iamVjdC5jb21wbGV0ZWQpPlxuXHRcdFx0PGRpdi52aWV3PlxuXHRcdFx0XHQ8bGFiZWwgOmRibGNsaWNrPSdlZGl0Jz4gb2JqZWN0LnRpdGxlXG5cdFx0XHRcdDxpbnB1dC50b2dnbGUgdHlwZT0nY2hlY2tib3gnIDp0YXA9J3RvZ2dsZScgY2hlY2tlZD0ob2JqZWN0LmNvbXBsZXRlZCk+XG5cdFx0XHRcdDxidXR0b24uZGVzdHJveSA6dGFwPSdkcm9wJz5cblx0XHRcdDxpbnB1dEBlZGl0IHR5cGU9J3RleHQnIDpibHVyPSdzYXZlJz5cblxuXHRkZWYgdG9nZ2xlXG5cdFx0dXAoJWFwcCkudG9nZ2xlKG9iamVjdClcblxuXHQjIHRyaWdnZXJlZCBieSBkb3VibGVjbGlja2luZyB0aGUgdGl0bGVcblx0IyBzZXRzIHZhbHVlIGlmIGlucHV0IHRvIGN1cnJlbnQgdGl0bGVcblx0IyBhbmQgZmxhZ3MgdGhlIDx0b2RvPiB3aXRoIC5lZGl0aW5nLlxuXHRkZWYgZWRpdFxuXHRcdGZsYWcoJ2VkaXRpbmcnKVxuXHRcdEBlZGl0LnZhbHVlID0gb2JqZWN0LnRpdGxlXG5cdFx0QGVkaXQuZm9jdXNcblxuXHRkZWYgc2F2ZVxuXHRcdGlmIGhhc0ZsYWcoJ2VkaXRpbmcnKVxuXHRcdFx0dW5mbGFnKCdlZGl0aW5nJylcblx0XHRcdHVwKCVhcHApLnJlbmFtZShvYmplY3QsQGVkaXQudmFsdWUpXG5cblx0ZGVmIGRyb3Bcblx0XHR1cCglYXBwKS5kcm9wKG9iamVjdClcblxuXHRkZWYgb25rZXlkb3duIGVcblx0XHRzd2l0Y2ggZS53aGljaFxuXHRcdFx0d2hlbiBFTlRFUl9LRVkgdGhlbiBzYXZlXG5cdFx0XHR3aGVuIEVTQ0FQRV9LRVkgdGhlbiB1bmZsYWcoJ2VkaXRpbmcnKVxuXG5cbnRhZyBhcHBcblxuXHRwcm9wIHRvZG9zXG5cblx0ZGVmIGhhc2hcblx0XHR3aW5kb3c6bG9jYXRpb246aGFzaFxuXG5cdGRlZiBidWlsZFxuXHRcdGxvYWRcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAnaGFzaGNoYW5nZScgZG8gc2NoZWR1bGVyLm1hcmtcblx0XHRzY2hlZHVsZVxuXG5cdGRlZiByZW5kZXJcblx0XHR2YXIgaXRlbXMgPSB0b2Rvc1xuXHRcdHZhciBhY3RpdmUgPSByZW1haW5pbmdcblx0XHR2YXIgZG9uZSA9IGNvbXBsZXRlZFxuXHRcdFxuXG5cdFx0aWYgaGFzaCA9PSAnIy9jb21wbGV0ZWQnXG5cdFx0XHRpdGVtcyA9IGRvbmVcblx0XHRlbGlmIGhhc2ggPT0gJyMvYWN0aXZlJ1xuXHRcdFx0aXRlbXMgPSBhY3RpdmVcblxuXHRcdDxzZWxmPlxuXHRcdFx0PGhlYWRlci5oZWFkZXI+XG5cdFx0XHRcdDxoMT4gXCJ0b2Rvc1wiXG5cdFx0XHRcdDxmb3JtPiA8aW5wdXRAYWRkZXIubmV3LXRvZG8gdHlwZT0ndGV4dCcgcGxhY2Vob2xkZXI9J1doYXQgbmVlZHMgdG8gYmUgZG9uZT8nPlxuXG5cdFx0XHRpZiB0b2RvczpsZW5ndGggPiAwXG5cdFx0XHRcdDxzZWN0aW9uLm1haW4+XG5cdFx0XHRcdFx0PGlucHV0LnRvZ2dsZS1hbGwgdHlwZT0nY2hlY2tib3gnIDpjaGFuZ2U9J3RvZ2dsZUFsbCcgY2hlY2tlZD0oYWN0aXZlOmxlbmd0aCA9PSAwKT5cblx0XHRcdFx0XHQ8dWwudG9kby1saXN0PlxuXHRcdFx0XHRcdFx0Zm9yIHRvZG8gaW4gaXRlbXNcblx0XHRcdFx0XHRcdFx0PHRvZG9bdG9kb11Ae3RvZG8uaWR9PlxuXG5cdFx0XHRcdDxmb290ZXIuZm9vdGVyPlxuXHRcdFx0XHRcdDxzcGFuLnRvZG8tY291bnQ+XG5cdFx0XHRcdFx0XHQ8c3Ryb25nPiBcInthY3RpdmU6bGVuZ3RofSBcIlxuXHRcdFx0XHRcdFx0YWN0aXZlOmxlbmd0aCA9PSAxID8gJ2l0ZW0gbGVmdCcgOiAnaXRlbXMgbGVmdCdcblx0XHRcdFx0XHQ8dWwuZmlsdGVycz5cblx0XHRcdFx0XHRcdDxsaT4gPGEgLnNlbGVjdGVkPShpdGVtcyA9PSB0b2RvcykgICAgaHJlZj0nIy8nPiAnQWxsJ1xuXHRcdFx0XHRcdFx0PGxpPiA8YSAuc2VsZWN0ZWQ9KGl0ZW1zID09IGFjdGl2ZSkgaHJlZj0nIy9hY3RpdmUnPiAnQWN0aXZlJ1xuXHRcdFx0XHRcdFx0PGxpPiA8YSAuc2VsZWN0ZWQ9KGl0ZW1zID09IGRvbmUpICAgaHJlZj0nIy9jb21wbGV0ZWQnPiAnQ29tcGxldGVkJ1xuXG5cdFx0XHRcdFx0aWYgZG9uZTpsZW5ndGggPiAwXG5cdFx0XHRcdFx0XHQ8YnV0dG9uLmNsZWFyLWNvbXBsZXRlZCA6dGFwPSdhcmNoaXZlJz4gJ0NsZWFyIGNvbXBsZXRlZCdcblxuXHRkZWYgcmVtYWluaW5nXG5cdFx0dG9kb3MuZmlsdGVyKHx0b2RvfCAhdG9kby5jb21wbGV0ZWQgKVxuXG5cdGRlZiBjb21wbGV0ZWRcblx0XHR0b2Rvcy5maWx0ZXIofHRvZG98IHRvZG8uY29tcGxldGVkIClcblxuXHRkZWYgZGlydHlcblx0XHRwZXJzaXN0XG5cblx0ZGVmIGFkZCB0aXRsZVxuXHRcdGlmIHRpdGxlLnRyaW1cblx0XHRcdHRvZG9zLnB1c2ggVG9kby5uZXcodGl0bGUudHJpbSlcblx0XHRcdHBlcnNpc3Rcblx0XHRcblx0ZGVmIHRvZ2dsZSB0b2RvXG5cdFx0dG9kby5jb21wbGV0ZWQgPSAhdG9kby5jb21wbGV0ZWRcblx0XHRwZXJzaXN0XG5cblx0ZGVmIHRvZ2dsZUFsbCBlXG5cdFx0Zm9yIHRvZG8gaW4gdG9kb3Ncblx0XHRcdHRvZG8uY29tcGxldGVkID0gZS50YXJnZXQuY2hlY2tlZFxuXHRcdHBlcnNpc3RcblxuXHQjIHJlbmFtZSBhIHRvZG9cblx0IyBkcm9wcyB0aGUgdG9kbyBpZiB0aXRsZSBpcyBibGFua1xuXHRkZWYgcmVuYW1lIHRvZG8sIHRpdGxlXG5cdFx0dG9kby50aXRsZSA9IHRpdGxlLnRyaW1cblx0XHR0b2RvLnRpdGxlID8gcGVyc2lzdCA6IGRyb3AodG9kbylcblxuXHQjIHJlbW92ZSBhIHRvZG8gZnJvbSBjb2xsZWN0aW9uXG5cdGRlZiBkcm9wIHRvZG9cblx0XHQjIHNpbXBseSByZW1vdmluZyBpdCBmcm9tIHRoZSBsaXN0IG9mIHRvZG9zXG5cdFx0dG9kb3MgPSB0b2Rvcy5maWx0ZXIofHR8IHQgIT0gdG9kbylcblx0XHRwZXJzaXN0XG5cdFxuXHQjIHJlbW92ZSBhbGwgY29tcGxldGVkIHRvZG9zIGZyb20gY29sbGVjdGlvblxuXHRkZWYgYXJjaGl2ZVxuXHRcdHRvZG9zID0gcmVtYWluaW5nXG5cdFx0cGVyc2lzdFxuXG5cdCMgbG9hZCB0b2RvcyBmcm9tIGxvY2Fsc3RvcmFnZVxuXHRkZWYgbG9hZFxuXHRcdHZhciBpdGVtcyA9IEpTT04ucGFyc2Uod2luZG93OmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2Rvcy1pbWJhJykgb3IgJ1tdJylcblx0XHR0b2RvcyA9IGl0ZW1zLm1hcCBkbyB8aXRlbXwgVG9kby5uZXcoaXRlbTp0aXRsZSwgaXRlbTpjb21wbGV0ZWQpXG5cdFx0c2VsZlxuXG5cdCMgcGVyc2lzdCB0b2RvcyB0byBsb2NhbHN0b3JhZ2Vcblx0ZGVmIHBlcnNpc3Rcblx0XHR2YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KHRvZG9zKVxuXHRcdHdpbmRvdzpsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MtaW1iYScsQGpzb24gPSBqc29uKSBpZiBqc29uICE9IEBqc29uXG5cdFx0c2VsZlxuXG5cdGRlZiBvbnN1Ym1pdCBlXG5cdFx0ZS5jYW5jZWwuaGFsdFxuXHRcdGFkZCBAYWRkZXIudmFsdWVcblx0XHRAYWRkZXIudmFsdWUgPSAnJ1xuXG5cbnZhciBhcHAgPSA8YXBwI2FwcCB0b2Rvcz1bXT5cbigkJCgudG9kb2FwcCkgb3IgJCQoYm9keSkpLmFwcGVuZCBhcHBcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9hcHAuaW1iYVxuICoqLyIsImV4cG9ydCB2YXIgaW1iYSA9IHJlcXVpcmUgJy4vc3JjL2ltYmEnXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbm9kZV9tb2R1bGVzL2ltYmEvaW5kZXguaW1iYVxuICoqLyIsIlxuaWYgdHlwZW9mIEltYmEgPT09ICd1bmRlZmluZWQnXG5cdHJlcXVpcmUgJy4vaW1iYSdcblx0cmVxdWlyZSAnLi9jb3JlLmV2ZW50cydcblx0cmVxdWlyZSAnLi9zY2hlZHVsZXInXG5cdHJlcXVpcmUgJy4vdGFnJ1xuXHRyZXF1aXJlICcuL2RvbSdcblx0cmVxdWlyZSAnLi9kb20uaHRtbCdcblx0cmVxdWlyZSAnLi9kb20uc3ZnJ1xuXG5cdGlmIEltYmEuU0VSVkVSXG5cdFx0cmVxdWlyZSAnLi9kb20uc2VydmVyJ1xuXHRcblx0aWYgSW1iYS5DTElFTlRcblx0XHRyZXF1aXJlICcuL2RvbS5jbGllbnQnXG5cdFx0cmVxdWlyZSAnLi9kb20uZXZlbnRzJ1xuXHRcdHJlcXVpcmUgJy4vZG9tLnN0YXRpYydcblxuXHRyZXF1aXJlICcuL3NlbGVjdG9yJ1xuZWxzZVxuXHRjb25zb2xlLndhcm4gXCJJbWJhIHZ7SW1iYS5WRVJTSU9OfSBpcyBhbHJlYWR5IGxvYWRlZFwiXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBub2RlX21vZHVsZXMvaW1iYS9zcmMvaW1iYS9pbmRleC5pbWJhXG4gKiovIiwiaWYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcblx0IyBzaG91bGQgbm90IGdvIHRoZXJlXG5cdGdsb2JhbCA9IHdpbmRvd1xuXG52YXIgaXNDbGllbnQgPSAodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyBhbmQgdGhpcyA9PSB3aW5kb3cpXG4jIyNcbkltYmEgaXMgdGhlIG5hbWVzcGFjZSBmb3IgYWxsIHJ1bnRpbWUgcmVsYXRlZCB1dGlsaXRpZXNcbkBuYW1lc3BhY2VcbiMjI1xuSW1iYSA9IHtcblx0VkVSU0lPTjogJzAuMTQuMydcblx0Q0xJRU5UOiBpc0NsaWVudFxuXHRTRVJWRVI6ICFpc0NsaWVudFxuXHRERUJVRzogbm9cbn1cblxudmFyIHJlZyA9IC8tLi9nXG5cbiMjI1xuVHJ1ZSBpZiBydW5uaW5nIGluIGNsaWVudCBlbnZpcm9ubWVudC5cbkByZXR1cm4ge2Jvb2x9XG4jIyNcbmRlZiBJbWJhLmlzQ2xpZW50XG5cdEltYmEuQ0xJRU5UID09IHllc1xuXG4jIyNcblRydWUgaWYgcnVubmluZyBpbiBzZXJ2ZXIgZW52aXJvbm1lbnQuXG5AcmV0dXJuIHtib29sfVxuIyMjXG5kZWYgSW1iYS5pc1NlcnZlclxuXHRJbWJhLlNFUlZFUiA9PSB5ZXNcblxuZGVmIEltYmEuc3ViY2xhc3Mgb2JqLCBzdXBcblx0Zm9yIGssdiBvZiBzdXBcblx0XHRvYmpba10gPSB2IGlmIHN1cC5oYXNPd25Qcm9wZXJ0eShrKVxuXG5cdG9iajpwcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cDpwcm90b3R5cGUpXG5cdG9iajpfX3N1cGVyX18gPSBvYmo6cHJvdG90eXBlOl9fc3VwZXJfXyA9IHN1cDpwcm90b3R5cGVcblx0b2JqOnByb3RvdHlwZTppbml0aWFsaXplID0gb2JqOnByb3RvdHlwZTpjb25zdHJ1Y3RvciA9IG9ialxuXHRyZXR1cm4gb2JqXG5cbiMjI1xuTGlnaHR3ZWlnaHQgbWV0aG9kIGZvciBtYWtpbmcgYW4gb2JqZWN0IGl0ZXJhYmxlIGluIGltYmFzIGZvci9pbiBsb29wcy5cbklmIHRoZSBjb21waWxlciBjYW5ub3Qgc2F5IGZvciBjZXJ0YWluIHRoYXQgYSB0YXJnZXQgaW4gYSBmb3IgbG9vcCBpcyBhblxuYXJyYXksIGl0IHdpbGwgY2FjaGUgdGhlIGl0ZXJhYmxlIHZlcnNpb24gYmVmb3JlIGxvb3BpbmcuXG5cbmBgYGltYmFcbiMgdGhpcyBpcyB0aGUgd2hvbGUgbWV0aG9kXG5kZWYgSW1iYS5pdGVyYWJsZSBvXG5cdHJldHVybiBvID8gKG86dG9BcnJheSA/IG8udG9BcnJheSA6IG8pIDogW11cblxuY2xhc3MgQ3VzdG9tSXRlcmFibGVcblx0ZGVmIHRvQXJyYXlcblx0XHRbMSwyLDNdXG5cbiMgd2lsbCByZXR1cm4gWzIsNCw2XVxuZm9yIHggaW4gQ3VzdG9tSXRlcmFibGUubmV3XG5cdHggKiAyXG5cbmBgYFxuIyMjXG5kZWYgSW1iYS5pdGVyYWJsZSBvXG5cdHJldHVybiBvID8gKG86dG9BcnJheSA/IG8udG9BcnJheSA6IG8pIDogW11cblxuIyMjXG5Db2VyY2VzIGEgdmFsdWUgaW50byBhIHByb21pc2UuIElmIHZhbHVlIGlzIGFycmF5IGl0IHdpbGxcbmNhbGwgYFByb21pc2UuYWxsKHZhbHVlKWAsIG9yIGlmIGl0IGlzIG5vdCBhIHByb21pc2UgaXQgd2lsbFxud3JhcCB0aGUgdmFsdWUgaW4gYFByb21pc2UucmVzb2x2ZSh2YWx1ZSlgLiBVc2VkIGZvciBleHBlcmltZW50YWxcbmF3YWl0IHN5bnRheC5cbkByZXR1cm4ge1Byb21pc2V9XG4jIyNcbmRlZiBJbWJhLmF3YWl0IHZhbHVlXG5cdGlmIHZhbHVlIGlzYSBBcnJheVxuXHRcdFByb21pc2UuYWxsKHZhbHVlKVxuXHRlbGlmIHZhbHVlIGFuZCB2YWx1ZTp0aGVuXG5cdFx0dmFsdWVcblx0ZWxzZVxuXHRcdFByb21pc2UucmVzb2x2ZSh2YWx1ZSlcblxuZGVmIEltYmEudG9DYW1lbENhc2Ugc3RyXG5cdHN0ci5yZXBsYWNlKHJlZykgZG8gfG18IG0uY2hhckF0KDEpLnRvVXBwZXJDYXNlXG5cbmRlZiBJbWJhLnRvQ2FtZWxDYXNlIHN0clxuXHRzdHIucmVwbGFjZShyZWcpIGRvIHxtfCBtLmNoYXJBdCgxKS50b1VwcGVyQ2FzZVxuXG5kZWYgSW1iYS5pbmRleE9mIGEsYlxuXHRyZXR1cm4gKGIgJiYgYjppbmRleE9mKSA/IGIuaW5kZXhPZihhKSA6IFtdOmluZGV4T2YuY2FsbChhLGIpXG5cbmRlZiBJbWJhLnByb3Agc2NvcGUsIG5hbWUsIG9wdHNcblx0aWYgc2NvcGU6ZGVmaW5lUHJvcGVydHlcblx0XHRyZXR1cm4gc2NvcGUuZGVmaW5lUHJvcGVydHkobmFtZSxvcHRzKVxuXHRyZXR1cm5cblxuZGVmIEltYmEuYXR0ciBzY29wZSwgbmFtZSwgb3B0c1xuXHRpZiBzY29wZTpkZWZpbmVBdHRyaWJ1dGVcblx0XHRyZXR1cm4gc2NvcGUuZGVmaW5lQXR0cmlidXRlKG5hbWUsb3B0cylcblxuXHRsZXQgZ2V0TmFtZSA9IEltYmEudG9DYW1lbENhc2UobmFtZSlcblx0bGV0IHNldE5hbWUgPSBJbWJhLnRvQ2FtZWxDYXNlKCdzZXQtJyArIG5hbWUpXG5cblx0c2NvcGU6cHJvdG90eXBlW2dldE5hbWVdID0gZG9cblx0XHRyZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUobmFtZSlcblxuXHRzY29wZTpwcm90b3R5cGVbc2V0TmFtZV0gPSBkbyB8dmFsdWV8XG5cdFx0dGhpcy5zZXRBdHRyaWJ1dGUobmFtZSx2YWx1ZSlcblx0XHRyZXR1cm4gdGhpc1xuXG5cdHJldHVyblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbm9kZV9tb2R1bGVzL2ltYmEvc3JjL2ltYmEvaW1iYS5pbWJhXG4gKiovIiwiXG5cbmRlZiBlbWl0X18gZXZlbnQsIGFyZ3MsIG5vZGVcblx0IyB2YXIgbm9kZSA9IGNic1tldmVudF1cblx0dmFyIHByZXYsIGNiLCByZXRcblxuXHR3aGlsZSAocHJldiA9IG5vZGUpIGFuZCAobm9kZSA9IG5vZGU6bmV4dClcblx0XHRpZiBjYiA9IG5vZGU6bGlzdGVuZXJcblx0XHRcdGlmIG5vZGU6cGF0aCBhbmQgY2Jbbm9kZTpwYXRoXVxuXHRcdFx0XHRyZXQgPSBhcmdzID8gY2Jbbm9kZTpwYXRoXS5hcHBseShjYixhcmdzKSA6IGNiW25vZGU6cGF0aF0oKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHQjIGNoZWNrIGlmIGl0IGlzIGEgbWV0aG9kP1xuXHRcdFx0XHRyZXQgPSBhcmdzID8gY2IuYXBwbHkobm9kZSwgYXJncykgOiBjYi5jYWxsKG5vZGUpXG5cblx0XHRpZiBub2RlOnRpbWVzICYmIC0tbm9kZTp0aW1lcyA8PSAwXG5cdFx0XHRwcmV2Om5leHQgPSBub2RlOm5leHRcblx0XHRcdG5vZGU6bGlzdGVuZXIgPSBudWxsXG5cdHJldHVyblxuXG4jIG1ldGhvZCBmb3IgcmVnaXN0ZXJpbmcgYSBsaXN0ZW5lciBvbiBvYmplY3RcbmRlZiBJbWJhLmxpc3RlbiBvYmosIGV2ZW50LCBsaXN0ZW5lciwgcGF0aFxuXHR2YXIgY2JzLCBsaXN0LCB0YWlsXG5cdGNicyA9IG9iajpfX2xpc3RlbmVyc19fIHx8PSB7fVxuXHRsaXN0ID0gY2JzW2V2ZW50XSB8fD0ge31cblx0dGFpbCA9IGxpc3Q6dGFpbCB8fCAobGlzdDp0YWlsID0gKGxpc3Q6bmV4dCA9IHt9KSlcblx0dGFpbDpsaXN0ZW5lciA9IGxpc3RlbmVyXG5cdHRhaWw6cGF0aCA9IHBhdGhcblx0bGlzdDp0YWlsID0gdGFpbDpuZXh0ID0ge31cblx0cmV0dXJuIHRhaWxcblxuZGVmIEltYmEub25jZSBvYmosIGV2ZW50LCBsaXN0ZW5lclxuXHR2YXIgdGFpbCA9IEltYmEubGlzdGVuKG9iaixldmVudCxsaXN0ZW5lcilcblx0dGFpbDp0aW1lcyA9IDFcblx0cmV0dXJuIHRhaWxcblxuZGVmIEltYmEudW5saXN0ZW4gb2JqLCBldmVudCwgY2IsIG1ldGhcblx0dmFyIG5vZGUsIHByZXZcblx0dmFyIG1ldGEgPSBvYmo6X19saXN0ZW5lcnNfX1xuXHRyZXR1cm4gdW5sZXNzIG1ldGFcblxuXHRpZiBub2RlID0gbWV0YVtldmVudF1cblx0XHR3aGlsZSAocHJldiA9IG5vZGUpIGFuZCAobm9kZSA9IG5vZGU6bmV4dClcblx0XHRcdGlmIG5vZGUgPT0gY2IgfHwgbm9kZTpsaXN0ZW5lciA9PSBjYlxuXHRcdFx0XHRwcmV2Om5leHQgPSBub2RlOm5leHRcblx0XHRcdFx0IyBjaGVjayBmb3IgY29ycmVjdCBwYXRoIGFzIHdlbGw/XG5cdFx0XHRcdG5vZGU6bGlzdGVuZXIgPSBudWxsXG5cdFx0XHRcdGJyZWFrXG5cdHJldHVyblxuXG5kZWYgSW1iYS5lbWl0IG9iaiwgZXZlbnQsIHBhcmFtc1xuXHRpZiB2YXIgY2IgPSBvYmo6X19saXN0ZW5lcnNfX1xuXHRcdGVtaXRfXyhldmVudCxwYXJhbXMsY2JbZXZlbnRdKSBpZiBjYltldmVudF1cblx0XHRlbWl0X18oZXZlbnQsW2V2ZW50LHBhcmFtc10sY2I6YWxsKSBpZiBjYjphbGwgIyBhbmQgZXZlbnQgIT0gJ2FsbCdcblx0cmV0dXJuXG5cbmRlZiBJbWJhLm9ic2VydmVQcm9wZXJ0eSBvYnNlcnZlciwga2V5LCB0cmlnZ2VyLCB0YXJnZXQsIHByZXZcblx0aWYgcHJldiBhbmQgdHlwZW9mIHByZXYgPT0gJ29iamVjdCdcblx0XHRJbWJhLnVubGlzdGVuKHByZXYsJ2FsbCcsb2JzZXJ2ZXIsdHJpZ2dlcilcblx0aWYgdGFyZ2V0IGFuZCB0eXBlb2YgdGFyZ2V0ID09ICdvYmplY3QnXG5cdFx0SW1iYS5saXN0ZW4odGFyZ2V0LCdhbGwnLG9ic2VydmVyLHRyaWdnZXIpXG5cdHNlbGZcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBub2RlX21vZHVsZXMvaW1iYS9zcmMvaW1iYS9jb3JlLmV2ZW50cy5pbWJhXG4gKiovIiwiXG52YXIgcmFmICMgdmVyeSBzaW1wbGUgcmFmIHBvbHlmaWxsXG5yYWYgfHw9IGdsb2JhbDpyZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbnJhZiB8fD0gZ2xvYmFsOndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxucmFmIHx8PSBnbG9iYWw6bW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5yYWYgfHw9IGRvIHxibGt8IHNldFRpbWVvdXQoYmxrLDEwMDAgLyA2MClcblxuZGVmIEltYmEudGljayBkXG5cdHJhZihJbWJhLnRpY2tlcikgaWYgQHNjaGVkdWxlZFxuXHRJbWJhLlNjaGVkdWxlci53aWxsUnVuXG5cdGVtaXQoc2VsZiwndGljaycsW2RdKVxuXHRJbWJhLlNjaGVkdWxlci5kaWRSdW5cblx0cmV0dXJuXG5cbmRlZiBJbWJhLnRpY2tlclxuXHRAdGlja2VyIHx8PSBkbyB8ZXwgdGljayhlKVxuXG4jIyNcblxuR2xvYmFsIGFsdGVybmF0aXZlIHRvIHJlcXVlc3RBbmltYXRpb25GcmFtZS4gU2NoZWR1bGUgYSB0YXJnZXRcbnRvIHRpY2sgZXZlcnkgZnJhbWUuIFlvdSBjYW4gc3BlY2lmeSB3aGljaCBtZXRob2QgdG8gY2FsbCBvbiB0aGVcbnRhcmdldCAoZGVmYXVsdHMgdG8gdGljaykuXG5cbiMjI1xuZGVmIEltYmEuc2NoZWR1bGUgdGFyZ2V0LCBtZXRob2QgPSAndGljaydcblx0bGlzdGVuKHNlbGYsJ3RpY2snLHRhcmdldCxtZXRob2QpXG5cdCMgc3RhcnQgc2NoZWR1bGluZyBub3cgaWYgdGhpcyB3YXMgdGhlIGZpcnN0IG9uZVxuXHR1bmxlc3MgQHNjaGVkdWxlZFxuXHRcdEBzY2hlZHVsZWQgPSB5ZXNcblx0XHRyYWYoSW1iYS50aWNrZXIpXG5cdHNlbGZcblxuIyMjXG5cblVuc2NoZWR1bGUgYSBwcmV2aW91c2x5IHNjaGVkdWxlZCB0YXJnZXRcblxuIyMjXG5kZWYgSW1iYS51bnNjaGVkdWxlIHRhcmdldCwgbWV0aG9kXG5cdHVubGlzdGVuKHNlbGYsJ3RpY2snLHRhcmdldCxtZXRob2QpXG5cdHZhciBjYnMgPSBzZWxmOl9fbGlzdGVuZXJzX18gfHw9IHt9XG5cdGlmICFjYnM6dGljayBvciAhY2JzOnRpY2s6bmV4dCBvciAhY2JzOnRpY2s6bmV4dDpsaXN0ZW5lclxuXHRcdEBzY2hlZHVsZWQgPSBub1xuXHRzZWxmXG5cbiMjI1xuXG5MaWdodCB3cmFwcGVyIGFyb3VuZCBuYXRpdmUgc2V0VGltZW91dCB0aGF0IGV4cGVjdHMgdGhlIGJsb2NrIC8gZnVuY3Rpb25cbmFzIGxhc3QgYXJndW1lbnQgKGluc3RlYWQgb2YgZmlyc3QpLiBJdCBhbHNvIHRyaWdnZXJzIGFuIGV2ZW50IHRvIEltYmFcbmFmdGVyIHRoZSB0aW1lb3V0IHRvIGxldCBzY2hlZHVsZXJzIHVwZGF0ZSAodG8gcmVyZW5kZXIgZXRjKSBhZnRlcndhcmRzLlxuXG4jIyNcbmRlZiBJbWJhLnNldFRpbWVvdXQgZGVsYXksICZibG9ja1xuXHRzZXRUaW1lb3V0KCYsZGVsYXkpIGRvXG5cdFx0YmxvY2soKVxuXHRcdEltYmEuU2NoZWR1bGVyLm1hcmtEaXJ0eVxuXHRcdCMgSW1iYS5lbWl0KEltYmEsJ3RpbWVvdXQnLFtibG9ja10pXG5cbiMjI1xuXG5MaWdodCB3cmFwcGVyIGFyb3VuZCBuYXRpdmUgc2V0SW50ZXJ2YWwgdGhhdCBleHBlY3RzIHRoZSBibG9jayAvIGZ1bmN0aW9uXG5hcyBsYXN0IGFyZ3VtZW50IChpbnN0ZWFkIG9mIGZpcnN0KS4gSXQgYWxzbyB0cmlnZ2VycyBhbiBldmVudCB0byBJbWJhXG5hZnRlciBldmVyeSBpbnRlcnZhbCB0byBsZXQgc2NoZWR1bGVycyB1cGRhdGUgKHRvIHJlcmVuZGVyIGV0YykgYWZ0ZXJ3YXJkcy5cblxuIyMjXG5kZWYgSW1iYS5zZXRJbnRlcnZhbCBpbnRlcnZhbCwgJmJsb2NrXG5cdHNldEludGVydmFsKCYsaW50ZXJ2YWwpIGRvXG5cdFx0YmxvY2soKVxuXHRcdEltYmEuU2NoZWR1bGVyLm1hcmtEaXJ0eVxuXHRcdCMgSW1iYS5lbWl0KEltYmEsJ2ludGVydmFsJyxbYmxvY2tdKVxuXG4jIyNcbkNsZWFyIGludGVydmFsIHdpdGggc3BlY2lmaWVkIGlkXG4jIyNcbmRlZiBJbWJhLmNsZWFySW50ZXJ2YWwgaW50ZXJ2YWxcblx0Y2xlYXJJbnRlcnZhbChpbnRlcnZhbClcblxuIyMjXG5DbGVhciB0aW1lb3V0IHdpdGggc3BlY2lmaWVkIGlkXG4jIyNcbmRlZiBJbWJhLmNsZWFyVGltZW91dCB0aW1lb3V0XG5cdGNsZWFyVGltZW91dCh0aW1lb3V0KVxuXG4jIHNob3VsZCBhZGQgYW4gSW1iYS5ydW4gLyBzZXRJbW1lZGlhdGUgdGhhdFxuIyBwdXNoZXMgbGlzdGVuZXIgb250byB0aGUgdGljay1xdWV1ZSB3aXRoIHRpbWVzIC0gb25jZVxuXG5cbiMjI1xuXG5JbnN0YW5jZXMgb2YgSW1iYS5TY2hlZHVsZXIgbWFuYWdlcyB3aGVuIHRvIGNhbGwgYHRpY2soKWAgb24gdGhlaXIgdGFyZ2V0LFxuYXQgYSBzcGVjaWZpZWQgZnJhbWVyYXRlIG9yIHdoZW4gY2VydGFpbiBldmVudHMgb2NjdXIuIFJvb3Qtbm9kZXMgaW4geW91clxuYXBwbGljYXRpb25zIHdpbGwgdXN1YWxseSBoYXZlIGEgc2NoZWR1bGVyIHRvIG1ha2Ugc3VyZSB0aGV5IHJlcmVuZGVyIHdoZW5cbnNvbWV0aGluZyBjaGFuZ2VzLiBJdCBpcyBhbHNvIHBvc3NpYmxlIHRvIG1ha2UgaW5uZXIgY29tcG9uZW50cyB1c2UgdGhlaXJcbm93biBzY2hlZHVsZXJzIHRvIGNvbnRyb2wgd2hlbiB0aGV5IHJlbmRlci5cblxuQGluYW1lIHNjaGVkdWxlclxuXG4jIyNcbmNsYXNzIEltYmEuU2NoZWR1bGVyXG5cblx0ZGVmIHNlbGYubWFya0RpcnR5XG5cdFx0QGRpcnR5ID0geWVzXG5cdFx0c2VsZlxuXG5cdGRlZiBzZWxmLmlzRGlydHlcblx0XHQhIUBkaXJ0eVxuXG5cdGRlZiBzZWxmLndpbGxSdW5cblx0XHRAYWN0aXZlID0geWVzXG5cblx0ZGVmIHNlbGYuZGlkUnVuXG5cdFx0QGFjdGl2ZSA9IG5vXG5cdFx0QGRpcnR5ID0gbm9cblxuXHRkZWYgc2VsZi5pc0FjdGl2ZVxuXHRcdCEhQGFjdGl2ZVxuXG5cdCMjI1xuXHRDcmVhdGUgYSBuZXcgSW1iYS5TY2hlZHVsZXIgZm9yIHNwZWNpZmllZCB0YXJnZXRcblx0QHJldHVybiB7SW1iYS5TY2hlZHVsZXJ9XG5cdCMjI1xuXHRkZWYgaW5pdGlhbGl6ZSB0YXJnZXRcblx0XHRAdGFyZ2V0ID0gdGFyZ2V0XG5cdFx0QG1hcmtlZCA9IG5vXG5cdFx0QGFjdGl2ZSA9IG5vXG5cdFx0QG1hcmtlciA9IGRvIG1hcmtcblx0XHRAdGlja2VyID0gZG8gfGV8IHRpY2soZSlcblx0XHRcblx0XHRAZXZlbnRzID0geWVzXG5cdFx0QGZwcyA9IDFcblxuXHRcdEBkdCA9IDBcblx0XHRAdGltZXN0YW1wID0gMFxuXHRcdEB0aWNrcyA9IDBcblx0XHRAZmx1c2hlcyA9IDBcblxuXHQjIyNcblx0Q2hlY2sgd2hldGhlciB0aGUgY3VycmVudCBzY2hlZHVsZXIgaXMgYWN0aXZlIG9yIG5vdFxuXHRAcmV0dXJuIHtib29sfVxuXHQjIyNcblx0ZGVmIGFjdGl2ZVxuXHRcdEBhY3RpdmVcblxuXHQjIyNcblx0RGVsdGEgdGltZSBiZXR3ZWVuIHRoZSB0d28gbGFzdCB0aWNrc1xuXHRAcmV0dXJuIHtOdW1iZXJ9XG5cdCMjI1xuXHRkZWYgZHRcblx0XHRAZHRcblxuXHQjIyNcblx0Q29uZmlndXJlIHRoZSBzY2hlZHVsZXJcblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBjb25maWd1cmUgZnBzOiAxLCBldmVudHM6IHllc1xuXHRcdEBldmVudHMgPSBldmVudHMgaWYgZXZlbnRzICE9IG51bGxcblx0XHRAZnBzID0gZnBzIGlmIGZwcyAhPSBudWxsXG5cdFx0c2VsZlxuXG5cdCMjI1xuXHRNYXJrIHRoZSBzY2hlZHVsZXIgYXMgZGlydHkuIFRoaXMgd2lsbCBtYWtlIHN1cmUgdGhhdFxuXHR0aGUgc2NoZWR1bGVyIGNhbGxzIGB0YXJnZXQudGlja2Agb24gdGhlIG5leHQgZnJhbWVcblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBtYXJrXG5cdFx0QG1hcmtlZCA9IHllc1xuXHRcdHNlbGZcblxuXHQjIyNcblx0SW5zdGFudGx5IHRyaWdnZXIgdGFyZ2V0LnRpY2sgYW5kIG1hcmsgc2NoZWR1bGVyIGFzIGNsZWFuIChub3QgZGlydHkvbWFya2VkKS5cblx0VGhpcyBpcyBjYWxsZWQgaW1wbGljaXRseSBmcm9tIHRpY2ssIGJ1dCBjYW4gYWxzbyBiZSBjYWxsZWQgbWFudWFsbHkgaWYgeW91XG5cdHJlYWxseSB3YW50IHRvIGZvcmNlIGEgdGljayB3aXRob3V0IHdhaXRpbmcgZm9yIHRoZSBuZXh0IGZyYW1lLlxuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIGZsdXNoXG5cdFx0QG1hcmtlZCA9IG5vXG5cdFx0QGZsdXNoZXMrK1xuXHRcdEB0YXJnZXQudGlja1xuXHRcdHNlbGZcblxuXHQjIyNcblx0QGZpeG1lIHRoaXMgZXhwZWN0cyByYWYgdG8gcnVuIGF0IDYwIGZwcyBcblxuXHRDYWxsZWQgYXV0b21hdGljYWxseSBvbiBldmVyeSBmcmFtZSB3aGlsZSB0aGUgc2NoZWR1bGVyIGlzIGFjdGl2ZS5cblx0SXQgd2lsbCBvbmx5IGNhbGwgYHRhcmdldC50aWNrYCBpZiB0aGUgc2NoZWR1bGVyIGlzIG1hcmtlZCBkaXJ0eSxcblx0b3Igd2hlbiBhY2NvcmRpbmcgdG8gQGZwcyBzZXR0aW5nLlxuXG5cdElmIHlvdSBoYXZlIHNldCB1cCBhIHNjaGVkdWxlciB3aXRoIGFuIGZwcyBvZiAxLCB0aWNrIHdpbGwgc3RpbGwgYmVcblx0Y2FsbGVkIGV2ZXJ5IGZyYW1lLCBidXQgYHRhcmdldC50aWNrYCB3aWxsIG9ubHkgYmUgY2FsbGVkIG9uY2UgZXZlcnlcblx0c2Vjb25kLCBhbmQgaXQgd2lsbCAqbWFrZSBzdXJlKiBlYWNoIGB0YXJnZXQudGlja2AgaGFwcGVucyBpbiBzZXBhcmF0ZVxuXHRzZWNvbmRzIGFjY29yZGluZyB0byBEYXRlLiBTbyBpZiB5b3UgaGF2ZSBhIG5vZGUgdGhhdCByZW5kZXJzIGEgY2xvY2tcblx0YmFzZWQgb24gRGF0ZS5ub3cgKG9yIHNvbWV0aGluZyBzaW1pbGFyKSwgeW91IGNhbiBzY2hlZHVsZSBpdCB3aXRoIDFmcHMsXG5cdG5ldmVyIG5lZWRpbmcgdG8gd29ycnkgYWJvdXQgdHdvIHRpY2tzIGhhcHBlbmluZyB3aXRoaW4gdGhlIHNhbWUgc2Vjb25kLlxuXHRUaGUgc2FtZSBnb2VzIGZvciA0ZnBzLCAxMGZwcyBldGMuXG5cblx0QHByb3RlY3RlZFxuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIHRpY2sgZGVsdGFcblx0XHRAdGlja3MrK1xuXHRcdEBkdCA9IGRlbHRhXG5cblx0XHRsZXQgZnBzID0gQGZwc1xuXHRcdFxuXHRcdGlmIGZwcyA9PSA2MFxuXHRcdFx0QG1hcmtlZCA9IHllc1xuXHRcdGVsaWYgZnBzID09IDMwXG5cdFx0XHRAbWFya2VkID0geWVzIGlmIEB0aWNrcyAlIDJcblx0XHRlbGlmIGZwc1xuXHRcdFx0IyBpZiBpdCBpcyBsZXNzIHJvdW5kIC0gd2UgdHJpZ2dlciBiYXNlZFxuXHRcdFx0IyBvbiBkYXRlLCBmb3IgY29uc2lzdGVudCByZW5kZXJpbmcuXG5cdFx0XHQjIGllLCBpZiB5b3Ugd2FudCB0byByZW5kZXIgZXZlcnkgc2Vjb25kXG5cdFx0XHQjIGl0IGlzIGltcG9ydGFudCB0aGF0IG5vIHR3byByZW5kZXJzXG5cdFx0XHQjIGhhcHBlbiBkdXJpbmcgdGhlIHNhbWUgc2Vjb25kIChhY2NvcmRpbmcgdG8gRGF0ZSlcblx0XHRcdGxldCBwZXJpb2QgPSAoKDYwIC8gZnBzKSAvIDYwKSAqIDEwMDBcblx0XHRcdGxldCBiZWF0ID0gTWF0aC5mbG9vcihEYXRlLm5vdyAvIHBlcmlvZClcblxuXHRcdFx0aWYgQGJlYXQgIT0gYmVhdFxuXHRcdFx0XHRAYmVhdCA9IGJlYXRcblx0XHRcdFx0QG1hcmtlZCA9IHllc1xuXG5cdFx0Zmx1c2ggaWYgQG1hcmtlZCBvciAoQGV2ZW50cyBhbmQgSW1iYS5TY2hlZHVsZXIuaXNEaXJ0eSlcblx0XHQjIHJlc2NoZWR1bGUgaWYgQGFjdGl2ZVxuXHRcdHNlbGZcblxuXHQjIyNcblx0U3RhcnQgdGhlIHNjaGVkdWxlciBpZiBpdCBpcyBub3QgYWxyZWFkeSBhY3RpdmUuXG5cdCoqV2hpbGUgYWN0aXZlKiosIHRoZSBzY2hlZHVsZXIgd2lsbCBvdmVycmlkZSBgdGFyZ2V0LmNvbW1pdGBcblx0dG8gZG8gbm90aGluZy4gQnkgZGVmYXVsdCBJbWJhLnRhZyNjb21taXQgY2FsbHMgcmVuZGVyLCBzb1xuXHR0aGF0IHJlbmRlcmluZyBpcyBjYXNjYWRlZCB0aHJvdWdoIHRvIGNoaWxkcmVuIHdoZW4gcmVuZGVyaW5nXG5cdGEgbm9kZS4gV2hlbiBhIHNjaGVkdWxlciBpcyBhY3RpdmUgKGZvciBhIG5vZGUpLCBJbWJhIGRpc2FibGVzXG5cdHRoaXMgYXV0b21hdGljIHJlbmRlcmluZy5cblx0IyMjXG5cdGRlZiBhY3RpdmF0ZVxuXHRcdHVubGVzcyBAYWN0aXZlXG5cdFx0XHRAYWN0aXZlID0geWVzXG5cdFx0XHQjIG92ZXJyaWRlIHRhcmdldCNjb21taXQgd2hpbGUgdGhpcyBpcyBhY3RpdmVcblx0XHRcdEBjb21taXQgPSBAdGFyZ2V0OmNvbW1pdFxuXHRcdFx0QHRhcmdldDpjb21taXQgPSBkbyB0aGlzXG5cdFx0XHRJbWJhLnNjaGVkdWxlKHNlbGYpXG5cdFx0XHRJbWJhLmxpc3RlbihJbWJhLCdldmVudCcsc2VsZiwnb25ldmVudCcpIGlmIEBldmVudHNcblx0XHRcdEB0YXJnZXQ/LmZsYWcoJ3NjaGVkdWxlZF8nKVxuXHRcdFx0dGljaygwKSAjIHN0YXJ0IHRpY2tpbmdcblx0XHRyZXR1cm4gc2VsZlxuXG5cdCMjI1xuXHRTdG9wIHRoZSBzY2hlZHVsZXIgaWYgaXQgaXMgYWN0aXZlLlxuXHQjIyNcblx0ZGVmIGRlYWN0aXZhdGVcblx0XHRpZiBAYWN0aXZlXG5cdFx0XHRAYWN0aXZlID0gbm9cblx0XHRcdEB0YXJnZXQ6Y29tbWl0ID0gQGNvbW1pdFxuXHRcdFx0SW1iYS51bnNjaGVkdWxlKHNlbGYpXG5cdFx0XHRJbWJhLnVubGlzdGVuKEltYmEsJ2V2ZW50JyxzZWxmKVxuXHRcdFx0QHRhcmdldD8udW5mbGFnKCdzY2hlZHVsZWRfJylcblx0XHRyZXR1cm4gc2VsZlxuXG5cdGRlZiB0cmFja1xuXHRcdEBtYXJrZXJcblxuXHRkZWYgb25ldmVudCBldmVudFxuXHRcdHJldHVybiBzZWxmIGlmIEBtYXJrZWRcblxuXHRcdGlmIEBldmVudHMgaXNhIEZ1bmN0aW9uXG5cdFx0XHRtYXJrIGlmIEBldmVudHMoZXZlbnQpXHRcblx0XHRlbGlmIEBldmVudHMgaXNhIEFycmF5XG5cdFx0XHRtYXJrIGlmIGV2ZW50Py50eXBlIGluIEBldmVudHNcblx0XHRlbGlmIEBldmVudHNcblx0XHRcdG1hcmsgaWYgZXZlbnQuQHJlc3BvbmRlclxuXHRcdHNlbGZcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIG5vZGVfbW9kdWxlcy9pbWJhL3NyYy9pbWJhL3NjaGVkdWxlci5pbWJhXG4gKiovIiwiZGVmIEltYmEuc3RhdGljIGl0ZW1zLCBuclxuXHRpdGVtczpzdGF0aWMgPSBuclxuXHRyZXR1cm4gaXRlbXNcblxuIyMjXG5UaGlzIGlzIHRoZSBiYXNlY2xhc3MgdGhhdCBhbGwgdGFncyBpbiBpbWJhIGluaGVyaXQgZnJvbS5cbkBpbmFtZSBub2RlXG4jIyNcbmNsYXNzIEltYmEuVGFnXG5cblx0ZGVmIHNlbGYuY3JlYXRlTm9kZVxuXHRcdHRocm93IFwiTm90IGltcGxlbWVudGVkXCJcblxuXHRkZWYgc2VsZi5idWlsZFxuXHRcdHNlbGYubmV3KHNlbGYuY3JlYXRlTm9kZSlcblxuXHRwcm9wIG9iamVjdFxuXG5cdGRlZiBkb21cblx0XHRAZG9tXG5cblx0ZGVmIGluaXRpYWxpemUgZG9tXG5cdFx0c2VsZi5kb20gPSBkb21cblx0XHRcblx0ZGVmIHNldERvbSBkb21cblx0XHRkb20uQHRhZyA9IHNlbGZcblx0XHRAZG9tID0gZG9tXG5cdFx0c2VsZlxuXG5cdCMjI1xuXHRTZXR0aW5nIHJlZmVyZW5jZXMgZm9yIHRhZ3MgbGlrZVxuXHRgPGRpdkBoZWFkZXI+YCB3aWxsIGNvbXBpbGUgdG8gYHRhZygnZGl2Jykuc2V0UmVmKCdoZWFkZXInLHRoaXMpLmVuZCgpYFxuXHRCeSBkZWZhdWx0IGl0IGFkZHMgdGhlIHJlZmVyZW5jZSBhcyBhIGNsYXNzTmFtZSB0byB0aGUgdGFnLlxuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIHNldFJlZiByZWYsIGN0eFxuXHRcdGZsYWcoQHJlZiA9IHJlZilcblx0XHRzZWxmXG5cblx0IyMjXG5cdE1ldGhvZCB0aGF0IGlzIGNhbGxlZCBieSB0aGUgY29tcGlsZWQgdGFnLWNoYWlucywgZm9yXG5cdGJpbmRpbmcgZXZlbnRzIG9uIHRhZ3MgdG8gbWV0aG9kcyBldGMuXG5cdGA8YSA6dGFwPWZuPmAgY29tcGlsZXMgdG8gYHRhZygnYScpLnNldEhhbmRsZXIoJ3RhcCcsZm4sdGhpcykuZW5kKClgXG5cdHdoZXJlIHRoaXMgcmVmZXJzIHRvIHRoZSBjb250ZXh0IGluIHdoaWNoIHRoZSB0YWcgaXMgY3JlYXRlZC5cblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBzZXRIYW5kbGVyIGV2ZW50LCBoYW5kbGVyLCBjdHhcblx0XHR2YXIga2V5ID0gJ29uJyArIGV2ZW50XG5cblx0XHRpZiBoYW5kbGVyIGlzYSBGdW5jdGlvblxuXHRcdFx0c2VsZltrZXldID0gaGFuZGxlclxuXHRcdGVsaWYgaGFuZGxlciBpc2EgQXJyYXlcblx0XHRcdHZhciBmbiA9IGhhbmRsZXIuc2hpZnRcblx0XHRcdHNlbGZba2V5XSA9IGRvIHxlfCBjdHhbZm5dLmFwcGx5KGN0eCxoYW5kbGVyLmNvbmNhdChlKSlcblx0XHRlbHNlXG5cdFx0XHRzZWxmW2tleV0gPSBkbyB8ZXwgY3R4W2hhbmRsZXJdKGUpXG5cdFx0c2VsZlxuXG5cdGRlZiBpZD0gaWRcblx0XHRkb206aWQgPSBpZFxuXHRcdHNlbGZcblxuXHRkZWYgaWRcblx0XHRkb206aWRcblxuXHQjIyNcblx0QWRkcyBhIG5ldyBhdHRyaWJ1dGUgb3IgY2hhbmdlcyB0aGUgdmFsdWUgb2YgYW4gZXhpc3RpbmcgYXR0cmlidXRlXG5cdG9uIHRoZSBzcGVjaWZpZWQgdGFnLiBJZiB0aGUgdmFsdWUgaXMgbnVsbCBvciBmYWxzZSwgdGhlIGF0dHJpYnV0ZVxuXHR3aWxsIGJlIHJlbW92ZWQuXG5cdEByZXR1cm4ge3NlbGZ9XG5cdCMjI1xuXHRkZWYgc2V0QXR0cmlidXRlIG5hbWUsIHZhbHVlXG5cdFx0IyBzaG91bGQgdGhpcyBub3QgcmV0dXJuIHNlbGY/XG5cdFx0dmFyIG9sZCA9IGRvbS5nZXRBdHRyaWJ1dGUobmFtZSlcblxuXHRcdGlmIG9sZCA9PSB2YWx1ZVxuXHRcdFx0dmFsdWVcblx0XHRlbGlmIHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09IGZhbHNlXG5cdFx0XHRkb20uc2V0QXR0cmlidXRlKG5hbWUsdmFsdWUpXG5cdFx0ZWxzZVxuXHRcdFx0ZG9tLnJlbW92ZUF0dHJpYnV0ZShuYW1lKVxuXG5cdCMjI1xuXHRyZW1vdmVzIGFuIGF0dHJpYnV0ZSBmcm9tIHRoZSBzcGVjaWZpZWQgdGFnXG5cdCMjI1xuXHRkZWYgcmVtb3ZlQXR0cmlidXRlIG5hbWVcblx0XHRkb20ucmVtb3ZlQXR0cmlidXRlKG5hbWUpXG5cblx0IyMjXG5cdHJldHVybnMgdGhlIHZhbHVlIG9mIGFuIGF0dHJpYnV0ZSBvbiB0aGUgdGFnLlxuXHRJZiB0aGUgZ2l2ZW4gYXR0cmlidXRlIGRvZXMgbm90IGV4aXN0LCB0aGUgdmFsdWUgcmV0dXJuZWRcblx0d2lsbCBlaXRoZXIgYmUgbnVsbCBvciBcIlwiICh0aGUgZW1wdHkgc3RyaW5nKVxuXHQjIyNcblx0ZGVmIGdldEF0dHJpYnV0ZSBuYW1lXG5cdFx0ZG9tLmdldEF0dHJpYnV0ZShuYW1lKVxuXG5cdCMjI1xuXHRPdmVycmlkZSB0aGlzIHRvIHByb3ZpZGUgc3BlY2lhbCB3cmFwcGluZyBldGMuXG5cdEByZXR1cm4ge3NlbGZ9XG5cdCMjI1xuXHRkZWYgc2V0Q29udGVudCBjb250ZW50LCB0eXBlXG5cdFx0c2V0Q2hpbGRyZW4gY29udGVudCwgdHlwZVxuXHRcdHNlbGZcblxuXHQjIyNcblx0U2V0IHRoZSBjaGlsZHJlbiBvZiBub2RlLiB0eXBlIHBhcmFtIGlzIG9wdGlvbmFsLFxuXHRhbmQgc2hvdWxkIG9ubHkgYmUgdXNlZCBieSBJbWJhIHdoZW4gY29tcGlsaW5nIHRhZyB0cmVlcy4gXG5cdEByZXR1cm4ge3NlbGZ9XG5cdCMjI1xuXHRkZWYgc2V0Q2hpbGRyZW4gbm9kZXMsIHR5cGVcblx0XHR0aHJvdyBcIk5vdCBpbXBsZW1lbnRlZFwiXG5cblx0IyMjXG5cdEdldCB0ZXh0IG9mIG5vZGUuIFVzZXMgdGV4dENvbnRlbnQgYmVoaW5kIHRoZSBzY2VuZXMgKG5vdCBpbm5lclRleHQpXG5cdFtodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTm9kZS90ZXh0Q29udGVudF0oKVxuXHRAcmV0dXJuIHtzdHJpbmd9IGlubmVyIHRleHQgb2Ygbm9kZVxuXHQjIyNcblx0ZGVmIHRleHQgdlxuXHRcdEBkb206dGV4dENvbnRlbnRcblxuXHQjIyNcblx0U2V0IHRleHQgb2Ygbm9kZS4gVXNlcyB0ZXh0Q29udGVudCBiZWhpbmQgdGhlIHNjZW5lcyAobm90IGlubmVyVGV4dClcblx0W2h0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob2RlL3RleHRDb250ZW50XSgpXG5cdCMjI1xuXHRkZWYgdGV4dD0gdHh0XG5cdFx0QGVtcHR5ID0gbm9cblx0XHRAZG9tOnRleHRDb250ZW50ID0gdHh0ID89IFwiXCJcblx0XHRzZWxmXG5cblxuXHQjIyNcblx0TWV0aG9kIGZvciBnZXR0aW5nIGFuZCBzZXR0aW5nIGRhdGEtYXR0cmlidXRlcy4gV2hlbiBjYWxsZWQgd2l0aCB6ZXJvXG5cdGFyZ3VtZW50cyBpdCB3aWxsIHJldHVybiB0aGUgYWN0dWFsIGRhdGFzZXQgZm9yIHRoZSB0YWcuXG5cblx0XHR2YXIgbm9kZSA9IDxkaXYgZGF0YS1uYW1lPSdoZWxsbyc+XG5cdFx0IyBnZXQgdGhlIHdob2xlIGRhdGFzZXRcblx0XHRub2RlLmRhdGFzZXQgIyB7bmFtZTogJ2hlbGxvJ31cblx0XHQjIGdldCBhIHNpbmdsZSB2YWx1ZVxuXHRcdG5vZGUuZGF0YXNldCgnbmFtZScpICMgJ2hlbGxvJ1xuXHRcdCMgc2V0IGEgc2luZ2xlIHZhbHVlXG5cdFx0bm9kZS5kYXRhc2V0KCduYW1lJywnbmV3bmFtZScpICMgc2VsZlxuXG5cblx0IyMjXG5cdGRlZiBkYXRhc2V0IGtleSwgdmFsXG5cdFx0dGhyb3cgXCJOb3QgaW1wbGVtZW50ZWRcIlxuXG5cdCMjI1xuXHRFbXB0eSBwbGFjZWhvbGRlci4gT3ZlcnJpZGUgdG8gaW1wbGVtZW50IGN1c3RvbSByZW5kZXIgYmVoYXZpb3VyLlxuXHRXb3JrcyBtdWNoIGxpa2UgdGhlIGZhbWlsaWFyIHJlbmRlci1tZXRob2QgaW4gUmVhY3QuXG5cdEByZXR1cm4ge3NlbGZ9XG5cdCMjI1xuXHRkZWYgcmVuZGVyXG5cdFx0c2VsZlxuXG5cdCMjI1xuXHRDYWxsZWQgaW1wbGljaXRseSB0aHJvdWdoIEltYmEuVGFnI2VuZCwgdXBvbiBjcmVhdGluZyBhIHRhZy4gQWxsXG5cdHByb3BlcnRpZXMgd2lsbCBoYXZlIGJlZW4gc2V0IGJlZm9yZSBidWlsZCBpcyBjYWxsZWQsIGluY2x1ZGluZ1xuXHRzZXRDb250ZW50LlxuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIGJ1aWxkXG5cdFx0cmVuZGVyXG5cdFx0c2VsZlxuXG5cdCMjI1xuXHRDYWxsZWQgaW1wbGljaXRseSB0aHJvdWdoIEltYmEuVGFnI2VuZCwgZm9yIHRhZ3MgdGhhdCBhcmUgcGFydCBvZlxuXHRhIHRhZyB0cmVlICh0aGF0IGFyZSByZW5kZXJlZCBzZXZlcmFsIHRpbWVzKS5cblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBjb21taXRcblx0XHRyZW5kZXJcblx0XHRzZWxmXG5cblx0IyMjXG5cblx0Q2FsbGVkIGJ5IHRoZSB0YWctc2NoZWR1bGVyIChpZiB0aGlzIHRhZyBpcyBzY2hlZHVsZWQpXG5cdEJ5IGRlZmF1bHQgaXQgd2lsbCBjYWxsIHRoaXMucmVuZGVyLiBEbyBub3Qgb3ZlcnJpZGUgdW5sZXNzXG5cdHlvdSByZWFsbHkgdW5kZXJzdGFuZCBpdC5cblxuXHQjIyNcblx0ZGVmIHRpY2tcblx0XHRyZW5kZXJcblx0XHRzZWxmXG5cblx0IyMjXG5cdFxuXHRBIHZlcnkgaW1wb3J0YW50IG1ldGhvZCB0aGF0IHlvdSB3aWxsIHByYWN0aWNhbGx5IG5ldmVyIG1hbnVhbGx5LlxuXHRUaGUgdGFnIHN5bnRheCBvZiBJbWJhIGNvbXBpbGVzIHRvIGEgY2hhaW4gb2Ygc2V0dGVycywgd2hpY2ggYWx3YXlzXG5cdGVuZHMgd2l0aCAuZW5kLiBgPGEubGFyZ2U+YCBjb21waWxlcyB0byBgdGFnKCdhJykuZmxhZygnbGFyZ2UnKS5lbmQoKWBcblx0XG5cdFlvdSBhcmUgaGlnaGx5IGFkdmljZWQgdG8gbm90IG92ZXJyaWRlIGl0cyBiZWhhdmlvdXIuIFRoZSBmaXJzdCB0aW1lXG5cdGVuZCBpcyBjYWxsZWQgaXQgd2lsbCBtYXJrIHRoZSB0YWcgYXMgYnVpbHQgYW5kIGNhbGwgSW1iYS5UYWcjYnVpbGQsXG5cdGFuZCBjYWxsIEltYmEuVGFnI2NvbW1pdCBvbiBzdWJzZXF1ZW50IGNhbGxzLlxuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIGVuZFxuXHRcdGlmIEBidWlsdFxuXHRcdFx0Y29tbWl0XG5cdFx0ZWxzZVxuXHRcdFx0QGJ1aWx0ID0geWVzXG5cdFx0XHRidWlsZFxuXHRcdHNlbGZcblxuXHQjIyNcblx0VGhpcyBpcyBjYWxsZWQgaW5zdGVhZCBvZiBJbWJhLlRhZyNlbmQgZm9yIGA8c2VsZj5gIHRhZyBjaGFpbnMuXG5cdERlZmF1bHRzIHRvIG5vb3Bcblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBzeW5jZWRcblx0XHRzZWxmXG5cblx0IyBjYWxsZWQgd2hlbiB0aGUgbm9kZSBpcyBhd2FrZW5lZCBpbiB0aGUgZG9tIC0gZWl0aGVyIGF1dG9tYXRpY2FsbHlcblx0IyB1cG9uIGF0dGFjaG1lbnQgdG8gdGhlIGRvbS10cmVlLCBvciB0aGUgZmlyc3QgdGltZSBpbWJhIG5lZWRzIHRoZVxuXHQjIHRhZyBmb3IgYSBkb21ub2RlIHRoYXQgaGFzIGJlZW4gcmVuZGVyZWQgb24gdGhlIHNlcnZlclxuXHRkZWYgYXdha2VuXG5cdFx0c2VsZlxuXG5cdCMjI1xuXHRMaXN0IG9mIGZsYWdzIGZvciB0aGlzIG5vZGUuIFxuXHQjIyNcblx0ZGVmIGZsYWdzXG5cdFx0QGRvbTpjbGFzc0xpc3RcblxuXHQjIyNcblx0QWRkIHNwZWZpY2llZCBmbGFnIHRvIGN1cnJlbnQgbm9kZS5cblx0SWYgYSBzZWNvbmQgYXJndW1lbnQgaXMgc3VwcGxpZWQsIGl0IHdpbGwgYmUgY29lcmNlZCBpbnRvIGEgQm9vbGVhbixcblx0YW5kIHVzZWQgdG8gaW5kaWNhdGUgd2hldGhlciB3ZSBzaG91bGQgcmVtb3ZlIHRoZSBmbGFnIGluc3RlYWQuXG5cdEByZXR1cm4ge3NlbGZ9XG5cdCMjI1xuXHRkZWYgZmxhZyBuYW1lLCB0b2dnbGVyXG5cdFx0IyBpdCBpcyBtb3N0IG5hdHVyYWwgdG8gdHJlYXQgYSBzZWNvbmQgdW5kZWZpbmVkIGFyZ3VtZW50IGFzIGEgbm8tc3dpdGNoXG5cdFx0IyBzbyB3ZSBuZWVkIHRvIGNoZWNrIHRoZSBhcmd1bWVudHMtbGVuZ3RoXG5cdFx0aWYgYXJndW1lbnRzOmxlbmd0aCA9PSAyIGFuZCAhdG9nZ2xlclxuXHRcdFx0QGRvbTpjbGFzc0xpc3QucmVtb3ZlKG5hbWUpXG5cdFx0ZWxzZVxuXHRcdFx0QGRvbTpjbGFzc0xpc3QuYWRkKG5hbWUpXG5cdFx0cmV0dXJuIHNlbGZcblxuXHQjIyNcblx0UmVtb3ZlIHNwZWNpZmllZCBmbGFnIGZyb20gbm9kZVxuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIHVuZmxhZyBuYW1lXG5cdFx0QGRvbTpjbGFzc0xpc3QucmVtb3ZlKG5hbWUpXG5cdFx0c2VsZlxuXG5cdCMjI1xuXHRUb2dnbGUgc3BlY2lmaWVkIGZsYWcgb24gbm9kZVxuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIHRvZ2dsZUZsYWcgbmFtZVxuXHRcdEBkb206Y2xhc3NMaXN0LnRvZ2dsZShuYW1lKVxuXHRcdHNlbGZcblxuXHQjIyNcblx0Q2hlY2sgd2hldGhlciBjdXJyZW50IG5vZGUgaGFzIHNwZWNpZmllZCBmbGFnXG5cdEByZXR1cm4ge2Jvb2x9XG5cdCMjI1xuXHRkZWYgaGFzRmxhZyBuYW1lXG5cdFx0QGRvbTpjbGFzc0xpc3QuY29udGFpbnMobmFtZSlcblxuXHQjIyNcblx0R2V0IHRoZSBzY2hlZHVsZXIgZm9yIHRoaXMgbm9kZS4gQSBuZXcgc2NoZWR1bGVyIHdpbGwgYmUgY3JlYXRlZFxuXHRpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0LlxuXG5cdEByZXR1cm4ge0ltYmEuU2NoZWR1bGVyfVxuXHQjIyNcblx0ZGVmIHNjaGVkdWxlclxuXHRcdEBzY2hlZHVsZXIgPz0gSW1iYS5TY2hlZHVsZXIubmV3KHNlbGYpXG5cblx0IyMjXG5cblx0U2hvcnRoYW5kIHRvIHN0YXJ0IHNjaGVkdWxpbmcgYSBub2RlLiBUaGUgbWV0aG9kIHdpbGwgYmFzaWNhbGx5XG5cdHByb3h5IHRoZSBhcmd1bWVudHMgdGhyb3VnaCB0byBzY2hlZHVsZXIuY29uZmlndXJlLCBhbmQgdGhlblxuXHRhY3RpdmF0ZSB0aGUgc2NoZWR1bGVyLlxuXHRcblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBzY2hlZHVsZSBvcHRpb25zID0ge31cblx0XHRzY2hlZHVsZXIuY29uZmlndXJlKG9wdGlvbnMpLmFjdGl2YXRlXG5cdFx0c2VsZlxuXG5cdCMjI1xuXHRTaG9ydGhhbmQgZm9yIGRlYWN0aXZhdGluZyBzY2hlZHVsZXIgKGlmIHRhZyBoYXMgb25lKS5cblx0QGRlcHJlY2F0ZWRcblx0IyMjXG5cdGRlZiB1bnNjaGVkdWxlXG5cdFx0c2NoZWR1bGVyLmRlYWN0aXZhdGUgaWYgQHNjaGVkdWxlclxuXHRcdHNlbGZcblxuXG5cdCMjI1xuXHRHZXQgdGhlIHBhcmVudCBvZiBjdXJyZW50IG5vZGVcblx0QHJldHVybiB7SW1iYS5UYWd9IFxuXHQjIyNcblx0ZGVmIHBhcmVudFxuXHRcdHRhZyhkb206cGFyZW50Tm9kZSlcblxuXHQjIyNcblx0U2hvcnRoYW5kIGZvciBjb25zb2xlLmxvZyBvbiBlbGVtZW50c1xuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIGxvZyAqYXJnc1xuXHRcdGFyZ3MudW5zaGlmdChjb25zb2xlKVxuXHRcdEZ1bmN0aW9uOnByb3RvdHlwZTpjYWxsLmFwcGx5KGNvbnNvbGU6bG9nLCBhcmdzKVxuXHRcdHNlbGZcblxuXHRkZWYgY3NzIGtleSwgdmFsXG5cdFx0aWYga2V5IGlzYSBPYmplY3Rcblx0XHRcdGNzcyhrLHYpIGZvciBvd24gayx2IG9mIGtleVxuXHRcdGVsaWYgdmFsID09IG51bGxcblx0XHRcdGRvbTpzdHlsZS5yZW1vdmVQcm9wZXJ0eShrZXkpXG5cdFx0ZWxpZiB2YWwgPT0gdW5kZWZpbmVkXG5cdFx0XHRyZXR1cm4gZG9tOnN0eWxlW2tleV1cblx0XHRlbHNlXG5cdFx0XHRpZiB2YWwgaXNhIE51bWJlciBhbmQga2V5Lm1hdGNoKC93aWR0aHxoZWlnaHR8bGVmdHxyaWdodHx0b3B8Ym90dG9tLylcblx0XHRcdFx0dmFsID0gdmFsICsgXCJweFwiXG5cdFx0XHRkb206c3R5bGVba2V5XSA9IHZhbFxuXHRcdHNlbGZcblxuXHRkZWYgdHJhbnNmb3JtPSB2YWx1ZVxuXHRcdGNzcyg6dHJhbnNmb3JtLCB2YWx1ZSlcblx0XHRzZWxmXG5cblx0ZGVmIHRyYW5zZm9ybVxuXHRcdGNzcyg6dHJhbnNmb3JtKVxuXG5cbkltYmEuVGFnOnByb3RvdHlwZTppbml0aWFsaXplID0gSW1iYS5UYWdcblxuSFRNTF9UQUdTID0gXCJhIGFiYnIgYWRkcmVzcyBhcmVhIGFydGljbGUgYXNpZGUgYXVkaW8gYiBiYXNlIGJkaSBiZG8gYmlnIGJsb2NrcXVvdGUgYm9keSBiciBidXR0b24gY2FudmFzIGNhcHRpb24gY2l0ZSBjb2RlIGNvbCBjb2xncm91cCBkYXRhIGRhdGFsaXN0IGRkIGRlbCBkZXRhaWxzIGRmbiBkaXYgZGwgZHQgZW0gZW1iZWQgZmllbGRzZXQgZmlnY2FwdGlvbiBmaWd1cmUgZm9vdGVyIGZvcm0gaDEgaDIgaDMgaDQgaDUgaDYgaGVhZCBoZWFkZXIgaHIgaHRtbCBpIGlmcmFtZSBpbWcgaW5wdXQgaW5zIGtiZCBrZXlnZW4gbGFiZWwgbGVnZW5kIGxpIGxpbmsgbWFpbiBtYXAgbWFyayBtZW51IG1lbnVpdGVtIG1ldGEgbWV0ZXIgbmF2IG5vc2NyaXB0IG9iamVjdCBvbCBvcHRncm91cCBvcHRpb24gb3V0cHV0IHAgcGFyYW0gcHJlIHByb2dyZXNzIHEgcnAgcnQgcnVieSBzIHNhbXAgc2NyaXB0IHNlY3Rpb24gc2VsZWN0IHNtYWxsIHNvdXJjZSBzcGFuIHN0cm9uZyBzdHlsZSBzdWIgc3VtbWFyeSBzdXAgdGFibGUgdGJvZHkgdGQgdGV4dGFyZWEgdGZvb3QgdGggdGhlYWQgdGltZSB0aXRsZSB0ciB0cmFjayB1IHVsIHZhciB2aWRlbyB3YnJcIi5zcGxpdChcIiBcIilcbkhUTUxfVEFHU19VTlNBRkUgPSBcImFydGljbGUgYXNpZGUgaGVhZGVyIHNlY3Rpb25cIi5zcGxpdChcIiBcIilcblNWR19UQUdTID0gXCJjaXJjbGUgZGVmcyBlbGxpcHNlIGcgbGluZSBsaW5lYXJHcmFkaWVudCBtYXNrIHBhdGggcGF0dGVybiBwb2x5Z29uIHBvbHlsaW5lIHJhZGlhbEdyYWRpZW50IHJlY3Qgc3RvcCBzdmcgdGV4dCB0c3BhblwiLnNwbGl0KFwiIFwiKVxuXG5cbmRlZiBleHRlbmRlciBvYmosIHN1cFxuXHRmb3Igb3duIGssdiBvZiBzdXBcblx0XHRvYmpba10gPz0gdlxuXG5cdG9iajpwcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cDpwcm90b3R5cGUpXG5cdG9iajpfX3N1cGVyX18gPSBvYmo6cHJvdG90eXBlOl9fc3VwZXJfXyA9IHN1cDpwcm90b3R5cGVcblx0b2JqOnByb3RvdHlwZTppbml0aWFsaXplID0gb2JqOnByb3RvdHlwZTpjb25zdHJ1Y3RvciA9IG9ialxuXHRzdXAuaW5oZXJpdChvYmopIGlmIHN1cDppbmhlcml0XG5cdHJldHVybiBvYmpcblxuZGVmIFRhZ1xuXHRyZXR1cm4gZG8gfGRvbXxcblx0XHR0aGlzLnNldERvbShkb20pXG5cdFx0cmV0dXJuIHRoaXNcblxuZGVmIFRhZ1NwYXduZXIgdHlwZVxuXHRyZXR1cm4gZG8gdHlwZS5idWlsZFxuXG5jbGFzcyBJbWJhLlRhZ3NcblxuXHRkZWYgaW5pdGlhbGl6ZVxuXHRcdHNlbGZcblxuXHRkZWYgX19jbG9uZSBuc1xuXHRcdHZhciBjbG9uZSA9IE9iamVjdC5jcmVhdGUoc2VsZilcblx0XHRjbG9uZS5AcGFyZW50ID0gc2VsZlxuXHRcdHJldHVybiBjbG9uZVxuXG5cdGRlZiBkZWZpbmVOYW1lc3BhY2UgbmFtZVxuXHRcdHZhciBjbG9uZSA9IE9iamVjdC5jcmVhdGUoc2VsZilcblx0XHRjbG9uZS5AcGFyZW50ID0gc2VsZlxuXHRcdGNsb25lLkBucyA9IG5hbWVcblx0XHRzZWxmW25hbWUudG9VcHBlckNhc2VdID0gY2xvbmVcblx0XHRyZXR1cm4gY2xvbmVcblxuXHRkZWYgYmFzZVR5cGUgbmFtZVxuXHRcdG5hbWUgaW4gSFRNTF9UQUdTID8gJ2h0bWxlbGVtZW50JyA6ICdkaXYnXG5cblx0ZGVmIGRlZmluZVRhZyBuYW1lLCBzdXByID0gJycsICZib2R5XG5cdFx0c3VwciB8fD0gYmFzZVR5cGUobmFtZSlcblx0XHRsZXQgc3VwZXJ0eXBlID0gc2VsZltzdXByXVxuXHRcdGxldCB0YWd0eXBlID0gVGFnKClcblx0XHRsZXQgbm9ybSA9IG5hbWUucmVwbGFjZSgvXFwtL2csJ18nKVxuXG5cblx0XHR0YWd0eXBlLkBuYW1lID0gbmFtZVxuXHRcdGV4dGVuZGVyKHRhZ3R5cGUsc3VwZXJ0eXBlKVxuXG5cdFx0aWYgbmFtZVswXSA9PSAnIydcblx0XHRcdHNlbGZbbmFtZV0gPSB0YWd0eXBlXG5cdFx0XHRJbWJhLlNJTkdMRVRPTlNbbmFtZS5zbGljZSgxKV0gPSB0YWd0eXBlXG5cdFx0ZWxzZVxuXHRcdFx0c2VsZltuYW1lXSA9IHRhZ3R5cGVcblx0XHRcdHNlbGZbJyQnK25vcm1dID0gVGFnU3Bhd25lcih0YWd0eXBlKVxuXG5cdFx0aWYgYm9keVxuXHRcdFx0aWYgYm9keTpsZW5ndGggPT0gMlxuXHRcdFx0XHQjIGNyZWF0ZSBjbG9uZVxuXHRcdFx0XHR1bmxlc3MgdGFndHlwZS5oYXNPd25Qcm9wZXJ0eSgnVEFHUycpXG5cdFx0XHRcdFx0dGFndHlwZS5UQUdTID0gKHN1cGVydHlwZS5UQUdTIG9yIHNlbGYpLl9fY2xvbmVcblxuXHRcdFx0Ym9keS5jYWxsKHRhZ3R5cGUsdGFndHlwZSwgdGFndHlwZS5UQUdTIG9yIHNlbGYpXG5cblx0XHRyZXR1cm4gdGFndHlwZVxuXG5cdGRlZiBkZWZpbmVTaW5nbGV0b24gbmFtZSwgc3VwciwgJmJvZHlcblx0XHRkZWZpbmVUYWcobmFtZSxzdXByLGJvZHkpXG5cblx0ZGVmIGV4dGVuZFRhZyBuYW1lLCBzdXByID0gJycsICZib2R5XG5cdFx0dmFyIGtsYXNzID0gKG5hbWUgaXNhIFN0cmluZyA/IHNlbGZbbmFtZV0gOiBuYW1lKVxuXHRcdCMgYWxsb3cgZm9yIHByaXZhdGUgdGFncyBoZXJlIGFzIHdlbGw/XG5cdFx0Ym9keSBhbmQgYm9keS5jYWxsKGtsYXNzLGtsYXNzLGtsYXNzOnByb3RvdHlwZSkgaWYgYm9keVxuXHRcdHJldHVybiBrbGFzc1xuXG5cbkltYmEuVEFHUyA9IEltYmEuVGFncy5uZXdcbkltYmEuVEFHU1s6ZWxlbWVudF0gPSBJbWJhLlRhZ1xuXG52YXIgc3ZnID0gSW1iYS5UQUdTLmRlZmluZU5hbWVzcGFjZSgnc3ZnJylcblxuZGVmIHN2Zy5iYXNlVHlwZSBuYW1lXG5cdCdzdmdlbGVtZW50J1xuXG5cbkltYmEuU0lOR0xFVE9OUyA9IHt9XG5cblxuZGVmIEltYmEuZGVmaW5lVGFnIG5hbWUsIHN1cHIgPSAnJywgJmJvZHlcblx0cmV0dXJuIEltYmEuVEFHUy5kZWZpbmVUYWcobmFtZSxzdXByLGJvZHkpXG5cbmRlZiBJbWJhLmRlZmluZVNpbmdsZXRvblRhZyBpZCwgc3VwciA9ICdkaXYnLCAmYm9keVxuXHRyZXR1cm4gSW1iYS5UQUdTLmRlZmluZVRhZyhuYW1lLHN1cHIsYm9keSlcblxuZGVmIEltYmEuZXh0ZW5kVGFnIG5hbWUsIGJvZHlcblx0cmV0dXJuIEltYmEuVEFHUy5leHRlbmRUYWcobmFtZSxib2R5KVxuXG5kZWYgSW1iYS50YWcgbmFtZVxuXHR2YXIgdHlwID0gSW1iYS5UQUdTW25hbWVdXG5cdHRocm93IEVycm9yLm5ldyhcInRhZyB7bmFtZX0gaXMgbm90IGRlZmluZWRcIikgaWYgIXR5cFxuXHRyZXR1cm4gdHlwLm5ldyh0eXAuY3JlYXRlTm9kZSlcblxuZGVmIEltYmEudGFnV2l0aElkIG5hbWUsIGlkXG5cdHZhciB0eXAgPSBJbWJhLlRBR1NbbmFtZV1cblx0dGhyb3cgRXJyb3IubmV3KFwidGFnIHtuYW1lfSBpcyBub3QgZGVmaW5lZFwiKSBpZiAhdHlwXG5cdHZhciBkb20gPSB0eXAuY3JlYXRlTm9kZVxuXHRkb206aWQgPSBpZFxuXHRyZXR1cm4gdHlwLm5ldyhkb20pXG5cbiMgVE9ETzogQ2FuIHdlIG1vdmUgdGhlc2Ugb3V0IGFuZCBpbnRvIGRvbS5pbWJhIGluIGEgY2xlYW4gd2F5P1xuIyBUaGVzZSBtZXRob2RzIGRlcGVuZHMgb24gSW1iYS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZFxuXG5kZWYgSW1iYS5nZXRUYWdTaW5nbGV0b24gaWRcdFxuXHR2YXIgZG9tLCBub2RlXG5cblx0aWYgdmFyIGtsYXNzID0gSW1iYS5TSU5HTEVUT05TW2lkXVxuXHRcdHJldHVybiBrbGFzcy5JbnN0YW5jZSBpZiBrbGFzcyBhbmQga2xhc3MuSW5zdGFuY2UgXG5cblx0XHQjIG5vIGluc3RhbmNlIC0gY2hlY2sgZm9yIGVsZW1lbnRcblx0XHRpZiBkb20gPSBJbWJhLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKVxuXHRcdFx0IyB3ZSBoYXZlIGEgbGl2ZSBpbnN0YW5jZSAtIHdoZW4gZmluZGluZyBpdCB0aHJvdWdoIGEgc2VsZWN0b3Igd2Ugc2hvdWxkIGF3YWtlIGl0LCBubz9cblx0XHRcdCMgY29uc29sZS5sb2coJ2NyZWF0aW5nIHRoZSBzaW5nbGV0b24gZnJvbSBleGlzdGluZyBub2RlIGluIGRvbT8nLGlkLHR5cGUpXG5cdFx0XHRub2RlID0ga2xhc3MuSW5zdGFuY2UgPSBrbGFzcy5uZXcoZG9tKVxuXHRcdFx0bm9kZS5hd2FrZW4oZG9tKSAjIHNob3VsZCBvbmx5IGF3YWtlblxuXHRcdFx0cmV0dXJuIG5vZGVcblxuXHRcdGRvbSA9IGtsYXNzLmNyZWF0ZU5vZGVcblx0XHRkb206aWQgPSBpZFxuXHRcdG5vZGUgPSBrbGFzcy5JbnN0YW5jZSA9IGtsYXNzLm5ldyhkb20pXG5cdFx0bm9kZS5lbmQuYXdha2VuKGRvbSlcblx0XHRyZXR1cm4gbm9kZVxuXHRlbGlmIGRvbSA9IEltYmEuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG5cdFx0cmV0dXJuIEltYmEuZ2V0VGFnRm9yRG9tKGRvbSlcblxudmFyIHN2Z1N1cHBvcnQgPSB0eXBlb2YgU1ZHRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuZGVmIEltYmEuZ2V0VGFnRm9yRG9tIGRvbVxuXHRyZXR1cm4gbnVsbCB1bmxlc3MgZG9tXG5cdHJldHVybiBkb20gaWYgZG9tLkBkb20gIyBjb3VsZCB1c2UgaW5oZXJpdGFuY2UgaW5zdGVhZFxuXHRyZXR1cm4gZG9tLkB0YWcgaWYgZG9tLkB0YWdcblx0cmV0dXJuIG51bGwgdW5sZXNzIGRvbTpub2RlTmFtZVxuXG5cdHZhciBucyAgID0gbnVsbFxuXHR2YXIgaWQgICA9IGRvbTppZFxuXHR2YXIgdHlwZSA9IGRvbTpub2RlTmFtZS50b0xvd2VyQ2FzZVxuXHR2YXIgdGFncyA9IEltYmEuVEFHU1xuXHR2YXIgbmF0aXZlID0gdHlwZVxuXHR2YXIgY2xzICA9IGRvbTpjbGFzc05hbWVcblxuXHRpZiBpZCBhbmQgSW1iYS5TSU5HTEVUT05TW2lkXVxuXHRcdCMgRklYTUUgY29udHJvbCB0aGF0IGl0IGlzIHRoZSBzYW1lIHNpbmdsZXRvbj9cblx0XHQjIG1pZ2h0IGNvbGxpZGUgLS0gbm90IGdvb2Q/XG5cdFx0cmV0dXJuIEltYmEuZ2V0VGFnU2luZ2xldG9uKGlkKVxuXHQjIGxvb2sgZm9yIGlkIC0gc2luZ2xldG9uXG5cblx0IyBuZWVkIGJldHRlciB0ZXN0IGhlcmVcblx0aWYgc3ZnU3VwcG9ydCBhbmQgZG9tIGlzYSBTVkdFbGVtZW50XG5cdFx0bnMgPSBcInN2Z1wiIFxuXHRcdGNscyA9IGRvbTpjbGFzc05hbWU6YmFzZVZhbFxuXHRcdHRhZ3MgPSB0YWdzLlNWR1xuXG5cdHZhciBzcGF3bmVyXG5cblx0aWYgY2xzXG5cdFx0IyB0aGVyZSBjYW4gYmUgc2V2ZXJhbCBtYXRjaGVzIGhlcmUgLSBzaG91bGQgY2hvb3NlIHRoZSBsYXN0XG5cdFx0IyBzaG91bGQgZmFsbCBiYWNrIHRvIGxlc3Mgc3BlY2lmaWMgbGF0ZXI/IC0gb3RoZXJ3aXNlIHRoaW5ncyBtYXkgZmFpbFxuXHRcdCMgVE9ETyByZXdvcmsgdGhpc1xuXHRcdGlmIHZhciBtID0gY2xzLm1hdGNoKC9cXGJfKFthLXpcXC1dKylcXGIoPyFcXHMqX1thLXpcXC1dKykvKVxuXHRcdFx0dHlwZSA9IG1bMV0gIyAucmVwbGFjZSgvLS9nLCdfJylcblxuXHRcdGlmIG0gPSBjbHMubWF0Y2goL1xcYihbQS1aXFwtXSspX1xcYi8pXG5cdFx0XHRucyA9IG1bMV1cblxuXG5cdHNwYXduZXIgPSB0YWdzW3R5cGVdIG9yIHRhZ3NbbmF0aXZlXVxuXHRzcGF3bmVyID8gc3Bhd25lci5uZXcoZG9tKS5hd2FrZW4oZG9tKSA6IG51bGxcblxudGFnJCA9IEltYmEuVEFHU1xudCQgPSBJbWJhOnRhZ1xudGMkID0gSW1iYTp0YWdXaXRoRmxhZ3NcbnRpJCA9IEltYmE6dGFnV2l0aElkXG50aWMkID0gSW1iYTp0YWdXaXRoSWRBbmRGbGFnc1xuaWQkID0gSW1iYTpnZXRUYWdTaW5nbGV0b25cbnRhZyR3cmFwID0gSW1iYTpnZXRUYWdGb3JEb21cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbm9kZV9tb2R1bGVzL2ltYmEvc3JjL2ltYmEvdGFnLmltYmFcbiAqKi8iLCJcbmRlZiBJbWJhLmRvY3VtZW50XG5cdHdpbmRvdzpkb2N1bWVudFxuXG4jIyNcblJldHVybnMgdGhlIGJvZHkgZWxlbWVudCB3cmFwcGVkIGluIGFuIEltYmEuVGFnXG4jIyNcbmRlZiBJbWJhLnJvb3Rcblx0dGFnKEltYmEuZG9jdW1lbnQ6Ym9keSlcblxudGFnIGh0bWxlbGVtZW50IDwgZWxlbWVudFxuXG5cdCMjI1xuXHRDYWxsZWQgd2hlbiBhIHRhZyB0eXBlIGlzIGJlaW5nIHN1YmNsYXNzZWQuXG5cdCMjI1xuXHRkZWYgc2VsZi5pbmhlcml0IGNoaWxkXG5cdFx0Y2hpbGQ6cHJvdG90eXBlLkBlbXB0eSA9IHllc1xuXHRcdGNoaWxkLkBwcm90b0RvbSA9IG51bGxcblxuXHRcdGlmIEBub2RlVHlwZVxuXHRcdFx0Y2hpbGQuQG5vZGVUeXBlID0gQG5vZGVUeXBlXG5cblx0XHRcdHZhciBjbGFzc05hbWUgPSBcIl9cIiArIGNoaWxkLkBuYW1lLnJlcGxhY2UoL18vZywgJy0nKVxuXHRcdFx0Y2hpbGQuQGNsYXNzZXMgPSBAY2xhc3Nlcy5jb25jYXQoY2xhc3NOYW1lKSB1bmxlc3MgY2hpbGQuQG5hbWVbMF0gPT0gJyMnXG5cdFx0ZWxzZVxuXHRcdFx0Y2hpbGQuQG5vZGVUeXBlID0gY2hpbGQuQG5hbWVcblx0XHRcdGNoaWxkLkBjbGFzc2VzID0gW11cblxuXHRkZWYgc2VsZi5idWlsZE5vZGVcblx0XHR2YXIgZG9tID0gSW1iYS5kb2N1bWVudC5jcmVhdGVFbGVtZW50KEBub2RlVHlwZSlcblx0XHR2YXIgY2xzID0gQGNsYXNzZXMuam9pbihcIiBcIilcblx0XHRkb206Y2xhc3NOYW1lID0gY2xzIGlmIGNsc1xuXHRcdGRvbVxuXG5cdGRlZiBzZWxmLmNyZWF0ZU5vZGVcblx0XHR2YXIgcHJvdG8gPSAoQHByb3RvRG9tIHx8PSBidWlsZE5vZGUpXG5cdFx0cHJvdG8uY2xvbmVOb2RlKGZhbHNlKVxuXG5cdGRlZiBzZWxmLmRvbVxuXHRcdEBwcm90b0RvbSB8fD0gYnVpbGROb2RlXG5cblx0YXR0ciBpZFxuXHRhdHRyIHRhYmluZGV4XG5cdGF0dHIgdGl0bGVcblx0YXR0ciByb2xlXG5cblx0ZGVmIHdpZHRoXG5cdFx0QGRvbTpvZmZzZXRXaWR0aFxuXG5cdGRlZiBoZWlnaHRcblx0XHRAZG9tOm9mZnNldEhlaWdodFxuXG5cdGRlZiBzZXRDaGlsZHJlbiBub2RlcywgdHlwZVxuXHRcdEBlbXB0eSA/IGFwcGVuZChub2RlcykgOiBlbXB0eS5hcHBlbmQobm9kZXMpXG5cdFx0QGNoaWxkcmVuID0gbnVsbFxuXHRcdHNlbGZcblxuXHQjIyNcblx0U2V0IGlubmVyIGh0bWwgb2Ygbm9kZVxuXHQjIyNcblx0ZGVmIGh0bWw9IGh0bWxcblx0XHRAZG9tOmlubmVySFRNTCA9IGh0bWxcblx0XHRzZWxmXG5cblx0IyMjXG5cdEdldCBpbm5lciBodG1sIG9mIG5vZGVcblx0IyMjXG5cdGRlZiBodG1sXG5cdFx0QGRvbTppbm5lckhUTUxcblxuXHQjIyNcblx0UmVtb3ZlIGFsbCBjb250ZW50IGluc2lkZSBub2RlXG5cdCMjI1xuXHRkZWYgZW1wdHlcblx0XHRAZG9tLnJlbW92ZUNoaWxkKEBkb206Zmlyc3RDaGlsZCkgd2hpbGUgQGRvbTpmaXJzdENoaWxkXG5cdFx0QGNoaWxkcmVuID0gbnVsbFxuXHRcdEBlbXB0eSA9IHllc1xuXHRcdHNlbGZcblxuXHQjIyNcblx0UmVtb3ZlIHNwZWNpZmllZCBjaGlsZCBmcm9tIGN1cnJlbnQgbm9kZS5cblx0IyMjXG5cdGRlZiByZW1vdmUgY2hpbGRcblx0XHR2YXIgcGFyID0gZG9tXG5cdFx0dmFyIGVsID0gY2hpbGQgYW5kIGNoaWxkLmRvbVxuXHRcdHBhci5yZW1vdmVDaGlsZChlbCkgaWYgZWwgYW5kIGVsOnBhcmVudE5vZGUgPT0gcGFyXG5cdFx0c2VsZlxuXHRcdFxuXHRkZWYgZW1pdCBuYW1lLCBkYXRhOiBudWxsLCBidWJibGU6IHllc1xuXHRcdEltYmEuRXZlbnRzLnRyaWdnZXIgbmFtZSwgc2VsZiwgZGF0YTogZGF0YSwgYnViYmxlOiBidWJibGVcblx0XHRyZXR1cm4gc2VsZlxuXG5cdGRlZiBkYXRhc2V0IGtleSwgdmFsXG5cdFx0aWYga2V5IGlzYSBPYmplY3Rcblx0XHRcdGRhdGFzZXQoayx2KSBmb3Igb3duIGssdiBvZiBrZXlcblx0XHRcdHJldHVybiBzZWxmXG5cblx0XHRpZiBhcmd1bWVudHM6bGVuZ3RoID09IDJcblx0XHRcdHNldEF0dHJpYnV0ZShcImRhdGEte2tleX1cIix2YWwpXG5cdFx0XHRyZXR1cm4gc2VsZlxuXG5cdFx0aWYga2V5XG5cdFx0XHRyZXR1cm4gZ2V0QXR0cmlidXRlKFwiZGF0YS17a2V5fVwiKVxuXG5cdFx0dmFyIGRhdGFzZXQgPSBkb206ZGF0YXNldFxuXG5cdFx0dW5sZXNzIGRhdGFzZXRcblx0XHRcdGRhdGFzZXQgPSB7fVxuXHRcdFx0Zm9yIGF0cixpIGluIGRvbTphdHRyaWJ1dGVzXG5cdFx0XHRcdGlmIGF0cjpuYW1lLnN1YnN0cigwLDUpID09ICdkYXRhLSdcblx0XHRcdFx0XHRkYXRhc2V0W0ltYmEudG9DYW1lbENhc2UoYXRyOm5hbWUuc2xpY2UoNSkpXSA9IGF0cjp2YWx1ZVxuXG5cdFx0cmV0dXJuIGRhdGFzZXRcblxuXHQjIyNcblx0R2V0IGRlc2NlbmRhbnRzIG9mIGN1cnJlbnQgbm9kZSwgb3B0aW9uYWxseSBtYXRjaGluZyBzZWxlY3RvclxuXHRAcmV0dXJuIHtJbWJhLlNlbGVjdG9yfVxuXHQjIyNcblx0ZGVmIGZpbmQgc2VsXG5cdFx0SW1iYS5TZWxlY3Rvci5uZXcoc2VsLHNlbGYpXG5cblx0IyMjXG5cdEdldCB0aGUgZmlyc3QgbWF0Y2hpbmcgY2hpbGQgb2Ygbm9kZVxuXG5cdEByZXR1cm4ge0ltYmEuVGFnfVxuXHQjIyNcblx0ZGVmIGZpcnN0IHNlbFxuXHRcdHNlbCA/IGZpbmQoc2VsKS5maXJzdCA6IHRhZyhkb206Zmlyc3RFbGVtZW50Q2hpbGQpXG5cblx0IyMjXG5cdEdldCB0aGUgbGFzdCBtYXRjaGluZyBjaGlsZCBvZiBub2RlXG5cblx0XHRub2RlLmxhc3QgIyByZXR1cm5zIHRoZSBsYXN0IGNoaWxkIG9mIG5vZGVcblx0XHRub2RlLmxhc3QgJXNwYW4gIyByZXR1cm5zIHRoZSBsYXN0IHNwYW4gaW5zaWRlIG5vZGVcblx0XHRub2RlLmxhc3QgZG8gfGVsfCBlbC50ZXh0ID09ICdIaScgIyByZXR1cm4gbGFzdCBub2RlIHdpdGggdGV4dCBIaVxuXG5cdEByZXR1cm4ge0ltYmEuVGFnfVxuXHQjIyNcblx0ZGVmIGxhc3Qgc2VsXG5cdFx0c2VsID8gZmluZChzZWwpLmxhc3QgOiB0YWcoZG9tOmxhc3RFbGVtZW50Q2hpbGQpXG5cblx0IyMjXG5cdEdldCB0aGUgY2hpbGQgYXQgaW5kZXhcblx0IyMjXG5cdGRlZiBjaGlsZCBpXG5cdFx0dGFnKGRvbTpjaGlsZHJlbltpIG9yIDBdKVxuXG5cdGRlZiBjaGlsZHJlbiBzZWxcblx0XHR2YXIgbm9kZXMgPSBJbWJhLlNlbGVjdG9yLm5ldyhudWxsLCBzZWxmLCBAZG9tOmNoaWxkcmVuKVxuXHRcdHNlbCA/IG5vZGVzLmZpbHRlcihzZWwpIDogbm9kZXNcblx0XG5cdGRlZiBvcnBoYW5pemVcblx0XHRwYXIucmVtb3ZlQ2hpbGQoQGRvbSkgaWYgbGV0IHBhciA9IGRvbTpwYXJlbnROb2RlXG5cdFx0cmV0dXJuIHNlbGZcblx0XG5cdGRlZiBtYXRjaGVzIHNlbFxuXHRcdGlmIHNlbCBpc2EgRnVuY3Rpb25cblx0XHRcdHJldHVybiBzZWwoc2VsZilcblxuXHRcdHNlbCA9IHNlbC5xdWVyeSBpZiBzZWw6cXVlcnlcblx0XHRpZiB2YXIgZm4gPSAoQGRvbTptYXRjaGVzIG9yIEBkb206bWF0Y2hlc1NlbGVjdG9yIG9yIEBkb206d2Via2l0TWF0Y2hlc1NlbGVjdG9yIG9yIEBkb206bXNNYXRjaGVzU2VsZWN0b3Igb3IgQGRvbTptb3pNYXRjaGVzU2VsZWN0b3IpXG5cdFx0XHRyZXR1cm4gZm4uY2FsbChAZG9tLHNlbClcblxuXHQjIyNcblx0R2V0IHRoZSBmaXJzdCBlbGVtZW50IG1hdGNoaW5nIHN1cHBsaWVkIHNlbGVjdG9yIC8gZmlsdGVyXG5cdHRyYXZlcnNpbmcgdXB3YXJkcywgYnV0IGluY2x1ZGluZyB0aGUgbm9kZSBpdHNlbGYuXG5cdEByZXR1cm4ge0ltYmEuVGFnfVxuXHQjIyNcblx0ZGVmIGNsb3Nlc3Qgc2VsXG5cdFx0cmV0dXJuIHBhcmVudCB1bmxlc3Mgc2VsICMgc2hvdWxkIHJldHVybiBzZWxmPyFcblx0XHR2YXIgbm9kZSA9IHNlbGZcblx0XHRzZWwgPSBzZWwucXVlcnkgaWYgc2VsOnF1ZXJ5XG5cblx0XHR3aGlsZSBub2RlXG5cdFx0XHRyZXR1cm4gbm9kZSBpZiBub2RlLm1hdGNoZXMoc2VsKVxuXHRcdFx0bm9kZSA9IG5vZGUucGFyZW50XG5cdFx0cmV0dXJuIG51bGxcblxuXHQjIyNcblx0R2V0IHRoZSBjbG9zZXN0IGFuY2VzdG9yIG9mIG5vZGUgdGhhdCBtYXRjaGVzXG5cdHNwZWNpZmllZCBzZWxlY3RvciAvIG1hdGNoZXIuXG5cblx0QHJldHVybiB7SW1iYS5UYWd9XG5cdCMjI1xuXHRkZWYgdXAgc2VsXG5cdFx0cmV0dXJuIHBhcmVudCB1bmxlc3Mgc2VsXG5cdFx0cGFyZW50IGFuZCBwYXJlbnQuY2xvc2VzdChzZWwpXG5cblx0ZGVmIHBhdGggc2VsXG5cdFx0dmFyIG5vZGUgPSBzZWxmXG5cdFx0dmFyIG5vZGVzID0gW11cblx0XHRzZWwgPSBzZWwucXVlcnkgaWYgc2VsIGFuZCBzZWw6cXVlcnlcblxuXHRcdHdoaWxlIG5vZGVcblx0XHRcdG5vZGVzLnB1c2gobm9kZSkgaWYgIXNlbCBvciBub2RlLm1hdGNoZXMoc2VsKVxuXHRcdFx0bm9kZSA9IG5vZGUucGFyZW50XG5cdFx0cmV0dXJuIG5vZGVzXG5cblx0ZGVmIHBhcmVudHMgc2VsXG5cdFx0dmFyIHBhciA9IHBhcmVudFxuXHRcdHBhciA/IHBhci5wYXRoKHNlbCkgOiBbXVxuXG5cdFxuXG5cdGRlZiBzaWJsaW5ncyBzZWxcblx0XHRyZXR1cm4gW10gdW5sZXNzIHZhciBwYXIgPSBwYXJlbnQgIyBGSVhNRVxuXHRcdHZhciBhcnkgPSBkb206cGFyZW50Tm9kZTpjaGlsZHJlblxuXHRcdHZhciBub2RlcyA9IEltYmEuU2VsZWN0b3IubmV3KG51bGwsIHNlbGYsIGFyeSlcblx0XHRub2Rlcy5maWx0ZXIofG58IG4gIT0gc2VsZiAmJiAoIXNlbCB8fCBuLm1hdGNoZXMoc2VsKSkpXG5cblx0IyMjXG5cdEdldCB0aGUgaW1tZWRpYXRlbHkgZm9sbG93aW5nIHNpYmxpbmcgb2Ygbm9kZS5cblx0IyMjXG5cdGRlZiBuZXh0IHNlbFxuXHRcdGlmIHNlbFxuXHRcdFx0dmFyIGVsID0gc2VsZlxuXHRcdFx0d2hpbGUgZWwgPSBlbC5uZXh0XG5cdFx0XHRcdHJldHVybiBlbCBpZiBlbC5tYXRjaGVzKHNlbClcblx0XHRcdHJldHVybiBudWxsXG5cdFx0dGFnKGRvbTpuZXh0RWxlbWVudFNpYmxpbmcpXG5cblx0IyMjXG5cdEdldCB0aGUgaW1tZWRpYXRlbHkgcHJlY2VlZGluZyBzaWJsaW5nIG9mIG5vZGUuXG5cdCMjI1xuXHRkZWYgcHJldiBzZWxcblx0XHRpZiBzZWxcblx0XHRcdHZhciBlbCA9IHNlbGZcblx0XHRcdHdoaWxlIGVsID0gZWwucHJldlxuXHRcdFx0XHRyZXR1cm4gZWwgaWYgZWwubWF0Y2hlcyhzZWwpXG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdHRhZyhkb206cHJldmlvdXNFbGVtZW50U2libGluZylcblxuXHRkZWYgY29udGFpbnMgbm9kZVxuXHRcdGRvbS5jb250YWlucyhub2RlIGFuZCBub2RlLkBkb20gb3Igbm9kZSlcblxuXHRkZWYgaW5kZXhcblx0XHR2YXIgaSA9IDBcblx0XHR2YXIgZWwgPSBkb21cblx0XHR3aGlsZSBlbDpwcmV2aW91c1NpYmxpbmdcblx0XHRcdGVsID0gZWw6cHJldmlvdXNTaWJsaW5nXG5cdFx0XHRpKytcblx0XHRyZXR1cm4gaVxuXG5cblx0IyMjXG5cdFxuXHRAZGVwcmVjYXRlZFxuXHQjIyNcblx0ZGVmIGluc2VydCBub2RlLCBiZWZvcmU6IG51bGwsIGFmdGVyOiBudWxsXG5cdFx0YmVmb3JlID0gYWZ0ZXIubmV4dCBpZiBhZnRlclxuXHRcdGlmIG5vZGUgaXNhIEFycmF5XG5cdFx0XHRub2RlID0gKDxmcmFnbWVudD4gbm9kZSlcblx0XHRpZiBiZWZvcmVcblx0XHRcdGRvbS5pbnNlcnRCZWZvcmUobm9kZS5kb20sYmVmb3JlLmRvbSlcblx0XHRlbHNlXG5cdFx0XHRhcHBlbmQobm9kZSlcblx0XHRzZWxmXHRcblxuXHQjIyNcblx0Rm9jdXMgb24gY3VycmVudCBub2RlXG5cdEByZXR1cm4ge3NlbGZ9XG5cdCMjI1xuXHRkZWYgZm9jdXNcblx0XHRkb20uZm9jdXNcblx0XHRzZWxmXG5cblx0IyMjXG5cdFJlbW92ZSBmb2N1cyBmcm9tIGN1cnJlbnQgbm9kZVxuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIGJsdXJcblx0XHRkb20uYmx1clxuXHRcdHNlbGZcblxuXHRkZWYgdGVtcGxhdGVcblx0XHRudWxsXG5cblx0IyMjXG5cdEB0b2RvIFNob3VsZCBzdXBwb3J0IG11bHRpcGxlIGFyZ3VtZW50cyBsaWtlIGFwcGVuZFxuXG5cdFRoZSAucHJlcGVuZCBtZXRob2QgaW5zZXJ0cyB0aGUgc3BlY2lmaWVkIGNvbnRlbnQgYXMgdGhlIGZpcnN0XG5cdGNoaWxkIG9mIHRoZSB0YXJnZXQgbm9kZS4gSWYgdGhlIGNvbnRlbnQgaXMgYWxyZWFkeSBhIGNoaWxkIG9mIFxuXHRub2RlIGl0IHdpbGwgYmUgbW92ZWQgdG8gdGhlIHN0YXJ0LlxuXHRcbiAgICBcdG5vZGUucHJlcGVuZCA8ZGl2LnRvcD4gIyBwcmVwZW5kIG5vZGVcbiAgICBcdG5vZGUucHJlcGVuZCBcInNvbWUgdGV4dFwiICMgcHJlcGVuZCB0ZXh0XG4gICAgXHRub2RlLnByZXBlbmQgWzx1bD4sPHVsPl0gIyBwcmVwZW5kIGFycmF5XG5cblx0IyMjXG5cdGRlZiBwcmVwZW5kIGl0ZW1cblx0XHR2YXIgZmlyc3QgPSBAZG9tOmNoaWxkTm9kZXNbMF1cblx0XHRmaXJzdCA/IGluc2VydEJlZm9yZShpdGVtLCBmaXJzdCkgOiBhcHBlbmRDaGlsZChpdGVtKVxuXHRcdHNlbGZcblxuXHQjIyNcblx0VGhlIC5hcHBlbmQgbWV0aG9kIGluc2VydHMgdGhlIHNwZWNpZmllZCBjb250ZW50IGFzIHRoZSBsYXN0IGNoaWxkXG5cdG9mIHRoZSB0YXJnZXQgbm9kZS4gSWYgdGhlIGNvbnRlbnQgaXMgYWxyZWFkeSBhIGNoaWxkIG9mIG5vZGUgaXRcblx0d2lsbCBiZSBtb3ZlZCB0byB0aGUgZW5kLlxuXHRcblx0IyBleGFtcGxlXG5cdCAgICB2YXIgcm9vdCA9IDxkaXYucm9vdD5cblx0ICAgIHZhciBpdGVtID0gPGRpdi5pdGVtPiBcIlRoaXMgaXMgYW4gaXRlbVwiXG5cdCAgICByb290LmFwcGVuZCBpdGVtICMgYXBwZW5kcyBpdGVtIHRvIHRoZSBlbmQgb2Ygcm9vdFxuXG5cdCAgICByb290LnByZXBlbmQgXCJzb21lIHRleHRcIiAjIGFwcGVuZCB0ZXh0XG5cdCAgICByb290LnByZXBlbmQgWzx1bD4sPHVsPl0gIyBhcHBlbmQgYXJyYXlcblx0IyMjXG5cdGRlZiBhcHBlbmQgaXRlbVxuXHRcdCMgcG9zc2libGUgdG8gYXBwZW5kIGJsYW5rXG5cdFx0IyBwb3NzaWJsZSB0byBzaW1wbGlmeSBvbiBzZXJ2ZXI/XG5cdFx0cmV0dXJuIHNlbGYgdW5sZXNzIGl0ZW1cblxuXHRcdGlmIGl0ZW0gaXNhIEFycmF5XG5cdFx0XHRtZW1iZXIgJiYgYXBwZW5kKG1lbWJlcikgZm9yIG1lbWJlciBpbiBpdGVtXG5cblx0XHRlbGlmIGl0ZW0gaXNhIFN0cmluZyBvciBpdGVtIGlzYSBOdW1iZXJcblx0XHRcdHZhciBub2RlID0gSW1iYS5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtKVxuXHRcdFx0QGRvbS5hcHBlbmRDaGlsZChub2RlKVxuXHRcdFx0QGVtcHR5ID0gbm8gaWYgQGVtcHR5XHRcdFx0XG5cdFx0ZWxzZVxuXHRcdFx0QGRvbS5hcHBlbmRDaGlsZChpdGVtLkBkb20gb3IgaXRlbSlcblx0XHRcdEBlbXB0eSA9IG5vIGlmIEBlbXB0eVxuXG5cdFx0cmV0dXJuIHNlbGZcblxuXHQjIyNcblx0SW5zZXJ0IGEgbm9kZSBpbnRvIHRoZSBjdXJyZW50IG5vZGUgKHNlbGYpLCBiZWZvcmUgYW5vdGhlci5cblx0VGhlIHJlbGF0aXZlIG5vZGUgbXVzdCBiZSBhIGNoaWxkIG9mIGN1cnJlbnQgbm9kZS4gXG5cdCMjI1xuXHRkZWYgaW5zZXJ0QmVmb3JlIG5vZGUsIHJlbFxuXHRcdG5vZGUgPSBJbWJhLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpIGlmIG5vZGUgaXNhIFN0cmluZyBcblx0XHRkb20uaW5zZXJ0QmVmb3JlKCAobm9kZS5AZG9tIG9yIG5vZGUpLCAocmVsLkBkb20gb3IgcmVsKSApIGlmIG5vZGUgYW5kIHJlbFxuXHRcdHNlbGZcblxuXHQjIyNcblx0QXBwZW5kIGEgc2luZ2xlIGl0ZW0gKG5vZGUgb3Igc3RyaW5nKSB0byB0aGUgY3VycmVudCBub2RlLlxuXHRJZiBzdXBwbGllZCBpdGVtIGlzIGEgc3RyaW5nIGl0IHdpbGwgYXV0b21hdGljYWxseS4gVGhpcyBpcyB1c2VkXG5cdGJ5IEltYmEgaW50ZXJuYWxseSwgYnV0IHdpbGwgcHJhY3RpY2FsbHkgbmV2ZXIgYmUgdXNlZCBleHBsaWNpdGx5LlxuXHQjIyNcblx0ZGVmIGFwcGVuZENoaWxkIG5vZGVcblx0XHRub2RlID0gSW1iYS5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKSBpZiBub2RlIGlzYSBTdHJpbmdcblx0XHRkb20uYXBwZW5kQ2hpbGQobm9kZS5AZG9tIG9yIG5vZGUpIGlmIG5vZGVcblx0XHRzZWxmXG5cblx0IyMjXG5cdFJlbW92ZSBhIHNpbmdsZSBjaGlsZCBmcm9tIHRoZSBjdXJyZW50IG5vZGUuXG5cdFVzZWQgYnkgSW1iYSBpbnRlcm5hbGx5LlxuXHQjIyNcblx0ZGVmIHJlbW92ZUNoaWxkIG5vZGVcblx0XHRkb20ucmVtb3ZlQ2hpbGQobm9kZS5AZG9tIG9yIG5vZGUpIGlmIG5vZGVcblx0XHRzZWxmXG5cblx0ZGVmIHRvU3RyaW5nXG5cdFx0QGRvbS50b1N0cmluZyAjIHJlYWxseT9cblxuXHQjIyNcblx0QGRlcHJlY2F0ZWRcblx0IyMjXG5cdGRlZiBjbGFzc2VzXG5cdFx0Y29uc29sZS5sb2cgJ0ltYmEuVGFnI2NsYXNzZXMgaXMgZGVwcmVjYXRlZCdcblx0XHRAZG9tOmNsYXNzTGlzdFxuXG50YWcgc3ZnZWxlbWVudCA8IGh0bWxlbGVtZW50XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBub2RlX21vZHVsZXMvaW1iYS9zcmMvaW1iYS9kb20uaW1iYVxuICoqLyIsIlxuIyBwcmVkZWZpbmUgYWxsIHN1cHBvcnRlZCBodG1sIHRhZ3NcbnRhZyBmcmFnbWVudCA8IGh0bWxlbGVtZW50XG5cdFxuXHRkZWYgc2VsZi5jcmVhdGVOb2RlXG5cdFx0SW1iYS5kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50XG5cbnRhZyBhXG5cdGF0dHIgaHJlZlxuXG50YWcgYWJiclxudGFnIGFkZHJlc3NcbnRhZyBhcmVhXG50YWcgYXJ0aWNsZVxudGFnIGFzaWRlXG50YWcgYXVkaW9cbnRhZyBiXG50YWcgYmFzZVxudGFnIGJkaVxudGFnIGJkb1xudGFnIGJpZ1xudGFnIGJsb2NrcXVvdGVcbnRhZyBib2R5XG50YWcgYnJcblxudGFnIGJ1dHRvblxuXHRhdHRyIGF1dG9mb2N1c1xuXHRhdHRyIHR5cGVcblx0YXR0ciBkaXNhYmxlZFxuXG50YWcgY2FudmFzXG5cdGRlZiB3aWR0aD0gdmFsXG5cdFx0ZG9tOndpZHRoID0gdmFsIHVubGVzcyB3aWR0aCA9PSB2YWxcblx0XHRzZWxmXG5cblx0ZGVmIGhlaWdodD0gdmFsXG5cdFx0ZG9tOmhlaWdodCA9IHZhbCB1bmxlc3MgaGVpZ2h0ID09IHZhbFxuXHRcdHNlbGZcblxuXHRkZWYgd2lkdGhcblx0XHRkb206d2lkdGhcblxuXHRkZWYgaGVpZ2h0XG5cdFx0ZG9tOmhlaWdodFxuXG5cdGRlZiBjb250ZXh0IHR5cGUgPSAnMmQnXG5cdFx0ZG9tLmdldENvbnRleHQodHlwZSlcblxudGFnIGNhcHRpb25cbnRhZyBjaXRlXG50YWcgY29kZVxudGFnIGNvbFxudGFnIGNvbGdyb3VwXG50YWcgZGF0YVxudGFnIGRhdGFsaXN0XG50YWcgZGRcbnRhZyBkZWxcbnRhZyBkZXRhaWxzXG50YWcgZGZuXG50YWcgZGl2XG50YWcgZGxcbnRhZyBkdFxudGFnIGVtXG50YWcgZW1iZWRcbnRhZyBmaWVsZHNldFxudGFnIGZpZ2NhcHRpb25cbnRhZyBmaWd1cmVcbnRhZyBmb290ZXJcblxudGFnIGZvcm1cblx0YXR0ciBtZXRob2Rcblx0YXR0ciBhY3Rpb25cblxudGFnIGgxXG50YWcgaDJcbnRhZyBoM1xudGFnIGg0XG50YWcgaDVcbnRhZyBoNlxudGFnIGhlYWRcbnRhZyBoZWFkZXJcbnRhZyBoclxudGFnIGh0bWxcbnRhZyBpXG5cbnRhZyBpZnJhbWVcblx0YXR0ciBzcmNcblxudGFnIGltZ1xuXHRhdHRyIHNyY1xuXG50YWcgaW5wdXRcblx0IyBjYW4gdXNlIGF0dHIgaW5zdGVhZFxuXHRhdHRyIG5hbWVcblx0YXR0ciB0eXBlXG5cdGF0dHIgcmVxdWlyZWRcblx0YXR0ciBkaXNhYmxlZFxuXHRhdHRyIGF1dG9mb2N1c1xuXG5cdGRlZiB2YWx1ZVxuXHRcdGRvbTp2YWx1ZVxuXG5cdGRlZiB2YWx1ZT0gdlxuXHRcdGRvbTp2YWx1ZSA9IHYgdW5sZXNzIHYgPT0gZG9tOnZhbHVlXG5cdFx0c2VsZlxuXG5cdGRlZiBwbGFjZWhvbGRlcj0gdlxuXHRcdGRvbTpwbGFjZWhvbGRlciA9IHYgdW5sZXNzIHYgPT0gZG9tOnBsYWNlaG9sZGVyXG5cdFx0c2VsZlxuXG5cdGRlZiBwbGFjZWhvbGRlclxuXHRcdGRvbTpwbGFjZWhvbGRlclxuXG5cdGRlZiBjaGVja2VkXG5cdFx0ZG9tOmNoZWNrZWRcblxuXHRkZWYgY2hlY2tlZD0gYm9vbFxuXHRcdGRvbTpjaGVja2VkID0gYm9vbCB1bmxlc3MgYm9vbCA9PSBkb206Y2hlY2tlZFxuXHRcdHNlbGZcblxudGFnIGluc1xudGFnIGtiZFxudGFnIGtleWdlblxudGFnIGxhYmVsXG50YWcgbGVnZW5kXG50YWcgbGlcblxudGFnIGxpbmtcblx0YXR0ciByZWxcblx0YXR0ciB0eXBlXG5cdGF0dHIgaHJlZlxuXHRhdHRyIG1lZGlhXG5cbnRhZyBtYWluXG50YWcgbWFwXG50YWcgbWFya1xudGFnIG1lbnVcbnRhZyBtZW51aXRlbVxuXG50YWcgbWV0YVxuXHRhdHRyIG5hbWVcblx0YXR0ciBjb250ZW50XG5cdGF0dHIgY2hhcnNldFxuXG50YWcgbWV0ZXJcbnRhZyBuYXZcbnRhZyBub3NjcmlwdFxudGFnIG9iamVjdFxudGFnIG9sXG50YWcgb3B0Z3JvdXBcblxudGFnIG9wdGlvblxuXHRhdHRyIHZhbHVlXG5cbnRhZyBvdXRwdXRcbnRhZyBwXG50YWcgcGFyYW1cbnRhZyBwcmVcbnRhZyBwcm9ncmVzc1xudGFnIHFcbnRhZyBycFxudGFnIHJ0XG50YWcgcnVieVxudGFnIHNcbnRhZyBzYW1wXG5cbnRhZyBzY3JpcHRcblx0YXR0ciBzcmNcblx0YXR0ciB0eXBlXG5cdGF0dHIgYXN5bmNcblx0YXR0ciBkZWZlclxuXG50YWcgc2VjdGlvblxuXG50YWcgc2VsZWN0XG5cdGF0dHIgbmFtZVxuXHRhdHRyIG11bHRpcGxlXG5cdGF0dHIgcmVxdWlyZWRcblx0YXR0ciBkaXNhYmxlZFxuXHRcblx0ZGVmIHZhbHVlXG5cdFx0ZG9tOnZhbHVlXG5cblx0ZGVmIHZhbHVlPSB2XG5cdFx0ZG9tOnZhbHVlID0gdiB1bmxlc3MgdiA9PSBkb206dmFsdWVcblx0XHRzZWxmXG5cblxudGFnIHNtYWxsXG50YWcgc291cmNlXG50YWcgc3BhblxudGFnIHN0cm9uZ1xudGFnIHN0eWxlXG50YWcgc3ViXG50YWcgc3VtbWFyeVxudGFnIHN1cFxudGFnIHRhYmxlXG50YWcgdGJvZHlcbnRhZyB0ZFxuXG50YWcgdGV4dGFyZWFcblx0YXR0ciBuYW1lXG5cdGF0dHIgZGlzYWJsZWRcblx0YXR0ciByZXF1aXJlZFxuXHRhdHRyIHJvd3Ncblx0YXR0ciBjb2xzXG5cdGF0dHIgYXV0b2ZvY3VzXG5cblx0ZGVmIHZhbHVlXG5cdFx0ZG9tOnZhbHVlXG5cblx0ZGVmIHZhbHVlPSB2XG5cdFx0ZG9tOnZhbHVlID0gdiB1bmxlc3MgdiA9PSBkb206dmFsdWVcblx0XHRzZWxmXG5cblx0ZGVmIHBsYWNlaG9sZGVyPSB2XG5cdFx0ZG9tOnBsYWNlaG9sZGVyID0gdiB1bmxlc3MgdiA9PSBkb206cGxhY2Vob2xkZXJcblx0XHRzZWxmXG5cblx0ZGVmIHBsYWNlaG9sZGVyXG5cdFx0ZG9tOnBsYWNlaG9sZGVyXG5cbnRhZyB0Zm9vdFxudGFnIHRoXG50YWcgdGhlYWRcbnRhZyB0aW1lXG50YWcgdGl0bGVcbnRhZyB0clxudGFnIHRyYWNrXG50YWcgdVxudGFnIHVsXG50YWcgdmlkZW9cbnRhZyB3YnJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIG5vZGVfbW9kdWxlcy9pbWJhL3NyYy9pbWJhL2RvbS5odG1sLmltYmFcbiAqKi8iLCJcbnRhZyBzdmc6c3ZnZWxlbWVudFxuXG5cdGRlZiBzZWxmLm5hbWVzcGFjZVVSSVxuXHRcdFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuXG5cdGxldCB0eXBlcyA9IFwiY2lyY2xlIGRlZnMgZWxsaXBzZSBnIGxpbmUgbGluZWFyR3JhZGllbnQgbWFzayBwYXRoIHBhdHRlcm4gcG9seWdvbiBwb2x5bGluZSByYWRpYWxHcmFkaWVudCByZWN0IHN0b3Agc3ZnIHRleHQgdHNwYW5cIi5zcGxpdChcIiBcIilcblxuXHRkZWYgc2VsZi5idWlsZE5vZGVcblx0XHR2YXIgZG9tID0gSW1iYS5kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLEBub2RlVHlwZSlcblx0XHR2YXIgY2xzID0gQGNsYXNzZXMuam9pbihcIiBcIilcblx0XHRkb206Y2xhc3NOYW1lOmJhc2VWYWwgPSBjbHMgaWYgY2xzXG5cdFx0ZG9tXG5cblx0ZGVmIHNlbGYuaW5oZXJpdCBjaGlsZFxuXHRcdGNoaWxkLkBwcm90b0RvbSA9IG51bGxcblxuXHRcdGlmIGNoaWxkLkBuYW1lIGluIHR5cGVzXG5cdFx0XHRjaGlsZC5Abm9kZVR5cGUgPSBjaGlsZC5AbmFtZVxuXHRcdFx0Y2hpbGQuQGNsYXNzZXMgPSBbXVxuXHRcdGVsc2Vcblx0XHRcdGNoaWxkLkBub2RlVHlwZSA9IEBub2RlVHlwZVxuXHRcdFx0dmFyIGNsYXNzTmFtZSA9IFwiX1wiICsgY2hpbGQuQG5hbWUucmVwbGFjZSgvXy9nLCAnLScpXG5cdFx0XHRjaGlsZC5AY2xhc3NlcyA9IEBjbGFzc2VzLmNvbmNhdChjbGFzc05hbWUpXG5cblxuXHRhdHRyIHggaW5saW5lOiBub1xuXHRhdHRyIHkgaW5saW5lOiBub1xuXG5cdGF0dHIgd2lkdGggaW5saW5lOiBub1xuXHRhdHRyIGhlaWdodCBpbmxpbmU6IG5vXG5cblx0YXR0ciBzdHJva2UgaW5saW5lOiBub1xuXHRhdHRyIHN0cm9rZS13aWR0aCBpbmxpbmU6IG5vXG5cbnRhZyBzdmc6c3ZnXG5cdGF0dHIgdmlld2JveCBpbmxpbmU6IG5vXG5cbnRhZyBzdmc6Z1xuXG50YWcgc3ZnOmRlZnNcblxudGFnIHN2ZzpzeW1ib2xcblx0YXR0ciBwcmVzZXJ2ZUFzcGVjdFJhdGlvIGlubGluZTogbm9cblx0YXR0ciB2aWV3Qm94IGlubGluZTogbm9cblxudGFnIHN2ZzptYXJrZXJcblx0YXR0ciBtYXJrZXJVbml0cyBpbmxpbmU6IG5vXG5cdGF0dHIgcmVmWCBpbmxpbmU6IG5vXG5cdGF0dHIgcmVmWSBpbmxpbmU6IG5vXG5cdGF0dHIgbWFya2VyV2lkdGggaW5saW5lOiBub1xuXHRhdHRyIG1hcmtlckhlaWdodCBpbmxpbmU6IG5vXG5cdGF0dHIgb3JpZW50IGlubGluZTogbm9cblxuXG4jIEJhc2ljIHNoYXBlc1xuXG50YWcgc3ZnOnJlY3Rcblx0YXR0ciByeCBpbmxpbmU6IG5vXG5cdGF0dHIgcnkgaW5saW5lOiBub1xuXG50YWcgc3ZnOmNpcmNsZVxuXHRhdHRyIGN4IGlubGluZTogbm9cblx0YXR0ciBjeSBpbmxpbmU6IG5vXG5cdGF0dHIgciBpbmxpbmU6IG5vXG5cbnRhZyBzdmc6ZWxsaXBzZVxuXHRhdHRyIGN4IGlubGluZTogbm9cblx0YXR0ciBjeSBpbmxpbmU6IG5vXG5cdGF0dHIgcnggaW5saW5lOiBub1xuXHRhdHRyIHJ5IGlubGluZTogbm9cblxudGFnIHN2ZzpwYXRoXG5cdGF0dHIgZCBpbmxpbmU6IG5vXG5cdGF0dHIgcGF0aExlbmd0aCBpbmxpbmU6IG5vXG5cbnRhZyBzdmc6bGluZVxuXHRhdHRyIHgxIGlubGluZTogbm9cblx0YXR0ciB4MiBpbmxpbmU6IG5vXG5cdGF0dHIgeTEgaW5saW5lOiBub1xuXHRhdHRyIHkyIGlubGluZTogbm9cblxudGFnIHN2Zzpwb2x5bGluZVxuXHRhdHRyIHBvaW50cyBpbmxpbmU6IG5vXG5cbnRhZyBzdmc6cG9seWdvblxuXHRhdHRyIHBvaW50cyBpbmxpbmU6IG5vXG5cbnRhZyBzdmc6dGV4dFxuXHRhdHRyIGR4IGlubGluZTogbm9cblx0YXR0ciBkeSBpbmxpbmU6IG5vXG5cdGF0dHIgdGV4dC1hbmNob3IgaW5saW5lOiBub1xuXHRhdHRyIHJvdGF0ZSBpbmxpbmU6IG5vXG5cdGF0dHIgdGV4dExlbmd0aCBpbmxpbmU6IG5vXG5cdGF0dHIgbGVuZ3RoQWRqdXN0IGlubGluZTogbm9cblxudGFnIHN2Zzp0c3BhblxuXHRhdHRyIGR4IGlubGluZTogbm9cblx0YXR0ciBkeSBpbmxpbmU6IG5vXG5cdGF0dHIgcm90YXRlIGlubGluZTogbm9cblx0YXR0ciB0ZXh0TGVuZ3RoIGlubGluZTogbm9cblx0YXR0ciBsZW5ndGhBZGp1c3QgaW5saW5lOiBub1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIG5vZGVfbW9kdWxlcy9pbWJhL3NyYy9pbWJhL2RvbS5zdmcuaW1iYVxuICoqLyIsIiMgRXh0ZW5kaW5nIEltYmEuVGFnI2NzcyB0byB3b3JrIHdpdGhvdXQgcHJlZml4ZXMgYnkgaW5zcGVjdGluZ1xuIyB0aGUgcHJvcGVydGllcyBvZiBhIENTU1N0eWxlRGVjbGFyYXRpb24gYW5kIGNyZWF0aW5nIGEgbWFwXG5cbiMgdmFyIHByZWZpeGVzID0gWyctd2Via2l0LScsJy1tcy0nLCctbW96LScsJy1vLScsJy1ibGluay0nXVxuIyB2YXIgcHJvcHMgPSBbJ3RyYW5zZm9ybScsJ3RyYW5zaXRpb24nLCdhbmltYXRpb24nXVxuXG5pZiBJbWJhLkNMSUVOVFxuXHR2YXIgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQ6ZG9jdW1lbnRFbGVtZW50LCAnJylcblxuXHRJbWJhLkNTU0tleU1hcCA9IHt9XG5cblx0Zm9yIHByZWZpeGVkIGluIHN0eWxlc1xuXHRcdHZhciB1bnByZWZpeGVkID0gcHJlZml4ZWQucmVwbGFjZSgvXi0od2Via2l0fG1zfG1venxvfGJsaW5rKS0vLCcnKVxuXHRcdHZhciBjYW1lbENhc2UgPSB1bnByZWZpeGVkLnJlcGxhY2UoLy0oXFx3KS9nKSBkbyB8bSxhfCBhLnRvVXBwZXJDYXNlXG5cblx0XHQjIGlmIHRoZXJlIGV4aXN0cyBhbiB1bnByZWZpeGVkIHZlcnNpb24gLS0gYWx3YXlzIHVzZSB0aGlzXG5cdFx0aWYgcHJlZml4ZWQgIT0gdW5wcmVmaXhlZFxuXHRcdFx0Y29udGludWUgaWYgc3R5bGVzLmhhc093blByb3BlcnR5KHVucHJlZml4ZWQpXG5cblx0XHQjIHJlZ2lzdGVyIHRoZSBwcmVmaXhlc1xuXHRcdEltYmEuQ1NTS2V5TWFwW3VucHJlZml4ZWRdID0gSW1iYS5DU1NLZXlNYXBbY2FtZWxDYXNlXSA9IHByZWZpeGVkXG5cblx0ZXh0ZW5kIHRhZyBlbGVtZW50XG5cblx0XHQjIG92ZXJyaWRlIHRoZSBvcmlnaW5hbCBjc3MgbWV0aG9kXG5cdFx0ZGVmIGNzcyBrZXksIHZhbFxuXHRcdFx0aWYga2V5IGlzYSBPYmplY3Rcblx0XHRcdFx0Y3NzKGssdikgZm9yIG93biBrLHYgb2Yga2V5XG5cdFx0XHRcdHJldHVybiBzZWxmXG5cblx0XHRcdGtleSA9IEltYmEuQ1NTS2V5TWFwW2tleV0gb3Iga2V5XG5cblx0XHRcdGlmIHZhbCA9PSBudWxsXG5cdFx0XHRcdGRvbTpzdHlsZS5yZW1vdmVQcm9wZXJ0eShrZXkpXG5cdFx0XHRlbGlmIHZhbCA9PSB1bmRlZmluZWRcblx0XHRcdFx0cmV0dXJuIGRvbTpzdHlsZVtrZXldXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGlmIHZhbCBpc2EgTnVtYmVyIGFuZCBrZXkubWF0Y2goL3dpZHRofGhlaWdodHxsZWZ0fHJpZ2h0fHRvcHxib3R0b20vKVxuXHRcdFx0XHRcdHZhbCA9IHZhbCArIFwicHhcIlxuXHRcdFx0XHRkb206c3R5bGVba2V5XSA9IHZhbFxuXHRcdFx0c2VsZlxuXHRcdFx0XG5cdHVubGVzcyBkb2N1bWVudDpkb2N1bWVudEVsZW1lbnQ6Y2xhc3NMaXN0XG5cdFx0ZXh0ZW5kIHRhZyBlbGVtZW50XG5cblx0XHRcdGRlZiBoYXNGbGFnIHJlZlxuXHRcdFx0XHRyZXR1cm4gUmVnRXhwLm5ldygnKF58XFxcXHMpJyArIHJlZiArICcoXFxcXHN8JCknKS50ZXN0KEBkb206Y2xhc3NOYW1lKVxuXG5cdFx0XHRkZWYgYWRkRmxhZyByZWZcblx0XHRcdFx0cmV0dXJuIHNlbGYgaWYgaGFzRmxhZyhyZWYpXG5cdFx0XHRcdEBkb206Y2xhc3NOYW1lICs9IChAZG9tOmNsYXNzTmFtZSA/ICcgJyA6ICcnKSArIHJlZlxuXHRcdFx0XHRyZXR1cm4gc2VsZlxuXG5cdFx0XHRkZWYgdW5mbGFnIHJlZlxuXHRcdFx0XHRyZXR1cm4gc2VsZiB1bmxlc3MgaGFzRmxhZyhyZWYpXG5cdFx0XHRcdHZhciByZWdleCA9IFJlZ0V4cC5uZXcoJyhefFxcXFxzKSonICsgcmVmICsgJyhcXFxcc3wkKSonLCAnZycpXG5cdFx0XHRcdEBkb206Y2xhc3NOYW1lID0gQGRvbTpjbGFzc05hbWUucmVwbGFjZShyZWdleCwgJycpXG5cdFx0XHRcdHJldHVybiBzZWxmXG5cblx0XHRcdGRlZiB0b2dnbGVGbGFnIHJlZlxuXHRcdFx0XHRoYXNGbGFnKHJlZikgPyB1bmZsYWcocmVmKSA6IGZsYWcocmVmKVxuXG5cdFx0XHRkZWYgZmxhZyByZWYsIGJvb2xcblx0XHRcdFx0aWYgYXJndW1lbnRzOmxlbmd0aCA9PSAyIGFuZCAhIWJvb2wgPT09IG5vXG5cdFx0XHRcdFx0cmV0dXJuIHVuZmxhZyhyZWYpXG5cdFx0XHRcdHJldHVybiBhZGRGbGFnKHJlZilcblx0XHR0cnVlXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbm9kZV9tb2R1bGVzL2ltYmEvc3JjL2ltYmEvZG9tLmNsaWVudC5pbWJhXG4gKiovIiwidmFyIGRvYyA9IGRvY3VtZW50XG52YXIgd2luID0gd2luZG93XG5cbnZhciBoYXNUb3VjaEV2ZW50cyA9IHdpbmRvdyAmJiB3aW5kb3c6b250b3VjaHN0YXJ0ICE9PSB1bmRlZmluZWRcblxuY2xhc3MgSW1iYS5Qb2ludGVyXG5cblx0IyBiZWdhbiwgbW92ZWQsIHN0YXRpb25hcnksIGVuZGVkLCBjYW5jZWxsZWRcblxuXHRwcm9wIHBoYXNlXG5cdHByb3AgcHJldkV2ZW50XG5cdHByb3AgYnV0dG9uXG5cdHByb3AgZXZlbnRcblx0cHJvcCBkaXJ0eVxuXHRwcm9wIGV2ZW50c1xuXHRwcm9wIHRvdWNoXG5cblx0ZGVmIGluaXRpYWxpemVcblx0XHRidXR0b24gPSAtMVxuXHRcdGV2ZW50ID0ge3g6IDAsIHk6IDAsIHR5cGU6ICd1bmluaXRpYWxpemVkJ31cblx0XHRyZXR1cm4gc2VsZlxuXG5cdGRlZiB1cGRhdGUgZVxuXHRcdGV2ZW50ID0gZVxuXHRcdGRpcnR5ID0geWVzXG5cdFx0c2VsZlxuXG5cdCMgdGhpcyBpcyBqdXN0IGZvciByZWd1bGFyIG1vdXNlIG5vd1xuXHRkZWYgcHJvY2Vzc1xuXHRcdHZhciBlMSA9IGV2ZW50XG5cblx0XHRpZiBkaXJ0eVxuXHRcdFx0cHJldkV2ZW50ID0gZTFcblx0XHRcdGRpcnR5ID0gbm9cblxuXHRcdFx0IyBidXR0b24gc2hvdWxkIG9ubHkgY2hhbmdlIG9uIG1vdXNlZG93biBldGNcblx0XHRcdGlmIGUxOnR5cGUgPT0gJ21vdXNlZG93bidcblx0XHRcdFx0YnV0dG9uID0gZTE6YnV0dG9uXG5cblx0XHRcdFx0IyBkbyBub3QgY3JlYXRlIHRvdWNoIGZvciByaWdodCBjbGlja1xuXHRcdFx0XHRpZiBidXR0b24gPT0gMiBvciAodG91Y2ggYW5kIGJ1dHRvbiAhPSAwKVxuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdCMgY2FuY2VsIHRoZSBwcmV2aW91cyB0b3VjaFxuXHRcdFx0XHR0b3VjaC5jYW5jZWwgaWYgdG91Y2hcblx0XHRcdFx0dG91Y2ggPSBJbWJhLlRvdWNoLm5ldyhlMSxzZWxmKVxuXHRcdFx0XHR0b3VjaC5tb3VzZWRvd24oZTEsZTEpXG5cblx0XHRcdGVsaWYgZTE6dHlwZSA9PSAnbW91c2Vtb3ZlJ1xuXHRcdFx0XHR0b3VjaC5tb3VzZW1vdmUoZTEsZTEpIGlmIHRvdWNoXG5cblx0XHRcdGVsaWYgZTE6dHlwZSA9PSAnbW91c2V1cCdcblx0XHRcdFx0YnV0dG9uID0gLTFcblxuXHRcdFx0XHRpZiB0b3VjaCBhbmQgdG91Y2guYnV0dG9uID09IGUxOmJ1dHRvblxuXHRcdFx0XHRcdHRvdWNoLm1vdXNldXAoZTEsZTEpXG5cdFx0XHRcdFx0dG91Y2ggPSBudWxsXG5cdFx0XHRcdCMgdHJpZ2dlciBwb2ludGVydXBcblx0XHRlbHNlXG5cdFx0XHR0b3VjaC5pZGxlIGlmIHRvdWNoXG5cdFx0c2VsZlxuXHRcdFxuXHRkZWYgY2xlYW51cFxuXHRcdEltYmEuUE9JTlRFUlNcblxuXHRkZWYgeCBkbyBldmVudDp4XG5cdGRlZiB5IGRvIGV2ZW50OnlcblxuXHQjIGRlcHJlY2F0ZWQgLS0gc2hvdWxkIHJlbW92ZVxuXHRkZWYgc2VsZi51cGRhdGUgXG5cdFx0IyBjb25zb2xlLmxvZygndXBkYXRlIHRvdWNoJylcblx0XHRmb3IgcHRyLGkgaW4gSW1iYS5QT0lOVEVSU1xuXHRcdFx0cHRyLnByb2Nlc3Ncblx0XHQjIG5lZWQgdG8gYmUgYWJsZSB0byBwcmV2ZW50IHRoZSBkZWZhdWx0IGJlaGF2aW91ciBvZiB0b3VjaCwgbm8/XG5cdFx0d2luLnJlcXVlc3RBbmltYXRpb25GcmFtZShJbWJhLlBvaW50ZXI6dXBkYXRlKVxuXHRcdHNlbGZcblxudmFyIGxhc3ROYXRpdmVUb3VjaFRpbWVTdGFtcCA9IDBcbnZhciBsYXN0TmF0aXZlVG91Y2hUaW1lb3V0ID0gNTBcblxuIyBJbWJhLlRvdWNoXG4jIEJlZ2FuXHRBIGZpbmdlciB0b3VjaGVkIHRoZSBzY3JlZW4uXG4jIE1vdmVkXHRBIGZpbmdlciBtb3ZlZCBvbiB0aGUgc2NyZWVuLlxuIyBTdGF0aW9uYXJ5XHRBIGZpbmdlciBpcyB0b3VjaGluZyB0aGUgc2NyZWVuIGJ1dCBoYXNuJ3QgbW92ZWQuXG4jIEVuZGVkXHRBIGZpbmdlciB3YXMgbGlmdGVkIGZyb20gdGhlIHNjcmVlbi4gVGhpcyBpcyB0aGUgZmluYWwgcGhhc2Ugb2YgYSB0b3VjaC5cbiMgQ2FuY2VsZWQgVGhlIHN5c3RlbSBjYW5jZWxsZWQgdHJhY2tpbmcgZm9yIHRoZSB0b3VjaC5cblxuIyMjXG5Db25zb2xpZGF0ZXMgbW91c2UgYW5kIHRvdWNoIGV2ZW50cy4gVG91Y2ggb2JqZWN0cyBwZXJzaXN0IGFjcm9zcyBhIHRvdWNoLFxuZnJvbSB0b3VjaHN0YXJ0IHVudGlsIGVuZC9jYW5jZWwuIFdoZW4gYSB0b3VjaCBzdGFydHMsIGl0IHdpbGwgdHJhdmVyc2VcbmRvd24gZnJvbSB0aGUgaW5uZXJtb3N0IHRhcmdldCwgdW50aWwgaXQgZmluZHMgYSBub2RlIHRoYXQgcmVzcG9uZHMgdG9cbm9udG91Y2hzdGFydC4gVW5sZXNzIHRoZSB0b3VjaCBpcyBleHBsaWNpdGx5IHJlZGlyZWN0ZWQsIHRoZSB0b3VjaCB3aWxsXG5jYWxsIG9udG91Y2htb3ZlIGFuZCBvbnRvdWNoZW5kIC8gb250b3VjaGNhbmNlbCBvbiB0aGUgcmVzcG9uZGVyIHdoZW4gYXBwcm9wcmlhdGUuXG5cblx0dGFnIGRyYWdnYWJsZVxuXHRcdCMgY2FsbGVkIHdoZW4gYSB0b3VjaCBzdGFydHNcblx0XHRkZWYgb250b3VjaHN0YXJ0IHRvdWNoXG5cdFx0XHRmbGFnICdkcmFnZ2luZydcblx0XHRcdHNlbGZcblx0XHRcblx0XHQjIGNhbGxlZCB3aGVuIHRvdWNoIG1vdmVzIC0gc2FtZSB0b3VjaCBvYmplY3Rcblx0XHRkZWYgb250b3VjaG1vdmUgdG91Y2hcblx0XHRcdCMgbW92ZSB0aGUgbm9kZSB3aXRoIHRvdWNoXG5cdFx0XHRjc3MgdG9wOiB0b3VjaC5keSwgbGVmdDogdG91Y2guZHhcblx0XHRcblx0XHQjIGNhbGxlZCB3aGVuIHRvdWNoIGVuZHNcblx0XHRkZWYgb250b3VjaGVuZCB0b3VjaFxuXHRcdFx0dW5mbGFnICdkcmFnZ2luZydcblxuQGluYW1lIHRvdWNoXG4jIyNcbmNsYXNzIEltYmEuVG91Y2hcblxuXHR2YXIgdG91Y2hlcyA9IFtdXG5cdHZhciBjb3VudCA9IDBcblx0dmFyIGlkZW50aWZpZXJzID0ge31cblxuXHRkZWYgc2VsZi5jb3VudFxuXHRcdGNvdW50XG5cblx0ZGVmIHNlbGYubG9va3VwIGl0ZW1cblx0XHRyZXR1cm4gaXRlbSBhbmQgKGl0ZW06X190b3VjaF9fIG9yIGlkZW50aWZpZXJzW2l0ZW06aWRlbnRpZmllcl0pXG5cblx0ZGVmIHNlbGYucmVsZWFzZSBpdGVtLHRvdWNoXG5cdFx0ZGVsZXRlIGlkZW50aWZpZXJzW2l0ZW06aWRlbnRpZmllcl1cblx0XHRkZWxldGUgaXRlbTpfX3RvdWNoX19cblx0XHRyZXR1cm5cblxuXHRkZWYgc2VsZi5vbnRvdWNoc3RhcnQgZVxuXHRcdGZvciB0IGluIGU6Y2hhbmdlZFRvdWNoZXNcblx0XHRcdGNvbnRpbnVlIGlmIGxvb2t1cCh0KVxuXHRcdFx0dmFyIHRvdWNoID0gaWRlbnRpZmllcnNbdDppZGVudGlmaWVyXSA9IHNlbGYubmV3KGUpICMgKGUpXG5cdFx0XHR0Ol9fdG91Y2hfXyA9IHRvdWNoXG5cdFx0XHR0b3VjaGVzLnB1c2godG91Y2gpXG5cdFx0XHRjb3VudCsrXG5cdFx0XHR0b3VjaC50b3VjaHN0YXJ0KGUsdClcblx0XHRzZWxmXG5cblx0ZGVmIHNlbGYub250b3VjaG1vdmUgZVxuXHRcdGZvciB0IGluIGU6Y2hhbmdlZFRvdWNoZXNcblx0XHRcdGlmIHZhciB0b3VjaCA9IGxvb2t1cCh0KVxuXHRcdFx0XHR0b3VjaC50b3VjaG1vdmUoZSx0KVxuXG5cdFx0c2VsZlxuXG5cdGRlZiBzZWxmLm9udG91Y2hlbmQgZVxuXHRcdGZvciB0IGluIGU6Y2hhbmdlZFRvdWNoZXNcblx0XHRcdGlmIHZhciB0b3VjaCA9IGxvb2t1cCh0KVxuXHRcdFx0XHR0b3VjaC50b3VjaGVuZChlLHQpXG5cdFx0XHRcdHJlbGVhc2UodCx0b3VjaClcblx0XHRcdFx0Y291bnQtLVxuXG5cdFx0IyBlLnByZXZlbnREZWZhdWx0XG5cdFx0IyBub3QgYWx3YXlzIHN1cHBvcnRlZCFcblx0XHQjIHRvdWNoZXMgPSB0b3VjaGVzLmZpbHRlcih8fClcblx0XHRzZWxmXG5cblx0ZGVmIHNlbGYub250b3VjaGNhbmNlbCBlXG5cdFx0Zm9yIHQgaW4gZTpjaGFuZ2VkVG91Y2hlc1xuXHRcdFx0aWYgdmFyIHRvdWNoID0gbG9va3VwKHQpXG5cdFx0XHRcdHRvdWNoLnRvdWNoY2FuY2VsKGUsdClcblx0XHRcdFx0cmVsZWFzZSh0LHRvdWNoKVxuXHRcdFx0XHRjb3VudC0tXG5cdFx0c2VsZlxuXG5cdGRlZiBzZWxmLm9ubW91c2Vkb3duIGVcblx0XHRzZWxmXG5cblx0ZGVmIHNlbGYub25tb3VzZW1vdmUgZVxuXHRcdHNlbGZcblxuXHRkZWYgc2VsZi5vbm1vdXNldXAgZVxuXHRcdHNlbGZcblxuXG5cdHByb3AgcGhhc2Vcblx0cHJvcCBhY3RpdmVcblx0cHJvcCBldmVudFxuXHRwcm9wIHBvaW50ZXJcblx0cHJvcCB0YXJnZXRcblx0cHJvcCBoYW5kbGVyXG5cdHByb3AgdXBkYXRlc1xuXHRwcm9wIHN1cHByZXNzXG5cdHByb3AgZGF0YVxuXHRwcm9wIGJ1YmJsZSBjaGFpbmFibGU6IHllc1xuXG5cdHByb3AgZ2VzdHVyZXNcblxuXHQjIyNcblx0XG5cblx0QGludGVybmFsXG5cdEBjb25zdHJ1Y3RvclxuXHQjIyNcblx0ZGVmIGluaXRpYWxpemUgZXZlbnQsIHBvaW50ZXJcblx0XHQjIEBuYXRpdmUgID0gZmFsc2Vcblx0XHRzZWxmLmV2ZW50ID0gZXZlbnRcblx0XHRkYXRhID0ge31cblx0XHRhY3RpdmUgPSB5ZXNcblx0XHRAYnV0dG9uID0gZXZlbnQgYW5kIGV2ZW50OmJ1dHRvbiBvciAwXG5cdFx0QHN1cHByZXNzID0gbm8gIyBkZXByZWNhdGVkXG5cdFx0QGNhcHR1cmVkID0gbm9cblx0XHRidWJibGUgPSBub1xuXHRcdHBvaW50ZXIgPSBwb2ludGVyXG5cdFx0dXBkYXRlcyA9IDBcblx0XHRyZXR1cm4gc2VsZlxuXG5cdGRlZiBjYXB0dXJlXG5cdFx0QGNhcHR1cmVkID0geWVzXG5cdFx0QGV2ZW50IGFuZCBAZXZlbnQucHJldmVudERlZmF1bHRcblx0XHRzZWxmXG5cblx0ZGVmIGlzQ2FwdHVyZWRcblx0XHQhIUBjYXB0dXJlZFxuXG5cdCMjI1xuXHRFeHRlbmQgdGhlIHRvdWNoIHdpdGggYSBwbHVnaW4gLyBnZXN0dXJlLiBcblx0QWxsIGV2ZW50cyAodG91Y2hzdGFydCxtb3ZlIGV0YykgZm9yIHRoZSB0b3VjaFxuXHR3aWxsIGJlIHRyaWdnZXJlZCBvbiB0aGUgcGx1Z2lucyBpbiB0aGUgb3JkZXIgdGhleVxuXHRhcmUgYWRkZWQuXG5cdCMjI1xuXHRkZWYgZXh0ZW5kIHBsdWdpblxuXHRcdCMgY29uc29sZS5sb2cgXCJhZGRlZCBnZXN0dXJlISEhXCJcblx0XHRAZ2VzdHVyZXMgfHw9IFtdXG5cdFx0QGdlc3R1cmVzLnB1c2gocGx1Z2luKVxuXHRcdHNlbGZcblxuXHQjIyNcblx0UmVkaXJlY3QgdG91Y2ggdG8gc3BlY2lmaWVkIHRhcmdldC4gb250b3VjaHN0YXJ0IHdpbGwgYWx3YXlzIGJlXG5cdGNhbGxlZCBvbiB0aGUgbmV3IHRhcmdldC5cblx0QHJldHVybiB7TnVtYmVyfVxuXHQjIyNcblx0ZGVmIHJlZGlyZWN0IHRhcmdldFxuXHRcdEByZWRpcmVjdCA9IHRhcmdldFxuXHRcdHNlbGZcblxuXHQjIyNcblx0U3VwcHJlc3MgdGhlIGRlZmF1bHQgYmVoYXZpb3VyLiBXaWxsIGNhbGwgcHJldmVudERlZmF1bHQgZm9yXG5cdGFsbCBuYXRpdmUgZXZlbnRzIHRoYXQgYXJlIHBhcnQgb2YgdGhlIHRvdWNoLlxuXHQjIyNcblx0ZGVmIHN1cHByZXNzXG5cdFx0IyBjb2xsaXNpb24gd2l0aCB0aGUgc3VwcHJlc3MgcHJvcGVydHlcblx0XHRAYWN0aXZlID0gbm9cblx0XHRzZWxmXG5cblx0ZGVmIHN1cHByZXNzPSB2YWx1ZVxuXHRcdGNvbnNvbGUud2FybiAnSW1iYS5Ub3VjaCNzdXBwcmVzcz0gaXMgZGVwcmVjYXRlZCdcblx0XHRAc3VwcmVzcyA9IHZhbHVlXG5cdFx0c2VsZlxuXG5cdGRlZiB0b3VjaHN0YXJ0IGUsdFxuXHRcdEBldmVudCA9IGVcblx0XHRAdG91Y2ggPSB0XG5cdFx0QGJ1dHRvbiA9IDBcblx0XHRAeCA9IHQ6Y2xpZW50WFxuXHRcdEB5ID0gdDpjbGllbnRZXG5cdFx0YmVnYW5cblx0XHRlLnByZXZlbnREZWZhdWx0IGlmIGUgYW5kIGlzQ2FwdHVyZWRcblx0XHRzZWxmXG5cblx0ZGVmIHRvdWNobW92ZSBlLHRcblx0XHRAZXZlbnQgPSBlXG5cdFx0QHggPSB0OmNsaWVudFhcblx0XHRAeSA9IHQ6Y2xpZW50WVxuXHRcdHVwZGF0ZVxuXHRcdGUucHJldmVudERlZmF1bHQgaWYgZSBhbmQgaXNDYXB0dXJlZFxuXHRcdHNlbGZcblxuXHRkZWYgdG91Y2hlbmQgZSx0XG5cdFx0QGV2ZW50ID0gZVxuXHRcdEB4ID0gdDpjbGllbnRYXG5cdFx0QHkgPSB0OmNsaWVudFlcblx0XHRlbmRlZFxuXG5cdFx0bGFzdE5hdGl2ZVRvdWNoVGltZVN0YW1wID0gZTp0aW1lU3RhbXBcblxuXHRcdGlmIEBtYXhkciA8IDIwXG5cdFx0XHR2YXIgdGFwID0gSW1iYS5FdmVudC5uZXcoZSlcblx0XHRcdHRhcC50eXBlID0gJ3RhcCdcblx0XHRcdHRhcC5wcm9jZXNzXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0IGlmIHRhcC5AcmVzcG9uZGVyXHRcblxuXHRcdGlmIGUgYW5kIGlzQ2FwdHVyZWRcblx0XHRcdGUucHJldmVudERlZmF1bHRcblxuXHRcdHNlbGZcblxuXHRkZWYgdG91Y2hjYW5jZWwgZSx0XG5cdFx0Y2FuY2VsXG5cblx0ZGVmIG1vdXNlZG93biBlLHRcblx0XHRAZXZlbnQgPSBlXG5cdFx0QGJ1dHRvbiA9IGU6YnV0dG9uXG5cdFx0QHggPSB0OmNsaWVudFhcblx0XHRAeSA9IHQ6Y2xpZW50WVxuXHRcdGJlZ2FuXG5cblx0XHRAbW91c2Vtb3ZlID0gKHxlfCBtb3VzZW1vdmUoZSxlKSApXG5cdFx0ZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsQG1vdXNlbW92ZSx5ZXMpXG5cdFx0c2VsZlxuXG5cdGRlZiBtb3VzZW1vdmUgZSx0XG5cdFx0QHggPSB0OmNsaWVudFhcblx0XHRAeSA9IHQ6Y2xpZW50WVxuXHRcdEBldmVudCA9IGVcblx0XHRlLnByZXZlbnREZWZhdWx0IGlmIGlzQ2FwdHVyZWRcblx0XHR1cGRhdGVcblx0XHRtb3ZlXG5cdFx0c2VsZlxuXG5cdGRlZiBtb3VzZXVwIGUsdFxuXHRcdEB4ID0gdDpjbGllbnRYXG5cdFx0QHkgPSB0OmNsaWVudFlcblx0XHRlbmRlZFxuXHRcdGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLEBtb3VzZW1vdmUseWVzKVxuXHRcdEBtb3VzZW1vdmUgPSBudWxsXG5cdFx0c2VsZlxuXG5cdGRlZiBpZGxlXG5cdFx0dXBkYXRlXG5cblx0ZGVmIGJlZ2FuXG5cdFx0QG1heGRyID0gQGRyID0gMFxuXHRcdEB4MCA9IEB4XG5cdFx0QHkwID0gQHlcblxuXHRcdHZhciBkb20gPSBldmVudDp0YXJnZXRcblx0XHR2YXIgbm9kZSA9IG51bGxcblxuXHRcdEBzb3VyY2VUYXJnZXQgPSBkb20gYW5kIHRhZyhkb20pXG5cblx0XHR3aGlsZSBkb21cblx0XHRcdG5vZGUgPSB0YWcoZG9tKVxuXHRcdFx0aWYgbm9kZSAmJiBub2RlOm9udG91Y2hzdGFydFxuXHRcdFx0XHRAYnViYmxlID0gbm9cblx0XHRcdFx0dGFyZ2V0ID0gbm9kZVxuXHRcdFx0XHR0YXJnZXQub250b3VjaHN0YXJ0KHNlbGYpXG5cdFx0XHRcdGJyZWFrIHVubGVzcyBAYnViYmxlXG5cdFx0XHRkb20gPSBkb206cGFyZW50Tm9kZVxuXG5cdFx0QHVwZGF0ZXMrK1xuXHRcdHNlbGZcblxuXHRkZWYgdXBkYXRlXG5cdFx0cmV0dXJuIHNlbGYgdW5sZXNzIEBhY3RpdmVcblxuXHRcdHZhciBkciA9IE1hdGguc3FydChkeCpkeCArIGR5KmR5KVxuXHRcdEBtYXhkciA9IGRyIGlmIGRyID4gQGRyXG5cdFx0QGRyID0gZHJcblxuXHRcdCMgY2F0Y2hpbmcgYSB0b3VjaC1yZWRpcmVjdD8hP1xuXHRcdGlmIEByZWRpcmVjdFxuXHRcdFx0aWYgQHRhcmdldCBhbmQgQHRhcmdldDpvbnRvdWNoY2FuY2VsXG5cdFx0XHRcdEB0YXJnZXQub250b3VjaGNhbmNlbChzZWxmKVxuXHRcdFx0dGFyZ2V0ID0gQHJlZGlyZWN0XG5cdFx0XHRAcmVkaXJlY3QgPSBudWxsXG5cdFx0XHR0YXJnZXQub250b3VjaHN0YXJ0KHNlbGYpIGlmIHRhcmdldDpvbnRvdWNoc3RhcnRcblxuXG5cdFx0QHVwZGF0ZXMrK1xuXHRcdGlmIEBnZXN0dXJlc1xuXHRcdFx0Zy5vbnRvdWNodXBkYXRlKHNlbGYpIGZvciBnIGluIEBnZXN0dXJlc1xuXG5cdFx0dGFyZ2V0Py5vbnRvdWNodXBkYXRlKHNlbGYpXG5cdFx0c2VsZlxuXG5cdGRlZiBtb3ZlXG5cdFx0cmV0dXJuIHNlbGYgdW5sZXNzIEBhY3RpdmVcblxuXHRcdGlmIEBnZXN0dXJlc1xuXHRcdFx0Zm9yIGcgaW4gQGdlc3R1cmVzXG5cdFx0XHRcdGcub250b3VjaG1vdmUoc2VsZixAZXZlbnQpIGlmIGc6b250b3VjaG1vdmVcblxuXHRcdHRhcmdldD8ub250b3VjaG1vdmUoc2VsZixAZXZlbnQpXG5cdFx0c2VsZlxuXG5cdGRlZiBlbmRlZFxuXHRcdHJldHVybiBzZWxmIHVubGVzcyBAYWN0aXZlXG5cblx0XHRAdXBkYXRlcysrXG5cblx0XHRpZiBAZ2VzdHVyZXNcblx0XHRcdGcub250b3VjaGVuZChzZWxmKSBmb3IgZyBpbiBAZ2VzdHVyZXNcblxuXHRcdHRhcmdldD8ub250b3VjaGVuZChzZWxmKVxuXG5cdFx0c2VsZlxuXG5cdGRlZiBjYW5jZWxcblx0XHR1bmxlc3MgQGNhbmNlbGxlZFxuXHRcdFx0QGNhbmNlbGxlZCA9IHllc1xuXHRcdFx0Y2FuY2VsbGVkXG5cdFx0XHRkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJyxAbW91c2Vtb3ZlLHllcykgaWYgQG1vdXNlbW92ZVxuXHRcdHNlbGZcblxuXHRkZWYgY2FuY2VsbGVkXG5cdFx0cmV0dXJuIHNlbGYgdW5sZXNzIEBhY3RpdmVcblxuXHRcdEBjYW5jZWxsZWQgPSB5ZXNcblx0XHRAdXBkYXRlcysrXG5cblx0XHRpZiBAZ2VzdHVyZXNcblx0XHRcdGZvciBnIGluIEBnZXN0dXJlc1xuXHRcdFx0XHRnLm9udG91Y2hjYW5jZWwoc2VsZikgaWYgZzpvbnRvdWNoY2FuY2VsXG5cblx0XHR0YXJnZXQ/Lm9udG91Y2hjYW5jZWwoc2VsZilcblx0XHRzZWxmXG5cblx0IyMjXG5cdFRoZSBhYnNvbHV0ZSBkaXN0YW5jZSB0aGUgdG91Y2ggaGFzIG1vdmVkIGZyb20gc3RhcnRpbmcgcG9zaXRpb24gXG5cdEByZXR1cm4ge051bWJlcn1cblx0IyMjXG5cdGRlZiBkciBkbyBAZHJcblxuXHQjIyNcblx0VGhlIGRpc3RhbmNlIHRoZSB0b3VjaCBoYXMgbW92ZWQgaG9yaXpvbnRhbGx5XG5cdEByZXR1cm4ge051bWJlcn1cblx0IyMjXG5cdGRlZiBkeCBkbyBAeCAtIEB4MFxuXG5cdCMjI1xuXHRUaGUgZGlzdGFuY2UgdGhlIHRvdWNoIGhhcyBtb3ZlZCB2ZXJ0aWNhbGx5XG5cdEByZXR1cm4ge051bWJlcn1cblx0IyMjXG5cdGRlZiBkeSBkbyBAeSAtIEB5MFxuXG5cdCMjI1xuXHRJbml0aWFsIGhvcml6b250YWwgcG9zaXRpb24gb2YgdG91Y2hcblx0QHJldHVybiB7TnVtYmVyfVxuXHQjIyNcblx0ZGVmIHgwIGRvIEB4MFxuXG5cdCMjI1xuXHRJbml0aWFsIHZlcnRpY2FsIHBvc2l0aW9uIG9mIHRvdWNoXG5cdEByZXR1cm4ge051bWJlcn1cblx0IyMjXG5cdGRlZiB5MCBkbyBAeTBcblxuXHQjIyNcblx0SG9yaXpvbnRhbCBwb3NpdGlvbiBvZiB0b3VjaFxuXHRAcmV0dXJuIHtOdW1iZXJ9XG5cdCMjI1xuXHRkZWYgeCBkbyBAeFxuXG5cdCMjI1xuXHRWZXJ0aWNhbCBwb3NpdGlvbiBvZiB0b3VjaFxuXHRAcmV0dXJuIHtOdW1iZXJ9XG5cdCMjI1xuXHRkZWYgeSBkbyBAeVxuXG5cdCMjI1xuXHRIb3Jpem9udGFsIHBvc2l0aW9uIG9mIHRvdWNoIHJlbGF0aXZlIHRvIHRhcmdldFxuXHRAcmV0dXJuIHtOdW1iZXJ9XG5cdCMjI1xuXHRkZWYgdHggZG9cblx0XHRAdGFyZ2V0Qm94IHx8PSBAdGFyZ2V0LmRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3Rcblx0XHRAeCAtIEB0YXJnZXRCb3g6bGVmdFxuXG5cdCMjI1xuXHRWZXJ0aWNhbCBwb3NpdGlvbiBvZiB0b3VjaCByZWxhdGl2ZSB0byB0YXJnZXRcblx0QHJldHVybiB7TnVtYmVyfVxuXHQjIyNcblx0ZGVmIHR5XG5cdFx0QHRhcmdldEJveCB8fD0gQHRhcmdldC5kb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0XG5cdFx0QHkgLSBAdGFyZ2V0Qm94OnRvcFxuXG5cdCMjI1xuXHRCdXR0b24gcHJlc3NlZCBpbiB0aGlzIHRvdWNoLiBOYXRpdmUgdG91Y2hlcyBkZWZhdWx0cyB0byBsZWZ0LWNsaWNrICgwKVxuXHRAcmV0dXJuIHtOdW1iZXJ9XG5cdCMjI1xuXHRkZWYgYnV0dG9uIGRvIEBidXR0b24gIyBAcG9pbnRlciA/IEBwb2ludGVyLmJ1dHRvbiA6IDBcblxuXHRkZWYgc291cmNlVGFyZ2V0XG5cdFx0QHNvdXJjZVRhcmdldFxuXG5cbmNsYXNzIEltYmEuVG91Y2hHZXN0dXJlXG5cblx0cHJvcCBhY3RpdmUgZGVmYXVsdDogbm9cblxuXHRkZWYgb250b3VjaHN0YXJ0IGVcblx0XHRzZWxmXG5cblx0ZGVmIG9udG91Y2h1cGRhdGUgZVxuXHRcdHNlbGZcblxuXHRkZWYgb250b3VjaGVuZCBlXG5cdFx0c2VsZlxuXG5cbiMgQSBUb3VjaC1ldmVudCBpcyBjcmVhdGVkIG9uIG1vdXNlZG93biAoYWx3YXlzKVxuIyBhbmQgd2hpbGUgaXQgZXhpc3RzLCBtb3VzZW1vdmUgYW5kIG1vdXNldXAgd2lsbFxuIyBiZSBkZWxlZ2F0ZWQgdG8gdGhpcyBhY3RpdmUgZXZlbnQuXG5JbWJhLlBPSU5URVIgPSBJbWJhLlBvaW50ZXIubmV3XG5JbWJhLlBPSU5URVJTID0gW0ltYmEuUE9JTlRFUl1cblxuXG4jIHJlZ3VsYXIgZXZlbnQgc3R1ZmZcbkltYmEuS0VZTUFQID0ge1xuXHRcIjhcIjogJ2JhY2tzcGFjZSdcblx0XCI5XCI6ICd0YWInXG5cdFwiMTNcIjogJ2VudGVyJ1xuXHRcIjE2XCI6ICdzaGlmdCdcblx0XCIxN1wiOiAnY3RybCdcblx0XCIxOFwiOiAnYWx0J1xuXHRcIjE5XCI6ICdicmVhaydcblx0XCIyMFwiOiAnY2Fwcydcblx0XCIyN1wiOiAnZXNjJ1xuXHRcIjMyXCI6ICdzcGFjZSdcblx0XCIzNVwiOiAnZW5kJ1xuXHRcIjM2XCI6ICdob21lJ1xuXHRcIjM3XCI6ICdsYXJyJ1xuXHRcIjM4XCI6ICd1YXJyJ1xuXHRcIjM5XCI6ICdyYXJyJ1xuXHRcIjQwXCI6ICdkYXJyJ1xuXHRcIjQ1XCI6ICdpbnNlcnQnXG5cdFwiNDZcIjogJ2RlbGV0ZSdcblx0XCIxMDdcIjogJ3BsdXMnXG5cdFwiMTA2XCI6ICdtdWx0J1xuXHRcIjkxXCI6ICdtZXRhJ1xufVxuXG5JbWJhLkNIQVJNQVAgPSB7XG5cdFwiJVwiOiAnbW9kdWxvJ1xuXHRcIipcIjogJ211bHRpcGx5J1xuXHRcIitcIjogJ2FkZCdcblx0XCItXCI6ICdzdWInXG5cdFwiL1wiOiAnZGl2aWRlJ1xuXHRcIi5cIjogJ2RvdCdcbn1cblxuIyMjXG5JbWJhIGhhbmRsZXMgYWxsIGV2ZW50cyBpbiB0aGUgZG9tIHRocm91Z2ggYSBzaW5nbGUgbWFuYWdlcixcbmxpc3RlbmluZyBhdCB0aGUgcm9vdCBvZiB5b3VyIGRvY3VtZW50LiBJZiBJbWJhIGZpbmRzIGEgdGFnXG50aGF0IGxpc3RlbnMgdG8gYSBjZXJ0YWluIGV2ZW50LCB0aGUgZXZlbnQgd2lsbCBiZSB3cmFwcGVkIFxuaW4gYW4gYEltYmEuRXZlbnRgLCB3aGljaCBub3JtYWxpemVzIHNvbWUgb2YgdGhlIHF1aXJrcyBhbmQgXG5icm93c2VyIGRpZmZlcmVuY2VzLlxuXG5AaW5hbWUgZXZlbnRcbiMjI1xuY2xhc3MgSW1iYS5FdmVudFxuXG5cdCMjIyByZWZlcmVuY2UgdG8gdGhlIG5hdGl2ZSBldmVudCAjIyNcblx0cHJvcCBldmVudFxuXG5cdCMjIyByZWZlcmVuY2UgdG8gdGhlIG5hdGl2ZSBldmVudCAjIyNcblx0cHJvcCBwcmVmaXhcblxuXHRwcm9wIGRhdGFcblxuXHQjIyNcblx0c2hvdWxkIHJlbW92ZSB0aGlzIGFsbHRvZ2V0aGVyP1xuXHRAZGVwcmVjYXRlZFxuXHQjIyNcblx0cHJvcCBzb3VyY2VcblxuXHQjIyMgQSB7Qm9vbGVhbn0gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBldmVudCBidWJibGVzIHVwIG9yIG5vdCAjIyNcblx0cHJvcCBidWJibGUgdHlwZTogQm9vbGVhbiwgY2hhaW5hYmxlOiB5ZXNcblxuXHRkZWYgc2VsZi53cmFwIGVcblx0XHRzZWxmLm5ldyhlKVxuXHRcblx0ZGVmIGluaXRpYWxpemUgZVxuXHRcdGV2ZW50ID0gZVxuXHRcdGJ1YmJsZSA9IHllc1xuXG5cdGRlZiB0eXBlPSB0eXBlXG5cdFx0QHR5cGUgPSB0eXBlXG5cdFx0c2VsZlxuXG5cdCMjI1xuXHRAcmV0dXJuIHtTdHJpbmd9IFRoZSBuYW1lIG9mIHRoZSBldmVudCAoY2FzZS1pbnNlbnNpdGl2ZSlcblx0IyMjXG5cdGRlZiB0eXBlXG5cdFx0QHR5cGUgfHwgZXZlbnQ6dHlwZVxuXG5cdGRlZiBuYW1lXG5cdFx0QG5hbWUgfHw9IHR5cGUudG9Mb3dlckNhc2UucmVwbGFjZSgvXFw6L2csJycpXG5cblx0IyBtaW1jIGdldHNldFxuXHRkZWYgYnViYmxlIHZcblx0XHRpZiB2ICE9IHVuZGVmaW5lZFxuXHRcdFx0c2VsZi5idWJibGUgPSB2XG5cdFx0XHRyZXR1cm4gc2VsZlxuXHRcdHJldHVybiBAYnViYmxlXG5cblx0IyMjXG5cdFByZXZlbnRzIGZ1cnRoZXIgcHJvcGFnYXRpb24gb2YgdGhlIGN1cnJlbnQgZXZlbnQuIERvZXMgbm90XG5cdHN0b3AgdGhlIGV2ZW50IGZyb20gYmVpbmcgaGFuZGxlZCBieSBvdGhlciBsaXN0ZW5lcnMgb3V0c2lkZVxuXHRvZiBJbWJhLlxuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIGhhbHRcblx0XHRidWJibGUgPSBub1xuXHRcdHNlbGZcblxuXHQjIyNcblx0Q2FuY2VsIHRoZSBldmVudCAoaWYgY2FuY2VsYWJsZSkuIEluIHRoZSBjYXNlIG9mIG5hdGl2ZSBldmVudHMgaXRcblx0d2lsbCBjYWxsIGBwcmV2ZW50RGVmYXVsdGAgb24gdGhlIHdyYXBwZWQgZXZlbnQgb2JqZWN0LlxuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIGNhbmNlbFxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0IGlmIGV2ZW50OnByZXZlbnREZWZhdWx0XG5cdFx0QGNhbmNlbCA9IHllc1xuXHRcdHNlbGZcblxuXHRkZWYgc2lsZW5jZVxuXHRcdEBzaWxlbmNlZCA9IHllc1xuXHRcdHNlbGZcblxuXHRkZWYgaXNTaWxlbmNlZFxuXHRcdCEhQHNpbGVuY2VkXG5cblx0IyMjXG5cdEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBldmVudC5jYW5jZWwgaGFzIGJlZW4gY2FsbGVkLlxuXG5cdEByZXR1cm4ge0Jvb2xlYW59XG5cdCMjI1xuXHRkZWYgaXNQcmV2ZW50ZWRcblx0XHRldmVudCBhbmQgZXZlbnQ6ZGVmYXVsdFByZXZlbnRlZCBvciBAY2FuY2VsXG5cblx0IyMjXG5cdEEgcmVmZXJlbmNlIHRvIHRoZSBpbml0aWFsIHRhcmdldCBvZiB0aGUgZXZlbnQuXG5cdCMjI1xuXHRkZWYgdGFyZ2V0XG5cdFx0dGFnKGV2ZW50Ol90YXJnZXQgb3IgZXZlbnQ6dGFyZ2V0KVxuXG5cdCMjI1xuXHRBIHJlZmVyZW5jZSB0byB0aGUgb2JqZWN0IHJlc3BvbmRpbmcgdG8gdGhlIGV2ZW50LlxuXHQjIyNcblx0ZGVmIHJlc3BvbmRlclxuXHRcdEByZXNwb25kZXJcblxuXHQjIyNcblx0UmVkaXJlY3QgdGhlIGV2ZW50IHRvIG5ldyB0YXJnZXRcblx0IyMjXG5cdGRlZiByZWRpcmVjdCBub2RlXG5cdFx0QHJlZGlyZWN0ID0gbm9kZVxuXHRcdHNlbGZcblxuXHQjIyNcblx0R2V0IHRoZSBub3JtYWxpemVkIGNoYXJhY3RlciBmb3IgS2V5Ym9hcmRFdmVudC9UZXh0RXZlbnRcblx0QHJldHVybiB7U3RyaW5nfVxuXHQjIyNcblx0ZGVmIGtleWNoYXJcblx0XHRpZiBldmVudCBpc2EgS2V5Ym9hcmRFdmVudFxuXHRcdFx0dmFyIGtpID0gZXZlbnQ6a2V5SWRlbnRpZmllclxuXHRcdFx0dmFyIHN5bSA9IEltYmEuS0VZTUFQW2V2ZW50OmtleUNvZGVdXG5cblx0XHRcdGlmICFzeW0gYW5kIGtpLnN1YnN0cigwLDIpID09IFwiVStcIlxuXHRcdFx0XHRzeW0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGtpLnN1YnN0cigyKSwgMTYpKVxuXHRcdFx0cmV0dXJuIHN5bVxuXG5cdFx0ZWxpZiBldmVudCBpc2EgKHdpbmRvdy5UZXh0RXZlbnQgb3Igd2luZG93LklucHV0RXZlbnQpXG5cdFx0XHRyZXR1cm4gZXZlbnQ6ZGF0YVxuXG5cdFx0cmV0dXJuIG51bGxcblxuXHQjIyNcblx0QGRlcHJlY2F0ZWRcblx0IyMjXG5cdGRlZiBrZXljb21ib1xuXHRcdHJldHVybiB1bmxlc3MgdmFyIHN5bSA9IGtleWNoYXJcblx0XHRzeW0gPSBJbWJhLkNIQVJNQVBbc3ltXSBvciBzeW1cblx0XHR2YXIgY29tYm8gPSBbXSwgZSA9IGV2ZW50XG5cdFx0Y29tYm8ucHVzaCg6Y3RybCkgaWYgZTpjdHJsS2V5XG5cdFx0Y29tYm8ucHVzaCg6c2hpZnQpIGlmIGU6c2hpZnRLZXlcblx0XHRjb21iby5wdXNoKDphbHQpIGlmIGU6YWx0S2V5XG5cdFx0Y29tYm8ucHVzaCg6Y21kKSBpZiBlOm1ldGFLZXlcblx0XHRjb21iby5wdXNoKHN5bSlcblx0XHRjb21iby5qb2luKFwiX1wiKS50b0xvd2VyQ2FzZVxuXG5cblx0ZGVmIHByb2Nlc3Ncblx0XHR2YXIgbWV0aCA9IFwib257QHByZWZpeCBvciAnJ317bmFtZX1cIlxuXHRcdHZhciBhcmdzID0gbnVsbFxuXHRcdHZhciBkb210YXJnZXQgPSBldmVudDpfdGFyZ2V0IG9yIGV2ZW50OnRhcmdldFx0XHRcblx0XHQjIHZhciBub2RlID0gPHtkb210YXJnZXQ6X3Jlc3BvbmRlciBvciBkb210YXJnZXR9PlxuXHRcdCMgbmVlZCB0byBjbGVhbiB1cCBhbmQgZG9jdW1lbnQgdGhpcyBiZWhhdmlvdXJcblxuXHRcdHZhciBkb21ub2RlID0gZG9tdGFyZ2V0Ol9yZXNwb25kZXIgb3IgZG9tdGFyZ2V0XG5cdFx0IyBAdG9kbyBuZWVkIHRvIHN0b3AgaW5maW5pdGUgcmVkaXJlY3QtcnVsZXMgaGVyZVxuXG5cdFx0d2hpbGUgZG9tbm9kZVxuXHRcdFx0QHJlZGlyZWN0ID0gbnVsbFxuXHRcdFx0aWYgdmFyIG5vZGUgPSB0YWcoZG9tbm9kZSkgIyBub3Qgb25seSB0YWcgXG5cblx0XHRcdFx0aWYgbm9kZVttZXRoXSBpc2EgU3RyaW5nXG5cdFx0XHRcdFx0IyBzaG91bGQgcmVtZW1iZXIgdGhlIHJlY2VpdmVyIG9mIHRoZSBldmVudFxuXHRcdFx0XHRcdG1ldGggPSBub2RlW21ldGhdXG5cdFx0XHRcdFx0Y29udGludWUgIyBzaG91bGQgbm90IGNvbnRpbnVlP1xuXG5cdFx0XHRcdGlmIG5vZGVbbWV0aF0gaXNhIEFycmF5XG5cdFx0XHRcdFx0YXJncyA9IG5vZGVbbWV0aF0uY29uY2F0KG5vZGUpXG5cdFx0XHRcdFx0bWV0aCA9IGFyZ3Muc2hpZnRcblx0XHRcdFx0XHRjb250aW51ZSAjIHNob3VsZCBub3QgY29udGludWU/XG5cblx0XHRcdFx0aWYgbm9kZVttZXRoXSBpc2EgRnVuY3Rpb25cblx0XHRcdFx0XHRAcmVzcG9uZGVyIHx8PSBub2RlXG5cdFx0XHRcdFx0IyBzaG91bGQgYXV0b3N0b3AgYnViYmxlIGhlcmU/XG5cdFx0XHRcdFx0YXJncyA/IG5vZGVbbWV0aF0uYXBwbHkobm9kZSxhcmdzKSA6IG5vZGVbbWV0aF0oc2VsZixkYXRhKVxuXHRcdFx0XHRcdFxuXHRcdFx0IyBhZGQgbm9kZS5uZXh0RXZlbnRSZXNwb25kZXIgYXMgYSBzZXBhcmF0ZSBtZXRob2QgaGVyZT9cblx0XHRcdHVubGVzcyBidWJibGUgYW5kIGRvbW5vZGUgPSAoQHJlZGlyZWN0IG9yIChub2RlID8gbm9kZS5wYXJlbnQgOiBkb21ub2RlOnBhcmVudE5vZGUpKVxuXHRcdFx0XHRicmVha1xuXG5cdFx0cHJvY2Vzc2VkXG5cdFx0cmV0dXJuIHNlbGZcblxuXG5cdGRlZiBwcm9jZXNzZWRcblx0XHRJbWJhLmVtaXQoSW1iYSwnZXZlbnQnLFtzZWxmXSkgdW5sZXNzIEBzaWxlbmNlZFxuXHRcdHNlbGZcblxuXHQjIyNcblx0UmV0dXJuIHRoZSB4L2xlZnQgY29vcmRpbmF0ZSBvZiB0aGUgbW91c2UgLyBwb2ludGVyIGZvciB0aGlzIGV2ZW50XG5cdEByZXR1cm4ge051bWJlcn0geCBjb29yZGluYXRlIG9mIG1vdXNlIC8gcG9pbnRlciBmb3IgZXZlbnRcblx0IyMjXG5cdGRlZiB4IGRvIGV2ZW50OnhcblxuXHQjIyNcblx0UmV0dXJuIHRoZSB5L3RvcCBjb29yZGluYXRlIG9mIHRoZSBtb3VzZSAvIHBvaW50ZXIgZm9yIHRoaXMgZXZlbnRcblx0QHJldHVybiB7TnVtYmVyfSB5IGNvb3JkaW5hdGUgb2YgbW91c2UgLyBwb2ludGVyIGZvciBldmVudFxuXHQjIyNcblx0ZGVmIHkgZG8gZXZlbnQ6eVxuXG5cdCMjI1xuXHRSZXR1cm5zIGEgTnVtYmVyIHJlcHJlc2VudGluZyBhIHN5c3RlbSBhbmQgaW1wbGVtZW50YXRpb25cblx0ZGVwZW5kZW50IG51bWVyaWMgY29kZSBpZGVudGlmeWluZyB0aGUgdW5tb2RpZmllZCB2YWx1ZSBvZiB0aGVcblx0cHJlc3NlZCBrZXk7IHRoaXMgaXMgdXN1YWxseSB0aGUgc2FtZSBhcyBrZXlDb2RlLlxuXG5cdEZvciBtb3VzZS1ldmVudHMsIHRoZSByZXR1cm5lZCB2YWx1ZSBpbmRpY2F0ZXMgd2hpY2ggYnV0dG9uIHdhc1xuXHRwcmVzc2VkIG9uIHRoZSBtb3VzZSB0byB0cmlnZ2VyIHRoZSBldmVudC5cblxuXHRAcmV0dXJuIHtOdW1iZXJ9XG5cdCMjI1xuXHRkZWYgd2hpY2ggZG8gZXZlbnQ6d2hpY2hcblxuXG4jIyNcblxuTWFuYWdlciBmb3IgbGlzdGVuaW5nIHRvIGFuZCBkZWxlZ2F0aW5nIGV2ZW50cyBpbiBJbWJhLiBBIHNpbmdsZSBpbnN0YW5jZVxuaXMgYWx3YXlzIGNyZWF0ZWQgYnkgSW1iYSAoYXMgYEltYmEuRXZlbnRzYCksIHdoaWNoIGhhbmRsZXMgYW5kIGRlbGVnYXRlcyBhbGxcbmV2ZW50cyBhdCB0aGUgdmVyeSByb290IG9mIHRoZSBkb2N1bWVudC4gSW1iYSBkb2VzIG5vdCBjYXB0dXJlIGFsbCBldmVudHNcbmJ5IGRlZmF1bHQsIHNvIGlmIHlvdSB3YW50IHRvIG1ha2Ugc3VyZSBleG90aWMgb3IgY3VzdG9tIERPTUV2ZW50cyBhcmUgZGVsZWdhdGVkXG5pbiBJbWJhIHlvdSB3aWxsIG5lZWQgdG8gcmVnaXN0ZXIgdGhlbSBpbiBgSW1iYS5FdmVudHMucmVnaXN0ZXIobXlDdXN0b21FdmVudE5hbWUpYFxuXG5AaW5hbWUgbWFuYWdlclxuXG4jIyNcbmNsYXNzIEltYmEuRXZlbnRNYW5hZ2VyXG5cblx0cHJvcCByb290XG5cdHByb3AgY291bnRcblx0cHJvcCBlbmFibGVkIGRlZmF1bHQ6IG5vLCB3YXRjaDogeWVzXG5cdHByb3AgbGlzdGVuZXJzXG5cdHByb3AgZGVsZWdhdG9yc1xuXHRwcm9wIGRlbGVnYXRvclxuXG5cdGRlZiBlbmFibGVkLWRpZC1zZXQgYm9vbFxuXHRcdGJvb2wgPyBvbmVuYWJsZSA6IG9uZGlzYWJsZVxuXHRcdHNlbGZcblxuXHRkZWYgaW5pdGlhbGl6ZSBub2RlLCBldmVudHM6IFtdXG5cdFx0cm9vdCA9IG5vZGVcblx0XHRjb3VudCA9IDBcblx0XHRsaXN0ZW5lcnMgPSBbXVxuXHRcdGRlbGVnYXRvcnMgPSB7fVxuXHRcdGRlbGVnYXRvciA9IGRvIHxlfCBcblx0XHRcdCMgY29uc29sZS5sb2cgXCJkZWxlZ2F0aW5nIGV2ZW50PyEge2V9XCJcblx0XHRcdGRlbGVnYXRlKGUpXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXG5cdFx0Zm9yIGV2ZW50IGluIGV2ZW50c1xuXHRcdFx0cmVnaXN0ZXIoZXZlbnQpXG5cblx0XHRyZXR1cm4gc2VsZlxuXG5cdCMjI1xuXG5cdFRlbGwgdGhlIGN1cnJlbnQgRXZlbnRNYW5hZ2VyIHRvIGludGVyY2VwdCBhbmQgaGFuZGxlIGV2ZW50IG9mIGEgY2VydGFpbiBuYW1lLlxuXHRCeSBkZWZhdWx0LCBJbWJhLkV2ZW50cyB3aWxsIHJlZ2lzdGVyIGludGVyY2VwdG9ycyBmb3I6ICprZXlkb3duKiwgKmtleXVwKiwgXG5cdCprZXlwcmVzcyosICp0ZXh0SW5wdXQqLCAqaW5wdXQqLCAqY2hhbmdlKiwgKnN1Ym1pdCosICpmb2N1c2luKiwgKmZvY3Vzb3V0KiwgXG5cdCpibHVyKiwgKmNvbnRleHRtZW51KiwgKmRibGNsaWNrKiwgKm1vdXNld2hlZWwqLCAqd2hlZWwqXG5cblx0IyMjXG5cdGRlZiByZWdpc3RlciBuYW1lLCBoYW5kbGVyID0gdHJ1ZVxuXHRcdGlmIG5hbWUgaXNhIEFycmF5XG5cdFx0XHRyZWdpc3Rlcih2LGhhbmRsZXIpIGZvciB2IGluIG5hbWVcblx0XHRcdHJldHVybiBzZWxmXG5cblx0XHRyZXR1cm4gc2VsZiBpZiBkZWxlZ2F0b3JzW25hbWVdXG5cdFx0IyBjb25zb2xlLmxvZyhcInJlZ2lzdGVyIGZvciBldmVudCB7bmFtZX1cIilcblx0XHR2YXIgZm4gPSBkZWxlZ2F0b3JzW25hbWVdID0gaGFuZGxlciBpc2EgRnVuY3Rpb24gPyBoYW5kbGVyIDogZGVsZWdhdG9yXG5cdFx0cm9vdC5hZGRFdmVudExpc3RlbmVyKG5hbWUsZm4seWVzKSBpZiBlbmFibGVkXG5cblx0ZGVmIGxpc3RlbiBuYW1lLCBoYW5kbGVyLCBjYXB0dXJlID0geWVzXG5cdFx0bGlzdGVuZXJzLnB1c2goW25hbWUsaGFuZGxlcixjYXB0dXJlXSlcblx0XHRyb290LmFkZEV2ZW50TGlzdGVuZXIobmFtZSxoYW5kbGVyLGNhcHR1cmUpIGlmIGVuYWJsZWRcblx0XHRzZWxmXG5cblx0ZGVmIGRlbGVnYXRlIGVcblx0XHRjb3VudCArPSAxXG5cdFx0dmFyIGV2ZW50ID0gSW1iYS5FdmVudC53cmFwKGUpXG5cdFx0ZXZlbnQucHJvY2Vzc1xuXHRcdHNlbGZcblxuXHRkZWYgY3JlYXRlIHR5cGUsIHRhcmdldCwgZGF0YTogbnVsbCwgc291cmNlOiBudWxsXG5cdFx0dmFyIGV2ZW50ID0gSW1iYS5FdmVudC53cmFwIHR5cGU6IHR5cGUsIHRhcmdldDogdGFyZ2V0XG5cdFx0ZXZlbnQuZGF0YSA9IGRhdGEgaWYgZGF0YVxuXHRcdGV2ZW50LnNvdXJjZSA9IHNvdXJjZSBpZiBzb3VyY2Vcblx0XHRldmVudFxuXG5cdCMgdXNlIGNyZWF0ZSBpbnN0ZWFkP1xuXHRkZWYgdHJpZ2dlclxuXHRcdGNyZWF0ZSgqYXJndW1lbnRzKS5wcm9jZXNzXG5cblx0ZGVmIG9uZW5hYmxlXG5cdFx0Zm9yIG93biBuYW1lLGhhbmRsZXIgb2YgZGVsZWdhdG9yc1xuXHRcdFx0cm9vdC5hZGRFdmVudExpc3RlbmVyKG5hbWUsaGFuZGxlcix5ZXMpXG5cblx0XHRmb3IgaXRlbSBpbiBsaXN0ZW5lcnNcblx0XHRcdHJvb3QuYWRkRXZlbnRMaXN0ZW5lcihpdGVtWzBdLGl0ZW1bMV0saXRlbVsyXSlcblx0XHRzZWxmXG5cblx0ZGVmIG9uZGlzYWJsZVxuXHRcdGZvciBvd24gbmFtZSxoYW5kbGVyIG9mIGRlbGVnYXRvcnNcblx0XHRcdHJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLGhhbmRsZXIseWVzKVxuXG5cdFx0Zm9yIGl0ZW0gaW4gbGlzdGVuZXJzXG5cdFx0XHRyb290LnJlbW92ZUV2ZW50TGlzdGVuZXIoaXRlbVswXSxpdGVtWzFdLGl0ZW1bMl0pXG5cdFx0c2VsZlxuXHRcdFxuXG5FRCA9IEltYmEuRXZlbnRzID0gSW1iYS5FdmVudE1hbmFnZXIubmV3KGRvY3VtZW50LCBldmVudHM6IFtcblx0OmtleWRvd24sOmtleXVwLDprZXlwcmVzcyw6dGV4dElucHV0LDppbnB1dCw6Y2hhbmdlLDpzdWJtaXQsXG5cdDpmb2N1c2luLDpmb2N1c291dCw6Ymx1ciw6Y29udGV4dG1lbnUsOmRibGNsaWNrLFxuXHQ6bW91c2V3aGVlbCw6d2hlZWwsOnNjcm9sbFxuXSlcblxuIyBzaG91bGQgc2V0IHRoZXNlIHVwIGluc2lkZSB0aGUgSW1iYS5FdmVudHMgb2JqZWN0IGl0c2VsZlxuIyBzbyB0aGF0IHdlIGNhbiBoYXZlIGRpZmZlcmVudCBFdmVudE1hbmFnZXIgZm9yIGRpZmZlcmVudCByb290c1xuXG5pZiBoYXNUb3VjaEV2ZW50c1xuXHRJbWJhLkV2ZW50cy5saXN0ZW4oOnRvdWNoc3RhcnQpIGRvIHxlfFxuXHRcdEltYmEuRXZlbnRzLmNvdW50Kytcblx0XHRJbWJhLlRvdWNoLm9udG91Y2hzdGFydChlKVxuXG5cdEltYmEuRXZlbnRzLmxpc3Rlbig6dG91Y2htb3ZlKSBkbyB8ZXxcblx0XHRJbWJhLkV2ZW50cy5jb3VudCsrXG5cdFx0SW1iYS5Ub3VjaC5vbnRvdWNobW92ZShlKVxuXG5cdEltYmEuRXZlbnRzLmxpc3Rlbig6dG91Y2hlbmQpIGRvIHxlfFxuXHRcdEltYmEuRXZlbnRzLmNvdW50Kytcblx0XHRJbWJhLlRvdWNoLm9udG91Y2hlbmQoZSlcblxuXHRJbWJhLkV2ZW50cy5saXN0ZW4oOnRvdWNoY2FuY2VsKSBkbyB8ZXxcblx0XHRJbWJhLkV2ZW50cy5jb3VudCsrXG5cdFx0SW1iYS5Ub3VjaC5vbnRvdWNoY2FuY2VsKGUpXG5cbkltYmEuRXZlbnRzLnJlZ2lzdGVyKDpjbGljaykgZG8gfGV8XG5cdCMgT25seSBmb3IgbWFpbiBtb3VzZWJ1dHRvbiwgbm8/XG5cdGlmIChlOnRpbWVTdGFtcCAtIGxhc3ROYXRpdmVUb3VjaFRpbWVTdGFtcCkgPiBsYXN0TmF0aXZlVG91Y2hUaW1lb3V0XG5cdFx0dmFyIHRhcCA9IEltYmEuRXZlbnQubmV3KGUpXG5cdFx0dGFwLnR5cGUgPSAndGFwJ1xuXHRcdHRhcC5wcm9jZXNzXG5cdFx0aWYgdGFwLkByZXNwb25kZXJcblx0XHRcdHJldHVybiBlLnByZXZlbnREZWZhdWx0XG5cdCMgZGVsZWdhdGUgdGhlIHJlYWwgY2xpY2sgZXZlbnRcblx0SW1iYS5FdmVudHMuZGVsZWdhdGUoZSlcblxuSW1iYS5FdmVudHMubGlzdGVuKDptb3VzZWRvd24pIGRvIHxlfFxuXHRpZiAoZTp0aW1lU3RhbXAgLSBsYXN0TmF0aXZlVG91Y2hUaW1lU3RhbXApID4gbGFzdE5hdGl2ZVRvdWNoVGltZW91dFxuXHRcdEltYmEuUE9JTlRFUi51cGRhdGUoZSkucHJvY2VzcyBpZiBJbWJhLlBPSU5URVJcblxuIyBJbWJhLkV2ZW50cy5saXN0ZW4oOm1vdXNlbW92ZSkgZG8gfGV8XG4jIFx0IyBjb25zb2xlLmxvZyAnbW91c2Vtb3ZlJyxlOnRpbWVTdGFtcFxuIyBcdGlmIChlOnRpbWVTdGFtcCAtIGxhc3ROYXRpdmVUb3VjaFRpbWVTdGFtcCkgPiBsYXN0TmF0aXZlVG91Y2hUaW1lb3V0XG4jIFx0XHRJbWJhLlBPSU5URVIudXBkYXRlKGUpLnByb2Nlc3MgaWYgSW1iYS5QT0lOVEVSICMgLnByb2Nlc3MgaWYgdG91Y2ggIyBzaG91bGQgbm90IGhhcHBlbj8gV2UgcHJvY2VzcyB0aHJvdWdoIFxuXG5JbWJhLkV2ZW50cy5saXN0ZW4oOm1vdXNldXApIGRvIHxlfFxuXHQjIGNvbnNvbGUubG9nICdtb3VzZXVwJyxlOnRpbWVTdGFtcFxuXHRpZiAoZTp0aW1lU3RhbXAgLSBsYXN0TmF0aXZlVG91Y2hUaW1lU3RhbXApID4gbGFzdE5hdGl2ZVRvdWNoVGltZW91dFxuXHRcdEltYmEuUE9JTlRFUi51cGRhdGUoZSkucHJvY2VzcyBpZiBJbWJhLlBPSU5URVJcblxuXG5JbWJhLkV2ZW50cy5yZWdpc3RlcihbOm1vdXNlZG93biw6bW91c2V1cF0pXG5JbWJhLkV2ZW50cy5lbmFibGVkID0geWVzXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbm9kZV9tb2R1bGVzL2ltYmEvc3JjL2ltYmEvZG9tLmV2ZW50cy5pbWJhXG4gKiovIiwidmFyIEltYmFUYWcgPSBJbWJhLlRBR1M6ZWxlbWVudFxuXG5kZWYgcmVtb3ZlTmVzdGVkIHJvb3QsIG5vZGUsIGNhcmV0XG5cdCMgaWYgbm9kZS9ub2RlcyBpc2EgU3RyaW5nXG5cdCMgXHR3ZSBuZWVkIHRvIHVzZSB0aGUgY2FyZXQgdG8gcmVtb3ZlIGVsZW1lbnRzXG5cdCMgXHRmb3Igbm93IHdlIHdpbGwgc2ltcGx5IG5vdCBzdXBwb3J0IHRoaXNcblx0aWYgbm9kZSBpc2EgSW1iYVRhZ1xuXHRcdHJvb3QucmVtb3ZlQ2hpbGQobm9kZSlcblx0ZWxpZiBub2RlIGlzYSBBcnJheVxuXHRcdHJlbW92ZU5lc3RlZChyb290LG1lbWJlcixjYXJldCkgZm9yIG1lbWJlciBpbiBub2RlXG5cdGVsc2Vcblx0XHQjIHdoYXQgaWYgdGhpcyBpcyBub3QgbnVsbD8hPyE/XG5cdFx0IyB0YWtlIGEgY2hhbmNlIGFuZCByZW1vdmUgYSB0ZXh0LWVsZW1lbnRuZ1xuXHRcdGxldCBuZXh0ID0gY2FyZXQgPyBjYXJldDpuZXh0U2libGluZyA6IHJvb3QuQGRvbTpmaXJzdENoaWxkXG5cdFx0aWYgbmV4dCBpc2EgVGV4dCBhbmQgbmV4dDp0ZXh0Q29udGVudCA9PSBub2RlXG5cdFx0XHRyb290LnJlbW92ZUNoaWxkKG5leHQpXG5cdFx0ZWxzZVxuXHRcdFx0dGhyb3cgJ2Nhbm5vdCByZW1vdmUgc3RyaW5nJ1xuXG5cdHJldHVybiBjYXJldFxuXG5kZWYgYXBwZW5kTmVzdGVkIHJvb3QsIG5vZGVcblx0aWYgbm9kZSBpc2EgSW1iYVRhZ1xuXHRcdHJvb3QuYXBwZW5kQ2hpbGQobm9kZSlcblxuXHRlbGlmIG5vZGUgaXNhIEFycmF5XG5cdFx0YXBwZW5kTmVzdGVkKHJvb3QsbWVtYmVyKSBmb3IgbWVtYmVyIGluIG5vZGVcblxuXHRlbGlmIG5vZGUgIT0gbnVsbCBhbmQgbm9kZSAhPT0gZmFsc2Vcblx0XHRyb290LmFwcGVuZENoaWxkIEltYmEuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZSlcblxuXHRyZXR1cm5cblxuXG4jIGluc2VydCBub2RlcyBiZWZvcmUgYSBjZXJ0YWluIG5vZGVcbiMgZG9lcyBub3QgbmVlZCB0byByZXR1cm4gYW55IHRhaWwsIGFzIGJlZm9yZVxuIyB3aWxsIHN0aWxsIGJlIGNvcnJlY3QgdGhlcmVcbiMgYmVmb3JlIG11c3QgYmUgYW4gYWN0dWFsIGRvbW5vZGVcbmRlZiBpbnNlcnROZXN0ZWRCZWZvcmUgcm9vdCwgbm9kZSwgYmVmb3JlXG5cdGlmIG5vZGUgaXNhIEltYmFUYWdcblx0XHRyb290Lmluc2VydEJlZm9yZShub2RlLGJlZm9yZSlcblx0ZWxpZiBub2RlIGlzYSBBcnJheVxuXHRcdGluc2VydE5lc3RlZEJlZm9yZShyb290LG1lbWJlcixiZWZvcmUpIGZvciBtZW1iZXIgaW4gbm9kZVxuXHRlbGlmIG5vZGUgIT0gbnVsbCBhbmQgbm9kZSAhPT0gZmFsc2Vcblx0XHRyb290Lmluc2VydEJlZm9yZShJbWJhLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpLGJlZm9yZSlcblxuXHRyZXR1cm4gYmVmb3JlXG5cbiMgYWZ0ZXIgbXVzdCBiZSBhbiBhY3R1YWwgZG9tbm9kZVxuZGVmIGluc2VydE5lc3RlZEFmdGVyIHJvb3QsIG5vZGUsIGFmdGVyXG5cdHZhciBiZWZvcmUgPSBhZnRlciA/IGFmdGVyOm5leHRTaWJsaW5nIDogcm9vdC5AZG9tOmZpcnN0Q2hpbGRcblxuXHRpZiBiZWZvcmVcblx0XHRpbnNlcnROZXN0ZWRCZWZvcmUocm9vdCxub2RlLGJlZm9yZSlcblx0XHRyZXR1cm4gYmVmb3JlOnByZXZpb3VzU2libGluZ1xuXHRlbHNlXG5cdFx0YXBwZW5kTmVzdGVkKHJvb3Qsbm9kZSlcblx0XHRyZXR1cm4gcm9vdC5AZG9tOmxhc3RDaGlsZFxuXG5kZWYgcmVjb25jaWxlQ29sbGVjdGlvbkNoYW5nZXMgcm9vdCwgbmV3LCBvbGQsIGNhcmV0XG5cblx0dmFyIG5ld0xlbiA9IG5ldzpsZW5ndGhcblx0dmFyIGxhc3ROZXcgPSBuZXdbbmV3TGVuIC0gMV1cblxuXHQjIFRoaXMgcmUtb3JkZXIgYWxnb3JpdGhtIGlzIGJhc2VkIG9uIHRoZSBmb2xsb3dpbmcgcHJpbmNpcGxlOlxuXHQjIFxuXHQjIFdlIGJ1aWxkIGEgXCJjaGFpblwiIHdoaWNoIHNob3dzIHdoaWNoIGl0ZW1zIGFyZSBhbHJlYWR5IHNvcnRlZC5cblx0IyBJZiB3ZSdyZSBnb2luZyBmcm9tIFsxLCAyLCAzXSAtPiBbMiwgMSwgM10sIHRoZSB0cmVlIGxvb2tzIGxpa2U6XG5cdCNcblx0IyBcdDMgLT4gIDAgKGlkeClcblx0IyBcdDIgLT4gLTEgKGlkeClcblx0IyBcdDEgLT4gLTEgKGlkeClcblx0I1xuXHQjIFRoaXMgdGVsbHMgdXMgdGhhdCB3ZSBoYXZlIHR3byBjaGFpbnMgb2Ygb3JkZXJlZCBpdGVtczpcblx0IyBcblx0IyBcdCgxLCAzKSBhbmQgKDIpXG5cdCMgXG5cdCMgVGhlIG9wdGltYWwgcmUtb3JkZXJpbmcgdGhlbiBiZWNvbWVzIHR3byBrZWVwIHRoZSBsb25nZXN0IGNoYWluIGludGFjdCxcblx0IyBhbmQgbW92ZSBhbGwgdGhlIG90aGVyIGl0ZW1zLlxuXG5cdHZhciBuZXdQb3NpdGlvbiA9IFtdXG5cblx0IyBUaGUgdHJlZS9ncmFwaCBpdHNlbGZcblx0dmFyIHByZXZDaGFpbiA9IFtdXG5cdCMgVGhlIGxlbmd0aCBvZiB0aGUgY2hhaW5cblx0dmFyIGxlbmd0aENoYWluID0gW11cblxuXHQjIEtlZXAgdHJhY2sgb2YgdGhlIGxvbmdlc3QgY2hhaW5cblx0dmFyIG1heENoYWluTGVuZ3RoID0gMFxuXHR2YXIgbWF4Q2hhaW5FbmQgPSAwXG5cblx0Zm9yIG5vZGUsIGlkeCBpbiBvbGRcblx0XHR2YXIgbmV3UG9zID0gbmV3LmluZGV4T2Yobm9kZSlcblx0XHRuZXdQb3NpdGlvbi5wdXNoKG5ld1BvcylcblxuXHRcdGlmIG5ld1BvcyA9PSAtMVxuXHRcdFx0cm9vdC5yZW1vdmVDaGlsZChub2RlKVxuXHRcdFx0cHJldkNoYWluLnB1c2goLTEpXG5cdFx0XHRsZW5ndGhDaGFpbi5wdXNoKC0xKVxuXHRcdFx0Y29udGludWVcblxuXHRcdHZhciBwcmV2SWR4ID0gbmV3UG9zaXRpb246bGVuZ3RoIC0gMlxuXG5cdFx0IyBCdWlsZCB0aGUgY2hhaW46XG5cdFx0d2hpbGUgcHJldklkeCA+PSAwXG5cdFx0XHRpZiBuZXdQb3NpdGlvbltwcmV2SWR4XSA9PSAtMVxuXHRcdFx0XHRwcmV2SWR4LS1cblx0XHRcdGVsaWYgbmV3UG9zID4gbmV3UG9zaXRpb25bcHJldklkeF1cblx0XHRcdFx0IyBZYXksIHdlJ3JlIGJpZ2dlciB0aGFuIHRoZSBwcmV2aW91cyFcblx0XHRcdFx0YnJlYWtcblx0XHRcdGVsc2Vcblx0XHRcdFx0IyBOb3BlLCBsZXQncyB3YWxrIGJhY2sgdGhlIGNoYWluXG5cdFx0XHRcdHByZXZJZHggPSBwcmV2Q2hhaW5bcHJldklkeF1cblxuXHRcdHByZXZDaGFpbi5wdXNoKHByZXZJZHgpXG5cblx0XHR2YXIgY3Vyckxlbmd0aCA9IChwcmV2SWR4ID09IC0xKSA/IDAgOiBsZW5ndGhDaGFpbltwcmV2SWR4XSsxXG5cblx0XHRpZiBjdXJyTGVuZ3RoID4gbWF4Q2hhaW5MZW5ndGhcblx0XHRcdG1heENoYWluTGVuZ3RoID0gY3Vyckxlbmd0aFxuXHRcdFx0bWF4Q2hhaW5FbmQgPSBpZHhcblxuXHRcdGxlbmd0aENoYWluLnB1c2goY3Vyckxlbmd0aClcblxuXHR2YXIgc3RpY2t5Tm9kZXMgPSBbXVxuXG5cdCMgTm93IHdlIGNhbiB3YWxrIHRoZSBsb25nZXN0IGNoYWluIGJhY2t3YXJkcyBhbmQgbWFyayB0aGVtIGFzIFwic3RpY2t5XCIsXG5cdCMgd2hpY2ggaW1wbGllcyB0aGF0IHRoZXkgc2hvdWxkIG5vdCBiZSBtb3ZlZFxuXHR2YXIgY3Vyc29yID0gbmV3UG9zaXRpb246bGVuZ3RoIC0gMVxuXHR3aGlsZSBjdXJzb3IgPj0gMFxuXHRcdGlmIGN1cnNvciA9PSBtYXhDaGFpbkVuZCBhbmQgbmV3UG9zaXRpb25bY3Vyc29yXSAhPSAtMVxuXHRcdFx0c3RpY2t5Tm9kZXNbbmV3UG9zaXRpb25bY3Vyc29yXV0gPSB0cnVlXG5cdFx0XHRtYXhDaGFpbkVuZCA9IHByZXZDaGFpblttYXhDaGFpbkVuZF1cblx0XHRcblx0XHRjdXJzb3IgLT0gMVxuXG5cdCMgQW5kIGxldCdzIGl0ZXJhdGUgZm9yd2FyZCwgYnV0IG9ubHkgbW92ZSBub24tc3RpY2t5IG5vZGVzXG5cdGZvciBub2RlLCBpZHggaW4gbmV3XG5cdFx0aWYgIXN0aWNreU5vZGVzW2lkeF1cblx0XHRcdHZhciBhZnRlciA9IG5ld1tpZHggLSAxXVxuXHRcdFx0aW5zZXJ0TmVzdGVkQWZ0ZXIocm9vdCwgbm9kZSwgKGFmdGVyIGFuZCBhZnRlci5AZG9tKSBvciBjYXJldClcblxuXHQjIHNob3VsZCB0cnVzdCB0aGF0IHRoZSBsYXN0IGl0ZW0gaW4gbmV3IGxpc3QgaXMgdGhlIGNhcmV0XG5cdHJldHVybiBsYXN0TmV3IGFuZCBsYXN0TmV3LkBkb20gb3IgY2FyZXRcblxuXG4jIGV4cGVjdHMgYSBmbGF0IG5vbi1zcGFyc2UgYXJyYXkgb2Ygbm9kZXMgaW4gYm90aCBuZXcgYW5kIG9sZCwgYWx3YXlzXG5kZWYgcmVjb25jaWxlQ29sbGVjdGlvbiByb290LCBuZXcsIG9sZCwgY2FyZXRcblx0dmFyIGsgPSBuZXc6bGVuZ3RoXG5cdHZhciBpID0ga1xuXHR2YXIgbGFzdCA9IG5ld1trIC0gMV1cblxuXG5cdGlmIGsgPT0gb2xkOmxlbmd0aCBhbmQgbmV3WzBdID09PSBvbGRbMF1cblx0XHQjIHJ1bm5pbmcgdGhyb3VnaCB0byBjb21wYXJlXG5cdFx0d2hpbGUgaS0tXG5cdFx0XHRicmVhayBpZiBuZXdbaV0gIT09IG9sZFtpXVxuXG5cdGlmIGkgPT0gLTFcblx0XHRyZXR1cm4gbGFzdCBhbmQgbGFzdC5AZG9tIG9yIGNhcmV0XG5cdGVsc2Vcblx0XHRyZXR1cm4gcmVjb25jaWxlQ29sbGVjdGlvbkNoYW5nZXMocm9vdCxuZXcsb2xkLGNhcmV0KVxuXG4jIHRoZSBnZW5lcmFsIHJlY29uY2lsZXIgdGhhdCByZXNwZWN0cyBjb25kaXRpb25zIGV0Y1xuIyBjYXJldCBpcyB0aGUgY3VycmVudCBub2RlIHdlIHdhbnQgdG8gaW5zZXJ0IHRoaW5ncyBhZnRlclxuZGVmIHJlY29uY2lsZU5lc3RlZCByb290LCBuZXcsIG9sZCwgY2FyZXRcblxuXHQjIGlmIG5ldyA9PSBudWxsIG9yIG5ldyA9PT0gZmFsc2Ugb3IgbmV3ID09PSB0cnVlXG5cdCMgXHRpZiBuZXcgPT09IG9sZFxuXHQjIFx0XHRyZXR1cm4gY2FyZXRcblx0IyBcdGlmIG9sZCAmJiBuZXcgIT0gb2xkXG5cdCMgXHRcdHJlbW92ZU5lc3RlZChyb290LG9sZCxjYXJldCkgaWYgb2xkXG5cdCMgXG5cdCMgXHRyZXR1cm4gY2FyZXRcblxuXHQjIHZhciBza2lwbmV3ID0gbmV3ID09IG51bGwgb3IgbmV3ID09PSBmYWxzZSBvciBuZXcgPT09IHRydWVcblx0dmFyIG5ld0lzTnVsbCA9IG5ldyA9PSBudWxsIG9yIG5ldyA9PT0gZmFsc2Vcblx0dmFyIG9sZElzTnVsbCA9IG9sZCA9PSBudWxsIG9yIG9sZCA9PT0gZmFsc2VcblxuXG5cdGlmIG5ldyA9PT0gb2xkXG5cdFx0IyByZW1lbWJlciB0aGF0IHRoZSBjYXJldCBtdXN0IGJlIGFuIGFjdHVhbCBkb20gZWxlbWVudFxuXHRcdCMgd2Ugc2hvdWxkIGluc3RlYWQgbW92ZSB0aGUgYWN0dWFsIGNhcmV0PyAtIHRydXN0XG5cdFx0aWYgbmV3SXNOdWxsXG5cdFx0XHRyZXR1cm4gY2FyZXRcblx0XHRlbGlmIG5ldyBhbmQgbmV3LkBkb21cblx0XHRcdHJldHVybiBuZXcuQGRvbVxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBjYXJldCA/IGNhcmV0Om5leHRTaWJsaW5nIDogcm9vdC5AZG9tOmZpcnN0Q2hpbGRcblxuXHRlbGlmIG5ldyBpc2EgQXJyYXlcblx0XHRpZiBvbGQgaXNhIEFycmF5XG5cdFx0XHRpZiBuZXc6c3RhdGljIG9yIG9sZDpzdGF0aWNcblx0XHRcdFx0IyBpZiB0aGUgc3RhdGljIGlzIG5vdCBuZXN0ZWQgLSB3ZSBjb3VsZCBnZXQgYSBoaW50IGZyb20gY29tcGlsZXJcblx0XHRcdFx0IyBhbmQganVzdCBza2lwIGl0XG5cdFx0XHRcdGlmIG5ldzpzdGF0aWMgPT0gb2xkOnN0YXRpY1xuXHRcdFx0XHRcdGZvciBpdGVtLGkgaW4gbmV3XG5cdFx0XHRcdFx0XHQjIHRoaXMgaXMgd2hlcmUgd2UgY291bGQgZG8gdGhlIHRyaXBsZSBlcXVhbCBkaXJlY3RseVxuXHRcdFx0XHRcdFx0Y2FyZXQgPSByZWNvbmNpbGVOZXN0ZWQocm9vdCxpdGVtLG9sZFtpXSxjYXJldClcblx0XHRcdFx0XHRyZXR1cm4gY2FyZXRcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHJlbW92ZU5lc3RlZChyb290LG9sZCxjYXJldClcblx0XHRcdFx0XHRcblx0XHRcdFx0IyBpZiB0aGV5IGFyZSBub3QgdGhlIHNhbWUgd2UgY29udGludWUgdGhyb3VnaCB0byB0aGUgZGVmYXVsdFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gcmVjb25jaWxlQ29sbGVjdGlvbihyb290LG5ldyxvbGQsY2FyZXQpXG5cblx0XHRlbGlmIG9sZCBpc2EgSW1iYVRhZ1xuXHRcdFx0cm9vdC5yZW1vdmVDaGlsZChvbGQpXG5cdFx0ZWxpZiAhb2xkSXNOdWxsXG5cdFx0XHQjIG9sZCB3YXMgYSBzdHJpbmctbGlrZSBvYmplY3Q/XG5cdFx0XHRyb290LnJlbW92ZUNoaWxkKGNhcmV0ID8gY2FyZXQ6bmV4dFNpYmxpbmcgOiByb290LkBkb206Zmlyc3RDaGlsZClcdFx0XHRcblxuXHRcdHJldHVybiBpbnNlcnROZXN0ZWRBZnRlcihyb290LG5ldyxjYXJldClcblx0XHQjIHJlbW92ZSBvbGRcblxuXHRlbGlmIG5ldyBpc2EgSW1iYVRhZ1xuXHRcdHJlbW92ZU5lc3RlZChyb290LG9sZCxjYXJldCkgdW5sZXNzIG9sZElzTnVsbFxuXHRcdGluc2VydE5lc3RlZEFmdGVyKHJvb3QsbmV3LGNhcmV0KVxuXHRcdHJldHVybiBuZXdcblxuXHRlbGlmIG5ld0lzTnVsbFxuXHRcdHJlbW92ZU5lc3RlZChyb290LG9sZCxjYXJldCkgdW5sZXNzIG9sZElzTnVsbFxuXHRcdHJldHVybiBjYXJldFxuXHRlbHNlXG5cdFx0IyBpZiBvbGQgZGlkIG5vdCBleGlzdCB3ZSBuZWVkIHRvIGFkZCBhIG5ldyBkaXJlY3RseVxuXHRcdGxldCBuZXh0Tm9kZVxuXHRcdCMgaWYgb2xkIHdhcyBhcnJheSBvciBpbWJhdGFnIHdlIG5lZWQgdG8gcmVtb3ZlIGl0IGFuZCB0aGVuIGFkZFxuXHRcdGlmIG9sZCBpc2EgQXJyYXlcblx0XHRcdHJlbW92ZU5lc3RlZChyb290LG9sZCxjYXJldClcblx0XHRlbGlmIG9sZCBpc2EgSW1iYVRhZ1xuXHRcdFx0cm9vdC5yZW1vdmVDaGlsZChvbGQpXG5cdFx0ZWxpZiAhb2xkSXNOdWxsXG5cdFx0XHQjIC4uLlxuXHRcdFx0bmV4dE5vZGUgPSBjYXJldCA/IGNhcmV0Om5leHRTaWJsaW5nIDogcm9vdC5AZG9tOmZpcnN0Q2hpbGRcblx0XHRcdGlmIG5leHROb2RlIGlzYSBUZXh0IGFuZCBuZXh0Tm9kZTp0ZXh0Q29udGVudCAhPSBuZXdcblx0XHRcdFx0bmV4dE5vZGU6dGV4dENvbnRlbnQgPSBuZXdcblx0XHRcdFx0cmV0dXJuIG5leHROb2RlXG5cblx0XHQjIG5vdyBhZGQgdGhlIHRleHRub2RlXG5cdFx0cmV0dXJuIGluc2VydE5lc3RlZEFmdGVyKHJvb3QsbmV3LGNhcmV0KVxuXG5cbmV4dGVuZCB0YWcgaHRtbGVsZW1lbnRcblx0XG5cdGRlZiBzZXRDaGlsZHJlbiBuZXcsIHR5cFxuXHRcdHZhciBvbGQgPSBAY2hpbGRyZW5cblx0XHQjIHZhciBpc0FycmF5ID0gbm9kZXMgaXNhIEFycmF5XG5cdFx0aWYgbmV3ID09PSBvbGRcblx0XHRcdHJldHVybiBzZWxmXG5cblx0XHRpZiAhb2xkXG5cdFx0XHRlbXB0eVxuXHRcdFx0YXBwZW5kTmVzdGVkKHNlbGYsbmV3KVxuXG5cdFx0ZWxpZiB0eXAgPT0gMlxuXHRcdFx0cmV0dXJuIHNlbGZcblxuXHRcdGVsaWYgdHlwID09IDFcblx0XHRcdCMgaGVyZSB3ZSBfa25vdyBfdGhhdCBpdCBpcyBhbiBhcnJheSB3aXRoIHRoZSBzYW1lIHNoYXBlXG5cdFx0XHQjIGV2ZXJ5IHRpbWVcblx0XHRcdGxldCBjYXJldCA9IG51bGxcblx0XHRcdGZvciBpdGVtLGkgaW4gbmV3XG5cdFx0XHRcdCMgcHJldiA9IG9sZFtpXVxuXHRcdFx0XHRjYXJldCA9IHJlY29uY2lsZU5lc3RlZChzZWxmLGl0ZW0sb2xkW2ldLGNhcmV0KVxuXG5cdFx0ZWxpZiB0eXAgPT0gM1xuXHRcdFx0IyB0aGlzIGlzIHBvc3NpYmx5IGZ1bGx5IGR5bmFtaWMuIEl0IG9mdGVuIGlzXG5cdFx0XHQjIGJ1dCB0aGUgb2xkIG9yIG5ldyBjb3VsZCBiZSBzdGF0aWMgd2hpbGUgdGhlIG90aGVyIGlzIG5vdFxuXHRcdFx0IyB0aGlzIGlzIG5vdCBoYW5kbGVkIG5vd1xuXHRcdFx0IyB3aGF0IGlmIGl0IHdhcyBwcmV2aW91c2x5IGEgc3RhdGljIGFycmF5PyBlZGdlY2FzZSAtIGJ1dCBtdXN0IHdvcmtcblx0XHRcdGlmIG5ldyBpc2EgSW1iYVRhZ1xuXHRcdFx0XHRlbXB0eVxuXHRcdFx0XHRhcHBlbmRDaGlsZChuZXcpXG5cblx0XHRcdCMgY2hlY2sgaWYgb2xkIGFuZCBuZXcgaXNhIGFycmF5XG5cdFx0XHRlbGlmIG5ldyBpc2EgQXJyYXlcblx0XHRcdFx0aWYgb2xkIGlzYSBBcnJheVxuXHRcdFx0XHRcdCMgaXMgdGhpcyBub3QgdGhlIHNhbWUgYXMgc2V0dGluZyBzdGF0aWNDaGlsZHJlbiBub3cgYnV0IHdpdGggdGhlXG5cdFx0XHRcdFx0cmVjb25jaWxlQ29sbGVjdGlvbihzZWxmLG5ldyxvbGQsbnVsbClcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGVtcHR5XG5cdFx0XHRcdFx0YXBwZW5kTmVzdGVkKHNlbGYsbmV3KVxuXHRcdFx0XHRcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGV4dCA9IG5ld1xuXHRcdFx0XHRyZXR1cm4gc2VsZlxuXG5cdFx0ZWxpZiBuZXcgaXNhIEFycmF5IGFuZCBvbGQgaXNhIEFycmF5XG5cdFx0XHRyZWNvbmNpbGVDb2xsZWN0aW9uKHNlbGYsbmV3LG9sZCxudWxsKVxuXHRcdGVsc2Vcblx0XHRcdGVtcHR5XG5cdFx0XHRhcHBlbmROZXN0ZWQoc2VsZixuZXcpXG5cblx0XHRAY2hpbGRyZW4gPSBuZXdcblx0XHRyZXR1cm4gc2VsZlxuXG5cblx0IyBvbmx5IGV2ZXIgY2FsbGVkIHdpdGggYXJyYXkgYXMgYXJndW1lbnRcblx0ZGVmIHNldFN0YXRpY0NoaWxkcmVuIG5ld1xuXHRcdHZhciBvbGQgPSBAY2hpbGRyZW5cblxuXHRcdGxldCBjYXJldCA9IG51bGxcblx0XHRmb3IgaXRlbSxpIGluIG5ld1xuXHRcdFx0IyBwcmV2ID0gb2xkW2ldXG5cdFx0XHRjYXJldCA9IHJlY29uY2lsZU5lc3RlZChzZWxmLGl0ZW0sb2xkW2ldLGNhcmV0KVxuXG5cdFx0QGNoaWxkcmVuID0gbmV3XG5cdFx0cmV0dXJuIHNlbGZcblxuXHRkZWYgY29udGVudFxuXHRcdEBjb250ZW50IG9yIGNoaWxkcmVuLnRvQXJyYXlcblxuXHRkZWYgdGV4dD0gdGV4dFxuXHRcdGlmIHRleHQgIT0gQGNoaWxkcmVuXG5cdFx0XHRAY2hpbGRyZW4gPSB0ZXh0XG5cdFx0XHRkb206dGV4dENvbnRlbnQgPSB0ZXh0ID09IG51bGwgb3IgdGV4dCA9PT0gZmFsc2UgPyAnJyA6IHRleHRcblx0XHRzZWxmXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbm9kZV9tb2R1bGVzL2ltYmEvc3JjL2ltYmEvZG9tLnN0YXRpYy5pbWJhXG4gKiovIiwiXG4jIyNcblRoZSBzcGVjaWFsIHN5bnRheCBmb3Igc2VsZWN0b3JzIGluIEltYmEgY3JlYXRlcyBJbWJhLlNlbGVjdG9yXG5pbnN0YW5jZXMuXG4jIyNcbmNsYXNzIEltYmEuU2VsZWN0b3Jcblx0XG5cdGRlZiBzZWxmLm9uZSBzZWwsIHNjb3BlXG5cdFx0dmFyIGVsID0gKHNjb3BlIHx8IEltYmEuZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsKVxuXHRcdGVsICYmIHRhZyhlbCkgfHwgbnVsbFxuXG5cdGRlZiBzZWxmLmFsbCBzZWwsIHNjb3BlXG5cdFx0SW1iYS5TZWxlY3Rvci5uZXcoc2VsLHNjb3BlKVxuXG5cdHByb3AgcXVlcnlcblxuXHRkZWYgaW5pdGlhbGl6ZSBzZWwsIHNjb3BlLCBub2Rlc1xuXG5cdFx0QHF1ZXJ5ID0gc2VsIGlzYSBJbWJhLlNlbGVjdG9yID8gc2VsLnF1ZXJ5IDogc2VsXG5cdFx0QGNvbnRleHQgPSBzY29wZVxuXG5cdFx0aWYgbm9kZXNcblx0XHRcdEBub2RlcyA9ICh0YWcobm9kZSkgZm9yIG5vZGUgaW4gbm9kZXMpXG5cblx0XHRAbGF6eSA9ICFub2Rlc1xuXHRcdHJldHVybiBzZWxmXG5cblx0ZGVmIHJlbG9hZFxuXHRcdEBub2RlcyA9IG51bGxcblx0XHRzZWxmXG5cblx0ZGVmIHNjb3BlXG5cdFx0cmV0dXJuIEBzY29wZSBpZiBAc2NvcGVcblx0XHRyZXR1cm4gSW1iYS5kb2N1bWVudCB1bmxlc3MgdmFyIGN0eCA9IEBjb250ZXh0XG5cdFx0QHNjb3BlID0gY3R4OnRvU2NvcGUgPyBjdHgudG9TY29wZSA6IGN0eFxuXG5cdCMjI1xuXHRAcmV0dXJucyB7SW1iYS5UYWd9IGZpcnN0IG5vZGUgbWF0Y2hpbmcgdGhpcyBzZWxlY3RvclxuXHQjIyNcblx0ZGVmIGZpcnN0XG5cdFx0aWYgQGxhenkgdGhlbiB0YWcoQGZpcnN0IHx8PSBzY29wZS5xdWVyeVNlbGVjdG9yKHF1ZXJ5KSlcblx0XHRlbHNlIG5vZGVzWzBdXG5cblx0IyMjXG5cdEByZXR1cm5zIHtJbWJhLlRhZ30gbGFzdCBub2RlIG1hdGNoaW5nIHRoaXMgc2VsZWN0b3Jcblx0IyMjXG5cdGRlZiBsYXN0XG5cdFx0bm9kZXNbQG5vZGVzOmxlbmd0aCAtIDFdXG5cblx0IyMjXG5cdEByZXR1cm5zIFtJbWJhLlRhZ10gYWxsIG5vZGVzIG1hdGNoaW5nIHRoaXMgc2VsZWN0b3Jcblx0IyMjXG5cdGRlZiBub2Rlc1xuXHRcdHJldHVybiBAbm9kZXMgaWYgQG5vZGVzXG5cdFx0dmFyIGl0ZW1zID0gc2NvcGUucXVlcnlTZWxlY3RvckFsbChxdWVyeSlcblx0XHRAbm9kZXMgPSAodGFnKG5vZGUpIGZvciBub2RlIGluIGl0ZW1zKVxuXHRcdEBsYXp5ID0gbm9cblx0XHRAbm9kZXNcblx0XG5cdCMjI1xuXHRUaGUgbnVtYmVyIG9mIG5vZGVzIG1hdGNoaW5nIHRoaXMgc2VsZWN0b3Jcblx0IyMjXG5cdGRlZiBjb3VudCBkbyBub2RlczpsZW5ndGhcblxuXHRkZWYgbGVuIGRvIG5vZGVzOmxlbmd0aFxuXG5cdCMjI1xuXHRAdG9kbyBBZGQgc3VwcG9ydCBmb3IgYmxvY2sgb3Igc2VsZWN0b3I/XG5cdCMjI1xuXHRkZWYgc29tZVxuXHRcdGNvdW50ID49IDFcblx0XG5cdCMjI1xuXHRHZXQgbm9kZSBhdCBpbmRleFxuXHQjIyNcblx0ZGVmIGF0IGlkeFxuXHRcdG5vZGVzW2lkeF1cblxuXHQjIyNcblx0TG9vcCB0aHJvdWdoIG5vZGVzXG5cdCMjI1xuXHRkZWYgZm9yRWFjaCBibG9ja1xuXHRcdG5vZGVzLmZvckVhY2goYmxvY2spXG5cdFx0c2VsZlxuXG5cdCMjI1xuXHRNYXAgbm9kZXNcblx0IyMjXG5cdGRlZiBtYXAgYmxvY2tcblx0XHRub2Rlcy5tYXAoYmxvY2spXG5cblx0IyMjXG5cdFJldHVybnMgYSBwbGFpbiBhcnJheSBjb250YWluaW5nIG5vZGVzLiBJbXBsaWNpdGx5IGNhbGxlZFxuXHR3aGVuIGl0ZXJhdGluZyBvdmVyIGEgc2VsZWN0b3IgaW4gSW1iYSBgKG5vZGUgZm9yIG5vZGUgaW4gJChzZWxlY3RvcikpYFxuXHQjIyNcblx0ZGVmIHRvQXJyYXlcblx0XHRub2Rlc1xuXHRcblx0IyBHZXQgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBtYXRjaGVzIHRoZSBzZWxlY3RvciwgXG5cdCMgYmVnaW5uaW5nIGF0IHRoZSBjdXJyZW50IGVsZW1lbnQgYW5kIHByb2dyZXNzaW5nIHVwIHRocm91Z2ggdGhlIERPTSB0cmVlXG5cdGRlZiBjbG9zZXN0IHNlbFxuXHRcdCMgc2VlbXMgc3RyYW5nZSB0aGF0IHdlIGFsdGVyIHRoaXMgc2VsZWN0b3I/XG5cdFx0QG5vZGVzID0gbWFwIGRvIHxub2RlfCBub2RlLmNsb3Nlc3Qoc2VsKVxuXHRcdHNlbGZcblxuXHQjIEdldCB0aGUgc2libGluZ3Mgb2YgZWFjaCBlbGVtZW50IGluIHRoZSBzZXQgb2YgbWF0Y2hlZCBlbGVtZW50cywgXG5cdCMgb3B0aW9uYWxseSBmaWx0ZXJlZCBieSBhIHNlbGVjdG9yLlxuXHQjIFRPRE8gcmVtb3ZlIGR1cGxpY2F0ZXM/XG5cdGRlZiBzaWJsaW5ncyBzZWxcblx0XHRAbm9kZXMgPSBtYXAgZG8gfG5vZGV8IG5vZGUuc2libGluZ3Moc2VsKVxuXHRcdHNlbGZcblxuXHQjIEdldCB0aGUgZGVzY2VuZGFudHMgb2YgZWFjaCBlbGVtZW50IGluIHRoZSBjdXJyZW50IHNldCBvZiBtYXRjaGVkIFxuXHQjIGVsZW1lbnRzLCBmaWx0ZXJlZCBieSBhIHNlbGVjdG9yLlxuXHRkZWYgZmluZCBzZWxcblx0XHRAbm9kZXMgPSBfX3F1ZXJ5X18oc2VsLnF1ZXJ5LCBub2Rlcylcblx0XHRzZWxmXG5cblx0ZGVmIHJlamVjdCBibGtcblx0XHRmaWx0ZXIoYmxrLG5vKVxuXG5cdCMjI1xuXHRGaWx0ZXIgdGhlIG5vZGVzIGluIHNlbGVjdG9yIGJ5IGEgZnVuY3Rpb24gb3Igb3RoZXIgc2VsZWN0b3Jcblx0IyMjXG5cdGRlZiBmaWx0ZXIgYmxrLCBib29sID0geWVzXG5cdFx0dmFyIGZuID0gYmxrIGlzYSBGdW5jdGlvbiBhbmQgYmxrIG9yICh8bnwgbi5tYXRjaGVzKGJsaykgKVxuXHRcdHZhciBhcnkgPSBub2Rlcy5maWx0ZXIofG58IGZuKG4pID09IGJvb2wpXG5cdFx0IyBpZiB3ZSB3YW50IHRvIHJldHVybiBhIG5ldyBzZWxlY3RvciBmb3IgdGhpcywgd2Ugc2hvdWxkIGRvIHRoYXQgZm9yXG5cdFx0IyBvdGhlcnMgYXMgd2VsbFxuXHRcdEltYmEuU2VsZWN0b3IubmV3KFwiXCIsIEBzY29wZSwgYXJ5KVxuXG5cdGRlZiBfX3F1ZXJ5X18gcXVlcnksIGNvbnRleHRzXG5cdFx0dmFyIG5vZGVzID0gW11cblx0XHR2YXIgaSA9IDBcblx0XHR2YXIgbCA9IGNvbnRleHRzOmxlbmd0aFxuXG5cdFx0d2hpbGUgaSA8IGxcblx0XHRcdG5vZGVzLnB1c2goKmNvbnRleHRzW2krK10ucXVlcnlTZWxlY3RvckFsbChxdWVyeSkpXG5cdFx0cmV0dXJuIG5vZGVzXG5cblx0ZGVmIF9fbWF0Y2hlc19fXG5cdFx0cmV0dXJuIHllc1xuXG5cdCMjI1xuXHRBZGQgc3BlY2lmaWVkIGZsYWcgdG8gYWxsIG5vZGVzIGluIHNlbGVjdG9yXG5cdCMjI1xuXHRkZWYgZmxhZyBmbGFnXG5cdFx0Zm9yRWFjaCBkbyB8bnwgbi5mbGFnKGZsYWcpXG5cblx0IyMjXG5cdFJlbW92ZSBzcGVjaWZpZWQgZmxhZyBmcm9tIGFsbCBub2RlcyBpbiBzZWxlY3RvclxuXHQjIyNcblx0ZGVmIHVuZmxhZyBmbGFnXG5cdFx0Zm9yRWFjaCBkbyB8bnwgbi51bmZsYWcoZmxhZylcblxuXG4jIGRlZiBJbWJhLnF1ZXJ5U2VsZWN0b3JBbGxcbnEkID0gZG8gfHNlbCxzY29wZXwgSW1iYS5TZWxlY3Rvci5uZXcoc2VsLCBzY29wZSlcblxuIyBkZWYgSW1iYS5TZWxlY3Rvci5vbmVcbnEkJCA9IGRvIHxzZWwsc2NvcGV8IFxuXHR2YXIgZWwgPSAoc2NvcGUgfHwgSW1iYS5kb2N1bWVudCkucXVlcnlTZWxlY3RvcihzZWwpXG5cdGVsICYmIHRhZyhlbCkgfHwgbmlsXG5cblxuIyBleHRlbmRpbmcgdGFncyB3aXRoIHF1ZXJ5LW1ldGhvZHNcbiMgbXVzdCBiZSBhIGJldHRlciB3YXkgdG8gcmVvcGVuIGNsYXNzZXNcbmV4dGVuZCB0YWcgZWxlbWVudFxuXHRkZWYgcXVlcnlTZWxlY3RvckFsbCBxIGRvIEBkb20ucXVlcnlTZWxlY3RvckFsbCBxXG5cdGRlZiBxdWVyeVNlbGVjdG9yIHEgZG8gQGRvbS5xdWVyeVNlbGVjdG9yIHFcblxuXHQjIHNob3VsZCBiZSBtb3ZlZCB0byBJbWJhLlRhZyBpbnN0ZWFkP1xuXHQjIG9yIHdlIHNob3VsZCBpbXBsZW1lbnQgYWxsIG9mIHRoZW0gaGVyZVxuXHRkZWYgZmluZCBzZWwgZG8gSW1iYS5TZWxlY3Rvci5uZXcoc2VsLHNlbGYpXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIG5vZGVfbW9kdWxlcy9pbWJhL3NyYy9pbWJhL3NlbGVjdG9yLmltYmFcbiAqKi8iLCJcbmV4cG9ydCBjbGFzcyBUb2RvXG5cblx0dmFyIGlkID0gMFxuXG5cdHByb3AgdGl0bGVcblx0cHJvcCBjb21wbGV0ZWRcblxuXHRkZWYgaW5pdGlhbGl6ZSB0aXRsZSwgY29tcGxldGVkID0gbm9cblx0XHRAaWQgPSBpZCsrXG5cdFx0QHRpdGxlID0gdGl0bGVcblx0XHRAY29tcGxldGVkID0gY29tcGxldGVkXG5cblx0ZGVmIGlkXG5cdFx0QGlkXG5cblx0ZGVmIHRvSlNPTlxuXHRcdHt0aXRsZTogdGl0bGUsIGNvbXBsZXRlZDogY29tcGxldGVkfVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9tb2RlbC5pbWJhXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==