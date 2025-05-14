// Adapted from code by Matt Walters https://www.mattwalters.net/posts/hugo-and-lunr/

(function ($) {
    'use strict';

    $(document).ready(function () {
        const $searchInput = $('.td-search-input');
      
        //
        // Options for popover
        //

        $searchInput.data('html', true);
        $searchInput.data('placement', 'bottom');
        $searchInput.data(
            'template',
            '<div class="popover offline-search-result" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        );

        //
        // Register handler
        //

        $searchInput.on('change', (event) => {
            render($(event.target));

            // Hide keyboard on mobile browser
            $searchInput.blur();
        });

        // Prevent reloading page by enter key on sidebar search.
        $searchInput.closest('form').on('submit', () => {
            return false;
        });

        //
        // Lunr
        //

        let idx = null; // Lunr index
        const resultDetails = new Map(); // Will hold the data for the search results (titles and summaries)

        // Set up for an Ajax call to request the JSON data file that is created by Hugo's build process
        $.ajax($searchInput.data('offline-search-index-json-src')).then(
            (data) => {
                idx = lunr(function () {
                    this.ref('ref');

                    // If you added more searchable fields to the search index, list them here.
                    // Here you can specify searchable fields to the search index - e.g. individual toxonomies for you project
                    // With "boost" you can add weighting for specific (default weighting without boost: 1)
                    this.field('title', { boost: 5 });
                    this.field('categories', { boost: 3 });
                    this.field('doi', { boost: 3 });
                    this.field('tags', { boost: 3 });
                    // this.field('projects', { boost: 3 }); // example for an individual toxonomy called projects
                    this.field('description', { boost: 2 });
                    this.field('body');

                    data.forEach((doc) => {
                        this.add(doc);

                        resultDetails.set(doc.ref, {
                            title: doc.title,
                            excerpt: doc.excerpt,
                        });
                    });
                });

                $searchInput.trigger('change');
            }
        );

        const render = ($targetSearchInput) => {
            // Dispose the previous result
            $targetSearchInput.popover('dispose');

            //
            // Search
            //

            if (idx === null) {
                return;
            }

            const searchQuery = $targetSearchInput.val();
            if (searchQuery === '') {
                return;
            }

            const results = idx
                .query((q) => {
                    const tokens = lunr.tokenizer(searchQuery.toLowerCase());
                    tokens.forEach((token) => {
                        const queryString = token.toString();
                        q.term(queryString, {
                            boost: 100,
                        });
                        q.term(queryString, {
                            wildcard:
                                lunr.Query.wildcard.LEADING |
                                lunr.Query.wildcard.TRAILING,
                            boost: 10,
                        });
                        q.term(queryString, {
                            editDistance: 2,
                        });
                    });
                })
                .slice(
                    0,
                    $targetSearchInput.data('offline-search-max-results')
                );

            //
            // Make result html
            //

            const $html = $('<div>');

            $html.append(
                $('<div>')
                    .css({
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '1em',
                    })
                    .append(
                        $('<span>')
                            .text('Search results')
                            .css({ fontWeight: 'bold' })
                    )
                    .append(
                        $('<i>')
                            .addClass('fas fa-times search-result-close-button')
                            .css({
                                cursor: 'pointer',
                            })
                    )
            );

            const $searchResultBody = $('<div>').css({
                maxHeight: `calc(100vh - ${
                    $targetSearchInput.offset().top -
                    $(window).scrollTop() +
                    180
                }px)`,
                overflowY: 'auto',
            });
            $html.append($searchResultBody);

            if (results.length === 0) {
                $searchResultBody.append(
                    $('<p>').text(`No results found for query "${searchQuery}"`)
                );
            } else {
                results.forEach((r) => {
                    const doc = resultDetails.get(r.ref);
                    const href =
                        $searchInput.data('offline-search-base-href') +
                        r.ref.replace(/^\//, '');

                    const $entry = $('<div>').addClass('mt-4');

                    $entry.append(
                        $('<small>').addClass('d-block text-muted').text(r.ref)
                    );

                    $entry.append(
                        $('<a>')
                            .addClass('d-block')
                            .css({
                                fontSize: '1.2rem',
                            })
                            .attr('href', href)
                            .text(doc.title)
                    );

                    $entry.append($('<p>').text(doc.excerpt));

                    $searchResultBody.append($entry);
                });
            }

            $targetSearchInput.on('shown.bs.popover', () => {
                $('.search-result-close-button').on('click', () => {
                    $targetSearchInput.val('');
                    $targetSearchInput.trigger('change');
                });
            });

            // Enable inline styles in popover.
            const whiteList = $.fn.tooltip.Constructor.Default.whiteList;
            whiteList['*'].push('style');

            $targetSearchInput
                .data('content', $html[0].outerHTML)
                .popover({ whiteList: whiteList })
                .popover('show');
        };
    });


    const SEARCH_ID = 'search-list';

    // const COUNT_ID = 'count';
    const LIST_ID = 'list';
  
    let list = null;
    let filteredList = null;
  
  
    const logPerformance = (work, startTime, endTime) => {
      const duration = (endTime - startTime).toFixed(2);
      console.log(`${work} took ${duration} ms`);
    };
  
    const getSearchEl = () => document.getElementById(SEARCH_ID);
   
    // const getCountEl = () => document.getElementById(COUNT_ID);
    const getListEl = () => document.getElementById(LIST_ID);
  
  
  
    const fetchJsonIndex = () => {
        const startTime = performance.now();
        const url = `${window.location.origin}/index.json`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            list = data.list;
            // console.log(data);
            // console.log(list);
            filteredList = data.list;
            logPerformance('fetchJsonIndex', startTime, performance.now());
          })
          .catch(error =>
            console.error(`Failed to fetch JSON index: ${error.message}`)
          );
      };
  
 
    const filterList = () => {
      const regexQuery = new RegExp(getSearchEl().value, 'ig');
        console.log(regexQuery);
      filteredList = list.filter(item => {
         
        const title = item.application;
        const categories = item.categories.join();
        console.log(categories);
        const doi = item.doi;
        const doi_url = item.doi_url;

          return (
              title.match(regexQuery) || categories.match(regexQuery) || doi.match(regexQuery) || doi_url.match(regexQuery)
          );
        
      });
      console.log(filteredList);
    };
  
  
    const renderList = () => {
      const newList = document.createElement('ul');
      newList.id = LIST_ID;
  
      filteredList.forEach(item => {
  
        const app = document.createElement('li');
        app.textContent = item.application;

        item.categories.forEach(category => {
            const tag = document.createElement('a');
            tag.classList.add('taxonomy-term');
            let cat = document.createTextNode(category);
            tag.appendChild(cat);
            app.appendChild(tag);
        })
        const doi_tag = document.createElement('a');
        doi_tag.classList.add('taxonomy-term');
        let doi_node = document.createTextNode(item.doi);
        doi_tag.appendChild(doi_node);
        app.appendChild(doi_tag);
        
        newList.appendChild(app);
      });
  
      const oldList = getListEl();
      oldList.replaceWith(newList);
    };
  
    const handleSearchEvent = () => {
      const startTime = performance.now();
      filterList();
      renderList();
      logPerformance('handleSearchEvent', startTime, performance.now());
    };
  
  
    const addEventListeners = () => {
      getSearchEl().addEventListener('input', handleSearchEvent);
    };
  
    const main = () => {
      if (getSearchEl()) {
        fetchJsonIndex();
        addEventListeners();
      }
    };
    main();
})(jQuery);
