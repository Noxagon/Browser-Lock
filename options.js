// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
let pass0 = document.getElementById('oldPass');
let pass1 = document.getElementById('newPass');
let pass2 = document.getElementById('cfmPass');
let message = document.getElementById('message');

function check() {
	let submitbtn = document.getElementById('submitbtn');
	submitbtn.addEventListener('click', function() {
		verify();
	})
	
	let resetbtn = document.getElementById('resetbtn');
	resetbtn.addEventListener('click', function() {
		reset();
	})
}

function verify() {
	chrome.storage.sync.get('password', function (value) {
		var passOld = value.password;
		if (pass0.value != passOld) {
			message.innerHTML = "Old password do not match!";
		} else if (pass1.value.trim() === "" || pass2.value.trim() === "") {
			message.innerHTML = "Password must not be empty!";
		} else if (pass1.value != pass2.value) {
			message.innerHTML = "Password do not match!";
		} else {
			chrome.storage.sync.set({'password': pass2.value}, function() {
				message.innerHTML = "Password set!";
			});
		}
	}); 
}

function reset() {
	chrome.storage.sync.get('password', function (value) {
		var passOld = value.password;
		if (pass0.value != passOld) {
			message.innerHTML = "Old password do not match!";
		} else {
			chrome.storage.sync.set({'password': ""}, function() {
				message.innerHTML = "Password reset!";
			});
		}

	}); 
}
	
check();
