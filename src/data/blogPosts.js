// Real seed post about building this site; add more as you actually write them.
export const blogPosts = [
  {
    slug: 'building-this-site',
    title: 'Why I built this instead of using a template',
    date: '2026-07-23',
    excerpt:
      "Notion as the backend, a hand-built React front end as the showcase. Here's the reasoning, and what's still left to build.",
    body: `I wanted a personal site that actually looks like something I made, not a template with my name swapped in. So the setup is: Notion holds the data I update most (books, movies, shows), and this site is a from-scratch React app that reads from it.

The visual direction leans into a tactile, handmade feel — it's meant to sit next to the actual handmade things on this site, like the knitting.

Still to come: wiring up the Notion data live, an NYC blocks-walked tracker, and an actual resume you can download instead of this placeholder text.`,
  },
];
