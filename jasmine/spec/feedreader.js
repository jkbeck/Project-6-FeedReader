/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a URL that is not empty', function() {
            var allFeedLength = allFeeds.length;

            for(var i = 0; i < allFeedLength; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe("");
                }
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a name that is not empty', function() {
            var allFeedLength = allFeeds.length;

            for(var i = 0; i < allFeedLength; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default.
         */
        it('should have menu element hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('should toggle menu when menu icon is clicked', function(){
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(false);
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0);
            setTimeout(function() {
                done();
            }, 1000);
        });

        it('should load at least one entry', function(done) {
            expect($('.feed').find('article').hasClass('entry')).toBe(true);
            done();
        });
    });

    describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var firstFeedH2, firstFeedTitle, secondFeedTitle, secondFeedH2;

        beforeEach(function(done) {
            loadFeed(0, function() {
                //Grab Title and H2 html from first feed for comparison to next feed
                firstFeedTitle = $('.header h1').html();
                firstFeedH2 = $(".feed .entry h2").html();

                loadFeed(1, function() {
                    done();
                });
            });
        });

        it('header & article titles should change when a new feed is loaded', function(done){
            secondFeedTitle = $('.header h1').html();
            expect(secondFeedTitle).not.toBe(firstFeedTitle);
            expect(secondFeedH2).not.toBe(firstFeedH2);
            done();
        });
    });
}());
