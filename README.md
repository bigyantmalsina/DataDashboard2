# Web Development Project 6 - Google Books Dashboard

Submitted by: **Bigyan Timalsina**

This web app: **A React-based data dashboard that visualizes book data fetched from the Google Books API. It allows users to explore books, view detailed information, and analyze data trends through interactive charts.**

Time spent: **10 hours spent in total**

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts are incorporated into the dashboard view of the site
  - Each chart describes a different aspect of the dataset

The following **optional** features are implemented:

- [x] The site’s customized dashboard contains more content that explains what is interesting about the data 
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
- [x] The site allows users to toggle between different data visualizations
  - User can toggle between displaying and hiding visualizations 

The following **additional** features are implemented:

* [x] Added a search bar to find books by title or author  
* [x] Added category filters for more control over displayed books  
* [x] Integrated Recharts for interactive and responsive graphs  
* [x] Designed a consistent and responsive layout with sidebar navigation  
* [x] Included error handling for missing or incomplete API data  
* [x] Used React Router for dynamic routes and clean navigation  

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='BookDashboard.mov' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with **Adobe Creative Cloud**  

## Notes

Challenges faced while building the app:
- Handling missing or undefined fields in the API response (some books had no authors or categories)
- Structuring and cleaning the JSON data to feed into Recharts
- Maintaining layout consistency while switching between dashboard and detail views
- Implementing dynamic routing with React Router while preserving the sidebar

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
