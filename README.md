# Let's build a Hacker News Feed!

## Applications that have been built around Hacker News

* https://hn.premii.com
* https://hackerweb.app/
* https://hnpwa.com/
* https://hckrnews.com/
* https://hnleaderboard.com/
* https://new-hn.algolia.com/?experimental&sort=byPopularity&prefix&page=0&dateRange=all&type=story

# Tech Tickets

#### hot Fixes

 * search to comments transition is broken!

#### feature

* navigation component (link)
* logo links to home page
* top domains should display both top & best stories
* search url changes upon search term
  * `?q=<search-term>`
* display previous search term when returning from comments
* store relevant story data to prevent constant fetching
  * 'refresh' button can be tackled with this
* view other other comments

#### fixes

* css conflicts
* empty comments

#### style

* comment line-height
* icon hover message
* ellipsis on longline
* readable timestamps
* loading indicator
* mobile views

#### refactor

* consolidate endpoints
* consolidate hooks
* error messaging
* move any processing outside components/hooks (saga)

#### Spike

* HN data API
* component communication
* store & processing
