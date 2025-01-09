# System Design - News Feed

The feed post should contain  a list of feed posts users can interact with.

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

iii. Error states - Clearly display error states if any network requests have failed, or when there's no network connectivity.

iv. Stale feeds - It's not uncommon for users to leave their news feed application open as a browser tab and not refresh it at all. It'd be a good idea to prompt the user to refresh or refetch the feed if the last fetched timestamp is more than a few hours ago, as there can be new posts and the loaded feed is considered stale. When a new feed is refetched, the current feed can be entirely removed from memory to free up memory space.

Another approach is to automatically append new feed posts to the top of the feed, but that might not be desired and extra care has to be made in order not to affect the scroll position.

 v. Delivering data-driven dependencies only when needed


News feed posts can come in many different formats (text, image, videos, polls, etc) and each post requires custom rendering code. In reality, Facebook feed supports over 50 different post formats!

One way to support all the post formats on the client is to have the client load the component JavaScript code for all possible formats upfront so that any kind of feed post format can be rendered. However, not all users' feed will contain all the post formats and and there will likely be a lot of unused JavaScript. With the large variety of feed post formats, loading the JavaScript code for all of them upfront is sure to cause performance issues.


If only we could lazy load components depending on the data received! That's already possible but requires an extra network round-trip to lazy load the components after the data is fetched and we know the type of posts rendered.


Facebook fetches data from the server using Relay, which is a JavaScript-based GraphQL client. Relay couples React components with GraphQL to allow React components to declare exactly which data fields are needed and Relay will fetch them via GraphQL and provide the components with data. Relay has a feature called data-driven dependencies via the @match and @module GraphQL directives, which fetches component code along with the respective type of data, effectively solving the excess components problem mentioned above without an extra network round-trip. You only load the relevant code when a particular format for a post is being shown.

```
// Sample GraphQL query to demonstrate data-driven dependencies.
... on Post {
  ... on TextPost {
    @module('TextComponent.js')
    contents
  }
  ... on ImagePost {
    @module('ImageComponent.js')
    image_data {
      alt
      dimensions
    }
  }
}


```

vi. Rendering images

Since there can be images in a feed post, we can also briefly discuss some image optimization techniques:

a. Content Delivery Network (CDN): Use a (CDN) to host and serve images for faster loading performance.

b. Modern image formats: Use modern image formats such as WebP which provides superior lossless and lossy image compression.
<img>s should use proper alt text

c. Facebook provides alt text for user-uploaded images by using Machine Learning and Computer Vision to process the images and generate a description.

d. Generative AI models are also very good at doing that these days.

e. Image loading based on device screen properties

f. Send the browser dimensions in the feed list requests so that server can decide what image size to return.

g. Use srcset if there are image processing (resizing) capabilities to load the most suitable image file for the current viewport.

h. Adaptive image loading based on network speed

i. Devices with good internet connectivity/on WiFi: Prefetch offscreen images that are not in the viewport yet but about to enter viewport.

j. Poor internet connection: Render a low-resolution placeholder image and require users to explicitly click on them to load the high-resolution image.

k. Timestamp rendering

Timestamp rendering is a topic worth discussing because of a few issues: multilingual timestamps and stale relative timestamps.

1. Multilingual timestamps: Globally popular sites like Facebook and Twitter have to ensure their UI works well for different languages. There are a few ways to support multilingual timestamps:

2. Server returns the raw timestamp: Server returns the raw timestamp and the client renders in the user's language. This approach is flexible but requires the client to contain the grammar rules and translation strings for different languages, which can amount to significant JavaScript size depending on the number of supported languages,

3. Server returns the translated timestamp: This requires processing on the server, but you don't have to ship timestamp formatting rules for various languages to the client. However, since translation is done on the server, clients cannot manipulate the timestamp on the client.

4. Post truncation
Truncate posts which have super long message content and reveal the rest behind a "See more" button.

5. Intl API: Modern browsers can leverage Intl.DateTimeFormat() and Intl.RelativeTimeFormat() to transform a raw timestamp into translated datetime strings in the desired format.

6. Relative timestamps can turn stale: If timestamps are displayed using a relative format (e.g. 3 minutes ago, 1 hour ago, 2 weeks ago, etc), recent timestamps can easily go stale especially for applications where users don't refresh the page. A timer can be used to constantly update the timestamps if they are recent (less than an hour old) such that any significant time that has passed will be reflected correctly.

## Live comment updates
Live updates for Facebook feed comments enhance user engagement and interaction by providing real-time visibility of new comments and updated reaction counts. This fosters a dynamic and responsive communication environment, encouraging users to actively participate in ongoing conversations without the need for manual refreshing. The immediacy of live updates contributes to increased user retention.

The common ways to implement live updates on a client include:

1. Short polling: Short polling is a technique in which the client repeatedly sends requests to the server at fixed intervals to check for updates. The connection is closed after each request, and the server responds immediately with the current state or any available updates. While short polling is straightforward to implement, it may result in higher network traffic and server load compared to the more advanced techniques mentioned below.

ii. Long polling: Long polling extends on the idea of short polling by keeping the connection open until new data is available. While simpler to implement, it may introduce latency and increased server load compared to other approaches.


iii. Server-Sent Events (SSE): SSE is a standard web technology that enables servers to push updates to web clients over a single HTTP connection. It's a simple and efficient mechanism for real-time updates, particularly well-suited for scenarios where updates are initiated by the server.


iv. WebSockets: WebSockets provide a full-duplex communication channel over a single, long-lived connection. This bidirectional communication allows both the server and the client to send messages to each other at any time. WebSockets are suitable for applications that require low latency and high interactivity.


v. HTTP/2 server push: With HTTP/2, the server can push updates to the client without waiting for the client to request them. While HTTP/2 server push is not as widely used as other methods for live updates, it can be an efficient solution in certain scenarios.
