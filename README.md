## CS472-Final-Project-November-2024 
### Policies for the Students: Policies for a Better Academic Experience
The requirements below are for the standalone project. For groups, please refer to the additional requirements section below.  
  
You will build a full-stack web application using React for the frontend and Express for the backend. The project will focus on state management, API interactions (REST), and component-based architecture.
* The application displays policies from all users by academic year.
* The application should provide ways to browse previous academic years (history).
* Guests can browse policies, but cannot add a new policy.
* Implement signup/signin and save the user state at the client.
* Only users can contribute and submit a new policy.
* A policy consists of a title, description, owner, date, and category (General, Food, Library, Meditation, Education, Visa & Travel, Students Lounge.. etc).
* A policy can be up-voted or down-voted by users, once per policy. Guests cannot up-vote or down-vote.
* Policies are sorted by vote in descending order.
* For the protected actions (Add policy, Up-Vote, Down-Vote), implement a middleware at the server to verify the user registration state.
  
## Frontend (React) Technical Requirements
* Create a well-structured component hierarchy.
* Use functional components and hooks (e.g., useState, useEffect, useContext).
* Utilize React Context API for passing global state between components.
* Implement controlled components for forms and inputs.
* Handle loading and error states appropriately.
* Design a user-friendly interface using a CSS framework (e.g., Tailwind CSS) or similar CSS libraries.
* Use React Router DOM to manage navigation.
  
## Backend (Express) Technical Requirements
* Create RESTful API endpoints to handle frontend requests and setup routes for different endpoints (e.g., GET, POST, PUT).
* Create a middleware to verify the user registration state before allowing access to the protected routes (add policy, up-vote, down-vote).
* Use morgan middleware for logging requests and handling errors.
* Use cors to allow communication between the frontend and backend applications on different ports.
* Use `node:fs` to store and manage the policies as files on the file system. If you have strong DBMS skills (for example [MySQL](https://www.npmjs.com/package/mysql2), you may use it for storage instead of node file system.

## Group Project Requirements (Does not apply to students who work standalone)
Standlone students are welcome to work on these requirements, but will not be evaluated or receive credits. Groups are subject to pre-approval, if you wish to work as a group, please send me your team members' names before 12:00 PM noon of Nov 15 and I will review your request and approve your team formation. Groups must have two students only.       
  
In addition to the previous requirements, groups must complete the following requirements:
* Allow users to add comments to policies. Multiple comments are allowed.
* Create additional screen to show the policies posted by the current user.
* Implement a search feature to allow guests/users to search for a policy by title.
* In addition to displaying policies by number of votes, provide guests/users the ability to filter policies by category, and by date latest to oldest.  
  
Note that you have "admin" priviledge on your Git repository, one member of the group should add the other member to collaborate on one repository.

