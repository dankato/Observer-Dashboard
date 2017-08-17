## Observer Dashboard
---

App Live on
[Heroku](https://tranquil-plateau-10397.herokuapp.com/)

### TLTR
A simple gui dashboard that students can view and contribute to by adding useful resources such as links posted in slack, or material shared by mentors.


### Installation
|         |            | 
| :------------- |:-------------| 
| Download/Clone the repo | https://github.com/dankato/Observer-Dashboard.git |
| Install dependencies | `npm install`| 
| Start Mongo DB | `mongod` | 
| Start server | `node server.js` or `nodemon server.js` | 
| View in browser | `http://localhost:8080` |
| or check out the live version on   | [Heroku](https://tranquil-plateau-10397.herokuapp.com/) |

### How to use the Dashboard
- On the Dashboard, click on the "Create a new post" button to create a brand new post.
- Every post is displayed on the dashboard with the ability to follow the link to a new page or remove the post off the dashboard.

### Design
Problem: Going through a developer bootcamp is rough and along the way you come across a considerable amount of resources that you want to save to read later. Mentor share something you think the rest of the class will find helpful, instruction send out a url in slack but can't find it, or you are researching on your own and found an interesting article, video or reading material that could help others out. The current cohort dashboard houses the main topics and links to prerequisites reading material but what about those daily questions like, what was my pair's github handle or which week did we learn mongoose on?

Solution: A central location for students to grab or share the necessities on the fly when learning to code. Along with the dashboard comes useful data about what each week's topic was and contact info of the students in the cohort.


### Features
* Simple full stack CRUD app
* Basic user authentication
* Excellent code structure & quality

### Nice to haves
* Have the ability to add multiple links to one post
* Oauth GitHub
* Accessibility
* Mobile friendly

### Tech Stack
* **The Back End (Node & Express)**
	* Mongo DB for server database
	* mLab to host the database
	* Mongoose for object data modeling
	* Passport for request authentication
	* bcrypt for encryption
	* Heroku for hosting our app
	* Travis CI for continuous deployment & running unit tests
	* Mocha / Chai for creating unit testing

* **The Front End**
	* HTML/CSS
	* Flexbox

* **Tools**
	* Postman for testing RESTful endpoints

### User Stories - As a user i can:
* Create an account (username, password, first name, last name)
* Log into my own account (username, password)
* Post links to news feed
	* create button for every week (avoids ill placed posts)
	* add single url
	* enter header (enter very small description of post)
	* enter description of post
* View news feed with my posted links
* View posts created by other users
* View other student information (github, slack, email, etc.)
* View week/subject menu to navigate through
* Click on link & be redirected to website in a new tab
* Edit post to change descriptions, updated URL
* Delete posts with confirmation pop up

### Views
1. Create an Account (or login) page
2. Login page (redirect users to this page after signing up on page 1 or clicking on log in on page 1)
3. Dashboard page (Main page where user can CRUD)
4. Create Post pop up dialog over page 3
5. Edit Post pop up dialog over page 3
6. Delete Post confirmation pop up dialog over page 3

## Installation
- Download/Clone the repo
- Install dependencies: `npm install`
- Start Mongo DB: `mongod`
- Start server: `node server.js` or `nodemon server.js`
- View in browser: `http://localhost:8080`
- or use Heroku

## Schedule
* :smirk: Monday (MVP)
	- [x] Brainstorm ideas
	- [x] Choose an app idea
	- [x] Have a high level description of app purpose
	- [x] Have extensive list of user stories/features
	- [x] Prioritize list
	- [x] Mock up user flows, wireframes
	- [x] Get it approved
	- [x] Set up a "Hello World" prototype

* :confused: Tuesday (Skeleton & Unit Tests)
	*  Version 1.2 contains
	- [ ] working skeleton wk 7
	- [x] get (functional)
	- [x] post (functional)
	- [x] delete (functional)
	- [x] put (functional)
	- [x] Object seeding

* :sweat: Wednesday (Muscle)
	- [ ] Version 1.3 contains 	
	- [ ] Unit Tests for CRUD
	- [ ] Post Dialog print to HTML

* :weary: Thursday (Demo Prep & App Complete)
	- [ ] Version 1.3 contains
	- [ ] auth create profile
	- [ ] auth login flow

* :bowtie: Friday (Polish & Demo Day)
	- [ ] Version 1.4 contains
	- [ ] Demo Deck

### Wireframe / Spec
https://goo.gl/iUP5ZW