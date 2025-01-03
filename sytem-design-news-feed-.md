# System Design - News Feed

The feed poat should contain  a list of feed posts users can interact with.

 - RADIO Framework https://www.greatfrontend.com/front-end-system-design-playbook/framework

- Implementation Guidelines: https://www.greatfrontend.com/questions/system-design/news-feed-facebook#requirements-exploration

##  Requirements exploration

1. What are the core features to be supported?

   i. Browse news feed containing posts by the user and their friends.

   ii. Liking and reacting to feed posts.

   iii. Creating and publishing new posts.

2. Is Commenting and sharing included in the core scope?.

3. What kind of posts are supported?
   
   i. Primarily text and image-based posts.

   ii. If time permits we can discuss more types of posts.

4. What pagination UX should be used for the feed?

   i. Infinite scrolling, meaning more posts will be added when the user reaches the end of their feed.

5. Will the application be used on mobile devices?

Not a priority, but a good mobile experience would be nice.

## Wireframe

![image](https://github.com/kukuu/integration/blob/main/news-feed-wireframe-sketch.png)

## Architecture / high-level design

![image](https://github.com/kukuu/integration/blob/main/news-feed-architecture.png)

## Component responsibilities

i. Server: Provides HTTP APIs to fetch feed posts and to create new feed posts.

ii. Controller: Controls the flow of data within the application and makes network requests to the server.

iii. Client store: Stores data needed across the whole application. In the context of a news feed, most of the data in the store will be server-originated data needed by the feed UI.

iii. Feed UI: Contains a list of feed posts and the UI for composing new posts.

iv. Feed posts: Presents the data for a feed post and contains buttons to interact with the post (like/react/share).

v. Post composer: WYSIWYG (what you see is what you get) editor for users to create new feed posts.

## Rendering approach

Traditional web applications have multiple choices on where to render the content, whether to render on the server or the client.

i. Server-side rendering (SSR): Rendering the HTML on the server side, which is the most traditional way. Best for static content that require SEO and does not require heavy user interaction. Websites like blogs, documentation sites, e-commerce websites are built using SSR.

ii. Client-side rendering (CSR): Rendering in the browser, by dynamically adding DOM elements into the page using JavaScript. Best for interactive content. Applications like dashboards, chat apps are built using CSR.

Interestingly, news feed applications are somewhere in-between, there's a good amount of static content but they also require interaction. This hybrid approach  gives the best of both worlds: a fast initial load with SSR then hydrating the page to attach event listeners for user interactions. Subsequent content (e.g. more posts added once the user reaches the end of their feed) and page navigation will use CSR.

Modern UI JavaScript frameworks like React and Vue, along with meta frameworks like Next.js and Nuxt support this rendering strategy.


## Data model

A news feed shows a list of posts fetched from the server, hence most of the data involved in this application will be server-originated data. The only client-side data needed is form state for input fields in the post composer.

The most interesting API to talk about is the HTTP API to fetch a list of feed posts because the pagination approach is worth discussing. The HTTP API for fetching feed posts from the server has the basic details.

## Which pagination to use.

In a nutshell, the choice between offset-based pagination and cursor-based pagination largely depends on the data and requirements. Offset-based is simpler and better for static or small datasets where direct access to pages is important. Cursor-based is more efficient and reliable for large, dynamic datasets where the data sequence is important and changes frequently.

For an infinite scrolling news feed where:

i. New posts can be added frequently to the top of the feed.

ii. Newly fetched posts are appended to the end of the feed.

iii. Table size can grow pretty quickly.

## General optimizations

These optimizations are applicable to every section of the page.

i. Code splitting JavaScript for faster performance: 
As an application grows, the number of pages and features increase which will result in more JavaScript and CSS code needed to run the application. Code splitting is a technique to split code needed on a page into separate files so that they can be loaded in parallel or when they're needed.

Generally, code splitting can be done on two levels:

i. Split on the page level: Each page will only load the JavaScript and CSS needed on that page.

ii. Lazy loading resources within a page: Load non-critical resources only when needed or after the initial render, such as code that's only needed lower down on the page, or code that's used only when interacted with (e.g. modals, dialogs).

For a news feed application, there's only a single page, so page-level code splitting is not too relevant, however lazy loading can still be super useful for other purposes. Lazy loading is discussed in more detail under the feed post section as it's most relevant to the feed post UI.


