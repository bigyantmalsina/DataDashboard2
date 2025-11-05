# Web Development Project 5 - *Google Books Dashboard*

Submitted by: **Bigyan Timalsina**

This web app: **displays a searchable, filterable dashboard of books fetched from the Google Books API. Users can view key details, apply filters, and see summary statistics about the data.**

Time spent: **10 hours in total**

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard displays more than 10 unique books, one per row.
  - Each book card includes at least two features: title, author, thumbnail, and published year.

- [x] **`useEffect` React hook and `async`/`await` are used**
  - Data is fetched from the Google Books API using `async/await` inside a `useEffect` hook.

- [x] **The app dashboard includes at least three summary statistics about the data** 
  - Total number of books displayed.
  - Number of unique authors in the current list.
  - Average publication year of the displayed books.

- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar correctly filters items in the list, only displaying books matching the search query.
  - The list of results dynamically updates as the user types into the search bar.

- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a different attribute than the search bar (e.g., book category).
  - The filter correctly filters items in the list, only displaying items matching the selected filter.
  - The dashboard list dynamically updates as the user adjusts the filter.

## Optional Features

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously.
- [x] Filters use different input types (text input and dropdown selection).
- [x] The user can click “Load More” to fetch more books from the API.

## Additional Features

- [x] Clean and responsive design using CSS.
- [x] Error handling for missing book images or data.
- [x] Loading indicator while data is being fetched.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://submissions.us-east-1.linodeobjects.com/web102/WyvR9AJv.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />
<img src='Dashboard.mov' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with **Adobe** (macOS).

## Notes

While building this app, I learned how to work with external APIs, React state management, and data filtering using array methods like `.map()` and `.filter()`.  
The main challenge was structuring API responses and dynamically updating filters efficiently.

## License

    Copyright 2025 Bigyan Timalsina

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
