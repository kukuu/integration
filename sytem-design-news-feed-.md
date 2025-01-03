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

