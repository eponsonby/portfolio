export const blogPosts = [
  {
    slug: 'building-this-site',
    title: 'building an all-in-one media tracker',
    date: '2026-07-23',
    excerpt:
      `One day, I noticed that I was logging books I’ve read in Goodreads and StoryGraph, movies in Letterboxd and TV Shows in TMDB. 
      And I thought, wouldn’t it be great if this did not involve 4 different apps and websites?!`,
    body:
    `One day, I noticed that I was logging books I’ve read in Goodreads and StoryGraph, movies in Letterboxd and TV Shows in TMDB. 
      And I thought, wouldn’t it be great if this did not involve 4 different apps and websites?! 
      I wanted something that would be easy to update, mobile friendly and maybe even nice to look at. 
      I started by putting some of this content into a spreadsheet at first (yay spreadsheets!) 
      but then remembered we are in the year of our lord 2026 and have advanced technology whose capabilities far exceed that of the spreadsheet.
      I love Notion as a company and as a tool so I wanted to explore how I could use it in a new and novel way. 
      Ultimately decided to leverage a few different APIs and store the data in a Notion database. 
      There’s lots more I’d like to do on this project. But you know what they say, perfect is better than done…wait that’s not right.. `,
  },

  {
    slug: 'what-is-localhost',
    title: 'What is localhost?',
    date: '2026-09-25',
    excerpt:
      `As someone who is always learning new things, sometimes I find it helpful to go back to the basics and make sure the bricks
      holding my house together are not made of cotton candy. Even though that would be delicious mmmm cotton candy house...`,
    body:
    `As someone who is always learning new things, sometimes I find it helpful to go back to the basics and make sure the bricks
      holding my house together are not made of cotton candy. Even though that would be delicious mmmm cotton candy house...
      So, today I thought I'd leave myself a lil note so I can remember what exactly localhost means next time I'm saying to myself wait...what?
    
      localhost is a hostname that refers to your own computer. It points to the IP address 127.0.1, 
      which is a special IP address reserved for exactly this purpose.
      
      Uhh cool story. Why should I care?
      When you’re building something on your computer (a website, an app) you can run it without it ever touching the internet.
      Often, you can visit it at something like http://localhost:3000
      
      Your browser asks for local host. Your computer is like “oh I’m talking to myself". And then serves up the app you’re running locally. 
      Nobody else can see it so it’s like your own little private sandbox. 
      The :3000 is the port. If the hostname (i.e. localhost) is the address of your barely-held-together-with-duct-tape Bushwick apartment building,
      the port is your unit number. Your computer could run lots of different apps or services simultaneously, 
      each on its own port (localhost:3000, localhost:8000, etc).
      `
  }
];
