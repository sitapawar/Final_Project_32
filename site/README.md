## Project Details
Term Project: Brown Yelp

Description: 
    Rating site for Brown dining halls that allows users to view the current daily food options for the Ratty, Vdub, and Andrews, and rate foods out of 5 while also viewing the current rating each food has

Team Members and Contributions 

    spawar2 - front end nav bar and menu design, implementation and testing 
    fleahy - firebase/ webscraping/ integration of backend to frontend
    acortaba - 
    scortaba - rating implementation in front and back end

Collaboration 

    wvandewa of (emickels-estill-jrytel-mgrinber-wvandewa) - react dom router and nav bar general set up 
    Firebase website/ stack overflow / other various intenert sojrces tied to firebase(how to use firebase)
    Cherrio webscaping website/stack overflow / other various internet sources tied to webscraping/cheerio (how to webscape)



Total Estimated Time: 
    50+

Github: https://github.com/cs0320-f2022/term-project-acortaba-fleahy-scortaba-spawar2


## Design Choices: 

    Front end: 
        We used React's router dom to make our nav bar and connect it with the diffrent pages for each dining hall. We generalized a menu function that is then instantiated into each dining hall page and just plug in the unique food lists into the general menu function. The menu function also contains a printed menu function that is made in a loop for each food item so that each food item has its own box with an controlled input and rating information. 

    WebScraping/Data mangement:
        Webscraping is a multistep process that extends simply just scraing web data. The first step is to transfer all the ratings that are stored in 'today food' and push them to 'all food'. After this is done all the food items in 'today food' is deleted. Then all the menu items from each dining hall is scraped. If the items does not exist in 'all food' it is added there first, if it does exist nothing changes to that document. Then, using the current menu items, the food documents are pulled from 'all food' into 'today food' to ensure the past ratings are used to calculate ratings. 

    Firebase: 
        The firebase works as follows,
        We have two collections one titled 'all food' and another titles 'today food', webcraping is in charge of updating the firebase
        [see webscraping for more details]

        'all food' acts as a history collection, which includes all the foods ever webscraped and the ratings they have gotten in the past. 'today food' holds all all of the items currently on the menu with their respective past ratings plus current ratings. 

        Each document in a collection has the same properties:

        food - name of food
        dininghall - the name of the dining hall
        type - we included this so we could later add what type of food it is (breakfast, lunch, dinner)
        rating - a dictionary that maps a user to a rating 

        We store ratings in such a way that we can easly implement a user profile section if we decide to add a user authentitication process in the future.

    Integration: 
        When a page loads, we show all the menu items that the dining hall has to offer for that day. If an item as been rated in the past it shows the average rating. A user will input a rating (must be a whole number from 0-5), which will then be pushed to the firebase document's dictonary that stores its ratings. The average rating is then calculated by adding up all the past ratings divided by the number of times the food item has been rated. 


## Errors/Bugs 
    Easily hackable ratings since we don't have authentication.
    Because of firebases' limited reads we can only reload the page so many times each day before we use up the reads. 

## Tests: 
    We tested a lot of the front end stuff using React testing library components and aria labels to check that the elements rendered correctly and were visible. We also unit tested our fron end data structures and adding and removing from them. NavBar testing tests the nav bar section and menu.test.tsx tests the different menu elements for the different pages. 

    Testing our backend was a little differnt. One of the main ways we tested that ratings were pushed correctly was manuelly testing the firebase itself. We ran into timeout errors from using getDoc on a firebase, so as a solution we manually checked that the correct data was pushed to firebase and the correct average rating was obtained. 


## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Cd into the Site directory and: 

Installation:

`npm install`  

    if not working make sure that cheerio and react-router-dom are both installed 

To Run Test Suite:  
(from Site)

`npm test`  

To Webscape Data:  
(from Src)

`node webscrape.js`  

To Start Server:
(from Site)


`npm start`  

To Visit App:

`localhost:3000/brownyelp`  
  
