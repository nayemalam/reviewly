<h1>Reviewly</h1>

<h4>Table of Contents</h4>

- [Context](#context)
- [Getting Started](#getting-started)
- [Note](#note)
- [Learn More](#learn-more)

## Context

From a `reviews.json` with the object structure like below: 
  
  ```javascript
  {
    "reviews": [
      {
        id: '5d707203b65083001e956f0a',
        author: 'Weeks Duran',
        place: 'Big Johns Burgers',
        published_at: 'Thu Jun 27 1974 11:46:39 GMT-0500 (Central Daylight Time)',
        rating: 5,
        content: 'Great!',
      },
    ]
  }
  ```

  You are able to do the following with this application:
- A view with a list of reviews
  - Review rating is visible
  - Review published_at is visible
  - Review author is visible
- A view with a review’s complete details
- A user can add a response to a review
  - A review can only have one response
  - A response can be edited
  - A response should be shown with the rest of the review details

## Getting Started

- Clone this repo: `https://github.com/nayemalam/reviewly.git`

```bash
cd reviewly
yarn
# or
npm i
```

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Note
- Architecture implemented with proper file structuring
- UI and logic implemented (values stored in Local Storage)
- Some other nice features implemented: 
  - responsive design
- Built with Next.js, React, Redux + Redux Toolkit, styled with SASS, Tailwind CSS and Material UI.

## Learn More

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
