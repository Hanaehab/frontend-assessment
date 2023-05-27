## Getting Started

First, run the development server:

npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About the application

Running Instructions:

- Open the zipped folder in any code editor.
- Run the command “npm install” to install the node modules folder first.
- Run the command “npm run dev” to run the application (runs on localhost:3000).
- In order to view the mobile view and mobile view —> open inspect and change views from toggle device toolbar

How was it done:

- Started by creating a local JSON file to store all the information required for the posts.
- Then proceeded by creating our two main pages:
- The home page:
  - Implemented in “index.tsx” which is navigated to using “/“. This page starts by fetching the data using “getStaticProps” from the JSON file. Then the fetched data is input to the component to use it to display the posts.
  - Local Storage is used to store the liked posts in an array “favorites” where on the initial render using the useEffect we get the value of favorites item if exists and store in a state.
  - Whenever this state changes its value the local storage variable is updated as well the state value.
  - useRef is used also to the presist values upon refreshing.
  - The state is trigged whenever the user presses the like button whether to like or to unlike (like —> added to local storage, unlike —> removed form local storage).
  - Double clicking on the image will like the picture also.
- The likes page:
  - It has the same implemented functionality as the home page.
  - The only difference is that it displays only the liked posts which are retrieved from the local storage.
  - The user can also unlike the post which will be then removed from the page as well as the local storage array.
  - However the user cannot like any posts.
- The pages are styled using sass which are placed inside the public folder.
- Typescript is used in the project.
- The functionality of the tags, likes, comments links don’t work.
