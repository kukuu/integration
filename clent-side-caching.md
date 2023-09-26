# Clientside caching

 For basic key-value pair storage, web storage (local storage and session storage) is commonly used. For more complex caching needs, such as caching network requests or handling large structured data, IndexedDB, Cache API, and Service Workers are preferred options.
 
 Clientside caching technologies commonly used in web development include:

## Web Storage API:

- Local Storage: Provides persistent storage of key-value pairs in the browser. Data stored in local storage remains available even after the browser is closed and can be accessed across sessions.

- Session Storage: Similar to local storage, but the data is available only for the duration of the current session. Once the session ends (e.g., the user closes the browser), the data is cleared.
IndexedDB:

- IndexedDB is an advanced client-side storage solution that allows you to store large amounts of structured data. It provides asynchronous access to databases and supports complex queries.

## Cache API:

The Cache API allows you to cache network requests and responses, providing an efficient way to serve resources offline or from cache, reducing server load and improving page load times.

- Service Workers:

Service workers are scripts that run in the background, enabling advanced caching and offline functionality. They can intercept network requests, cache resources, and respond to fetch events with cached content.

- Cookies:

Cookies are small pieces of data stored in the user's browser. While they are primarily used for maintaining session information and user preferences, they can also be used for client-side caching of small amounts of data.

- Application Cache (Deprecated!):

The Application Cache was an old mechanism for caching resources for offline use. However, it is now deprecated in favor of more modern alternatives like Service Workers and the Cache API.
