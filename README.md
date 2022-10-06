<h1>Reviewly</h1>

<h4>Table of Contents</h4>

- [Context](#context)
- [Getting Started](#getting-started)
- [Note](#note)
- [Learn More](#learn-more)

## Context

From a `reviews.json` file with the object structure like below: 
  
  ```typescript
  {
    "reviews": [
      {
        id: string,
        author: string,
        place: string,
        published_at: string,
        rating: number,
        content: string,
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

Deployed version available at: https://reviewly-response.netlify.app

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
- Tested on Chrome Version 105.0.5195.125 (Official Build)
- Architecture implemented with proper file structuring
- UI and logic implemented (values stored in Local Storage)
- Some other nice features implemented: 
  - responsive design
  - clear all comments with  prompt
    - this will clear only all responses, not the entire local storage
  - back button for convenience
  - press "Enter" to submit a comment
  - can cancel and edit the comment
  - can remove a comment
  - deployed with CI
  - filter reviews by rating
  - filter reviews by 
- Built with Next.js, React, Redux + Redux Toolkit, styled with SASS, Tailwind CSS and Material UI.

## Some other things to consider (but out of scope):
- instead of saving responses in local storage, should actually save them in db (via POST or graphql query)
- currently do not have a fetching state but that's expected since it retrieves from localStorage
- it is a bit overkill to add redux global state management in the current app as it is since it is unnecessary (however, it's nicely implemented for whenever we do require a global store, it will be there)
- don't need all of Tailwind + SASS + MUI, could have just built this app with only one preprocessor/component library
- justification on why I used the above 3 together:
   - SASS: for any overrides, as well as local theme + custom css
   - Tailwind: out of box utility classes (displaying flex, text size, etc)
   - Premade components (i.e. Button, Tooltip, Popper, etc)
- could have added an option to upload a reviews.json file, since it was given in a file format - decided to do this because realistically you're not uploading reviews, rather fetching them
- could have created several filter functions that manipulate local reviews state
- current user admin is hardcoded but this can be easily fetched from auth login and have an AuthContext surrounding the entire app - out of scope

## Learn More

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
