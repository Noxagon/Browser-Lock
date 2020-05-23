// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
var pass = "";

chrome.runtime.onInstalled.addListener(function() {
	//Initialise password as null
	chrome.storage.sync.set({'password': ""});
	chrome.tabs.create({ url: "options.html" });
});

chrome.runtime.onStartup.addListener(function() {
	chrome.storage.sync.get('password', function (value) {
		if (value.password != "") {
			pass = prompt("Password");
		}
	});
	
	check();
})

function closeWindow() {
	chrome.windows.getCurrent({}, function(window) {
		chrome.windows.remove(window.id);
	});
}

function check() {
	if (pass == null) {
		closeWindow();
	}
	
	chrome.storage.sync.get('password', function (value) {
		if (pass != value.password) {
			closeWindow();
		}
	}); 
}
