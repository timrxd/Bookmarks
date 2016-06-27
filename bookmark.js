// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });

}

$( document ).ready(function() {

    $("body").width(300);

    /*chrome.storage.sync.set({ 'Bookmarks': {
                                "Google": "https://www.google.com",
                                "StackOverflow": "https://StackOverflow.com"
                             }}, function(){
        //  A data saved callback omg so fancy
    });*/

    chrome.storage.sync.get("Bookmarks", function(items){

        items = items["Bookmarks"]

        $.each( items, function( key, value ) {

            $("#bm_list")
            .append(
                $('<p/>')
                // Update Button
                .append(
                    $('<button/>')
                    .attr("id", "update_" + key)
                    .addClass("button")
                    .click(function() {
                        getCurrentTabUrl(function(s) {
                            items[key] = s;
                            chrome.storage.sync.set({ 'Bookmarks': items });
                        })
                    })
                    .css("background-color", "#99ff99")
                    .css("width", "10%")
                    .append("<p/>")
                        .text("[U]"))

                // Bookmark Button
                .append(
                    $('<button/>')
                    .attr("id", "goto_" + key)
                    .addClass("button")
                    .click(function() {
                        chrome.tabs.create( { url: items[key]} );
                    })
                    .css("width", "70%")
                    .css("background-color", "#ffffff")
                    .append("<p/>")
                        .text(key))

                // Delete Button
                .append(
                    $('<button/>')
                    .attr("id", "delete_" + key)
                    .addClass("button")
                    .click(function() {
                        $("#update_"+key).remove();
                        $("#goto_"+key).remove();
                        $("#delete_"+key).remove();
                        delete items[key];
                        chrome.storage.sync.set({ 'Bookmarks': items });
                    })
                    .css("background-color", "#ffad99")
                    .css("width", "10%")
                    .append("<p/>")
                        .text("[X]"))
            );
        });



    });



    $("#newButton").click(function() {

        chrome.storage.sync.get("Bookmarks", function(items){

            items = items["Bookmarks"];
            var name = $("#name").val();

            if (name == "") {
                $("#output").text("Enter a name")
            }
            else if (name in items) {
                $("#output").text("Bookmark already exists")
            }
            else {

                $("#output").html("&nbsp;")
                getCurrentTabUrl(function(url) {
                    // Add to items
                    items[name] = url;
                    chrome.storage.sync.set({ 'Bookmarks': items });

                    $("#bm_list")
                    .append(
                        $('<p/>')
                        // Update Button
                        .append(
                            $('<button/>')
                            .attr("id", "update_" + name)
                            .addClass("button")
                            .click(function() {
                                getCurrentTabUrl(function(s) {
                                    items[name] = s;
                                    chrome.storage.sync.set({ 'Bookmarks': items });
                                })
                            })
                            .css("background-color", "#99ff99")
                            .css("width", "10%")
                            .append("<p/>")
                                .text("[U]"))

                        // Bookmark Button
                        .append(
                            $('<button/>')
                            .attr("id", "goto_" + name)
                            .addClass("button")
                            .click(function() {
                                chrome.tabs.create( { url: items[name]} );
                            })
                            .css("width", "70%")
                            .css("background-color", "#ffffff")
                            .append("<p/>")
                                .text(name))

                        // Delete Button
                        .append(
                            $('<button/>')
                            .attr("id", "delete_" + name)
                            .addClass("button")
                            .click(function() {
                                $("#update_"+name).remove();
                                $("#goto_"+name).remove();
                                $("#delete_"+name).remove();
                                delete items[name];
                                chrome.storage.sync.set({ 'Bookmarks': items });
                            })
                            .css("background-color", "#ffad99")
                            .css("width", "10%")
                            .append("<p/>")
                                .text("[X]"))
                    ); // Append to bm_list

                }) // Current url

            } // Else

        }) // Sync Get

    }) // Button click


}); // Doc ready
















//
